import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ImportarArquivosServiceService } from './importar-arquivos-service.service';

@Component({
  selector: 'app-importar-bds',
  templateUrl: './importar-bds.component.html',
  styleUrls: ['./importar-bds.component.css']
})
export class ImportarBDsComponent implements OnInit {
  Importacoes=[
    { label:"Cognos", value: "appPerformance/importBD" },
    { label:"SCDE", value: "SCDEExtracao/importBD" },
  ]
  ImportacaoSelected
  uploadedFiles: any[] = [];
  constructor(private messageService: MessageService, private importar: ImportarArquivosServiceService) { }

  ngOnInit() {
  }

  onUpload(event) {
    if(this.ImportacaoSelected == null){
      this.messageService.add({severity: 'warn', summary: 'Selecionar o Tipo', detail: "Falta selecionar o tipo de importação"});
      
    }else{
      for(let file of event.files) {
        this.uploadedFiles = []
        this.importar.importarArquivo(this.ImportacaoSelected.value,file,1)
        .subscribe(
          resultado  =>  {
            this.messageService.add({severity: 'success', summary: 'Arquivo Importado', detail: "Arquivo importado" + file.name});
          },erro=>{
            this.messageService.add({severity: 'error', summary: 'Erro ao importar', detail: "Erro ao importar"});

          }
        );

      }
    }
  }
}
