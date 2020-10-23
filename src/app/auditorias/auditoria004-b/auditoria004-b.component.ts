import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Auditoria004bService } from './auditoria004b.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CsvDataService } from 'src/app/csv-data.service';

@Component({
  selector: 'app-auditoria004-b',
  templateUrl: './auditoria004-b.component.html',
  animations: [
      trigger('rowExpansionTrigger', [
          state('void', style({
              transform: 'translateX(-10%)',
              opacity: 0
          })),
          state('active', style({
              transform: 'translateX(0)',
              opacity: 1
          })),
          transition('* <=> *', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
      ])
  ]
})
export class Auditoria004BComponent implements OnInit {

  date1=new Date();
  date2=new Date();
  unidades=[]
  unidadesSelect=[]

  carregando=false
  loading=false
  suprimirZeros = false//Check de suprimir zerados
  pintarZeros = false//Check de pintar zerados
  
  dadosDoArray=[]

  columns=[]
  eixo=[]

  constructor(private messageService: MessageService,private servic:Auditoria004bService) { }

  ngOnInit() {
    this.columns.push({ field: 'unidade', header: 'Unidade' })
    this.servic.unidades().subscribe(
      resp=>{
        for(var i =0;i<resp.length;i++){
          this.unidades.push({label: resp[i],value: resp[i]})
        }
      }
    )
  }

  Procurar(){
    this.carregando=true
    this.loading=true
    if(this.unidadesSelect==null){
      this.messageService.add({severity: 'warn', summary: 'Campos', detail: "Os Campos Data Inicio, Data Fim e Unidades são obrigatórios"});
    }else{
      this.loading = true
      this.carregando=true
      this.dadosDoArray=[]
      if(this.unidadesSelect!==null){
        this.servic.Array(this.dataAtualFormatada(this.date1),this.dataAtualFormatada(this.date2),this.unidadesSelect).subscribe(
          resp=>{
            this.eixo = resp[0].eixo
            for(var i =0;i<resp.length;i++){
              var obj = JSON.parse(resp[i].json)
              this.dadosDoArray.push({ unidade: resp[i].unidade , json: obj })
            }
            this.loading=false
          }
        )
      }
    }
  }

  dataAtualFormatada(data:Date){
    var dia  = data.getDate().toString(),
        diaF = (dia.length == 1) ? '0'+dia : dia,
        mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
        mesF = (mes.length == 1) ? '0'+mes : mes,
        anoF = data.getFullYear();
    return anoF+"-"+mesF+"-01";
  }
  extraircsv(){
    this.loading=true
    var array = []
    for(var i =0;i<this.dadosDoArray.length;i++){
      var o = this.dadosDoArray[i]
      
      for(var j=0;j<o.json.length;j++){
        var dados = {
          unidade: o.unidade,
          tipo_indicador: o.json[j].tipoindic,
          indicador: o.json[j].indic
        }
        for(var k =0;k<this.eixo.length;k++){
          dados[this.eixo[k]] = o.json[j][this.eixo[k]].toLocaleString(undefined, {minimumFractionDigits: 2,maximumFractionDigits: 2})
        }
        array.push(dados)
      }
    }
    CsvDataService.exportToCsv('Relatorio.csv',array)
    this.loading=false
  }
}
