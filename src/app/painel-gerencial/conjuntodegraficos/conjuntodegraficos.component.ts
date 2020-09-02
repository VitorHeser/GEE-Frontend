import { Component, OnInit, Input } from '@angular/core';
import {SelectButtonModule} from 'primeng/selectbutton';
import { GraficosDash1Service } from './../graficos-dash1.service'

@Component({
  selector: 'app-conjuntodegraficos',
  templateUrl: './conjuntodegraficos.component.html',
  styleUrls: ['./conjuntodegraficos.component.css']
})
export class ConjuntodegraficosComponent implements OnInit {

  
  constructor(private servic:GraficosDash1Service) { }
  Empresas: any[] = []
  EmpresaSelected


  carregar=false
  
  Volumes=false
  Consumos=false
  volume=[]
  consumo=[]
  DadosAux:any[] = []
  
  indicador1: any[]=[]
  indicador2: any[]=[]
  indicador3: any[]=[]
  totais1: any[]=[]
  totais2: any[]=[]
  totais3: any[]=[]

  caixaDeSelecao
  AguaEsg
  carregado=false

  ngOnInit() {
    this.servic.importarUnidades().subscribe(
      result=>{
        for(var i =0;i<result.length;i++){
          var str = result[i]
          this.Empresas.push({ label: str, value: str })
        }
        this.carregarArrays();
        this.carregado=true
      }
    )
    this.caixaDeSelecao = [
      {label: 'Água', value: 1},
      {label: 'Esgoto', value: 2}
    ];
    this.AguaEsg= 1

    
  }

  recarregar(){
    this.carregar=false
    if(this.Volumes==true){
      this.DadosAux=this.volume;
    }else if(this.Consumos==true){
      this.DadosAux=this.consumo;
    }else{
      this.DadosAux=[]
    }

    setTimeout(() => {  
      this.carregar=true 
    }, 100);
    
  }

  carregarArrays(){
    this.indicador1=[]
    this.indicador2=[]
    this.indicador3=[]
    this.totais1=[]
    this.totais2=[]
    this.totais3=[]
    var Xmas = new Date();
    var year = Xmas.getFullYear();
    var lastyear = year-2;
    if(this.EmpresaSelected!=undefined){
      for(var i = lastyear; lastyear<=year;lastyear++){
        this.servic.importarEixos(this.EmpresaSelected.label, this.AguaEsg, lastyear, year).subscribe(
          resultado=>{
            var idx = resultado['ultano']-resultado['ano']
            var index = idx==2 ? 0 : idx == 0 ? 2 : 1;
            if(index==0){
              this.indicador1[0] = {
                  tipografico: 'line',
                  coreixo: idx==2 ? '#00B050' : '#ED7D31',
                  label: resultado['ano'],
                  eixo: resultado['kwhm3'],
                  estilo: 'Pontilhado',
                  rodape: null,
                  posicao: 'left'
                }
              this.indicador2[0] = {
                  tipografico: 'line',
                  coreixo: idx==2 ? '#00B050' : '#ED7D31',
                  label: resultado['ano'],
                  eixo: resultado['rsm3'],
                  estilo: 'Pontilhado',
                  rodape: null,
                  posicao: 'left'
                }
              this.indicador3[0] = {
                  tipografico: 'line',
                  coreixo: idx==2 ? '#00B050' : '#ED7D31',
                  label: resultado['ano'],
                  eixo: resultado['rskwh'],
                  estilo: 'Pontilhado',
                  rodape: null,
                  posicao: 'left'
              }

              this.totais1[0] = this.Media(resultado['kwhm3'])
              this.totais2[0] = this.Media(resultado['rsm3'])
              this.totais3[0] = this.Media(resultado['rskwh'])

          }else if(index==1){
              this.indicador1[1] = {
                  tipografico: 'line',
                  coreixo: idx==2 ? '#00B050' : '#ED7D31',
                  label: resultado['ano'],
                  eixo: resultado['kwhm3'],
                  estilo: 'Pontilhado',
                  rodape: null,
                  posicao: 'left'
                }
              this.indicador2[1] = {
                  tipografico: 'line',
                  coreixo: idx==2 ? '#00B050' : '#ED7D31',
                  label: resultado['ano'],
                  eixo: resultado['rsm3'],
                  estilo: 'Pontilhado',
                  rodape: null,
                  posicao: 'left'
                }
              this.indicador3[1] = {
                  tipografico: 'line',
                  coreixo: idx==2 ? '#00B050' : '#ED7D31',
                  label: resultado['ano'],
                  eixo: resultado['rskwh'],
                  estilo: 'Pontilhado',
                  rodape: null,
                  posicao: 'left'
                }

                this.totais1[1] = this.Media(resultado['kwhm3'])
                this.totais2[1] = this.Media(resultado['rsm3'])
                this.totais3[1] = this.Media(resultado['rskwh'])
            }else{
              this.indicador1[2] = {
                tipografico: 'line',
                coreixo: this.AguaEsg==1 ? 'blue' : 'brown',
                label: resultado['ano'],
                eixo: resultado['kwhm3'],
                rodape: null,
                estilo: 'line',
                posicao: 'left'
              }
              this.indicador2[2] = {
                tipografico: 'line',
                coreixo: this.AguaEsg==1 ? 'blue' : 'brown',
                label: resultado['ano'],
                eixo: resultado['rsm3'],
                rodape: null,
                estilo: 'line',
                posicao: 'left'
              }
              this.indicador3[2] = {
                  tipografico: 'line',
                  coreixo: this.AguaEsg==1 ? 'blue' : 'brown',
                  label: resultado['ano'],
                  eixo: resultado['rskwh'],
                  rodape: null,
                  estilo: 'line',
                  posicao: 'left'
                }
                

                this.totais1[2] = this.Media(resultado['kwhm3'])
                this.totais2[2] = this.Media(resultado['rsm3'])
                this.totais3[2] = this.Media(resultado['rskwh'])
              this.volume=[
                {
                  tipografico: 'bar',
                  coreixo: this.AguaEsg==1 ? 'lightblue' : '#FFB775',
                  label: 'Volumes',
                  eixo: resultado['volumeSaida'],
                  estilo: 'bar',
                  rodape: null,
                  posicao: 'left'
                }
              ]
              this.consumo=[
                {
                  tipografico: 'bar',
                  coreixo: 'lightgreen',
                  label: 'Consumos',
                  eixo: resultado['consumoEnergia'],
                  estilo: 'bar',
                  rodape: null,
                  posicao: 'left'
                }
              ]
            }
            this.recarregar()
          }
        )
      }
    }
  }
  Media(eixo){
    console.log(eixo)
    var eixofiltrado = eixo.filter(function(val){ return val!=null })
    var value = 0
    for(var b=0;b<eixofiltrado.length;b++){
      value = eixofiltrado[b]+value
    }
    value = value/eixofiltrado.length


    console.log(value)
    return value.toLocaleString('pt-BR')
  }
}
