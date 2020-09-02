import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { SeteserviceService } from '../seteservice.service';

@Component({
  selector: 'app-reajustes',
  templateUrl: './reajustes.component.html',
  styleUrls: ['./reajustes.component.css']
})
export class ReajustesComponent implements OnInit {
  Reajustes
  Reajusteselect
  
  displayDialog= false
  newunidade= false

  cols
  constructor(private messageService: MessageService, private servicSETE:SeteserviceService) { }
  ngOnInit() {
      this.unid()
  }
  
  unid(){
    this.servicSETE.Reajustes().subscribe(
      res=>{
        this.Reajustes=res
      }
    )
  }
  save() {
    this.servicSETE.ReajustesUpdateNew(this.Reajusteselect).subscribe(
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
    this.servicSETE.ReajustesDelete(this.Reajusteselect).subscribe(
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
      this.Reajusteselect = this.cloneunidade(event.data);
      this.displayDialog = true;
  }

  cloneunidade(c) {
      let unid=c;
      return unid;
  }

  showDialogToAdd(){
    this.Reajusteselect={
      id: 0,
      ano: 0,
      porcentagemACL: 0.0,
    }
    this.displayDialog = true;
  }

}
