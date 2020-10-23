import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-auditoria004v-view1',
  templateUrl: './auditoria004v-view1.component.html',
  styleUrls: ['./auditoria004v-view1.component.css']
})
export class Auditoria004vView1Component implements OnInit {

  @Input() iform;
  @Input() tipo;
  @Input() eixo;
  constructor() { }
  ngOnInit() {
    // console.log(this.iform)
    this.tipos(this.iform)
    this.addcolumns(this.eixo)
  }

  columns
  columns2
  columns3
  addcolumns(dados){
    this.columns=[]
    this.columns2=[]

    this.columns.push({ field: 'tipoindic', header: ''})
    this.columns.push({ field: 'indic', header: '' })
    this.columns2.push({ field: 'tipoindic', header: '' })
    this.columns2.push({ field: 'indic', header: '' })
    for(var i =0;i<dados.length;i++){
      this.columns.push({ field: dados[i], header: dados[i] })
      this.columns2.push({ field: dados[i], header: dados[i] })
    }
  }

  dados1
  dados2
  tipoStr

  tipos(dados){
    var arr = dados['json']
    switch(this.tipo){
      case 1:
        this.tipoStr = "Consumo Agua"
        this.dados1 =  arr.filter(function(e){return e.tipoindic =="Consumo Agua" && e.indic =="Total Água"})
        this.dados2 = arr.filter(function(e){return e.tipoindic =="Consumo Agua" && e.indic !="Total Água"})
        break;

      case 2:
        this.tipoStr = "Consumo Esgoto"
        this.dados1 =  arr.filter(function(e){return e.tipoindic =="Consumo Esgoto" && e.indic =="Total Esgoto"})
        this.dados2 = arr.filter(function(e){return e.tipoindic =="Consumo Esgoto" && e.indic !="Total Esgoto"})
        break;

      case 3:
        this.tipoStr = "Consumo Outros"
        this.dados1 =  arr.filter(function(e){return e.tipoindic =="Consumo Outros" && e.indic =="Total Outros"})
        this.dados2 = arr.filter(function(e){return e.tipoindic =="Consumo Outros" && e.indic !="Total Outros"})
        break;
        
      case 4:
        this.tipoStr = "Previsao"
        this.dados1 =  arr.filter(function(e){return e.tipoindic =="Total Global de Previsão" && e.indic =="Total Global de Previsão"})
        this.dados2 = arr.filter(function(e){return e.tipoindic.includes("Previsao ")})
        break;

      case 5:
        this.tipoStr = "Consumo Outros"
        this.dados1 =  arr.filter(function(e){return e.tipoindic =="Total Global de Previsão" && e.indic =="Faturas consolidadas"})
        this.dados2 = arr.filter(function(e){return e.tipoindic =="Total Global de Previsão" && e.indic !="Faturas consolidadas"})
        break;
    }
  }
}
