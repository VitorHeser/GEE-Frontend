import { Component, OnInit, Input } from '@angular/core';
import waterFallPlugin from 'chartjs-plugin-waterfall';

@Component({
  selector: 'app-viewpainel-energia',
  templateUrl: './viewpainel-energia.component.html',
  styleUrls: ['./viewpainel-energia.component.css']
})
export class ViewpainelEnergiaComponent implements OnInit {

  @Input() Totais;
  
  constructor() { }
  arrayDeObj=[]
  totaldesviors=0
  cols
  carregado= false



  ngOnInit() {
    this.arrayDeObj=[]
    this.totaldesviors=0
    this.ArraysCalculados(this.Totais)
    console.log(this.Totais)

    
    for(var i=0;i<this.Totais.length;i++){
      var desviors=this.desviors(this.Totais[i][1].custoEnergia[0],this.Totais[i][0].custoEnergia[0]);
      this.arrayDeObj.push(
        {
          grupo: this.Totais[i][0].unidade,
          realizado: this.Totais[i][0].custoEnergia[0],
          orcado: this.Totais[i][1].custoEnergia[0],
          desvioporc: this.desvioporc(this.Totais[i][1].custoEnergia[0],this.Totais[i][0].custoEnergia[0]),
          desviors: desviors,
          custoRealAnoAtual: this.Totais[i][0].custoAnoAtual,
          custoOrcadoAnoAtual: this.Totais[i][1].custoAnoAtual,
          custoRealAnoAnterior: this.Totais[i][0].custoAnoPassado,
        }
      )
      this.totaldesviors = desviors<=0 ? this.totaldesviors : this.totaldesviors + desviors

    }
    this.carregado=true
  }


  desviors(orcado,realizado){
    return realizado-orcado
  }
  desvioporc(orcado,realizado){
    var val = ((this.desviors(orcado,realizado)/orcado)*100);
    var vval = Number.isNaN(val) ? "-" : val.toFixed(0)+"%";
    return vval;
  }
  desvioporcmes(desviors){
    return desviors>0 ? ((desviors/this.totaldesviors)*100).toFixed(1)+"%" : "-";
  }
  consumporcAno(orcado,realizado){
    var val = (realizado/orcado)*100;
    var vval = Number.isNaN(val) ? "-" : val.toFixed(0)+"%";
    return vval;
  }


  //===================================================
  //Gráfico Bridge

