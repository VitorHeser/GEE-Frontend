import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { Draggable }  from '@fullcalendar/interaction';
import { EventService } from 'src/app/demo/service/eventservice';
import { AppMenuComponent } from 'src/app/app-main/menu/app.menu.component';
import * as jwt_decode from "jwt-decode";
import { TarefasService } from './tarefas.service';
import { UserServiceService } from '../administrador/usuarios/user-service.service';
import { MessageService } from 'primeng/api';
import { MercadolivreserviceService } from '../mercado-livre/mercadolivreservice.service';

@Component({
  selector: 'app-tarefas',
  templateUrl: './tarefas.component.html',
  styleUrls: ['./tarefas.component.css']
})
export class TarefasComponent implements OnInit {

  constructor(private messageService: MessageService,
    private eventService: TarefasService,
    private adminserv: UserServiceService, 
    private serv: MercadolivreserviceService) { }

  getDecodedAccessToken(): any {
    try{
        return JSON.parse(jwt_decode(sessionStorage.getItem('token')).iss);
    }
        catch(Error){
        return null;
    }
  } 
  ngOnInit() {
    this.CarregarCalendario()
  }


  //============================================================================================
  //CALENDÁRIO
  fullcalendarOptions
  eventos: any[]=[]
  calendarioCarregado=false

  CarregarCalendario(){
    this.carregarCalendario()
    this.fullcalendarOptions = {
      plugins: [ dayGridPlugin, timeGridPlugin, interactionPlugin ],
      defaultDate: new Date(),
      locale: "pt-br",
      editable: true,
      eventLimit: false,
    };
  }
  eventrender(event, element){
     event.element[0].querySelectorAll(".fc-content")[0].setAttribute("data-tooltip", event.event.title);
  }
  acharimg(id){
    return this.adminserv.acharimagem(id);
  }

  change(ev){
    console.log(ev)
  }

  carregarCalendario(){
    this.calendarioCarregado=false
    this.eventService.Tarefas().subscribe(events => {
      this.eventos=[]
      for(var i =0;i<events.length;i++){
        var eventos = events[i]


        eventos.daysOfWeek = events[i].daysOfWeek !=null ? [ events[i].daysOfWeek ] : null
        this.eventos.push(eventos)
      }
      
      this.EventosCaixa()
      this.aclEventosMigrados()
      // this.calendarioCarregado=true
    });
  }

  Recarregar(){
    this.editTask = false
    setTimeout(() => {  
      this.carregarCalendario()
    }, 200);
  }

  data = new Date()
  eventoscaixa =[]
  dataAdd1(){
    this.data.setDate(this.data.getDate()+1)
    this.EventosCaixa()
  }
  dataRem1(){
    this.data.setDate(this.data.getDate()-1)
    this.EventosCaixa()
  }
  EventosCaixa(){
    var data = this.data
    // console.log(this.eventos)
    this.eventoscaixa = this.eventos.filter(function(e){
      var din = new Date(data)
      var dfi=new Date(data)
      dfi.setDate(data.getDate()+1)
      din.setHours(0)
      din.setMinutes(0)
      din.setSeconds(0)
      dfi.setHours(0)
      dfi.setMinutes(0)
      dfi.setSeconds(9)
      return new Date(e.start)>din && new Date(e.start)<dfi  && e.id>0  ||
      new Date(e.start)<din && new Date(e.end)>din  && e.id>0  ||
      e.daysOfWeek == din.getDay() && e.id>0 
    })
  }
  
