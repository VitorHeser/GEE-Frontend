import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ml-vol-base-graficos',
  templateUrl: './ml-vol-base-graficos.component.html',
  styleUrls: ['./ml-vol-base-graficos.component.css']
})
export class MLVolBaseGraficosComponent implements OnInit {

  data
  options
  @Input() tamanho;
  @Input() eixos;
  @Input() consPrev;
  @Input() dados;
  @Input() dadosRealizados;
  @Input() perdas;
  
  constructor() { }

  ngOnInit() {
    var array = this.dados
    var dataset: any[]=[]
    var Axes: any[]=[]

    for(var v=0;v<this.dadosRealizados.ativo.length;v++){
      this.dadosRealizados.ativo[v] = this.dadosRealizados.ativo[v] * (1+(this.perdas[v].valor/100))
    }



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
          label: "Base",
          data: array.base
        }
      );
      dataset.push(
        {
          type: 'line',
          yAxisID: 'y-axis-1',
          fill: false,
          pointStyle: 'crossRot',
          borderDash: [1,3],
          // pointRadius: 0,
          borderColor:  'grey',
          backgroundColor:  'grey',
          label: 'Base - Flex',
          data: array.Flexmenos
        }
      );
      dataset.push(
        {
          type: 'line',
          yAxisID: 'y-axis-1',
          fill: false,
          pointStyle: 'crossRot',
          borderDash: [1,3],
          // pointRadius: 0,
          borderColor:  'grey',
          backgroundColor:  'grey',
          label: 'Base + Flex',
          data: array.Flexmais
        }
      );
      dataset.push(
        {
          type: 'bar',
          yAxisID: 'y-axis-1',
          fill: false,
          pointStyle: 'crossRot',
          borderDash: [1,3],
          // pointRadius: 0,
          borderColor:  'rgba(196, 0, 7, 0.507)',
          backgroundColor:  'rgba(196, 0, 7, 0.507)',
          label: 'Realizado SCDE',
          data: this.dadosRealizados.ativo
        }
      );
      dataset.push(
        {
          type: 'bar',
          yAxisID: 'y-axis-1',
          fill: false,
          pointStyle: 'crossRot',
          borderDash: [1,3],
          // pointRadius: 0,
          borderColor:  'rgba(151, 151, 151, 0.507)',
          backgroundColor:  'rgba(151, 151, 151, 0.507)',
          label: 'Consumo Previsto',
          data: this.consPrev
        }
      );

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
        labels: this.eixos,
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
                const customValue = realValue.toLocaleString(undefined, {minimumFractionDigits: 2,maximumFractionDigits: 2})
                return customValue;
              }
            }
          },
        }
    }
  }

}
