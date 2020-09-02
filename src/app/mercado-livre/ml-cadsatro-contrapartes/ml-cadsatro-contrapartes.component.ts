import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { MercadolivreserviceService } from '../mercadolivreservice.service';

@Component({
  selector: 'app-ml-cadsatro-contrapartes',
  templateUrl: './ml-cadsatro-contrapartes.component.html',
  styleUrls: ['./ml-cadsatro-contrapartes.component.css']
})
export class MLCadsatroContrapartesComponent implements OnInit {

 
  displayDialog: boolean;

  unidade: any;

  selectedunidade: any;

  newunidade: boolean;

  unidades: any[];

  cols: any[];

  idshow: boolean = true;

  constructor(private messageService: MessageService, private serv: MercadolivreserviceService) { }

  ngOnInit() {
      this.serv.ContraPartes().subscribe(
        result=>{
          console.log(result)
          this.unidades = result
        }
      );

      this.cols = [
        { field: 'razaoSocial', header: 'Razão Social', width: "5px"},
        { field: 'cnpj', header: 'CNPJ' },
        { field: 'contato1', header: 'Contato 1' },
        { field: 'contato2', header: 'Contato 2', width: "5px" },
        { field: 'contato3', header: 'Contato 3', width: "5px" },
      ];
  }

  showDialogToAdd() {
      this.idshow = false
      this.newunidade = true;
      this.unidade = this.Unidadenull()
      this.displayDialog = true;
  }

  save() {
    this.serv.ContraPartesUpdateNew(this.selectedunidade).subscribe(
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
      this.serv.ContraPartesDelete(this.selectedunidade).subscribe(
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
