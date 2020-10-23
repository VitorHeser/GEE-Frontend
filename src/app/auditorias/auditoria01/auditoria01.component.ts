import { Component, OnInit, Input } from '@angular/core';
import { AuditoriasService } from '../auditorias.service';
import { CsvDataService } from 'src/app/csv-data.service';

@Component({
  selector: 'app-auditoria01',
  templateUrl: './auditoria01.component.html',
  styleUrls: ['./auditoria01.component.css']
})
export class Auditoria01Component implements OnInit {
  

  constructor(private servic:AuditoriasService) { }

  @Input() data
  RelatorioDeDivergencias=[]
  carregado = false
  cols=[]

  ngOnInit() {
    this.cols = [
        { field: 'fatura', header: 'Fatura' },
        { field: 'parte', header: 'Contrato' },
        { field: 'uc', header: 'UC' },
        { field: 'valor', header: 'Valor' },
        { field: 'consumo', header: 'Consumo' },
        { field: 'statusSap', header: 'SAP' },
        { field: 'statusViridis', header: 'Viridis' },
        { field: 'logERP', header: 'LogERP' }
    ];
    this.carregar()
  }

  carregar(){
    var string =this.data;
    console.log(string)
    this.servic.auditoria1(string).subscribe(
      response=>{
        this.RelatorioDeDivergencias=response
        console.log(response)
        this.carregado=true
      }
    )
  }
  extraircsv(){
    var arraynew =[]
    for(var i =0;i<this.RelatorioDeDivergencias.length;i++){
      arraynew.push(this.RelatorioDeDivergencias[i])
      arraynew[i].fatura = "'"+arraynew[i].fatura
      arraynew[i].consumo = arraynew[i].consumo.replace(".",",")
      arraynew[i].valor = arraynew[i].valor.replace(".",",")

    }
    CsvDataService.exportToCsv('Auditoria1.csv',arraynew)
  }
}
