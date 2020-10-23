import { Component, OnInit, ɵConsole } from '@angular/core';
import { MessageService, TreeNode } from 'primeng/api';
import { GraficosanaliticosComponent } from '../graficosanaliticos/graficosanaliticos.component';
import { HierarquiaService } from './hierarquia.service';

@Component({
  selector: 'app-dash-hierarquico',
  templateUrl: './dash-hierarquico.component.html',
  styleUrls: ['./dash-hierarquico.component.css']
})
export class DashHierarquicoComponent implements OnInit {

  constructor(private messageService: MessageService, private serv:HierarquiaService) { }

  data1: TreeNode[];

  data2: TreeNode[];

  selectedNode: TreeNode;



  date2= new Date()
  date1 = new Date(new Date().setMonth(new Date().getMonth() - 9))

  SelecaoIndicadores=[
    {label: 'kWh/m³        ', value: 'kwhm3'},
    {label: 'R$/kWh        ', value: 'rskwh'},
    {label: 'R$/m³         ', value: 'rsm3'},
    {label: 'Consumo kWh   ', value: 'consumoEnergia'},
    {label: 'Custo R$      ', value: 'custoEnergia'},
    {label: 'Volume      ',   value: 'volume'},
  ]
  IndicadoresSelected = this.SelecaoIndicadores[0]
  SelecaoAguaEsg = [
    {label: 'Água', value: 1},
    {label: 'Esgoto', value: 2}
  ];
  AguaEsgoSelect=1
  carregando


  ngOnInit() {
  }

  Relatorio

  Pesquisar(){
    this.carregando=true
    this.serv.relatorioTendencia(this.AguaEsgoSelect,this.dataAtualFormatada(this.date1),this.dataAtualFormatada(this.date2)).subscribe(
      resp=>{
        this.Relatorio = resp
        this.separarIndicadores();
        this.carregando=false
      }
    )
  }
  separarIndicadores(){
    this.carregando=true

    var RNA = this.construirTipo(this.Relatorio[10],[])

    var Prolagos = this.construirTipo(this.Relatorio[13],[])
    var Sul = this.construirTipo(this.Relatorio[10],[])
    var SP = this.construirTipo(this.Relatorio[9],[])

    var RNA = this.construirTipo(this.Relatorio[16],[])
    var ManausAmb = this.construirTipo(this.Relatorio[15],[])
    var ManConsolid = this.construirTipo(this.Relatorio[14],[ManausAmb,RNA])
    var Teresina = this.construirTipo(this.Relatorio[11],[])
    var ES = this.construirTipo(this.Relatorio[4],[])
    var NO = this.construirTipo(this.Relatorio[7],[Teresina])
    
    
    var Guariroba = this.construirTipo(this.Relatorio[12],[])
    var RO = this.construirTipo(this.Relatorio[8],[])
    var MT2 = this.construirTipo(this.Relatorio[6],[])
    var MT1 = this.construirTipo(this.Relatorio[5],[])


    var R1 = this.construirTipo(this.Relatorio[1],[MT1,MT2,RO,Guariroba])
    var R2 = this.construirTipo(this.Relatorio[2],[ES,SP,Sul,Prolagos])
    var R3 = this.construirTipo(this.Relatorio[3],[NO,ManConsolid])
    
    var Aegea = this.construirTipo(this.Relatorio[0],[R1,R2,R3])
    this.data1 = [Aegea];
    this.carregando=false
  }


  construirTipo(Item, child):any{
    var nome = Item.unidade
    var indic = this.IndicadoresSelected['value']
    var indexLength = Item[indic].length-1
    var index1 = Item[indic][0]
    var index2 = Item[indic][indexLength]
    var variacao = index2-index1
    variacao = isNaN(variacao)  || variacao == undefined || variacao == null ? 0 : variacao

    return { label: nome, type: 'person', styleClass: 'ui-person', expanded: true, data: {valor: variacao},  children:child }
  }
  indicadoresAnaliticos=false
  EmpresaSelected
  onNodeSelect(event) {
    this.indicadoresAnaliticos=true
    this.EmpresaSelected = event.node.label
    this.messageService.add({severity: 'success', summary: 'Node Selected', detail: event.node.label});
    
  }
  dataAtualFormatada(data:Date){
    var dia  = data.getDate().toString(),
        diaF = (dia.length == 1) ? '0'+dia : dia,
        mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
        mesF = (mes.length == 1) ? '0'+mes : mes,
        anoF = data.getFullYear();
    return anoF+"-"+mesF+"-01";
  }
  showDialogMaximized(dialog){
    setTimeout(() => {
      dialog.maximize();
    }, 0);
  }
}
