import { Component, OnInit } from '@angular/core';
import { GraficosDash1Service } from '../graficos-dash1.service';

@Component({
  selector: 'app-cogn-orcamento',
  templateUrl: './cogn-orcamento.component.html',
  styleUrls: ['./cogn-orcamento.component.css']
})
export class CognOrcamentoComponent implements OnInit {
  
  date1
  date2
  Empresas: any[] = []
  EmpresaSelected

  Versoes: any[] = []
  VersoesSelected

  caixaDeSelecao
  AguaEsgoSelect

  constructor(private servic:GraficosDash1Service) { }

  ngOnInit() {
    this.servic.importarUnidades().subscribe(
      result=>{
        for(var i =0;i<result.length;i++){
          var str = result[i]
          this.Empresas.push({ label: str, value: str })
        }
        this.EmpresaSelected = this.Empresas[0].label
      }
    )
    this.servic.importarVersoes().subscribe(
      result=>{
        this.Versoes = result
        this.VersoesSelected = result[0]
      }
    )
    this.caixaDeSelecao = [
      {label: 'Água', value: 1},
      {label: 'Esgoto', value: 2}
    ];
    this.AguaEsgoSelect = 1
  }

  //=======================================
  calculoscarregados = false
  carregando = false
  Calculos
  carregar(){
    this.carregando=true
    this.servic.importarCalculos(this.EmpresaSelected,this.AguaEsgoSelect,this.dataAtualFormatada(this.date1),this.dataAtualFormatada(this.date2),this.VersoesSelected.id).subscribe(
      resp=>{
        this.Calculos = resp
        console.log(this.Calculos)
        this.carregarLabels()

        setTimeout(() => {  
          this.carregando=false
          this.calculoscarregados = true
        }, 100);
      }
    )
  }

  SelecaoIndicadores
  IndicadorSelect
    

  carregarLabels(){
    this.SelecaoIndicadores=[
      {label: 'kWh/m³        ', value: 'kwhm3'},
      {label: 'R$/kWh        ', value: 'rskwh'},
      {label: 'R$/m³         ', value: 'rsm3'},
      {label: 'Consumo kW    ', value: 'consumoEnergia'},
      {label: 'Custo R$      ', value: 'custoEnergia'},
      {label: this.AguaEsgoSelect==1 ? 'Volume Captado' : 'Volume Coletado' , value: 'volumeCap'},
      {label: this.AguaEsgoSelect==1 ? 'Volume Produzido' : 'Volume Tratado' , value: 'volumeSaida'},
      {label: 'Volume Faturado'  , value: 'volumeFaturado'},
      {label: 'Volume Micromedido'  , value: 'volumeMicromed'},
      {label: 'Volume Perdido'  , value: 'volumePerdido'},
      {label: 'Perdas'  , value: 'perdas'},
      {label: 'Perdas na Distrib.'  , value: 'perdasNaDistr'},
    ]
    this.IndicadorSelect = this.SelecaoIndicadores[0].value
    this.carregarGraph();
  }

  carregarGrafico=false
  indicador
  DadosAux=[]
  totalOrcadoSoma
  totalOrcadoMedia
  totalRealizadoSoma
  totalRealizadoMedia
  totalSomaDelta
  totalMediaDelta

  carregarGraph(){
    this.carregarGrafico=false
    this.indicador=[]
    this.DadosAux=[]
    this.totalOrcadoSoma = this.sum(this.Calculos[1][this.IndicadorSelect]); 
    this.totalRealizadoSoma = this.sum(this.Calculos[0][this.IndicadorSelect]); 
    this.totalSomaDelta = ((this.totalOrcadoSoma-this.totalRealizadoSoma)).toLocaleString('pt-BR'); 

    this.totalOrcadoMedia = this.avg(this.Calculos[1][this.IndicadorSelect]); 
    this.totalRealizadoMedia = this.avg(this.Calculos[0][this.IndicadorSelect]); 
    this.totalMediaDelta = ((this.totalOrcadoMedia-this.totalRealizadoMedia)).toLocaleString('pt-BR'); 

    this.indicador.push({
      tipografico: 'line',
      coreixo: 'red',
      label: "Orçado",
      eixo: this.Calculos[1][this.IndicadorSelect],
      rodape:this.Calculos[1]['eixo'],
      estilo: 'line',
      posicao: 'left'
    },{
      tipografico: 'bar',
      coreixo: "lightblue",
      label: "Realizado",
      eixo: this.Calculos[0][this.IndicadorSelect],
      rodape: 'left',
      estilo: 'bar',
      posicao: 'left'
    })
    console.log(this.indicador)
    setTimeout(() => {  
      this.carregarGrafico=true
    }, 100);
  }

  sum(ar){
    var val = 0
    for(var i =0;i<ar.length;i++){
      val = val + ar[i]
    }
    return val
  }
  avg(ar){
    var arsumado = this.sum(ar)
    var newar = ar.filter(function(e){
      return e>0
    })

    return arsumado/newar.length
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
