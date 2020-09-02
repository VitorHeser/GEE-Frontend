import { Component, OnInit, Input } from '@angular/core';
import { GraficosDash1Service } from './../graficos-dash1.service'

@Component({
  selector: 'app-graficosanaliticos',
  templateUrl: './graficosanaliticos.component.html',
  styleUrls: ['./graficosanaliticos.component.css']
})
export class GraficosanaliticosComponent implements OnInit {
  Empresas: any[] = []
  EmpresaSelected
  indicador: any[]=[]
  DadosAux: any[]=[]

  date2= new Date()
  date1 = new Date(new Date().setMonth(new Date().getMonth() - 11))

  SelecaoAguaEsg
  AguaEsgoSelect

  SelecaoIndicadores
  IndicadoresSelect: any;

  SelecaoAdicionais
  Adicionais: any[] = [];
  carregado=false

  constructor(private servic:GraficosDash1Service) { }

  ngOnInit() {

    this.servic.importarUnidades().subscribe(
      result=>{
        for(var i =0;i<result.length;i++){
          var str = result[i]
          this.Empresas.push({ label: str, value: str })
          this.EmpresaSelected = this.Empresas[0]
          this.IndicadoresSelect = 'kwhm3'
          this.AguaEsgoSelect=1
        }
        this.carregarLabels();
        this.carregado=true
      }
    )
    this.SelecaoAguaEsg = [
      {label: 'Água', value: 1},
      {label: 'Esgoto', value: 2}
    ];

  }

  carregar=false
  criarArrayDoGrafico(){
    var dataini = this.dataAtualFormatada(this.date1)
    var datafim = this.dataAtualFormatada(this.date2)

    this.carregarLabels()
    this.carregar=false
    this.indicador=[]
    this.DadosAux=[]
    if(this.EmpresaSelected!=null){
      this.servic.importarGraph(this.EmpresaSelected.label,this.AguaEsgoSelect,dataini,datafim).subscribe(
        resultado=>{
          this.indicador.push({
            tipografico: 'line',
            coreixo: this.AguaEsgoSelect==1 ? 'blue' : 'brown',
            label: this.procurarCor(this.IndicadoresSelect, this.AguaEsgoSelect).label,
            eixo: resultado[this.IndicadoresSelect],
            rodape: resultado['eixo'],
            estilo: 'line',
            posicao: 'left'
          })

          for(var i=0;i<this.Adicionais.length;i++){
            this.DadosAux.push({
              tipografico: 'bar',
              coreixo: this.procurarCor(this.Adicionais[i], this.AguaEsgoSelect).cor,
              label: this.procurarCor(this.Adicionais[i], this.AguaEsgoSelect).label,
              eixo: resultado[this.Adicionais[i]],
              rodape: resultado['eixo'],
              estilo: 'bar',
              posicao: 'right'
            })
          }
          this.preencherTable(resultado)
          this.carregar=true
        }
      )
    }
  }
  table =[]
  preencherTable(result){
    console.log(result)
    this.table =[]
    for(var i =0;i<result.eixo.length;i++){
      this.table.push(
        {
          eixo: result.eixo[i].toLocaleString('pt-BR'),
          volumeCap: result.volumeCap[i] == null ? result.volumeCap[i] : result.volumeCap[i].toLocaleString('pt-BR'),
          volumeSaida: result.volumeSaida[i] == null ? result.volumeSaida[i] : result.volumeSaida[i].toLocaleString('pt-BR'),
          consumoEnergia: result.consumoEnergia[i] == null ? result.consumoEnergia[i] : result.consumoEnergia[i].toLocaleString('pt-BR'),
          custoEnergia: result.custoEnergia[i] == null ? result.custoEnergia[i] : result.custoEnergia[i].toLocaleString('pt-BR'),
          kwhm3: result.kwhm3[i] == null ? result.kwhm3[i] : result.kwhm3[i].toLocaleString('pt-BR'),
          rskwh: result.rskwh[i] == null ? result.rskwh[i] : result.rskwh[i].toLocaleString('pt-BR'),
          rsm3: result.rsm3[i] == null ? result.rsm3[i] : result.rsm3[i].toLocaleString('pt-BR'),
          
          volumeFaturado: result.volumeFaturado[i] == null ? result.volumeFaturado[i] : result.volumeFaturado[i].toLocaleString('pt-BR'),
          volumeMicromed: result.volumeMicromed[i] == null ? result.volumeMicromed[i] : result.volumeMicromed[i].toLocaleString('pt-BR'),
          volumePerdido:  result.volumePerdido[i] == null ?  result.volumePerdido[i] : result.volumePerdido[i].toLocaleString('pt-BR'),
          perdas: result.perdas[i] == null ? result.perdas[i] : result.perdas[i].toLocaleString('pt-BR'),
          perdasNaDistr: result.perdasNaDistr[i] == null ? result.perdasNaDistr[i] : result.perdasNaDistr[i].toLocaleString('pt-BR'),
        }
      )
    }
  }


  procurarCor(valor, id):any{
    var obj = {
    }
    var paleta=[
      {cor:           '#eeff006c', value: 'kwhm3', label: 'kWhm³'},
      {cor:           '#003cff6c', value: 'rsm3', label: 'R$/m³'},
      {cor:           '#ff00006c', value: 'rskwh', label: 'R$/kWh'},
      {cor:           '#09ff006c', value: 'consumoEnergia', label: 'Consumo kW'},
      {cor:           '#003cff6c', value: 'custoEnergia', label: 'Custo R$'},
      {cor: id==1 ?   '#0047776c' : '#724a006c', value: 'volumeCap', label: id==1 ? 'Volume Captado' : 'Volume Coletado'},
      {cor: id==1 ?   '#008fee6c' : '#ee9b006c', value: 'volumeSaida', label: id==1 ? 'Volume Produzido' : 'Volume Tratado'},
      {cor:           '#43ee006c', label: 'Volume Faturado'     , value: 'volumeFaturado'},
      {cor:           '#7577006c', label: 'Volume Micromedido'  , value: 'volumeMicromed'},
      {cor:           '#eeca006c', label: 'Volume Perdido'      , value: 'volumePerdido'},
      {cor:           '#ee00a76c', label: 'Perdas'              , value: 'perdas'},
      {cor:           '#d300006c', label: 'Perdas na Distrib.'  , value: 'perdasNaDistr'},
    ]
    for(var i=0;i<paleta.length;i++){
      obj = paleta[i].value == valor ? paleta[i] : obj;
    }
    return obj
  }

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

    this.SelecaoAdicionais=[
      {label: 'kWh/m³        ', value: 'kwhm3'},
      {label: 'R$/kWh        ', value: 'rskwh'},
      {label: 'R$/m³         ', value: 'rsm3'},
      {label: 'Consumo kW    ', value: 'consumoEnergia'},
      {label: 'Custo R$      ', value: 'custoEnergia'},
      {label: this.AguaEsgoSelect==1 ? 'Volume Captado' : 'Volume Coletado', value: 'volumeCap'},
      {label: this.AguaEsgoSelect==1 ? 'Volume Produzido' : 'Volume Tratado' , value: 'volumeSaida'},
      {label: 'Volume Faturado'  , value: 'volumeFaturado'},
      {label: 'Volume Micromedido'  , value: 'volumeMicromed'},
      {label: 'Volume Perdido'  , value: 'volumePerdido'},
      {label: 'Perdas'  , value: 'perdas'},
      {label: 'Perdas na Distrib.'  , value: 'perdasNaDistr'},
    ]
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
