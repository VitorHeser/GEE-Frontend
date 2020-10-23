import { Component, OnInit } from '@angular/core';
import * as jwt_decode from "jwt-decode";
import { MessageService } from 'primeng/api';
import { ScdeserviceService } from 'src/app/medicao-fronteira/scde/scdeservice.service';


@Component({
  selector: 'app-scde-dashboards',
  templateUrl: './scde-dashboards.component.html',
  styleUrls: ['./scde-dashboards.component.css']
})
export class ScdeDashboardsComponent implements OnInit {
  
  constructor(private messageService: MessageService,private serv: ScdeserviceService) {
    document.body.style.background  = '#ebebeb8f';
  }

  unidades=[]
  unidadesSelect

  data =new Date();

  datasDisponiveis=[]
  dataSelect
  PreencherDatas(){
    this.datasDisponiveis.push({ value: new Date(), label: this.dataFormat(new Date()) })
    this.datasDisponiveis.push({ value: this.menMonth(new Date(),0), label: this.dataFormat0(this.menMonth(new Date(),0)) })
    this.datasDisponiveis.push({ value: this.menMonth(new Date(),1), label: this.dataFormat0(this.menMonth(new Date(),1)) })
    this.datasDisponiveis.push({ value: this.menMonth(new Date(),2), label: this.dataFormat0(this.menMonth(new Date(),2)) })
    this.datasDisponiveis.push({ value: this.menMonth(new Date(),3), label: this.dataFormat0(this.menMonth(new Date(),3)) })
    this.datasDisponiveis.push({ value: this.menMonth(new Date(),4), label: this.dataFormat0(this.menMonth(new Date(),4)) })
    this.datasDisponiveis.push({ value: this.menMonth(new Date(),5), label: this.dataFormat0(this.menMonth(new Date(),5)) })
    this.datasDisponiveis.push({ value: this.menMonth(new Date(),6), label: this.dataFormat0(this.menMonth(new Date(),6)) })
    this.datasDisponiveis.push({ value: this.menMonth(new Date(),7), label: this.dataFormat0(this.menMonth(new Date(),7)) })
    this.datasDisponiveis.push({ value: this.menMonth(new Date(),8), label: this.dataFormat0(this.menMonth(new Date(),8)) })
    this.datasDisponiveis.push({ value: this.menMonth(new Date(),9), label: this.dataFormat0(this.menMonth(new Date(),9)) })
    this.datasDisponiveis.push({ value: this.menMonth(new Date(),10), label: this.dataFormat(this.menMonth(new Date(),10)) })
  }
  TrocarData(){
    this.data = this.dataSelect
    this.carregarDadosDoDash()
  }
  menMonth(month,i){
    month.setMonth(month.getMonth()-i)
    month.setDate(0)
    return month
  }
  getDecodedAccessToken(): any {
    try{
        return jwt_decode(sessionStorage.getItem('token'));
    }
        catch(Error){
        return null;
    }
  }
  ngOnInit() {
    this.PreencherDatas()
    this.unidadesSelect=[]
    var us = JSON.parse(this.getDecodedAccessToken().iss)
    var adm =false
    for(var i=0;i<us.perfis.length;i++){
      var obj = us.perfis[i]
      adm = obj.id==10 ? true : adm  
    }
    var nome = adm==true ? "Administrator" : us.login
    this.data =this.dataMin();
    this.serv.AgentesUsuarios(nome).subscribe(
      res=>{
        for(var i =0;i<res.length;i++){
          this.unidades.push({value: res[i],label: res[i]})
        }
        this.unidadesSelect.push(this.unidades[0].value)
        this.carregarDadosDoDash()
      },
      error=>{
        this.messageService.add({severity: 'error', summary: 'Erro ao carregar', detail: "Saia e tente novamente"});
      }
    )
  }


  pdialogGraph = false
  carregando = true
  Medidores
  MedidoresSemZeros
  consumoTotal
  consumoTotalAnterior
  consumoAcAnoAtual
  consumoAcAnoAnterior
  consumo12MesAtual
  consumo12MesAnterior

  PrecoMedio

  custoTotal
  custoTotalAnterior
  custoAcAnoAtual
  custoAcAnoAnterior
  custo12MesAtual
  custo12MesAnterior

