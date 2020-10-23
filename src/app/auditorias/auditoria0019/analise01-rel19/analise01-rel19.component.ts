import { Component, OnInit, Input } from '@angular/core';
import { CsvDataService } from 'src/app/csv-data.service';

@Component({
  selector: 'app-analise01-rel19',
  templateUrl: './analise01-rel19.component.html',
  styleUrls: ['./analise01-rel19.component.css']
})
export class Analise01Rel19Component implements OnInit {
   
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
  dadosAnalisados4=[]


  ngOnInit() {
    this.ColsFrozen=[]
    this.dadosAnalisados=[]
    this.dadosAnalisados2=[]

    this.ColsFrozen.push({field:"equipamento", header: "Local de Instalação", width:"200px"})
    for(var i =0;i<this.dadosDoArray.length;i++){
      if(this.Analise1(this.dadosDoArray[i][this.valor],this.dadosDoArray[i].eixo).length>0){
        this.dadosAnalisados.push(this.dadosDoArray[i].equipamento)
        this.dadosAnalisados4.push(this.dadosDoArray[i])
      }
    }
    console.log(this.dadosDoArray)
    var dados = this.dadosAnalisados
    this.dadosAnalisados2 = this.dadosDoArray2.filter(function(e){
      return dados.indexOf(e.equipamento) >-1
    })
    console.log(this.dadosDoArray2)
  }
  Analise1(indicador, eixo){
    //verificar se o volume teve falta de preenchimento no meio 
    var check =false
    var arrayDeDatas =[]
    for(var i =0;i<indicador.length;i++){
      var indic = indicador[i]
      if(indic > 0 && check ==false){
        check = true
      }
      if(check == true && indic==0){
        arrayDeDatas.push(eixo[i])
      }
    }
    return arrayDeDatas
  }
  extraircsv(){
    var array = []
    for(var i =0;i<this.dadosAnalisados2.length;i++){
      var o = this.dadosAnalisados2[i]
      var p = this.dadosAnalisados4[i]

      var Stringobj = `{
        "Indicador": "${this.valor }",
        "Local": "${o.equipamento}",
        "Tipo": "${ o.tipo }",
        "Classe_Tarifaria": "${o.classeTarifaria }",
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