  data1
  options1
  data2
  options2
  data3
  options3
  carregaGrafico1 = true
  carregaGrafico2 = true
  carregaGrafico3 = true
  Volume
  Consumo
  Tarifa
  ArraysCalculados(array){
    var RealVol = 0;
    var RealkWh = 0;
    var RealRS = 0;
    var OrcVol = 0;
    var OrckWh = 0;
    var OrcRS = 0;

    for(let dados of array){
      var realizado = dados[0]
      var orcado = dados[1]

      var realvolsaid = realizado.volumeSaida.length>0 ? realizado.volumeSaida[0] : 0;
      var realvolimp = realizado.volumeImportado.length>0 ? realizado.volumeImportado[0] : 0;
      var realkwh = realizado.consumoEnergia.length>0 ? realizado.consumoEnergia[0] : 0;
      var realrs = realizado.custoEnergia.length>0 ? realizado.custoEnergia[0] : 0;

      var orcvolsaid = orcado.volumeSaida.length>0 ? orcado.volumeSaida[0] : 0;
      var orcvolimp = orcado.volumeImportado.length>0 ? orcado.volumeImportado[0] : 0;
      var orckwh = orcado.consumoEnergia.length>0 ? orcado.consumoEnergia[0] : 0;
      var orcrs = orcado.custoEnergia.length>0 ? orcado.custoEnergia[0] : 0;


      RealVol = RealVol + realvolsaid + realvolimp
      RealkWh = RealkWh + realkwh 
      RealRS = RealRS + realrs

      OrcVol = OrcVol + orcvolsaid + orcvolimp
      OrckWh = OrckWh + orckwh
      OrcRS = OrcRS + orcrs
    }
    this.Volume = (RealVol * (OrcRS/OrcVol))-(OrcVol * (OrcRS/OrcVol))
    this.Consumo = ((RealkWh/RealVol)*OrcVol*(RealRS/RealkWh))- ((OrckWh/OrcVol)*OrcVol*(OrcRS/OrckWh))
    this.Tarifa = (OrcRS+this.Volume+this.Consumo)-RealRS

    console.log("Orçado RS: "+OrcRS)
    console.log("Volume: "+this.Volume)
    console.log("Consumo: "+this.Consumo)
    console.log("Tarifa: "+this.Tarifa)
    console.log("Real RS: "+RealRS)
    this.carregaGraph1(OrcRS,RealRS);
    this.carregaGraph2(OrcVol, RealVol)
    this.carregaGraph3((OrcRS/OrcVol),(RealRS/RealVol))

  }
  carregaGraph1(OrcRS, RealRS){
    var min = OrcRS < RealRS ? OrcRS * 0.8 : RealRS * 0.8
    this.options1 = {
      responsive: true,
      stacked: false,
      legend: {
          position: 'bottom'
      },
      scales:{
        yAxes:[{
          type: 'linear',
          display: true,
          position: 'left',
          id: 'y-axis-1',
          gridLines: {
            display: true,
            drawborder: true,
            drawOnChartArea:false
          },
          ticks:{
            suggestedMin: min,
          },
        }]
      },
      tooltips: {
        enabled: true,
        callbacks: {
          label: (tooltipItem, chart) => {
            const realValue = chart.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]
            const customValue = realValue.toLocaleString('pt-BR'); 
            return customValue;
          }
        }
      }
    }
    this.data1 = {
      datasets: [
        {
          type: 'line',
          fill: false,
          borderColor: 'blue',
          backgroundColor: 'blue',
          yAxisID: 'y-axis-1',
          label: 'Orçado',
          data: [OrcRS],
          pointRadius: 45,
          pointHoverRadius: 50,
          pointStyle: 'line',
          showLine: false
        },{
        type: 'bar',
        fill: false,
        borderColor: 'lightblue',
        backgroundColor: 'lightblue',
        yAxisID: 'y-axis-1',
        label: 'Realizado',
        data: [RealRS]
      }],
    }
    this.carregaGrafico1 = false
  }
  carregaGraph2(OrcVol, RealVol){
    var min = OrcVol < RealVol ? OrcVol * 0.8 : RealVol * 0.8
    this.options2 = {
      responsive: true,
      stacked: false,
      legend: {
          position: 'bottom'
      },
      scales:{
        yAxes:[{
          type: 'linear',
          display: true,
          position: 'left',
          id: 'y-axis-1',
          gridLines: {
            display: true,
            drawborder: true,
            drawOnChartArea:false
          },
          ticks:{
            suggestedMin: min,
          },
        }]
      },
      tooltips: {
        enabled: true,
        callbacks: {
          label: (tooltipItem, chart) => {
            const realValue = chart.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]
            const customValue = realValue.toLocaleString('pt-BR'); 
            return customValue;
          }
        }
      }
    }
    this.data2 = {
      datasets: [
        {
          type: 'line',
          fill: false,
          borderColor: 'blue',
          backgroundColor: 'blue',
          yAxisID: 'y-axis-1',
          label: 'Orçado',
          data: [OrcVol],
          pointRadius: 45,
          pointHoverRadius: 50,
          pointStyle: 'line',
          showLine: false
        },{
        type: 'bar',
        fill: false,
        borderColor: 'lightblue',
        backgroundColor: 'lightblue',
        yAxisID: 'y-axis-1',
        label: 'Realizado',
        data: [RealVol]
      }],
    }
    this.carregaGrafico2 = false
  }
  carregaGraph3(OrcVol, RealVol){
    var min = OrcVol < RealVol ? OrcVol * 0.8 : RealVol * 0.8
    this.options3 = {
      responsive: true,
      stacked: false,
      legend: {
          position: 'bottom'
      },
      scales:{
        yAxes:[{
          type: 'linear',
          display: true,
          position: 'left',
          id: 'y-axis-1',
          gridLines: {
            display: true,
            drawborder: true,
            drawOnChartArea:false
          },
          ticks:{
            suggestedMin: min,
          },
        }]
      },
      tooltips: {
        enabled: true,
        callbacks: {
          label: (tooltipItem, chart) => {
            const realValue = chart.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]
            const customValue = realValue.toLocaleString('pt-BR'); 
            return customValue;
          }
        }
      }
    }
    this.data3 = {
      datasets: [
        {
          type: 'line',
          fill: false,
          borderColor: 'blue',
          backgroundColor: 'blue',
          yAxisID: 'y-axis-1',
          label: 'Orçado',
          data: [OrcVol],
          pointRadius: 45,
          pointHoverRadius: 50,
          pointStyle: 'line',
          showLine: false
        },{
        type: 'bar',
        fill: false,
        borderColor: 'lightblue',
        backgroundColor: 'lightblue',
        yAxisID: 'y-axis-1',
        label: 'Realizado',
        data: [RealVol]
      }],
    }
    this.carregaGrafico3 = false
  }
  
  total(arr,campo){
    var total = 0
    for(let a of arr){
      total = total + a[campo]
    }
    return total
  }


  //GRÁFICO BRIDGE
  // carregaGraph2(OrcRS, Volume, Consumo, Tarifa, RealRS){
  //   this.options2={
  //     plugins: {
  //       waterFallPlugin: {
  //         stepLines: {
  //           enabled: true,
  //           startColorStop: 0,
  //           endColorStop: 0.6,
  //           startColor: 'rgba(0, 0, 0, 0.55)',
  //           endColor: 'rgba(0, 0, 0, 0)',
  //           diagonalStepLines: true,
  //         },
  //       },
  //     },
  //     options: {
  //       scales: {
  //         xAxes: {
  //           display: true,
  //           ticks:{
  //             min: 50000,
  //             suggestedMin: 50000,
  //           },
  //         }
  //       }
  //     }
  //   }
  //   this.data2  = {
  //     datasets: [
  //         {
  //             label: 'Orçado R$',
  //             data: [OrcRS],
  //             backgroundColor: '#d29baf',
  //             stack: 'stack 1',
  //         },
  //         {
  //             data: [(OrcRS+Volume)],
  //             waterfall: {
  //                 dummyStack: true,
  //             },
  //             stack: 'stack 2',
  //         },
  //         {
  //             label: 'Volume',
  //             data: [-Volume],
  //             backgroundColor: '#bb6987',
  //             stack: 'stack 2',
  //         },
  //         {
  //             label: 'Realizado R$',
  //             data: [RealRS],
  //             backgroundColor: '#a53860',
  //             stack: 'stack 3',
  //         },
  //     ],
  // };
  //   this.carregaGrafico2 = false
  // }
}

//Volume (REAL VOL * ORÇ RS/M³)-(ORÇ VOL * ORÇ RS/M³)
//Consumo (REAL kWh/M³ * ORÇ VOL * ORÇ RS/kWh) - (ORÇ kWh/M³ * ORÇ VOL * ORÇ RS/kWh)
//Tarifa (ORÇADO + VOLUME + CONSUMO) - REAL