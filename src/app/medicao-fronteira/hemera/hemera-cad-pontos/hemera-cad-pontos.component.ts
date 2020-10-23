import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ScdeserviceService } from 'src/app/medicao-fronteira/scde/scdeservice.service';
import { HemeraserviceService } from '../hemeraservice.service';

@Component({
  selector: 'app-hemera-cad-pontos',
  templateUrl: './hemera-cad-pontos.component.html',
  styleUrls: ['./hemera-cad-pontos.component.css']
})
export class HemeraCadPontosComponent implements OnInit {

 
  displayDialog: boolean;

  unidade: any;

  selectedunidade: any;

  newunidade: boolean;

  unidades: any[];

  cols: any[];

  idshow: boolean = true;

  constructor(private messageService: MessageService, private serv: HemeraserviceService) { }

  ngOnInit() {
      this.serv.Unidades().subscribe(
        result=>{
          console.log(result)
          this.unidades = result
        }
      );

      this.cols = [
        { field: 'medidor', header: 'Medidor Hemera', width: "5px"},
        { field: 'unidadeNegocio', header: 'Unidade de Negócio' },
        { field: 'localDeInstalacao', header: 'Local de Instalação' },
        { field: 'uc', header: 'UC', width: "5px" },
        { field: 'medidorViridis', header: 'Medidor Viridis', width: "5px" },
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

  cloneunidade(c: any): any {
      let unid=c;
      return unid;
  }

  Unidadenull(): any {
    var unid:any =
    {
      id: null,
      agente:  null,
      unidade:  null,
      medidor:  null,
      fechamento:  null,
    }
    return unid;
  }
}
