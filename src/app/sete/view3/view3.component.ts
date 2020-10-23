import { Component, OnInit, Input } from '@angular/core';
import { SeteserviceService } from '../seteservice.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-view3',
  templateUrl: './view3.component.html',
  styleUrls: ['./view3.component.css']
})
export class View3Component implements OnInit {


  calculos: any[];

  empresas: any[];

  ano
  
  loading=false 

  @Input() ver:any;


  arrayCompletoParaTabela1 = []
  arrayCompletoParaTabela2 = []
  arrayCompletoParaTabela3 = []
  arrayCompletoParaTabela4 = []
  arrayTotais = []

  constructor(private messageService: MessageService, private serv: SeteserviceService) { }

  ngOnInit() {
    this.serv.calculosdeversao(this.ver.id).subscribe(
      res=>{
        this.calculos = res
        this.ano = res[0].ver.anoInicio
        this.ver = res[0].ver
        this.loading =true
        console.log(res)
        this.serv.Unidades().subscribe(
          res=>{
            this.arrayCompletoParaTabela1 = []
            this.arrayCompletoParaTabela2 = []
            this.arrayCompletoParaTabela3 = []
            this.arrayCompletoParaTabela4 = []

            this.empresas = res.filter(function(val) {
              return val.distribuicao > 0;
            });
            for(var i =0;i<this.empresas.length;i++){
              this.empresas[i].reajuste =this.procurarReajusteMili(this.empresas[i].id,this.ano,"B1")
            }
            this.empresas = this.empresas.sort(
              function(a,b){
                var reaj1 = a.reajuste
                var reaj2 = b.reajuste
                if (reaj1 < reaj2) { 
                  return -1; 
                }if (reaj1 > reaj2) { 
                  return 1; 
                }
              return 0;
              }
            );


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
            console.log(this.arrayCompletoParaTabela1)
            this.arrayTotais[0]= (this.ponderadaTotais(this.arrayCompletoParaTabela1,this.empresas))
            this.arrayTotais[1]= (this.ponderadaTotais(this.arrayCompletoParaTabela2,this.empresas))
            this.arrayTotais[2]= (this.ponderadaTotais(this.arrayCompletoParaTabela3,this.empresas))
            this.arrayTotais[3]= (this.ponderadaTotais(this.arrayCompletoParaTabela4,this.empresas))
          }
        )
      }
    )
  }


  procurarEmpresa(idEmpresa,Ano, grupo){
    var valor = 0.0
    for(var i =0;i<this.calculos.length;i++){
      if(this.calculos[i].grupo==grupo && this.calculos[i].ano==Ano && this.calculos[i].empresasCalculos.id==idEmpresa){
        valor = this.calculos[i].variacao
        break;
      }
    }
    return valor.toLocaleString(undefined, {minimumFractionDigits: 2,maximumFractionDigits: 2}) + "%"; 
  }
  procurarReajuste(idEmpresa,Ano, grupo){
    var valor = null
    for(var i =0;i<this.calculos.length;i++){
      if(this.calculos[i].grupo==grupo && this.calculos[i].ano==Ano && this.calculos[i].empresasCalculos.id==idEmpresa){
        valor = this.calculos[i].dataReajuste
        break;
      }
    }

    var val = valor != null ?  valor.substring(8,10)+"/"+valor.substring(5,7)+"/"+valor.substring(0,4) : null
    return val; 
  }
  procurarReajuste2(idEmpresa,Ano, grupo){
    var valor = null
    for(var i =0;i<this.calculos.length;i++){
      if(this.calculos[i].grupo==grupo && this.calculos[i].ano==Ano && this.calculos[i].empresasCalculos.id==idEmpresa){
        valor = this.calculos[i].dataReajuste
        break;
      }
    }
    var mes = valor === null ?  null : valor.substring(5,7)*1
    var messtr = ""
    switch(mes){
      case 1: messtr="jan" 
        break;
      case 2: messtr="fev" 
        break;
      case 3: messtr="mar" 
        break;
      case 4: messtr="abr" 
        break;
      case 5: messtr="mai" 
        break;
      case 6: messtr="jun" 
        break;
      case 7: messtr="jul" 
        break;
      case 8: messtr="ago" 
        break;
      case 9: messtr="set" 
        break;
      case 10: messtr="out" 
        break;
      case 11: messtr="nov" 
        break;
      case 12: messtr="dez" 
        break;
    }

    var val = valor != null ?  valor.substring(8,10)+"-"+messtr : null

    return val; 
  }
  procurarReajusteMili(idEmpresa,Ano, grupo){
    var valor = null
    for(var i =0;i<this.calculos.length;i++){
      if(this.calculos[i].grupo==grupo && this.calculos[i].ano==Ano && this.calculos[i].empresasCalculos.id==idEmpresa){
        valor = this.calculos[i].dataReajuste
        break;
      }
    }
    // console.log(valor.substring(0,4)+"-"+valor.substring(5,7)+"-"+valor.substring(8,10))
    return valor!=null ? (valor.substring(5,7)+valor.substring(8,10))*1 : ""
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
