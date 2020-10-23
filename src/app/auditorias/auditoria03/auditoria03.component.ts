import { Component, OnInit, Input } from '@angular/core';
import { AuditoriasService } from '../auditorias.service';
import { CsvDataService } from 'src/app/csv-data.service';

@Component({
  selector: 'app-auditoria03',
  templateUrl: './auditoria03.component.html',
  styleUrls: ['./auditoria03.component.css']
})
export class Auditoria03Component implements OnInit {
  
  constructor(private servic:AuditoriasService) { }
  
  @Input() data
  RelatorioDeDivergencias=[]
  carregado = false
  cols=[]

  ngOnInit() {
    this.cols = [
      { field: 'mesReferencia', header: 'Referencia' },
      { field: 'fatura', header: 'Fatura' },
      { field: 'parte', header: 'Contrato' },
      { field: 'uc', header: 'UC' },
      { field: 'parte', header: 'Parte' },
      { field: 'valorTotalDaFatura', header: 'Valor' },
      { field: 'consumoTotal', header: 'Consumo' },
      { field: 'logERP', header: 'LogERP' }
    ];
    this.carregar()
  }

  carregar(){
    var string =this.data;
    console.log(string)
    this.servic.auditoria3(string).subscribe(
      response=>{
        this.RelatorioDeDivergencias=response
        console.log(response)
        this.carregado=true
      }
    )
  }
  extraircsv(){
    CsvDataService.exportToCsv('Auditoria3.csv',this.RelatorioDeDivergencias)
  }
}