  dataFormatada(data:Date){
    var dia  = data.getDate().toString(),
        diaF = (dia.length == 1) ? '0'+dia : dia,
        mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
        mesF = (mes.length == 1) ? '0'+mes : mes,
        anoF = data.getFullYear(),
        hora  = (data.getHours()).toString(), //+1 pois no getMonth Janeiro começa com zero.
        horaF = (hora.length == 1) ? '0'+hora : hora,
        min  = (data.getMinutes()).toString(), //+1 pois no getMonth Janeiro começa com zero.
        minF = (min.length == 1) ? '0'+min : min;
    return diaF+"/"+mesF+"/"+anoF;
  }
  dataFormatada3(data){
    var final= ""
    if(data!=null){
      if(data.length<11){
        var anoF = data.substring(0,4)
        var mesF = data.substring(5,7)
        var diaF = data.substring(8,10)
        final = diaF+"/"+mesF+"/"+anoF;
      }else if(data.length>=11){
        var anoF = data.substring(0,4)
        var mesF = data.substring(5,7)
        var diaF = data.substring(8,10)
        var resto = data.substring(10,19)
        final = diaF+"/"+mesF+"/"+anoF+resto;
      }
    }
    return final
  }
  
  
  //=======================================================================================
  //PDIALOGS
  editTask = false
  tarefaAEditar
  porDiaDasemana=false
  DiasDaSemana=
  [
    {label: "Domingo", value:0},
    {label: "Segunda", value:1},
    {label: "Terça", value:2},
    {label: "Quarta", value:3},
    {label: "Quinta", value:4},
    {label: "Sexta", value:5},
    {label: "Sábado", value:6}
  ]
  novaTarefa(){
    return {
      id:0,
      title: null,
      status: null,
      usuario: this.getDecodedAccessToken().id,
      comentario: null,
      color: '#b8b8b8',
      daysOfWeek: [1],
      start: this.data,
      end: this.data,
    }
  }
  clone(arq){
    return {
      id:arq.id,
      title: arq.title,
      status: arq.status,
      usuario: arq.usuario,
      comentario: arq.comentario,
      color: arq.color,
      daysOfWeek: arq.daysOfWeek,
      start: arq.start,
      end: arq.end,
    }
  }
  abrirEditTask(task){
    this.tarefaAEditar = this.clone(task)
    this.porDiaDasemana= task.start ==null || task.end ==null ? true : false
    this.tarefaAEditar.daysOfWeek = task.daysOfWeek==null ? null : this.DiasDaSemana.filter(function(f){ return f.value==task.daysOfWeek[0]})[0];
    this.tarefaAEditar.start = task.start!=null ? new Date(this.tarefaAEditar.start) : null
    this.tarefaAEditar.end = task.end!=null ? new Date(this.tarefaAEditar.end) : null
    this.editTask=true
  }
  salvar(){
    var tar = this.tarefaAEditar
    tar.start = this.porDiaDasemana==false ? this.dataFormatadabd(this.tarefaAEditar.start):null
    tar.end = this.porDiaDasemana==false ? this.dataFormatadabd(this.tarefaAEditar.end):null
    tar.daysOfWeek = this.porDiaDasemana==true ? this.tarefaAEditar.daysOfWeek.value : null 
    // console.log(tar)
    if(tar.id==0){
      tar.id==null
      this.eventService.TarefasNew(tar).subscribe(events => {
        this.messageService.add({severity: 'success', summary: 'Salvo', detail: "Salvo"});
        this.Recarregar()

      },
      erro=>{
        this.messageService.add({severity: 'error', summary: 'Erro', detail: "Ocorreu algum tipo de erro com o servidor"});
      });
    }else{
      this.eventService.TarefasUpdate(tar).subscribe(events => {
        this.messageService.add({severity: 'success', summary: 'Salvo', detail: "Salvo"});
        this.Recarregar()
      },
      erro=>{
        this.messageService.add({severity: 'error', summary: 'Erro', detail: "Ocorreu algum tipo de erro com o servidor"});
      });
    }
  }
  onDialogHide(){
    this.tarefaAEditar=null
  }

  dataFormatadabd(data:Date){
    // console.log(data)
    var dia  = data.getDate().toString(),
        diaF = (dia.length == 1) ? '0'+dia : dia,
        mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
        mesF = (mes.length == 1) ? '0'+mes : mes,
        anoF = data.getFullYear(),
        hora  = (data.getHours()).toString(), //+1 pois no getMonth Janeiro começa com zero.
        horaF = (hora.length == 1) ? '0'+hora : hora,
        min  = (data.getMinutes()).toString(), //+1 pois no getMonth Janeiro começa com zero.
        minF = (min.length == 1) ? '0'+min : min;
    return anoF+"-"+mesF+"-"+diaF+" "+horaF+":"+minF+":00";
  }


  //Show ACL
  //==================================================================================
  aclVisible=false
  evMig=[]
  opMig
  abrirMigracoes(){
    this.aclVisible=true
  }
  aclEventosMigrados(){
    
    this.serv.UCS().subscribe(
      result=>{
        this.calendarioCarregado=false
        var arrDatas=[]
        for(var i =0;i<result.length;i++){
          if(arrDatas.indexOf(result[i].dataMigracao)==-1){
            this.eventos.push({
              id: 0,
              title:"Migração de Unidades ACL", 
              start: result[i].dataMigracao,
              end: result[i].dataMigracao,
              color: "#adadad",
              daysOfWeek: null
            });
            arrDatas.push(result[i].dataMigracao);
          }
        }
        // console.log(this.eventos)
        this.calendarioCarregado=true
      }
    );
  }
  showDialogMaximized(dialog){
    setTimeout(() => {
      dialog.maximize();
    }, 0);
  }
  
}
