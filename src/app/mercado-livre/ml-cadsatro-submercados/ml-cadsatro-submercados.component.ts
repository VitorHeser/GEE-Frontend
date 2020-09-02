import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { MercadolivreserviceService } from '../mercadolivreservice.service';

@Component({
  selector: 'app-ml-cadsatro-submercados',
  templateUrl: './ml-cadsatro-submercados.component.html',
  styleUrls: ['./ml-cadsatro-submercados.component.css']
})
export class MLCadsatroSubmercadosComponent implements OnInit {

  displayDialog: boolean;

  unidade: any;

  selectedunidade: any;

  newunidade: boolean;

  unidades: any[];

  cols: any[];

  idshow: boolean = true;

  constructor(private messageService: MessageService, private serv: MercadolivreserviceService) { }

  ngOnInit() {
      this.serv.Submercados().subscribe(
        result=>{
          console.log(result)
          this.unidades = result
        }
      );

      this.cols = [
        { field: 'id', header: 'Id'},
        { field: 'regiao', header: 'Região' },
        { field: 'submercado', header: 'Submercado' },
      ];
  }

  showDialogToAdd() {
      this.idshow = false
      this.newunidade = true;
      this.unidade = this.Unidadenull()
      this.displayDialog = true;
  }

  save() {
    this.serv.SubmercadosUpdateNew(this.selectedunidade).subscribe(
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
      this.serv.SubmercadosDelete(this.selectedunidade).subscribe(
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
      regiao:  null,
      submercado:  null
    }
    return unid;
  }

}
