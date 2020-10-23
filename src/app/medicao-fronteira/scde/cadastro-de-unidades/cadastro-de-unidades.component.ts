import { Component, OnInit } from '@angular/core';
import { Unidade } from '../unidade.model';
import { MessageService } from 'primeng/api';
import * as jwt_decode from "jwt-decode";
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

      getDecodedAccessToken(): any {
        try{
            return jwt_decode(sessionStorage.getItem('token'));
        }
            catch(Error){
            return null;
        }
      }
      ngOnInit() {
        var us = JSON.parse(this.getDecodedAccessToken().iss)
        var adm =false
        for(var i=0;i<us.perfis.length;i++){
          var obj = us.perfis[i]
          adm = obj.id==10 ? true : adm  
        }
        
        var nome = adm==true ? "Administrator" : us.login
        this.serv.Unidades(nome).subscribe(
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
    handleChange(e,und) {
      this.unidades[this.unidades.indexOf(und)].fechamento = e.checked===true ? 1 : 0;
    }
}
