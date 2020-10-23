import { Component, OnInit, Input } from '@angular/core';
import 'chartjs-plugin-zoom'

@Component({
  selector: 'app-graficosscde',
  templateUrl: './graficosscde.component.html',
  styleUrls: ['./graficosscde.component.css']
})
export class GraficosScComponent implements OnInit {

  constructor() { }
  data
  options
  @Input() dados;
  @Input() tamanho ="200px";


  ngOnInit() {
    
    this.MontarGrafico(this.dados)
  }

  maximo=1
  minimo=0

  limitsup =[]
  limitinf =[]



  MontarGrafico(array){
    var dataset: any[]=[]
    var Axes: any[]=[]
    if(array!=null ){
      //INICIAR VARIAVEL QUE PRECISA DO EIXO DIREITO

      dataset.push(
        {
          type: "line",
          yAxisID: 'y-axis-1',
          fill: false,
          pointStyle: 'circle',
          borderDash: [0,0],
          pointRadius: 3,
          borderColor: "blue",
          backgroundColor: "blue",
          label: "Ativa kWh",
          data: array.ativo
        }
      );
      // dataset.push(
      //   {
      //     type: "line",
      //     yAxisID: 'y-axis-1',
      //     fill: false,
      //     pointStyle: 'circle',
      //     borderDash: [0,0],
      //     pointRadius: 3,
      //     borderColor: "red",
      //     backgroundColor: "red",
      //     label: "Reativa kVArh",
      //     data: array.reativo
      //   }
      // );




      //===============================================================================
      //DESENHAR ROTULOS DE YAXES EIXOS
    
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
          beginAtZero: true,
        },
      });





      //===============================================================================
      //MONTAR PARA ATENDER A BIBLIOTECA CHART.JS
      this.data = {
        labels: array.eixo,
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

          select: {
            events: ['mousedown', 'mouseup'], // this is important!
            selectCallback: (startPoint, endPoint) => {
              console.log(startPoint + " - "+endPoint+" draggado")
            }
          },

          // Container for pan options
          pan: {
            enabled: true,
            mode: 'x',
            rangeMin: {
              x: null,
              y: 0
            },
            rangeMax: {
              x: null,
              y: 0
            },
            // onPan: function({chart}) { console.log(`I was panned!!!`); }
          },
        
          // Container for zoom options
          zoom: {
            // Boolean to enable zooming
            enabled: true,
        
            // Enable drag-to-zoom behavior
            drag: false,
        
            // Drag-to-zoom rectangle style can be customized
            // drag: {
            // 	 borderColor: 'rgba(225,225,225,0.3)',
            // 	 borderWidth: 5,
            // 	 backgroundColor: 'rgb(225,225,225)'
            // },
        
            // Zooming directions. Remove the appropriate direction to disable
            // Eg. 'y' would only allow zooming in the y direction
            mode: 'x',
        
            rangeMin: {
              // Format of min zoom range depends on scale type
              x: null,
              y: 0
            },
            rangeMax: {
              // Format of max zoom range depends on scale type
              x: null,
              y: null
            },
        
 
            // Speed of zoom via mouse wheel
            // (percentage of zoom on a wheel event)
            speed: 0.1,
 
            // Minimal zoom distance required before actually applying zoom
            threshold: 1,
 
            // On category scale, minimal zoom level before actually applying zoom
            sensitivity: 3,
        
            // Function called once zooming is completed
            // Useful for dynamic data loading
            // onZoom: function({chart}) { console.log(`I was zoomed!!!`); }
          },
   
      } 
    }
  }
}
