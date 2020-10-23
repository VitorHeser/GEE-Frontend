import { Component, OnInit } from '@angular/core';
import { AuditoriasService } from './auditorias.service';
import { CarService } from '../demo/service/carservice';

@Component({
  selector: 'app-auditorias',
  templateUrl: './auditorias.component.html',
  styleUrls: ['./auditorias.component.css']
})
export class AuditoriasComponent implements OnInit {

  constructor(private servic:AuditoriasService) { }
  carregadoTotal1= false
  carregadoTotal2= false
  carregadoTotal3= false
  carregadoTotal4= false
  carregadoTotal5= false
  carregadoTotal6= false

  arraySap
  arrayViridis
  date1 = new Date();
  dataFormatada

  Opcoes: any[];
  showopt= false
  carregarOpcoes(string){
    this.showopt=false
    this.servic.auditorias(string).subscribe(
      resp=>{
        this.Opcoes=[
          {nome:"Auditoria 01", num:1, qtd:resp[0], descricao:"Status Viridis = Publicado, Status Sap: Nulo e Referência >= "+this.dataFormatada},
          {nome:"Auditoria 02", num:2, qtd:resp[1], descricao:"Status Viridis = Publicado e Estado Externo Nulo"},
          {nome:"Auditoria 03", num:3, qtd:resp[2], descricao:"Status Viridis = Completo e Mês referência <= "+this.dataFormatada},
          {nome:"Auditoria 04", num:4, qtd:resp[3], descricao:"Status Sap != Pagamento Efetuado & Data de vencimento >= "+this.dataFormatada},
          {nome:"Auditoria 05", num:5, qtd:resp[4], descricao:"Status Viridis != Finalizado e total = 0"},
          {nome:"Auditoria 06", num:6, qtd:resp[5], descricao:"Faturas Corrigidas na pasta"}
        ]
        this.showopt=true
      }

    );
  }

  ngOnInit() {
  }
  Relatorio
  
  carregar(val){
    this.Relatorio=val
    this.carregadoTotal1= false
    this.carregadoTotal2= false
    this.carregadoTotal3= false
    this.carregadoTotal4= false
    this.carregadoTotal5= false
    this.carregadoTotal6= false

    this.dataFormatada=this.dataAtualFormatada(this.date1)
    this.carregarOpcoes(this.dataFormatada)
    setTimeout(() => {  
        if(val!=null){
        switch(val.num){
          case 1:
            this.carregadoTotal1=true 
            break;
          case 2:
            this.carregadoTotal2=true 
            break;
          case 3:
            this.carregadoTotal3=true 
            break;
          case 4:
            this.carregadoTotal4=true 
            break;
          case 5:
            this.carregadoTotal5=true 
            break;
          case 6:
            this.carregadoTotal6=true 
            break;
        }
      }
    }, 100);
  }

  dataAtualFormatada(data:Date){
    var dia  = data.getDate().toString(),
        diaF = (dia.length == 1) ? '0'+dia : dia,
        mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
        mesF = (mes.length == 1) ? '0'+mes : mes,
        anoF = data.getFullYear(),
        hora  = (data.getHours()).toString(), //+1 pois no getMonth Janeiro começa com zero.
        horaF = (hora.length == 1) ? '0'+hora : hora,
        min  = (data.getMinutes()).toString(), //+1 pois no getMonth Janeiro começa com zero.
        minF = (min.length == 1) ? '0'+min : min;
    return anoF+"-"+mesF+"-01";
  }
  showDialogMaximized(dialog){
    setTimeout(() => {
      dialog.maximize();
    }, 0);
  }
}
