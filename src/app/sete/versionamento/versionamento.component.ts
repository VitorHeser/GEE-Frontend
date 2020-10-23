import { Component, OnInit } from '@angular/core';
import { SeteserviceService } from '../seteservice.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-versionamento',
  templateUrl: './versionamento.component.html',
  styleUrls: ['./versionamento.component.css']
})
export class VersionamentoComponent implements OnInit {

  constructor(private messageService: MessageService, private servicSETE:SeteserviceService) { }

  versoesSETE
  versaoSelecionada
  
  cols

  displayDialog= false
  newunidade= false
  ngOnInit() {
    this.cols = [
        { field: 'id', header: 'id' },
        { field: 'descricao', header: 'Descrição' },
        { field: 'versao', header: 'Versão' },
        { field: 'anoInicio', header: 'Ano Inicial' },
    ];
    this.versoes()
  }

  versoes(){
    this.servicSETE.Versoes().subscribe(
      res=>{
        this.versoesSETE = res
      }
    )
  }

  carregando =false
  save() {
    this.carregando=true
    this.servicSETE.VersoesUpdateNew(this.versaoSelecionada).subscribe(
      result=>{
        this.messageService.add({severity: 'success', summary: 'Sucesso', detail: "Unidade Adicionada/Alterada"});
        this.carregando=false
      },
      error=>{
        this.messageService.add({severity: 'error', summary: 'Erro', detail: "Erro ao deletar"});
        this.carregando=false
      }
    )
    this.displayDialog = false;
  }
  cancel(){
    this.displayDialog = false;
  }
  onRowSelect(event) {
      this.newunidade = false;
      this.versaoSelecionada = this.cloneunidade(event.data);
      this.displayDialog = true;
  }

  cloneunidade(c) {
      let unid=c;
      return unid;
  }



  Descricao
  anoInicio
  versao
  texto
  uploadedFiles = []
  onUpload(event) {
    this.carregando=true
    if(this.Descricao == null){
      this.messageService.add({severity: 'warn', summary: 'Digite uma Descrição', detail: "Falta digitar uma descrição"});
    }else if(this.versao == null){
      this.messageService.add({severity: 'warn', summary: 'Digite uma versão', detail: "Digite a versão do SETE"});
    }else if(this.anoInicio == null){
      this.messageService.add({severity: 'warn', summary: 'Digite o ano de início', detail: "Digite o ano de início dos cálculos"});
    }else{
      for(let file of event.files) {
        this.uploadedFiles = []
        this.servicSETE.importarRelatorio(file,this.Descricao,this.versao,this.anoInicio,this.texto)
        .subscribe(
          resultado  =>  {
            this.messageService.add({severity: 'success', summary: 'Arquivo Importado', detail: "Arquivo importado" + file.name});
            this.carregando=false
            this.versoes()
          },erro=>{
            this.messageService.add({severity: 'error', summary: 'Erro ao importar', detail: "Erro ao importar"});
            this.carregando=false

          }
        );

      }
    }
  }

}
