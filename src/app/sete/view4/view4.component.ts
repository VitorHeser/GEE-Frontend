import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { SeteserviceService } from '../seteservice.service';

@Component({
  selector: 'app-view4',
  templateUrl: './view4.component.html',
  styleUrls: ['./view4.component.css']
})
export class View4Component implements OnInit {
  
  ArraysVersoestitles=[]
  ArraysVersoes=[]
  CompararOk = false
  empresas
  empresasSelecionadas

  versoes
  versao1=null
  versao2=null

  ano

  constructor(private messageService: MessageService, private serv: SeteserviceService) { }

  ngOnInit() {
    this.serv.Versoes().subscribe(
      res=>{
        this.versoes = res
        this.versao1=res[0]
        this.versao2=res[1]
      }
    )
    this.serv.Unidades().subscribe(
      res=>{
        this.empresas = res.filter(function(val) {
          return val.distribuicao > 0;
        });
        this.empresasSelecionadas = this.empresas
      }
    );
  }
  

  CalcularEmVersoes(){
    this.ArraysVersoestitles=[]
    if(this.versao1==null && this.versao2==null){
      this.messageService.add({severity: 'warn', summary: 'Preencha as versões', detail: "Falta preencher alguma versão"});
    }else{
      this.ano= this.versao1.anoInicio
      this.ArraysVersoestitles=[]
      this.ArraysVersoestitles.push([])
      this.ArraysVersoestitles.push(this.versao1)
      this.ArraysVersoestitles.push(this.versao2)
      this.serv.ComparativoDeVersao(this.versao1.id, this.versao2.id).subscribe(
        res=>{
          this.ArraysVersoes =res
          this.CompararOk=true
          this.reloadTables=true 
        }
      )
    }
  }
  reloadTables=false
  
  reload(){
    this.reloadTables=false
    console.log(this.empresasSelecionadas)
    setTimeout(() => {  
      this.reloadTables=true 
    }, 200);

  }

}