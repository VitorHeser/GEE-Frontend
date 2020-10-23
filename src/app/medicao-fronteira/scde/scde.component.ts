import { Component, OnInit } from '@angular/core';
import { Unidade } from './unidade.model';
import { ScdeserviceService } from './scdeservice.service';
import { MessageService } from 'primeng/api';
import { CsvDataService } from '../../csv-data.service';
import * as jwt_decode from "jwt-decode";

@Component({
  selector: 'app-scde',
  templateUrl: './scde.component.html',
  styleUrls: ['./scde.component.css']
})
export class SCDEComponent implements OnInit {
  date1=null
  date2=null


  constructor(private messageService: MessageService,private serv: ScdeserviceService) { }

  getDecodedAccessToken(): any {
    try{
        return jwt_decode(sessionStorage.getItem('token'));
    }
        catch(Error){
        return null;
    }
  }
  ngOnInit() {
    this.Preencheunidades()
  }
  unidades=[]
  unidadesSelect
  Preencheunidades(){
    this.unidades = []
    var us = JSON.parse(this.getDecodedAccessToken().iss)
    var adm =false
    for(var i=0;i<us.perfis.length;i++){
      var obj = us.perfis[i]
      adm = obj.id==10 ? true : adm  
    }
    var nome = adm==true ? "Administrator" : us.login
    this.serv.Unidades(nome).subscribe(
      res=>{
        for(var i=0;i<res.length;i++){
          this.unidades.push({label: res[i].unidade, value: res[i].id})
        }
      }
    )
  }
  carregando = false
  Procurar(){
    var daydiff = (this.date2-this.date1)/ (60 * 60 * 24 * 1000)
    if(this.date1==null || this.date2==null){
      this.messageService.add({severity: 'warn', summary: 'Datas', detail: "Preencha as datas corretamente"});
    }else if(this.date1>this.date2){
      this.messageService.add({severity: 'warn', summary: 'Datas', detail: "A data de inicio não pode ser maior que a data final."});
    }else if(daydiff>10){
      this.messageService.add({severity: 'warn', summary: 'Datas', detail: "O extrato não pode ser maior do que 10 dias"});
    }else{
      this.carregando=true
      this.serv.ExtratoMedidores(
        this.dataAtualFormatada(this.date1),
        this.dataAtualFormatada(this.date2),
        this.unidadesSelect
      ).subscribe(
        resp=>{
          this.ArrayDeExtratos=resp
          this.carregando=false
        },
        errror=>{
          this.messageService.add({severity: 'warn', summary: 'Erro', detail: "Ocorreu algum erro."});
          this.carregando=false
        }
      )

    }

  }

  dataAtualFormatada(data:Date){
    var dia  = data.getDate().toString(),
        diaF = (dia.length == 1) ? '0'+dia : dia,
        mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
        mesF = (mes.length == 1) ? '0'+mes : mes,
        anoF = data.getFullYear();
    return anoF+"-"+mesF+"-"+diaF;
  }


  //=============================================================================
  ArrayDeExtratos

  extraircsv(){
    var arrcsv = []
    for(var i =0;i<this.ArrayDeExtratos.length;i++){
      var ativa = this.ArrayDeExtratos[i].ativa.toString();
      var reativa = this.ArrayDeExtratos[i].reativa.toString();
      arrcsv.push(
        {
          datahora: this.ArrayDeExtratos[i]['Timestamp'],
          origem: this.ArrayDeExtratos[i].origem,
          medidor: this.ArrayDeExtratos[i].medidor.medidor,
          unidade: this.ArrayDeExtratos[i].medidor.unidade,
          agente: this.ArrayDeExtratos[i].medidor.agente,
          ativa: ativa.replace(".",","),
        }
      )
    }

    CsvDataService.exportToCsv('Relatorio.csv',arrcsv)
  }
}
