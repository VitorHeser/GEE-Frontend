import { Component, OnInit, Input } from '@angular/core';
import { MessageService } from 'primeng/api';
import { SeteserviceService } from '../seteservice.service';

@Component({
  selector: 'app-view2',
  templateUrl: './view2.component.html',
  styleUrls: ['./view2.component.css']
})
export class View2Component implements OnInit {

  

  calculos: any[];

  empresas: any[]=[];

  ano
  
  loading=false 

  todasMigracoesAcl
  efeitoMedioACL
  SETERealizadoACR
  Empsas
  
  @Input() ver:any;


  arrayCompletoParaTabela1 = []
  totaisCompletoParaTabela1 = []

  constructor(private messageService: MessageService, private serv: SeteserviceService) { }
  atribuirpermdash=true
  clickperm(){
    this.loading=false
    setTimeout(() => {  
      this.loading=true 
    }, 200);
  }
  ngOnInit() {
    this.serv.MigracoesACLAll().subscribe(
      res=>{
        this.todasMigracoesAcl=res
      }
    )
    this.serv.Reajustes().subscribe(
      res=>{
        this.efeitoMedioACL=res
      }
    )
    this.serv.RealizadoACRAnterior().subscribe(
      res=>{
        this.SETERealizadoACR=res
      }
    )
    this.serv.calculosdeversao(this.ver.id).subscribe(
      res=>{
        this.arrayCompletoParaTabela1=[]
        this.calculos = res
        this.ano = res[0].ver.anoInicio
        this.ver = res[0].ver

        this.serv.Unidades().subscribe(
          res=>{
            var valor1 = 0
            var valor2 = 0
            var valor3 = 0
            for(var i =0;i<res.length;i++){
              valor1 = this.procurarMediaPond(res[i],this.ano)*res[i].distribuicao + valor1
              valor2 = this.procurarMediaPond(res[i],this.ano+1)*res[i].distribuicao + valor2
              valor3 = this.procurarMediaPond(res[i],this.ano+2)*res[i].distribuicao + valor3
            
            }
            this.totaisCompletoParaTabela1[1]={
              efeitomedioacr: 0,
              efeitomediores1: valor1,
              efeitomediores2: valor2,
              efeitomediores3: valor3
            }
          }
        )
        this.serv.UndNegocios().subscribe(
          res=>{
            // console.log(res)
            this.empresas = res.filter(function(val) {
              return val.pesoNoCusto > 0;
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
            
            console.log(this.empresas)
            for(var i =0;i<this.empresas.length;i++){
              
              var reajuste2 =this.procurarReajuste2(this.empresas[i]['empresaUndNeg'].id,this.ano,"B1")
              var reajuste =this.procurarReajuste(this.empresas[i]['empresaUndNeg'].id,this.ano,"B1")

              var propcustoACL1 =this.proporcaodeCusto(this.empresas[i],this.ano)
              var efeimedioACL1 = propcustoACL1 > 0 ? this.calcEfeitoMedioACL(this.ano) : 0 
              var propcustoACR1 =100-propcustoACL1
              var efeimedioACR1 = this.procurarMediaPond(this.empresas[i]['empresaUndNeg'],this.ano)
              var efeimedACRan1 = this.calcEfeitoACRAnterior(this.empresas[i]['empresaUndNeg'],this.ano)

              var propcustoACL2 =this.proporcaodeCusto(this.empresas[i],this.ano+1)
              var efeimedioACL2 = propcustoACL2 > 0 ? this.calcEfeitoMedioACL(this.ano+1) : 0 
              var propcustoACR2 =100-propcustoACL2
              var efeimedioACR2 = this.procurarMediaPond(this.empresas[i]['empresaUndNeg'],this.ano+1)
              var efeimedACRan2 = efeimedioACR1

              var propcustoACL3 =this.proporcaodeCusto(this.empresas[i],this.ano+2)
              var efeimedioACL3 = propcustoACL3 > 0 ? this.calcEfeitoMedioACL(this.ano+2) : 0 
              var propcustoACR3 =100-propcustoACL3
              var efeimedioACR3 = this.procurarMediaPond(this.empresas[i]['empresaUndNeg'],this.ano+2)
              var efeimedACRan3 = efeimedioACR2


              this.arrayCompletoParaTabela1.push(
                {
                  empresa: this.empresas[i].empresa,
                  ano: this.ano,
                  reajuste: reajuste2,
                  campo11: propcustoACR1,
                  campo12: propcustoACL1,
                  campo13: efeimedioACL1 ,
                  campo14: efeimedioACR1,
                  campo15: this.calculoDeEfeitoMedioResultante(
                    reajuste,
                    this.empresas[i]['empresa'],
                    efeimedioACR1,
                    efeimedACRan1,
                    efeimedioACL1,
                    propcustoACL1,
                    propcustoACR1
                  ),
                  campo21: propcustoACR2,
                  campo22: propcustoACL2,
                  campo23: efeimedioACL2 ,
                  campo24: efeimedioACR2,
                  campo25: this.calculoDeEfeitoMedioResultante(
                    reajuste,
                    this.empresas[i]['empresa'],
                    efeimedioACR2,
                    efeimedACRan2,
                    efeimedioACL2,
                    propcustoACL2,
                    propcustoACR2
                  ),
                  campo31: propcustoACR3,
                  campo32: propcustoACL3,
                  campo33: efeimedioACL3 ,
                  campo34: efeimedioACR3,
                  campo35: this.calculoDeEfeitoMedioResultante(
                    reajuste,
                    this.empresas[i]['empresa'],
                    efeimedioACR3,
                    efeimedACRan3,
                    efeimedioACL3,
                    propcustoACL3,
                    propcustoACR3
                  ),
                }
              )
            }
            var efmedioacr
            var efmediores1 = 0;
            var efmediores2 = 0;
            var efmediores3 = 0;
            
            for(var i =0;i<this.arrayCompletoParaTabela1.length;i++){
              efmediores1 = (this.arrayCompletoParaTabela1[i].campo15*(this.empresas[i].pesoNoCusto/100))+efmediores1
              efmediores2 = (this.arrayCompletoParaTabela1[i].campo25*(this.empresas[i].pesoNoCusto/100))+efmediores2
              efmediores3 = (this.arrayCompletoParaTabela1[i].campo35*(this.empresas[i].pesoNoCusto/100))+efmediores3
            }
            this.totaisCompletoParaTabela1[0]={
              efeitomedioacr: 0,
              efeitomediores1: efmediores1,
              efeitomediores2: efmediores2,
              efeitomediores3: efmediores3
            }
            this.loading =true
          }
        )
      }
    )
  }

  calcEfeitoMedioACL(ano){
    var valor= 0
    var dados = this.efeitoMedioACL.filter(function(valor){ return valor.ano==ano}) 
    if(dados.length>0){
      valor = dados[0].porcentagemACL
    }
    return valor
  }

  calcEfeitoACRAnterior(Empresa, ano){
    var valor= 0
    var dados = this.SETERealizadoACR.filter(function(valor){ return valor.ano==(ano-1) && valor.empresaACR.id == Empresa.id}) 
    if(dados.length>0){
      valor = dados[0].realizado
    }
    return valor
  }

  proporcaodeCusto(empresa,ano){
    var valor= 0
    var dados = this.todasMigracoesAcl.filter(function(valor){ return valor.ano==ano && valor.undnegocio.id == empresa.id }) 
    if(dados.length>0){
      valor = dados[0].porcentagemACL
    }
    return valor
  }

  calculoDeEfeitoMedioResultante(reajuste,empresa, efeitoMedioACR,efeitoMedioACRAnterior, efeitoMedioACL, PropCustoACL, PropCustoACR){
    // console.log(empresa.empresa)
    efeitoMedioACR = efeitoMedioACR/100;
    efeitoMedioACL = efeitoMedioACL/100;
    PropCustoACR = PropCustoACR/100;
    PropCustoACL = PropCustoACL/100;
    efeitoMedioACRAnterior = efeitoMedioACRAnterior/100;

    var valorFinal=0
    if(reajuste !=null){
      var porcmes = (13-reajuste.substring(3,5))/12 
      var mespassado = 0.0707
  
  
      var passo1 = (efeitoMedioACR*PropCustoACR)*porcmes
      var passo2 = (efeitoMedioACL*PropCustoACL)
      var passo3 = ((PropCustoACR*efeitoMedioACRAnterior)*(1-porcmes))
      valorFinal = (passo1+passo2+passo3)*100
    }
    
    
    return valorFinal
  }

  

  //===============================================================================================================================
  // Cálculos da V3

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

    var val = valor != null ? valor.substring(8,10)+"/"+valor.substring(5,7)+"/"+valor.substring(0,4) : null
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
  procurarReajusteMili(idEmpresa,Ano, grupo){
    var valor = null
    for(var i =0;i<this.calculos.length;i++){
      if(this.calculos[i].grupo==grupo && this.calculos[i].ano==Ano && this.calculos[i].empresasCalculos.id==idEmpresa){
        valor = this.calculos[i].dataReajuste
        break;
      }
    }
    return (valor.substring(5,7)+valor.substring(8,10))*1
  }


  ponderadaTotais(arrayAno,empresas){
    var valor = 0
    for(var i =0;i<arrayAno.length;i++){
      valor = valor+(arrayAno[i].Ponderada * empresas[i].distribuicao)
    }
    return valor
  }

}
