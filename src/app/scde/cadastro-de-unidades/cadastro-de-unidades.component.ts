import { Component, OnInit } from '@angular/core';
import { Unidade } from '../unidade.model';
import { MessageService } from 'primeng/api';
import { ScdeserviceService } from '../scdeservice.service';
import { MercadolivreserviceService } from 'src/app/mercado-livre/mercadolivreservice.service';

@Component({
  selector: 'app-cadastro-de-unidades',
  templateUrl: './cadastro-de-unidades.component.html',
  styleUrls: ['./cadastro-de-unidades.component.css']
})
export class CadastroDeUnidadesComponent implements OnInit {

 
    displayDialog: boolean;

    unidade: Unidade;
    UcMercadoLivre;

    selectedunidade: Unidade;

    newunidade: boolean;

    unidades: Unidade[];

    cols: any[];

    idshow: boolean = true;

    constructor(private messageService: MessageService, private serv: ScdeserviceService, private serv2: MercadolivreserviceService) { }

    ngOnInit() {
        this.serv.Unidades().subscribe(
          result=>{
            this.unidades = result
          }
        );
        this.serv2.UCS().subscribe(
          result=>{
            this.UcMercadoLivre = result
          }
        );

        this.cols = [
            { field: 'agente', header: 'Agente' },
            { field: 'unidade', header: 'Unidade' },
            { field: 'medidor', header: 'Medidor' },
            { field: 'fechamento', header: 'Fechamento' }
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

    cloneunidade(c: Unidade): Unidade {
        let unid=c;
        return unid;
    }

    Unidadenull(): Unidade {
      var unid:Unidade =
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