  carregarDadosDoDash(){
    this.carregando = true
    this.unidadesSelect
    this.consumoTotal=0


    // console.log(this.unidadesSelect)
    this.serv.ListaFechamentos(this.unidadesSelect,this.dataFormatFim(this.data)).subscribe(
      resp=>{
        this.consumoTotal=0
        this.consumoTotalAnterior=0
        this.consumoAcAnoAtual=0
        this.consumoAcAnoAnterior=0
        this.consumo12MesAtual=0
        this.consumo12MesAnterior=0
        this.custoTotal=0
        this.custoTotalAnterior=0
        this.custoAcAnoAtual=0
        this.custoAcAnoAnterior=0
        this.custo12MesAtual=0
        this.custo12MesAnterior=0

        resp=resp.sort(function(a,b){if (a.consumoAtual > b.consumoAtual) { return -1; }if (a.consumoAtual < b.consumoAtual) { return 1; }return 0;});
        
        var PrecoTotal = 0
        var PrecoCount = 0
        for(var i =0;i<resp.length;i++){
          this.consumoTotal=this.consumoTotal+resp[i].consumoAtual
          this.consumoTotalAnterior=this.consumoTotalAnterior+resp[i].consumoAnterior
          this.consumoAcAnoAtual=this.consumoAcAnoAtual+resp[i].anoAtual
          this.consumoAcAnoAnterior=this.consumoAcAnoAnterior+resp[i].anoAnterior
          this.consumo12MesAtual=this.consumo12MesAtual+resp[i].ultimosMesesAtual
          this.consumo12MesAnterior=this.consumo12MesAnterior+resp[i].ultimosMesesAnterior
          PrecoTotal = PrecoTotal+(resp[i].preco!=null ? resp[i].preco : 0)
          PrecoCount = PrecoCount+(resp[i].preco!=null ? 1 : 0)
        }
        var PrecoMedio = PrecoTotal/PrecoCount
        this.PrecoMedio = PrecoMedio

        for(var i =0;i<resp.length;i++){
          resp[i].preco = resp[i].preco!=0 ? resp[i].preco : PrecoMedio;
          var preco = resp[i].preco!=0 ? resp[i].preco : PrecoMedio;
          this.custoTotal=  this.custoTotal+                (resp[i].consumoAtual*preco)
          this.custoTotalAnterior=this.custoTotalAnterior+  (resp[i].consumoAnterior*preco)
          this.custoAcAnoAtual=this.custoAcAnoAtual+        (resp[i].anoAtual*preco)
          this.custoAcAnoAnterior=this.custoAcAnoAnterior+  (resp[i].anoAnterior*preco)
          this.custo12MesAtual=this.custo12MesAtual+        (resp[i].ultimosMesesAtual*preco)
          this.custo12MesAnterior=this.custo12MesAnterior+  (resp[i].ultimosMesesAnterior*preco)
        }
        this.Medidores=resp
        this.MedidoresSemZeros = resp.filter(function(e){return e.consumoAtual>0})
        

        this.carregando = false
      }
    )
  }

  UnidadeSelecionada
  openGraph(dado){
    this.UnidadeSelecionada = dado
    // console.log(dado)
    this.pdialogGraph=true
  }

  

  valorFormatado(valor){
    valor = valor.toLocaleString(undefined, {minimumFractionDigits: 2,maximumFractionDigits: 2})
    return valor
  }
  previsao(valor){
    var dia = this.dataMin().getDate()
    valor = (valor/dia)*this.numDias();
    return valor
  }
  previsaoFormatada(valor){
    var dia = this.dataMin().getDate()
    valor = (valor/dia)*this.numDias();
    valor = valor.toLocaleString(undefined, {minimumFractionDigits: 2,maximumFractionDigits: 2})
    return valor
  }
  
  dataFormat0(data:Date){
    var dia  = data.getDate().toString(),
        diaF = (dia.length == 1) ? '0'+dia : dia,
        mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
        mesF = (mes.length == 1) ? '0'+mes : mes,
        anoF = data.getFullYear();
    // return diaF + "/"+mesF+"/"+anoF;
    return mesF+"/"+anoF;
  }
  dataFormat(data:Date){
    var mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
        mesF = (mes.length == 1) ? '0'+mes : mes,
        anoF = data.getFullYear();
    return mesF+"/"+anoF;
  }
  dataFormat2(data:Date){
    var mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
        mesF = (mes.length == 1) ? '0'+mes : mes,
        anoF = data.getFullYear();
    return mesF+"/"+(anoF-1);
  }
  Ano(data:Date,i){
    var mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
        mesF = (mes.length == 1) ? '0'+mes : mes,
        anoF = data.getFullYear();
    return anoF-i;
  }


  fulldataFormat(data:Date){
    var dia  = data.getDate().toString(),
        diaF = (dia.length == 1) ? '0'+dia : dia,
        mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
        mesF = (mes.length == 1) ? '0'+mes : mes,
        anoF = data.getFullYear();
    return anoF+"-"+ mesF+"-"+diaF;
  }
  dataMin(){
    var data = new Date();
    data.setDate(data.getDate() - 1);
    return data;
  }
  numDias(){
    var objData = new Date(),
        numAno = objData.getFullYear(),
        numMes = objData.getMonth()+1,
        numDias = new Date(numAno, numMes, 0).getDate();
    return numDias*1;
  }
  diaFormat(data:Date){
    var dia  = data.getDate().toString(),
        diaF = (dia.length == 1) ? '0'+dia : dia;
    return diaF;
  }

  dataFormatFim(data:Date){
    var  dia  = data.getDate().toString(),
        diaF = (dia.length == 1) ? '0'+dia : dia,
        mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
        mesF = (mes.length == 1) ? '0'+mes : mes,
        anoF = data.getFullYear();
    return anoF+"-"+mesF+"-"+diaF;
  }
  showDialogMaximized(dialog){
    setTimeout(() => {
      dialog.maximize();
    }, 0);
  }
}
