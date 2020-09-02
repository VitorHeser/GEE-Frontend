import { Component, OnInit, Input } from '@angular/core';
import { MessageService } from 'primeng/api';
import { SeteserviceService } from '../../seteservice.service';

@Component({
  selector: 'app-view-analise',
  templateUrl: './view-analise.component.html',
  styleUrls: ['./view-analise.component.css']
})
export class ViewAnaliseComponent implements OnInit {

  constructor(private messageService: MessageService, private serv: SeteserviceService) { }


  // calculos: any[];

  @Input() empresas: any[];
  @Input() ano;
  @Input() calculos;
  @Input() tipoDeDados;
  
  loading=false 

  arrayCompletoParaTabela1 = []
  arrayCompletoParaTabela2 = []
  arrayCompletoParaTabela3 = []
  arrayCompletoParaTabela4 = []
  arrayTotais = []


  ngOnInit() {
    this.loading =true
    this.arrayCompletoParaTabela1 = []
    this.arrayCompletoParaTabela2 = []
    this.arrayCompletoParaTabela3 = []
    this.arrayCompletoParaTabela4 = []
    
    for(var i =0;i<this.empresas.length;i++){
      this.arrayCompletoParaTabela1.push(
        {
          empresa: this.empresas[i].empresa,
          ano: this.ano,
          B1: this.procurarEmpresa(this.empresas[i]['id'],this.ano,"B1"),
          A2: this.procurarEmpresa(this.empresas[i]['id'],this.ano,"A2"),
          A3: this.procurarEmpresa(this.empresas[i]['id'],this.ano,"A3"),
          A4: this.procurarEmpresa(this.empresas[i]['id'],this.ano,"A4"),
          Ponderada: this.procurarMediaPond(this.empresas[i],this.ano),
        }
      )
      this.arrayCompletoParaTabela2.push(
        {
          empresa: this.empresas[i].empresa,
          ano: this.ano+1,
          B1: this.procurarEmpresa(this.empresas[i]['id'],this.ano+1,"B1"),
          A2: this.procurarEmpresa(this.empresas[i]['id'],this.ano+1,"A2"),
          A3: this.procurarEmpresa(this.empresas[i]['id'],this.ano+1,"A3"),
          A4: this.procurarEmpresa(this.empresas[i]['id'],this.ano+1,"A4"),
          Ponderada: this.procurarMediaPond(this.empresas[i],this.ano+1),
        }
      )
      this.arrayCompletoParaTabela3.push(
        {
          empresa: this.empresas[i].empresa,
          ano: this.ano+1,
          B1: this.procurarEmpresa(this.empresas[i]['id'],this.ano+2,"B1"),
          A2: this.procurarEmpresa(this.empresas[i]['id'],this.ano+2,"A2"),
          A3: this.procurarEmpresa(this.empresas[i]['id'],this.ano+2,"A3"),
          A4: this.procurarEmpresa(this.empresas[i]['id'],this.ano+2,"A4"),
          Ponderada: this.procurarMediaPond(this.empresas[i],this.ano+2),
        }
      )
      this.arrayCompletoParaTabela4.push(
        {
          empresa: this.empresas[i].empresa,
          ano: this.ano+1,
          B1: this.procurarEmpresa(this.empresas[i]['id'],this.ano+3,"B1"),
          A2: this.procurarEmpresa(this.empresas[i]['id'],this.ano+3,"A2"),
          A3: this.procurarEmpresa(this.empresas[i]['id'],this.ano+3,"A3"),
          A4: this.procurarEmpresa(this.empresas[i]['id'],this.ano+3,"A4"),
          Ponderada: this.procurarMediaPond(this.empresas[i],this.ano+3),
        }
      )


    }
    this.arrayTotais[0]= (this.ponderadaTotais(this.arrayCompletoParaTabela1,this.empresas))
    this.arrayTotais[1]= (this.ponderadaTotais(this.arrayCompletoParaTabela2,this.empresas))
    this.arrayTotais[2]= (this.ponderadaTotais(this.arrayCompletoParaTabela3,this.empresas))
    this.arrayTotais[3]= (this.ponderadaTotais(this.arrayCompletoParaTabela4,this.empresas))

  }
  procurarEmpresa(idEmpresa,Ano, grupo){
    var valor = 0.0
    for(var i =0;i<this.calculos.length;i++){
      if(this.calculos[i].grupo==grupo && this.calculos[i].ano==Ano && this.calculos[i].empresasCalculos.id==idEmpresa){
        valor = this.calculos[i].variacao
        break;
      }
    }
    var increment = this.tipoDeDados >0 ? "%" : ""
    var val = valor==0 ? "-": valor.toLocaleString(undefined, {minimumFractionDigits: 2,maximumFractionDigits: 2}) + increment
    return val; 
  }
  procurarReajuste(idEmpresa,Ano, grupo){
    var valor = null
    for(var i =0;i<this.calculos.length;i++){
      if(this.calculos[i].grupo==grupo && this.calculos[i].ano==Ano && this.calculos[i].empresasCalculos.id==idEmpresa){
        valor = this.calculos[i].dataReajuste
        break;
      }
    }

    var val = valor != null ? valor.substring(8,10)+"/"+valor.substring(5,7)+"/"+valor.substring(0,4) : null
    return val; 
  }

  

  procurarMediaPond(Empresa,Ano){
    var b1
    var a2
    var a3
    var a4
    for(var i =0;i<this.calculos.length;i++){
      if(this.calculos[i].ano==Ano && this.calculos[i].empresasCalculos.id==Empresa.id){
        if(this.calculos[i].grupo=="B1"){
          b1 = this.calculos[i].variacao
        }
        if(this.calculos[i].grupo=="A2"){
          a2 = this.calculos[i].variacao
        }
        if(this.calculos[i].grupo=="A3"){
          a3 = this.calculos[i].variacao
        }
        if(this.calculos[i].grupo=="A4"){
          a4 = this.calculos[i].variacao
        }
        
      }
    }
    
    var valorMediaPonderada = (b1*Empresa.usoB1) +(a2*Empresa.usoA2) +(a3*Empresa.usoA3) +(a4*Empresa.usoA4)

    return valorMediaPonderada; 
  }


  ponderadaTotais(arrayAno,empresas){
    var valor = 0
    for(var i =0;i<arrayAno.length;i++){
      valor = valor+(arrayAno[i].Ponderada * empresas[i].distribuicao)
    }
    return valor
  }


}
