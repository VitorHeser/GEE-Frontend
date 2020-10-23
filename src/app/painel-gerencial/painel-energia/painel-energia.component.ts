import { Component, OnInit } from '@angular/core';
import { GraficosDash1Service } from '../graficos-dash1.service';

@Component({
  selector: 'app-painel-energia',
  templateUrl: './painel-energia.component.html',
  styleUrls: ['./painel-energia.component.css']
})
export class PainelEnergiaComponent implements OnInit {

  constructor(private serv:GraficosDash1Service) { }
  
  visible=false
  carregando=true
  Totais

  date1 = new Date()

  Versoes
  VersoesSelected

  caixaDeSelecao
  AguaEsgoSelect

  ngOnInit() {
    this.serv.importarVersoes().subscribe(
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


  carregar(){
    this.date1.setDate(0)
    var mes = this.dataAtualFormatada(this.date1)
    this.visible=true
    this.carregando=true
    this.serv.carregarOrcadosTotais(this.AguaEsgoSelect,mes,mes,this.VersoesSelected.id).subscribe(
      resp=>{
        this.Totais = resp
        this.carregando=false
      }
    )
  }
  dataAtualFormatada(data:Date){
    var dia  = data.getDate().toString(),
        diaF = (dia.length == 1) ? '0'+dia : dia,
        mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
        mesF = (mes.length == 1) ? '0'+mes : mes,
        anoF = data.getFullYear();
    return anoF+"-"+mesF+"-"+diaF;
  }
}
