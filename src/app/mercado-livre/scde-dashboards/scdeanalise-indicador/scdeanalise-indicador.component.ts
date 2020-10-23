import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-scdeanalise-indicador',
  templateUrl: './scdeanalise-indicador.component.html',
  styleUrls: ['./scdeanalise-indicador.component.css']
})
export class SCDEAnaliseIndicadorComponent implements OnInit {

  constructor() { }

  @Input() UnidadeConsumidora
  @Input() datan
  @Input() data
  @Input() tipo
  @Input() PrecoMedio
  carregando

  
  ngOnInit() {
    console.log(this.UnidadeConsumidora)
    this.UnidadeConsumidora.preco = this.UnidadeConsumidora.preco==null ? this.PrecoMedio : this.UnidadeConsumidora.preco
    this.carregando = false
  }

  Ano(data:Date,i){
    var mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
        mesF = (mes.length == 1) ? '0'+mes : mes,
        anoF = data.getFullYear();
    return anoF-i;
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
