import { Component, OnInit,Input } from '@angular/core';
import Chart from 'chart.js';
import { GraficosDash1Service } from '../../../painel-gerencial/graficos-dash1.service';
// import { Console } from 'console';

@Component({
  selector: 'app-resumo-cognos-principal',
  templateUrl: './resumo-cognos-principal.component.html',
  styleUrls: ['./resumo-cognos-principal.component.css']
})
export class ResumoCognosPrincipalComponent implements OnInit {



  dataDistribConsEnerg:any;

  relatorio=false
  relatoriototalconsumocusto=[]
  relatoriounidadesconsumocusto=[]
  
  abrirRelatorio(){
    this.relatorio=true
  }


  recarregar = false
  recarregar2 = false

  options
  options2

  @Input() date1;
  @Input() date2;
  @Input() optionSelected;

  constructor(private servic:GraficosDash1Service) { 
  }

  //=============================================================================
  Meses
  Dias
  
  
  //=============================================================================
  //LABEL POR UNIDADES
  dataConsumoEERegiona:any;
  dataCustoEERegiona:any;

  LabelR1R2R3:any[]=['R1','R2','R3']
  LabelComplete:any[]=['Regional R1','Regional R2','Regional R3']
  ConsumoR1R2R3:any[] = [0.0, 0.0, 0.0]
  CustoR1R2R3:any[] = [0.0, 0.0, 0.0]
  


  //=============================================================================
  //LABEL POR TIPO
  dataConsumoEEAgEsgOu:any;
  dataCustoEEAgEsgOu:any;

  LabelAgEsOu:any[]=['Água','Esgoto','Outros']
  ConsumoAgEsOu:any[] = [0.0, 0.0, 0.0]
  CustoAgEsOu:any[] = [0.0, 0.0, 0.0]
  

  //=============================================================================
  //TOTAL
  TotalCusto = 0.0
  TotalConsumo = 0.0
  
  //=============================================================================
  //LABEL POR EMPRESAS
  

  dataConsumoCustoEmpresas:any
  
  //=============================================================================

  ngOnInit() {
    console.log(this.date1)
      this.carregarRegionais();
  }
  
  carregarRegionais(){
    this.recarregar = false
    var dataincio = this.dataAtualFormatada(this.date1)
    var datafim  = this.dataAtualFormatada(this.date2)

    this.Meses = (this.date2.getFullYear() - this.date1.getFullYear())*12 + (this.date2.getMonth() - this.date1.getMonth())+1;
    var ultimoDiaDate2:any = new Date( this.date2.getFullYear(),  this.date2.getMonth() + 1, 0);
    this.Dias = Math.abs(ultimoDiaDate2.getTime() - this.date1.getTime())
    this.Dias = Math.ceil(this.Dias/ (1000 * 60 * 60 * 24))
    // console.log(this.Dias
    //   +" - "+this.dataAtualFormatada(ultimoDiaDate2)
    // +" - "+this.dataAtualFormatada(this.date1))




    this.TotalCusto=0.0
    this.TotalConsumo=0.0
    this.ConsumoAgEsOu= [0.0, 0.0, 0.0]
    this.CustoAgEsOu= [0.0, 0.0, 0.0]
    this.ConsumoR1R2R3= [0.0, 0.0, 0.0]
    this.CustoR1R2R3= [0.0, 0.0, 0.0]
    this.servic.importarRegionaisEGraph(dataincio,datafim).subscribe(
      result=>{
        for(var i =0;i<result.length;i++){
          var regionalArr = result[i]

          for(var j =0;j<regionalArr.length;j++){
            var IndicArr=regionalArr[j]

            var consumo = this.somarArray(IndicArr['consumoEnergia'])
            var custo = this.somarArray(IndicArr['custoEnergia'])

            this.ConsumoR1R2R3[i] = this.ConsumoR1R2R3[i] + consumo
            this.CustoR1R2R3[i] = this.CustoR1R2R3[i] + custo

            this.ConsumoAgEsOu[j] = this.ConsumoAgEsOu[j] + consumo
            this.CustoAgEsOu[j] = this.CustoAgEsOu[j] + custo
            
            this.TotalConsumo = this.TotalConsumo + consumo
            this.TotalCusto = this.TotalCusto + custo
          }
        }
        this.montarGraficos()
        this.montarGraficosConsumoCusto();
      }
    );
    
  }

