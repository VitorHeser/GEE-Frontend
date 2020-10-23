import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { MercadolivreserviceService } from '../mercadolivreservice.service';

@Component({
  selector: 'app-ml-cadsatro-contratos',
  templateUrl: './ml-cadsatro-contratos.component.html',
  styleUrls: ['./ml-cadsatro-contratos.component.css']
})
export class MLCadsatroContratosComponent implements OnInit {

 
  displayDialog: boolean;

  unidade: any;

  selectedunidade: any;

  newunidade: boolean;

  unidades: any[];
  ContraPartes: any[];

  cols: any[];

  idshow: boolean = true;

  constructor(private messageService: MessageService, private serv: MercadolivreserviceService) { }

  ngOnInit() {
    this.serv.ContraPartes().subscribe(
      result=>{
        this.ContraPartes = result
      }
    );
      this.serv.Contratos().subscribe(
        result=>{
          this.unidades = result
        }
      );

      this.cols = [
        { field: 'nome',                   header: 'Nome do Contrato' },
        { field: 'DataInicioFornecimento', header: 'Data de Início'},
        { field: 'DataFimFornecimento',    header: 'Data de Fim'   },
      ];
  }

  showDialogToAdd() {
      this.idshow = false
      this.newunidade = true;
      this.selectedunidade = this.Unidadenull()
      this.displayDialog = true;
  }

  save() {
    this.serv.ContratosUpdateNew(this.UnidadeCorrigida(this.selectedunidade)).subscribe(
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
      this.serv.ContratosDelete(this.selectedunidade).subscribe(
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
      dataInicioFornecimento:  null,
      dataFimFornecimento:  null,
      nome:  null,
      contraparte:  this.ContraPartes[0],
    }
    return unid;
  }
  UnidadeCorrigida(unid): any {
    var unid:any =
    {
      id: unid.id,
      dataInicioFornecimento:  unid.DataInicioFornecimento,
      dataFimFornecimento:  unid.DataFimFornecimento,
      nome:  unid.nome,
      contraparte:  unid.contraparte.id,
    }
    return unid;
  }
}
