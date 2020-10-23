import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { MercadolivreserviceService } from '../mercadolivreservice.service';

@Component({
  selector: 'app-ml-cadsatro-produtos',
  templateUrl: './ml-cadsatro-produtos.component.html',
  styleUrls: ['./ml-cadsatro-produtos.component.css']
})
export class MLCadsatroProdutosComponent implements OnInit {


  displayDialog: boolean;

  unidade: any;
  unidadeclone: any;

  selectedunidade: any;

  newunidade: boolean;

  unidades: any[];
  ContraPartes: any[];
  Submercados: any[];

  cols: any[];

  
  idshow: boolean = true;

  ContratoSelect
  SubmercSelect

  constructor(private messageService: MessageService, private serv: MercadolivreserviceService) { }

  ngOnInit() {
    this.serv.Contratos().subscribe(
      result=>{
        this.ContraPartes = result
      }
    );
    this.serv.Submercados().subscribe(
      result=>{
        this.Submercados = result
      }
    );
      this.serv.Produtos().subscribe(
        result=>{
          this.unidades = result
          this.unidadeclone = result
        }
      );

      this.cols = [
        { field: 'tipoDeEnergia',          header: 'Tipo de Energia' },
        { field: 'DataInicioFornecimento', header: 'Data de Início'},
        { field: 'DataFimFornecimento',    header: 'Data de Fim'   },
        { field: 'volumeTotal',            header: 'Volume (MWm)'},
        { field: 'flexibilidade',          header: 'Flex (%)/100'},
      ];
  }

  AtualizarContrato(){
    var contrato = this.ContratoSelect
    this.unidades = this.unidadeclone.filter(function(e){
      return contrato.id == e.contratos.id
    })
  }
  AtualizarSubmercado(){
    var submercados = this.SubmercSelect
    this.unidades = this.unidadeclone.filter(function(e){
      return submercados.id == e.submercado.id
    })
  }
  ResetFiltro(){
    this.ContratoSelect = null
    this.SubmercSelect = null
    this.unidades = this.unidadeclone
  }

  showDialogToAdd() {
      this.idshow = false
      this.newunidade = true;
      this.selectedunidade = this.Unidadenull()
      this.displayDialog = true;
  }

  save() {
    this.selectedunidade = this.UnidaConvert(this.selectedunidade)
    this.serv.ProdutosUpdateNew(this.selectedunidade).subscribe(
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
      this.serv.ProdutosDelete(this.selectedunidade).subscribe(
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

  cloneunidade(c: any): any {
      let unid=c;
      return unid;
  }

  Unidadenull(): any {
    var unid:any =
    {
      id: 0,
      tipoDeEnergia: null,
      flexibilidade: 0,
      dataInicioFornecimento: null,
      DataInicioFornecimento: null,
      dataFimFornecimento: null,
      DataFimFornecimento: null,
      contratos: this.ContraPartes[0],
      modulacao: null,
      volumeTotal: 0,
      mesDeReajuste: null,
      submercado: this.Submercados[0],
      sazonalidade: null
    }
    return unid;
  }

  UnidaConvert(und): any {
    var unid:any =
    {
      id: und.id,
      tipoDeEnergia: und.tipoDeEnergia,
      flexibilidade: und.flexibilidade,
      dataInicioFornecimento: und.DataInicioFornecimento.length<14 ? this.dataAtualFormatada(new Date(this.convert(und.DataInicioFornecimento))) : this.dataAtualFormatada(und.DataInicioFornecimento),
      dataFimFornecimento:  und.DataFimFornecimento.length<14 ? this.dataAtualFormatada(new Date(this.convert(und.DataFimFornecimento))) : this.dataAtualFormatada(und.DataFimFornecimento),
      contratos: und.contratos.id,
      modulacao: und.modulacao,
      volumeTotal: und.volumeTotal,
      mesDeReajuste: und.MesDeReajuste.length<14 ? this.dataAtualFormatada(new Date(this.convert(und.MesDeReajuste))) : this.dataAtualFormatada(und.MesDeReajuste),
      submercado: und.submercado.id,
      sazonalidade: und.sazonalidade
    }
    return unid;
  }


  //============================================================================================
  convert(dat){
    return dat.substring(6,10)+"-"+dat.substring(3,5)+"-"+dat.substring(0,2)+"T00:00:00"
  }
  media(arr){
    var total = 0
    for(var i =0;i<arr.length;i++){
      total += arr[i]
    }
    return total/arr.length
  }
  dataAtualFormatada(data:Date){
    var dia  = data.getDate().toString(),
        diaF = (dia.length == 1) ? '0'+dia : dia,
        mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
        mesF = (mes.length == 1) ? '0'+mes : mes,
        anoF = data.getFullYear(),
        hora  = (data.getHours()).toString(), //+1 pois no getMonth Janeiro começa com zero.
        horaF = (hora.length == 1) ? '0'+hora : hora,
        min  = (data.getMinutes()).toString(), //+1 pois no getMonth Janeiro começa com zero.
        minF = (min.length == 1) ? '0'+min : min;
    return anoF+"-"+mesF+"-"+diaF;
  }
}
