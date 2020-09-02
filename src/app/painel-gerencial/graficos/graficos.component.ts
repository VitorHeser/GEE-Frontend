import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.component.html',
  styleUrls: ['./graficos.component.css']
})
export class GraficosComponent implements OnInit {

  constructor() { }
  data
  options
  @Input() indicador;

  @Input() Volumes: boolean = false;
  @Input() Consumos: boolean = false;
  
  @Input() DadosAux;

  @Input() limites:boolean = false;
  @Input() tendencia:boolean = false;
  @Input() tamanho: String = "250px";


  ngOnInit() {
    var eixo = ['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'];
    this.MontarGrafico(eixo, this.indicador)
  }

  maximo=1
  minimo=0

  limitsup =[]
  limitinf =[]

  minimosEMaximos(){
    for(var i =0;i<this.indicador.length;i++){
      var arr = []
      arr.push(this.indicador[i].eixo)
      var array = arr[0] 

      var menor = Math.min.apply(null,array.filter(function(n) {return !!n}))
      var maior = Math.max.apply(null,array.filter(function(n) {return !!n}))
      // console.log(menor + " - "+maior)
      this.minimo = menor;
      this.maximo = maior; 
    }
    if(this.limites){
      for(var i =0;i<this.indicador[0].eixo.length;i++){
        this.limitinf.push(this.minimo)
        this.limitsup.push(this.maximo)
      }
    }
  }
  MontarGrafico(eixo, indicador){
    var dataset: any[]=[]
    var Axes: any[]=[]
    if(indicador.length>0 ){
      //INICIAR VARIAVEL QUE PRECISA DO EIXO DIREITO
      var EixoDireito = false;

      this.minimosEMaximos();
      
      eixo = indicador[0].rodape ==null ? eixo :  indicador[0].rodape;
      


      //===============================================================================
      //INSERIR EIXOS
      for(var i =0; i< indicador.length ; i++){
        var array = this.indicador[i].eixo
        while(array.indexOf('Infinity')>=0 || array.indexOf('NaN')>=0){
          array.splice(array.indexOf('NaN'),1,null)
          array.splice(array.indexOf('Infinity'),1,null)
        }



        // console.log(indicador)
        //CHECAR VARIAVEL QUE PRECISA DO EIXO DIREITO
        EixoDireito = indicador[i].posicao ==='right' ? true : false;


        dataset.push(
          indicador[i].estilo === 'Pontilhado' ?
          {
            type: indicador[i].tipografico,
            yAxisID: indicador[i].posicao ==='right' ? 'y-axis-2' : 'y-axis-1',
            fill: false,
            pointStyle: 'circle',
            borderDash: [2,2],
            pointRadius: 0,
            borderColor: indicador[i].coreixo,
            backgroundColor: indicador[i].coreixo,
            label: indicador[i].label,
            data: array
          } : 
          {
            type: indicador[i].tipografico,
            yAxisID: indicador[i].posicao ==='right' ? 'y-axis-2' : 'y-axis-1',
            fill: false,
            borderColor: indicador[i].coreixo,
            backgroundColor: indicador[i].coreixo,
            label: indicador[i].label,
            data: array
          }
        );
        
      }
      //===============================================================================
      //DESENHAR VOLUMES OU CONSUMOS
      if(this.Volumes==true || this.Consumos==true ){
        for(var i =0;i<this.DadosAux.length;i++){
          dataset.push(
            {
              type: this.DadosAux[i].tipografico,
              yAxisID: 'y-axis-2',
              fill: false,
              borderColor: this.DadosAux[i].coreixo,
              hoverBackgroundColor: this.DadosAux[i].coreixo,
              backgroundColor: this.DadosAux[i].coreixo,
              label: this.DadosAux[i].label,
              data: this.DadosAux[i].eixo
            }
          );
        }
        EixoDireito = true;
      }

      //===============================================================================
      //INSERIR YAXES EIXO DIREITO
      if(EixoDireito==true ){
        Axes.push({
          type: 'linear',
          display: true,
          position: 'right',
          id: 'y-axis-2',
          ticks: {
            beginAtZero: true
          }
        })
      }

      
      //===============================================================================
      //DESENHAR LIMITES
      if(this.limites){
        dataset.push(
          {
            type: 'line',
            yAxisID: 'y-axis-1',
            fill: false,
            pointStyle: 'crossRot',
            borderDash: [1,3],
            // pointRadius: 0,
            borderColor: 'grey',
            backgroundColor:  'grey',
            label: 'Limite Superior',
            data: this.limitsup
          },
          {
            type: 'line',
            yAxisID: 'y-axis-1',
            fill: false,
            pointStyle: 'crossRot',
            borderDash: [1,3],
            // pointRadius: 0,
            borderColor:  'grey',
            backgroundColor:  'grey',
            label: 'Limite Inferior',
            data: this.limitinf
          }
        )
      }

      //===============================================================================
      //LINHA DE TENDENCIA
      if(this.tendencia){
        dataset.push(
          {
            type: 'line',
            yAxisID: 'y-axis-1',
            fill: false,
            pointStyle: 'triangle',
            borderDash: [1,3],
            pointRadius: 2,
            borderColor: 'brown',
            backgroundColor:  'brown',
            label: 'Linha de Tendência',
            data: this.regressãoLinear(this.indicador[0].eixo)
          }
        )
      }

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
          // beginAtZero: true,
          suggestedMax: this.maximo*1.1,
          suggestedMin: this.minimo*0.9
        },
      });





      //===============================================================================
      //MONTAR PARA ATENDER A BIBLIOTECA CHART.JS
      this.data = {
        labels: eixo,
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
       
    }
    
  }

  regressãoLinear(array){
    var arrayfiltrado = array.filter(function(n) {return !!n})
    
    var mediaX = null
    var mediaX2 = null
    var mediaY = null;
    var mediaXY = null;

    var sumx=0
    var sumx2=0
    var sumxy=0
    var sumy=0

    for(var i =1;i<=arrayfiltrado.length;i++){
      var index = i
      sumx=sumx+i
      sumy=sumy+arrayfiltrado[(i-1)]
      sumxy=sumxy+(arrayfiltrado[(i-1)]*i)
      sumx2=sumx2+Math.pow(i, 2);
    }
    mediaX=(sumx/arrayfiltrado.length)
    mediaX2=(sumx2/arrayfiltrado.length)
    mediaY=(sumy/arrayfiltrado.length)
    mediaXY=(sumxy/arrayfiltrado.length)

 
    var M = (mediaXY-(mediaX*mediaY))/(mediaX2-(Math.pow(mediaX, 2)))
    var B = mediaY-(M*mediaX)

    var LinhaDeTendencia = []
    for(var i =1;i<=array.length;i++){
      var calculo = (M*i)+B
      LinhaDeTendencia.push(calculo)
    }
   
    return LinhaDeTendencia
  }
}
