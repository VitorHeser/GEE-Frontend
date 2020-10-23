import { Component, OnInit, Input } from '@angular/core';
import { AuditoriasService } from '../auditorias.service';
import { CsvDataService } from 'src/app/csv-data.service';

@Component({
  selector: 'app-auditoria06',
  templateUrl: './auditoria06.component.html',
  styleUrls: ['./auditoria06.component.css']
})
export class Auditoria06Component implements OnInit {

  constructor(private servic:AuditoriasService) { }

  @Input() data
  RelatorioDeDivergencias=[]
  carregado = false
  cols=[]

  ngOnInit() {
    this.cols = [
      { field: 'Timestamp', header: 'Correção' },
      { field: 'Mes', header: 'Referencia' },
      { field: 'Fatura', header: 'Fatura' },
      { field: 'SerieNF', header: 'Contrato' },
      { field: 'uc', header: 'UC' },
      { field: 'observacao', header: 'Observação' },
    ];
    this.carregar()
  }

  carregar(){
    var string =this.data;
    console.log(string)
    this.servic.auditoria6(string).subscribe(
      response=>{
        this.RelatorioDeDivergencias=response
        console.log(response)
        this.carregado=true
      }
    )
  }
  extraircsv(){
    CsvDataService.exportToCsv('Auditoria6.csv',this.RelatorioDeDivergencias)
  }

}
