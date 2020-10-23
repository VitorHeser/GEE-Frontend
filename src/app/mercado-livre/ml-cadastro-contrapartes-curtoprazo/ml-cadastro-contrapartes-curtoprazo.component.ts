import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { MercadolivreserviceService } from '../mercadolivreservice.service';

@Component({
  selector: 'app-ml-cadastro-contrapartes-curtoprazo',
  templateUrl: './ml-cadastro-contrapartes-curtoprazo.component.html',
  styleUrls: ['./ml-cadastro-contrapartes-curtoprazo.component.css']
})
export class MlCadastroContrapartesCurtoprazoComponent implements OnInit {

  displayDialog: boolean;

  unidade: any;

  selectedunidade: any;

  newunidade: boolean;

  unidades: any[];

  cols: any[];

  idshow: boolean = true;

  constructor(private messageService: MessageService, private serv: MercadolivreserviceService) { }

  ngOnInit() {
      this.serv.ContraPartesCurtoPrazo().subscribe(
        result=>{
          console.log(result)
          this.unidades = result
        }
      );

      this.cols = [
        { field: 'razaoSocial', header: 'Razão Social', width: "5px"},
        { field: 'cnpj', header: 'CNPJ' },
        { field: 'idFornecedorSap', header: 'Cód. SAP' },
        { field: 'statusDDI', header: 'DDI', width: "5px" },
        { field: 'dataDDI', header: 'Data DDI', width: "5px" },
        { field: 'dataQuestionario', header: 'Data Questionário', width: "5px" },
        { field: 'dataValidade', header: 'Data de Validade', width: "5px" },
      ];
  }

  showDialogToAdd() {
      this.idshow = false
      this.newunidade = true;
      this.unidade = this.Unidadenull()
      this.displayDialog = true;
  }

  save() {
    this.serv.ContraPartesCurtoPrazoUpdateNew(this.selectedunidade).subscribe(
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
      this.serv.ContraPartesCurtoPrazoDelete(this.selectedunidade).subscribe(
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
      RazaoSocial:  null,
      CNPJ:  null,
      Endereco:  null,
      Contato1:  null,
      Contato2:  null,
      Contato3:  null,
    }
    return unid;
  }

}
