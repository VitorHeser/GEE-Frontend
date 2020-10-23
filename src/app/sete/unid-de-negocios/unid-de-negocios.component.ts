import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { SeteserviceService } from '../seteservice.service';

@Component({
  selector: 'app-unid-de-negocios',
  templateUrl: './unid-de-negocios.component.html',
  styleUrls: ['./unid-de-negocios.component.css']
})
export class UnidDeNegociosComponent implements OnInit {

  constructor(private messageService: MessageService, private servicSETE:SeteserviceService) { }
  UndNegocios
  UndNegociosSelecionado

  empresas
  cols

  displayDialog= false
  newunidade= false

  ngOnInit() {
    this.cols = [
        { field: 'descricao', header: 'Unidade de Negócio' },
        { field: 'pesoNoCusto', header: 'Peso no Custo Total' },
    ];
    this.unid();
  }

  unid(){
    this.servicSETE.UndNegocios().subscribe(
      res=>{
        this.UndNegocios=res
        console.log(res)
      }
    )
    this.servicSETE.Unidades().subscribe(
      res=>{
        this.empresas=res
      }
    )
  }
  save() {
    this.servicSETE.UndNegociosUpdateNew(this.UndNegociosSelecionado).subscribe(
      result=>{
        this.unid();
        this.messageService.add({severity: 'success', summary: 'Sucesso', detail: "Unidade Adicionada/Alterada"});
      },
      error=>{
        this.messageService.add({severity: 'error', summary: 'Erro', detail: "Erro ao adicionar"});
      }
    )
    this.displayDialog = false;
  }
  delete() {
    this.servicSETE.UndNegociosDelete(this.UndNegociosSelecionado).subscribe(
      result=>{
        this.unid();
        this.messageService.add({severity: 'success', summary: 'Sucesso', detail: "Unidade Deletada"});
      },
      error=>{
        this.messageService.add({severity: 'error', summary: 'Erro', detail: "Erro ao deletar"});
      }
    )
    this.displayDialog = false;
  }
  cancel(){
    this.displayDialog = false;
  }
  onRowSelect(event) {
      this.newunidade = false;
      this.UndNegociosSelecionado = this.cloneunidade(event.data);
      console.log(this.UndNegociosSelecionado)
      this.displayDialog = true;
  }

  cloneunidade(c) {
      let unid=c;
      return unid;
  }

  showDialogToAdd(){
    this.UndNegociosSelecionado={
      id: 0,
      descricao: null,
      pesoNoCusto: 0.0,
      empresa: this.empresas[0],
    }
    this.displayDialog = true;
  }


  displayacl=false
  migracoesacl
  
  saveacl() {
    this.servicSETE.MigracoesACLUpdateNew(this.migracoesacl).subscribe(
      result=>{
        this.messageService.add({severity: 'success', summary: 'Sucesso', detail: "Migracao Adicionada/Alterada"});
      },
      error=>{
        this.messageService.add({severity: 'error', summary: 'Erro', detail: "Erro ao alterar"});
      }
    )
    this.displayacl = false;
  }
  
  deleteacl() {
    this.servicSETE.MigracoesACLDelete(this.migracoesacl).subscribe(
      result=>{
        this.messageService.add({severity: 'success', summary: 'Sucesso', detail: "Migracao Deletada"});
      },
      error=>{
        this.messageService.add({severity: 'error', summary: 'Erro', detail: "Erro ao deletar"});
      }
    )
    this.displayacl = false;
  }
}
