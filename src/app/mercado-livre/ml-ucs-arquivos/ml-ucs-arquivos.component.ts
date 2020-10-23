import { Component, OnInit, Input } from '@angular/core';
import { MlUcsArquivosServiceService } from './ml-ucs-arquivos-service.service';
import {API_CONFIG} from '../../app.api'
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-ml-ucs-arquivos',
  templateUrl: './ml-ucs-arquivos.component.html',
  styleUrls: ['./ml-ucs-arquivos.component.css']
})
export class MlUcsArquivosComponent implements OnInit {

  @Input() Unidade
  @Input() Referencia
  
  cols = [
    { field: 'id',             header: 'Identificador' },
    { field: 'NomeArquivo',    header: 'Nome do Arquivo' },
    { field: 'classificacao',        header: 'Classificação' },
    { field: 'MesReferencia',  header: 'Referência'}
  ];
  cols2 = [
    { field: 'id',             header: 'Identificador' },
    { field: 'nf',             header: 'Nota Fiscal' },
    { field: 'parte',          header: 'Parte' },
    { field: 'estado',         header: 'Estado'}
  ];
  Opcoes = [
    { value: 'Fornecimento',    label: 'Fornecimento' },
    { value: 'DEVEC',    label: 'DEVEC' },
  ];
  constructor(private messageService: MessageService, private serv:MlUcsArquivosServiceService) { }

  FaturasSemFiltro
  Faturas

  FaturasDistribuicao
  

  ngOnInit() {
    this.PreencherDatas()
    this.Referencia = this.Referencia==null ? this.menMonth(new Date(),0) : this.menMonth(this.Referencia,0)
    this.Referencia.setDate(1)
    this.dataSelect = this.Referencia
    this.CarregarFaturas()
  }
  CarregarFaturas(){
    console.log(this.Unidade)
    this.serv.BuscarFaturasDistribuicao(this.Unidade.numeroUc,this.dataFormat2(this.dataSelect)).subscribe(
      resp=>{
        this.FaturasDistribuicao=resp
      }
    )
  }



  datasDisponiveis=[]
  dataSelect
  PreencherDatas(){
    this.datasDisponiveis=[]
    this.datasDisponiveis.push({ value: this.menMonth(new Date(),0), label: this.dataFormat(new Date()) })
    this.datasDisponiveis.push({ value: this.menMonth(new Date(),1), label: this.dataFormat(this.menMonth(new Date(),1)) })
    this.datasDisponiveis.push({ value: this.menMonth(new Date(),2), label: this.dataFormat(this.menMonth(new Date(),2)) })
    this.datasDisponiveis.push({ value: this.menMonth(new Date(),3), label: this.dataFormat(this.menMonth(new Date(),3)) })
    this.datasDisponiveis.push({ value: this.menMonth(new Date(),4), label: this.dataFormat(this.menMonth(new Date(),4)) })
    this.datasDisponiveis.push({ value: this.menMonth(new Date(),5), label: this.dataFormat(this.menMonth(new Date(),5)) })
    this.datasDisponiveis.push({ value: this.menMonth(new Date(),6), label: this.dataFormat(this.menMonth(new Date(),6)) })
    this.datasDisponiveis.push({ value: this.menMonth(new Date(),7), label: this.dataFormat(this.menMonth(new Date(),7)) })
    this.datasDisponiveis.push({ value: this.menMonth(new Date(),8), label: this.dataFormat(this.menMonth(new Date(),8)) })
    this.datasDisponiveis.push({ value: this.menMonth(new Date(),9), label: this.dataFormat(this.menMonth(new Date(),9)) })
    this.datasDisponiveis.push({ value: this.menMonth(new Date(),10), label: this.dataFormat(this.menMonth(new Date(),10)) })
    this.datasDisponiveis.push({ value: this.menMonth(new Date(),11), label: this.dataFormat(this.menMonth(new Date(),11)) })
    
  }
  TrocarData(){
    this.Referencia = this.dataSelect
    console.log(this.Referencia)
    this.CarregarFaturas()
  }

  AbrirFaturaDeDistribuicao(fatura){
    console.log("Abrindo "+fatura)
    this.serv.BuscarFaturaVridis(fatura).subscribe(
      resp=>{
        console.log(resp[0])
        var id = resp[0].invoiceDocumentGrid[0].id
        var token = resp[1].token
        this.serv.AbrirPDFViridis("https://aegea.viridis.energy/viridis-rest/api/tx/attachments/file/"+id+"?access_token="+token)
      }
    )
  }

  dataAtualFormatada(data:Date){
    var dia  = data.getDate().toString(),
        diaF = (dia.length == 1) ? '0'+dia : dia,
        mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
        mesF = (mes.length == 1) ? '0'+mes : mes,
        anoF = data.getFullYear();
    return anoF+"-"+mesF+"-"+diaF;
  }

  menMonth(month: Date,i){
    month.setMonth(month.getMonth()-i)
    month.setDate(1)
    month.setHours(1)
    month.setMinutes(1)
    month.setSeconds(1)
    month.setMilliseconds(1)
    return month
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
    return mesF+"-"+anoF;
  }

}
