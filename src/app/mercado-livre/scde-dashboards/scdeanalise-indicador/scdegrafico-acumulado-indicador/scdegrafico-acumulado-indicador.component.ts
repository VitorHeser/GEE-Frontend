import { Component, OnInit, Input } from '@angular/core';
import { ScdeserviceService } from 'src/app/medicao-fronteira/scde/scdeservice.service';

@Component({
  selector: 'app-scdegrafico-acumulado-indicador',
  templateUrl: './scdegrafico-acumulado-indicador.component.html',
  styleUrls: ['./scdegrafico-acumulado-indicador.component.css']
})
export class SCDEGraficoAcumuladoIndicadorComponent implements OnInit {

  @Input() unidade;
  @Input() tipo;
  @Input() ref;

  Previsao;

  constructor(private serv: ScdeserviceService) { }

  data
  options
  carregando = false
  
  ngOnInit() {
    this.carregando = false
    var arr = []
    arr.push(this.unidade.unidade)

    this.serv.Grafico2Acumulado(arr,this.ref).subscribe(
      resp=>{
        this.carregarGraph(resp);
      }
    )
  }
  
  carregarGraph(array){
    var ArrayPrevisao = []
    var Previsao = 0

    var ArrayAnoAtual = array[0].ativo.filter(function(e){return e!=null})
    var ArrayPrevisaoAtual = array[0].previsao
    var ArrayAnoAnterior = array[1].ativo

    for(var i =0;i<ArrayAnoAtual.length;i++){
      Previsao = Previsao + ArrayAnoAtual[i]
    }
    var TamanhoPrevisao  = ArrayAnoAtual.length
    Previsao = Previsao / TamanhoPrevisao

    var arrayPrevisao2 = []

    for(var i =0;i<ArrayAnoAnterior.length;i++){
      if(i<TamanhoPrevisao){
        if(i==(TamanhoPrevisao-1)){
          ArrayPrevisao.push(ArrayAnoAtual[i])
          arrayPrevisao2.push(ArrayAnoAtual[i])
        }else{
          ArrayPrevisao.push(null)
          arrayPrevisao2.push(ArrayPrevisaoAtual[i])
        }
      }else{
        ArrayPrevisao.push(Previsao)
        arrayPrevisao2.push(ArrayPrevisaoAtual[i])
      }
    }
    
    var dataset: any[]=[]
    var Axes: any[]=[]
    dataset.push({
      type: "line",
      yAxisID: 'y-axis-1',
      fill: false,
      pointStyle: 'circle',
      borderDash: [0,0],
      pointRadius: 4,
      borderColor: "blue",
      backgroundColor: "blue",
      label: "Ano Atual",
      data: array[0].ativo
    })
    dataset.push({
      type: "line",
      yAxisID: 'y-axis-1',
      fill: false,
      pointStyle: 'circle',
      borderDash: [0,0],
      pointRadius: 4,
      borderColor: "#8b8b8b77",
      backgroundColor: "#8b8b8b77",
      label: "Ano Anterior",
      data: array[1].ativo
    })
    dataset.push({
      type: "line",
      fill: false,
      pointStyle: 'circle',
      borderDash: [2,2],
      pointRadius: 0,
      borderColor: "#bf020277",
      backgroundColor: "#bf020277",
      label: "Previsao",
      data: ArrayPrevisao
    })
    dataset.push({
      type: "line",
      fill: false,
      pointStyle: 'circle',
      borderDash: [0,0],
      pointRadius: 4,
      borderColor: "#bf020277",
      backgroundColor: "#bf020277",
      label: "Previsao Horária (Teste)",
      data: arrayPrevisao2
    })
    Axes.push({
      type: 'linear',
      display: true,
      position: 'left',
      id: 'y-axis-1',
      gridLines: {
        display: true,
        drawborder: true,
        drawOnChartArea:false
      },
      ticks: {
        beginAtZero: false,
        callback: function(label, index, labels) {
            return label/1000+'k';
        }
      },
    });

    this.data = {
      labels: array[0].eixo,
      datasets: dataset        
    }
    this.options = {
      responsive: true,
      stacked: false,
        title: {
          display: true,
          fontSize: 16
        },
        gridLines: {
          display: true,
          drawborder: true,
          drawOnChartArea:false
        },
        scales: {
          yAxes: Axes
          
        },
        legend: {
            position: 'bottom'
        },
        tooltips: {
          callbacks: {
            label: (tooltipItem, chart) => {
              const realValue = chart.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]
              const customValue = realValue.toLocaleString('pt-BR'); 
              return customValue;
            }
          }
        },
      }
      
    this.carregando = true
  }

}
