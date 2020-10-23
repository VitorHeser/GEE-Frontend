import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { SeteserviceService } from '../seteservice.service';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css']
})
export class EmpresasComponent implements OnInit {

  displayDialog: boolean;

  unidade: any;

  selectedunidade: any;

  newunidade: boolean;

  unidades: any[];

  cols: any[];

  idshow: boolean = true;

  constructor(private messageService: MessageService, private serv: SeteserviceService) { }

  ngOnInit() {
      this.serv.Unidades().subscribe(
        result=>{
          this.unidades = result
          this.CarregarRealizadoACR()
        }
      );

      this.cols = [
          { field: 'id', header: 'id' },
          { field: 'empresa', header: 'empresa' },
          { field: 'distribuicao', header: '% de Utilização' },
          { field: 'usoA2', header: '% uso A2' },
          { field: 'usoA3', header: '% uso A3' },
          { field: 'usoA4', header: '% uso A4' },
          { field: 'usoB1', header: '% uso B1' },
      ];
  }

  showDialogToAdd() {
      this.idshow = false
      this.newunidade = true;
      this.unidade = this.Unidadenull()
      this.displayDialog = true;
  }

  save() {
    this.serv.UnidadesUpdateNew(this.selectedunidade).subscribe(
      result=>{
        this.messageService.add({severity: 'success', summary: 'Sucesso', detail: "Unidade Adicionada/Alterada"});
      },
      error=>{
        this.messageService.add({severity: 'error', summary: 'Erro', detail: "Erro ao deletar"});
      }
    )
    this.unidade = this.Unidadenull();
    this.displayDialog = false;
  }

  delete() {
      this.serv.UnidadeDelete(this.selectedunidade).subscribe(
        result=>{
          this.messageService.add({severity: 'success', summary: 'Sucesso', detail: "Unidade Deletada"});
        },
        error=>{
          this.messageService.add({severity: 'error', summary: 'Erro', detail: "Erro ao deletar"});
        }
      )
      this.unidade = this.Unidadenull();
      this.displayDialog = false;
  }

  onRowSelect(event) {
      this.newunidade = false;
      this.unidade = this.cloneunidade(event.data);
      this.displayDialog = true;
  }

  cloneunidade(c) {
      let unid=c;
      return unid;
  }

  Unidadenull() {
    var unid =
    {
      id: null,
      empresa:  null,
      usoA2:  null,
      usoA3:  null,
      usoA4:  null,
      usoB1:  null,
    }
    return unid;
  }



  //===================================================================================
  //RealizadoACR
  RealACR
  ArrayAnos1= []
  ArrayAnos2= []
  ArrayAnos3= []
  AnoCorrente = new Date().getFullYear()

  CarregarRealizadoACR(){
    this.serv.RealizadoACRAnterior().subscribe(
      result=>{
        this.RealACR = result
        var Ano = this.AnoCorrente

        for(var i =0;i<this.unidades.length;i++){
          var empresa = this.unidades[i]
          
          //ANO ATUAL
          var AnoAtual = result.filter(function(val){ return val.empresaACR.id == empresa.id && val.ano == Ano })
          var test1 = AnoAtual.length ==0 ? this.novoArray(empresa,Ano) : AnoAtual[0]
          
          //ANO PASSADO
          var AnoPassado = result.filter(function(val){ return val.empresaACR.id == empresa.id && val.ano == (Ano-1) })
          var test2 = AnoPassado.length ==0 ? this.novoArray(empresa,Ano-1) : AnoPassado[0]
          
          //ANO PASSADO
          var AnoRetrasado = result.filter(function(val){ return val.empresaACR.id == empresa.id && val.ano == (Ano-2) })
          var test3 = AnoRetrasado.length ==0 ? this.novoArray(empresa,Ano-2) : AnoRetrasado[0]
          
          this.ArrayAnos1.push(test1)
          this.ArrayAnos2.push(test2)
          this.ArrayAnos3.push(test3)
        }
        // console.log(this.ArrayAnos1.length+" - "+this.ArrayAnos2.length+" - "+this.ArrayAnos3.length)
      }
    );

  }

  displayRealACR = false
  abrirDialogRealACR(){
    this.displayRealACR=true

  }
  

  novoArray(empresa,ano){
    return {
      id: 0,
      empresaACR: empresa,
      ano: ano,
      realizado: 0
      }
  }

  salvatudo(){
    for(var i =0;i<this.ArrayAnos1.length;i++){
      this.serv.RealizadoACRAnteriorUpdateNew(this.ArrayAnos1[i]).subscribe()
      this.serv.RealizadoACRAnteriorUpdateNew(this.ArrayAnos2[i]).subscribe()
      this.serv.RealizadoACRAnteriorUpdateNew(this.ArrayAnos3[i]).subscribe()
    }
    this.displayRealACR=false
  }
}