  montarGraficos(){
    this.recarregar = false


    var consumoUnid = [
      this.ConsumoR1R2R3[0]/this.TotalConsumo,
      this.ConsumoR1R2R3[1]/this.TotalConsumo,
      this.ConsumoR1R2R3[2]/this.TotalConsumo,
    ]
    var consumoAgEsgout = [
      this.ConsumoAgEsOu[0]/this.TotalConsumo,
      this.ConsumoAgEsOu[1]/this.TotalConsumo,
      this.ConsumoAgEsOu[2]/this.TotalConsumo,
    ]
    var custoUnid = [
      this.CustoR1R2R3[0]/this.TotalCusto,
      this.CustoR1R2R3[1]/this.TotalCusto,
      this.CustoR1R2R3[2]/this.TotalCusto,
    ]
    var custoAgEsgout = [
      this.CustoAgEsOu[0]/this.TotalCusto,
      this.CustoAgEsOu[1]/this.TotalCusto,
      this.CustoAgEsOu[2]/this.TotalCusto,
    ]

    this.dataConsumoEERegiona = {
      labels: this.LabelR1R2R3,
      datasets: [
          {
              data: consumoUnid,
              backgroundColor: ["#6A5ACD", "#483D8B", "#191970"],
              hoverBackgroundColor: ["#6A5ACD", "#483D8B", "#191970"]
          }]    
      };
    this.dataConsumoEEAgEsgOu = {
      labels: this.LabelAgEsOu,
      datasets: [
          {
              data: consumoAgEsgout,
              backgroundColor: ["#6A5ACD","#8b4513","#808080"],
              hoverBackgroundColor: ["#6A5ACD","#8b4513","#808080"]
          }]    
      };


    this.dataCustoEERegiona = {
      labels: this.LabelR1R2R3,
      datasets: [
          {
              data: custoUnid,
              backgroundColor: ["#6A5ACD","#483D8B","#191970"],
              hoverBackgroundColor: ["#6A5ACD","#483D8B","#191970"]
          }]    
      };

    this.dataCustoEEAgEsgOu = {
      labels: this.LabelAgEsOu,
      datasets: [
          {
              data: custoAgEsgout,
              backgroundColor: ["#6A5ACD","#8b4513","#808080"],
              hoverBackgroundColor: ["#6A5ACD","#8b4513","#808080"]
          }]    
      };

    this.options = {
      responsive: true,
      legend:{
        display: true,
        position: 'left'
      },
      tooltips: {
        enabled: true,
        callbacks: {
          label: (tooltipItem, chart) => {
            const label = chart.labels[tooltipItem.index]
            const realValue = chart.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]
            const customValue = label + " - "+(realValue*100).toLocaleString('pt-BR') + " %"; 
            return customValue;
          }
        }
      }
    }
    
    setTimeout(() => {  
      this.recarregar=true 
    }, 50);
  }


  ArrayUnidadesConsumoCusto = []
  ArrayValoresConsumoCusto = []
  ValorTotalConsomoCusto=0

  montarGraficosConsumoCusto(){
    this.ArrayUnidadesConsumoCusto = []
    this.ArrayValoresConsumoCusto = []

    var dataincio = this.dataAtualFormatada(this.date1)
    var datafim  = this.dataAtualFormatada(this.date2)
    this.servic.importarGraphConsCust(this.optionSelected.value,dataincio,datafim).subscribe(
      result=>{
        this.relatoriototalconsumocusto=[]
        this.relatoriounidadesconsumocusto=[]
        
        for(var i =0;i<result.length;i++){
          this.relatoriototalconsumocusto.push(result[i][0])
          this.ValorTotalConsomoCusto = this.ValorTotalConsomoCusto+result[i][1]
          this.relatoriounidadesconsumocusto.push(result[i][1])
        }
        for(var i =0;i<10;i++){
          this.ArrayUnidadesConsumoCusto.push(result[i][0])
          this.ArrayValoresConsumoCusto.push(result[i][1])
        }
        this.dataConsumoCustoEmpresas = {
          labels: this.ArrayUnidadesConsumoCusto,
          datasets: [
              {
                  data: this.ArrayValoresConsumoCusto,
                  backgroundColor: ["#182653","#18306f","#133b8c","#0047ab","#4d62b9","#757fc8","#999dd6","#bcbde4","#ddddf1"],
                  hoverBackgroundColor: ["#182653","#18306f","#133b8c","#0047ab","#4d62b9","#757fc8","#999dd6","#bcbde4","#ddddf1"],

              }]    
          };
          // console.log(this.ValorTotalConsomoCusto)
          this.options2 = {
            legend:{
              display: true,
              position: 'bottom'
            },
            tooltips: {
              intersect: false,
              enabled: true,
              callbacks: {
                label: (tooltipItem, chart) => {
                  const label = chart.labels[tooltipItem.index]
                  const realValue = chart.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]
                  const customValue = label + ": "+(realValue*100).toLocaleString('pt-BR')+" - "+((realValue/this.ValorTotalConsomoCusto)*100).toLocaleString('pt-BR')+"% " ; 
                  return customValue;
                }
              }
            }

          }
          this.recarregar2=true

      }
    )
  }






  somarArray(arr){
    var total = 0.0
    for(var i =0;i<arr.length;i++){
      total = total + arr[i]
    }
    return total;
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

}