import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { MercadolivreserviceService } from '../mercadolivreservice.service';
import { ScdeserviceService } from 'src/app/medicao-fronteira/scde/scdeservice.service';
import * as jwt_decode from "jwt-decode";

@Component({
  selector: 'app-ml-ucs',
  templateUrl: './ml-ucs.component.html',
  styleUrls: ['./ml-ucs.component.css']
})
export class MLUCsComponent implements OnInit {


  displayDialog: boolean;

  unidade: any;
  unidadeDeNegocio

  MedidoresSCDE:any[]

  selectedunidade: any;

  newunidade: boolean;

  unidades: any[];
  Submercados: any[];

  cols: any[];

  idshow: boolean = true;

  constructor(private messageService: MessageService, private serv: MercadolivreserviceService, private servSCDE: ScdeserviceService) { }


  getDecodedAccessToken(): any {
    try{
        return jwt_decode(sessionStorage.getItem('token'));
    }
        catch(Error){
        return null;
    }
  }
  ngOnInit() {
    
    var us = JSON.parse(this.getDecodedAccessToken().iss)
    var adm =false
    for(var i=0;i<us.perfis.length;i++){
      var obj = us.perfis[i]
      adm = obj.id==10 ? true : adm  
    }
    var nome = adm==true ? "Administrator" : us.nome
    this.servSCDE.Unidades(nome).subscribe(
      result=>{
        this.MedidoresSCDE = result
      }
    );
    this.serv.Submercados().subscribe(
      result=>{
        this.Submercados = result
      }
    );
    this.serv.UNS().subscribe(
      result=>{
        this.unidadeDeNegocio = result
      }
    );
      this.serv.UCS().subscribe(
        result=>{
          this.unidades = result
        }
      );

      this.cols = [
        { field: 'nomeUc',          header: 'Nome da UC' },
        { field: 'numeroUc', header: 'Numero da UC'},
        { field: 'mwm',    header: 'MWm'   },
        { field: 'DataMigracao',    header: 'Data da Migração'   },
        { field: 'statusMigracao',            header: 'Status da Migração'}
      ];
  }

  showDialogToAdd() {
      this.idshow = false
      this.newunidade = true;
      this.selectedunidade = this.Unidadenull()
      this.displayDialog = true;
  }

  save() {
    this.selectedunidade = this.UnidaConvert(this.selectedunidade)
    this.serv.UCSUpdateNew(this.selectedunidade).subscribe(
      result=>{
        this.messageService.add({severity: 'success', summary: 'Sucesso', detail: "Unidade Adicionada/Alterada"});
      },
      error=>{
        this.messageService.add({severity: 'error', summary: 'Erro', detail: "Erro ao deletar"});
      }
    )
    this.unidade = this.Unidadenull();
    this.displayDialog = false;
  }

  delete() {
      this.serv.UCSDelete(this.selectedunidade).subscribe(
        result=>{
          this.messageService.add({severity: 'success', summary: 'Sucesso', detail: "Unidade Deletada"});
        },
        error=>{
          this.messageService.add({severity: 'error', summary: 'Erro', detail: "Erro ao deletar"});
        }
      )
      this.unidade = this.Unidadenull();
      this.displayDialog = false;
  }

  onRowSelect(event) {
      this.newunidade = false;
      this.unidade = this.cloneunidade(event.data);
      this.displayDialog = true;
  }

  cloneunidade(c: any): any {
      let unid=c;
      return unid;
  }

  Unidadenull(): any {
    var unid:any =
    {
      id: 0,
      statusMigracao: null,
      nomeUc: null,
      unidadeNegocio: null,
      regional: null,
      DataMigracao: null,
      numeroUc: null,
      mwm: 0,
      submercad: this.Submercados[0],
    }
    return unid;
  }

  UnidaConvert(und): any {
    var unid:any =
    {
      id: und.id,
      statusMigracao: und.statusMigracao,
      nomeUc: und.nomeUc,
      unidadeNegocio: und.unidadeNegocio,
      regional: und.regional,
      DataMigracao: und.DataMigracao,
      numeroUc: und.numeroUc,
      submercad: und.submercad,
      mwm: und.mwm,
    }
    return unid;
  }


  //============================================================================================
  convert(dat){
    return dat.substring(6,10)+"-"+dat.substring(3,5)+"-"+dat.substring(0,2)+"T00:00:00"
  }
  displaySazonal = false
  Periodos=[]
  ArrObjPeriodos=[]

  savePeriodos(){

  }

  abrirDisplaySazon(){
    this.Periodos=[]
    this.ArrObjPeriodos=[]
    this.serv.periodos(this.selectedunidade.id).subscribe(
      res=>{
        this.ArrObjPeriodos=res
        for(var i=0;i<res.length;i++){
          this.Periodos[res[i].periodo-1] = res[i].consumo
        }
        console.log(this.Periodos)
        this.displaySazonal=true
      }
    )
  }
  media(arr){
    var total = 0
    for(var i =0;i<arr.length;i++){
      total += arr[i]
    }
    return total/arr.length
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
    return anoF+"-"+mesF+"-"+diaF;
  }


  //============================================================
  AbrirPArquivos = false
  AbrirPArquivoss(){
    this.AbrirPArquivos=true
  }
  showDialogMaximized(dialog){
    setTimeout(() => {
      dialog.maximize();
    }, 0);
  }
}
