import { Component, OnInit, Input } from '@angular/core';
import { SeteserviceService } from '../../seteservice.service';
import { MessageService } from 'primeng/api';
import { UnidDeNegociosComponent } from '../unid-de-negocios.component';

@Component({
  selector: 'app-migracao-acl',
  templateUrl: './migracao-acl.component.html',
  styleUrls: ['./migracao-acl.component.css']
})
export class MigracaoAclComponent implements OnInit {

  constructor(private messageService: MessageService, 
    private servicSETE:SeteserviceService, 
    private principal:UnidDeNegociosComponent
    
    ) { }

  @Input() unidade

  aclunids
  aclselecionado
  boolacl=false

  ngOnInit() {
    console.log(this.unidade)
    this.servicSETE.MigracoesACL(this.unidade).subscribe(
      res=>{
        this.aclunids=res
        console.log(res)
        this.boolacl=true
      }
    )
  }
  onRowSelect(event) {
      this.principal.displayacl = false;
      this.principal.migracoesacl = this.cloneunidade(event.data);
      this.principal.displayacl = true;
  }
  cloneunidade(c) {
      let unid=c;
      return unid;
  }

  showDialogToAdd(){
    this.principal.migracoesacl={
      id: 0,
      ano: 0,
      porcentagemACL: 0,
      undnegocio: this.unidade,
    }
    this.principal.displayacl = true;
  }


}
