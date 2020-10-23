import { Component, OnInit, Input } from '@angular/core';
import { ThrowStmt } from '@angular/compiler';
import { CsvDataService } from 'src/app/csv-data.service';

@Component({
  selector: 'app-analise02-rel19',
  templateUrl: './analise02-rel19.component.html',
  styleUrls: ['./analise02-rel19.component.css']
})
export class Analise02Rel19Component implements OnInit {

  @Input() data1
  @Input() data2
  @Input() Cols//Colunas Móveis
  @Input() dadosDoArray
  @Input() dadosDoArray2
  @Input() valor

  constructor() { }

  dadosDoArrayObj=[]//Array Importado e tratado para ser exibido
  ColsFrozen=[]//Colunas Fixas
  
  dadosAnalisados=[]
  dadosAnalisados2=[]
  dadosAnalisados3=[]
  dadosAnalisados4=[]

  qtdDesvioPadrao= 2

  ngOnInit() {
    this.aplicarDesvioPadrao()
  }


  aplicarDesvioPadrao(){
    this.ColsFrozen=[]
    this.condicionais=[]
    this.dadosAnalisados=[]
    this.dadosAnalisados2=[]
    this.dadosAnalisados3=[]
    this.ColsFrozen.push({field:"equipamento", header: "Local de Instalação", width:"200px"})


    for(var i =0;i<this.dadosDoArray.length;i++){
      var analalise2 = this.Analise2(this.dadosDoArray[i][this.valor],this.dadosDoArray[i].eixo, this.dadosDoArray[i].equipamento)
      if(analalise2.length>0){
        this.dadosAnalisados.push(this.dadosDoArray[i].equipamento)
        this.dadosAnalisados4.push(this.dadosDoArray[i])
      }
    }
    var dados = this.dadosAnalisados
    this.dadosAnalisados2 = this.dadosDoArray2.filter(function(e){
      return dados.indexOf(e.equipamento) >-1
    })
    this.dadosAnalisados3 = this.dadosDoArray2.filter(function(e){
      return dados.indexOf(e.equipamento) >-1
    })
  }


  condicionais =[]
  Analise2(indicador, eixo, tipoindicador){    
    var DesvioPadrao = this.DesvioPadrao(indicador)
    var Media = this.Media(indicador)

    var arrayDeDatas =[]
    var Desviomais = Media + (this.qtdDesvioPadrao *DesvioPadrao);
    var Desviomenos = Media - (this.qtdDesvioPadrao *DesvioPadrao);
    var Desviomenos = Desviomenos < 0 ? 0 : Desviomenos

    var check = false

    for(var i =0;i<indicador.length;i++){
      var indic = indicador[i]

      if(indic !=0){
        if(indic>Desviomais || indic<Desviomenos){
          arrayDeDatas.push(eixo[i])
          check = true
        }
      }
    }
    if(check){
      this.condicionais.push({ unidade: tipoindicador, desvioMaior: Desviomais, desvioMenor: Desviomenos, desvioPadrao: DesvioPadrao})
    }

    return arrayDeDatas
  }


  DesvioPadrao(lista0){
    var lista = lista0.filter(function(e){return e>0});
    let media = lista.reduce((total, valor) => total+valor/lista.length, 0);
    let variancia = lista.reduce((total, valor) => total + Math.pow(media - valor, 2)/lista.length, 0);
    let desvioPadrao = Math.sqrt(variancia);
    return desvioPadrao
  }
  Media(lista0){
    var lista = lista0.filter(function(e){return e>0});
    let media = lista.reduce((total, valor) => total+valor/lista.length, 0);
    return media
  }
  extraircsv(){
    var array = []
    for(var i =0;i<this.dadosAnalisados2.length;i++){
      var desvioPadrao = this.condicionais[i].desvioPadrao
      var o = this.dadosAnalisados2[i]
      var p = this.dadosAnalisados4[i]

      var Stringobj = `{
        "Indicador": "${this.valor }",
        "Local": "${o.equipamento}",
        "Tipo": "${ o.tipo }",
        "Classe_Tarifaria": "${o.classeTarifaria }",
        "Desvio_Padrao": "${ desvioPadrao.toLocaleString(undefined, {minimumFractionDigits: 2,maximumFractionDigits: 2})}",
        "UC": "${o.uc }"`
      for(var j=0;j<p.eixo.length;j++){
        Stringobj= Stringobj+`,"${p.eixo[j]}": "${p[this.valor][j].toLocaleString(undefined, {minimumFractionDigits: 2,maximumFractionDigits: 2})}" `
      }
      Stringobj= Stringobj+`}`

      //CONVERTENDO A STRING CRIADA EM JSON
      var objetojson = JSON.parse(Stringobj)
      array.push(objetojson)
    }
    CsvDataService.exportToCsv('Relatorio.csv',array)
  }
}

