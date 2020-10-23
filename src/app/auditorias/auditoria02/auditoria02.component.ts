import { Component, OnInit, Input } from '@angular/core';
import { AuditoriasService } from '../auditorias.service';
import { CsvDataService } from 'src/app/csv-data.service';

@Component({
  selector: 'app-auditoria02',
  templateUrl: './auditoria02.component.html',
  styleUrls: ['./auditoria02.component.css']
})
export class Auditoria02Component implements OnInit {
  
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
    this.servic.auditoria2(string).subscribe(
      response=>{
        this.RelatorioDeDivergencias=response
        console.log(response)
        this.carregado=true
      }
    )
  }
  extraircsv(){
    CsvDataService.exportToCsv('Auditoria2.csv',this.RelatorioDeDivergencias)
  }
}
