import { Component, OnInit, Input } from '@angular/core';
import { AuditoriasService } from '../auditorias.service';
import { CsvDataService } from 'src/app/csv-data.service';

@Component({
  selector: 'app-auditoria04',
  templateUrl: './auditoria04.component.html',
  styleUrls: ['./auditoria04.component.css']
})
export class Auditoria04Component implements OnInit {
  

  constructor(private servic:AuditoriasService) { }

  @Input() data
  RelatorioDeDivergencias=[]
  carregado = false
  cols=[]

  ngOnInit() {
    this.cols = [
      { field: 'DataFatura', header: 'Data da Fatura' },
      { field: 'Vencimento', header: 'Vencimento' },
      { field: 'codigoCliente', header: 'Código Cliente' },
      { field: 'referencia', header: 'Referencia' },
      { field: 'valorLiq', header: 'Valor' },
      { field: 'logERP', header: 'LogERP' }
    ];
    this.carregar()
  }

  carregar(){
    var string =this.data;
    console.log(string)
    this.servic.auditoria4(string).subscribe(
      response=>{
        this.RelatorioDeDivergencias=response
        console.log(response)
        this.carregado=true
      }
    )
  }
  extraircsv(){
    CsvDataService.exportToCsv('Auditoria4.csv',this.RelatorioDeDivergencias)
  }
}
