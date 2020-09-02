import { Component, OnInit, ɵConsole } from '@angular/core';
import { MessageService } from 'primeng/api';
import {MenuItem} from 'primeng/primeng';
import {FileUploadModule} from 'primeng/fileupload';
import { ImportService } from '../import.service';
import { Fatura } from '../import.model';

@Component({
  selector: 'app-importtxt',
  templateUrl: './importtxt.component.html',
  styleUrls: ['./importtxt.component.css']
})
export class ImporttxtComponent implements OnInit {

  uploadedFiles: any[] = [];
  megaMenuItems: MenuItem[];
  Concessionarias: MenuItem[];

  ConcessionariaSelected =null;

  constructor(private messageService: MessageService, private importar: ImportService) { }

  ngOnInit() {
    this.Concessionarias = [
      { label:'Energisa MS'},
      { label:'Equatorial PI'}
    ]
    this.ProcurarFaturas();
  }

  onUpload(event) {
    if(this.ConcessionariaSelected == null){
      this.messageService.add({severity: 'warn', summary: 'Selecionar a Concessionaria', detail: "Falta selecionar a concessionaria"});

    }else{
      for(let file of event.files) {
        this.uploadedFiles = []
        this.messageService.add({severity: 'success', summary: 'Arquivo Importado', detail: "Arquivo importado" + file.name});
        this.importar.importarFaturasTxt(file,this.ConcessionariaSelected.label)
          .subscribe(
          resultado  =>  {
            this.ProcurarFaturas();
          }
        );

      }
    }
  }

  //=============================================================
  faturaSelecionada: Fatura
  faturasEmAberto: Fatura[]
  ProcurarFaturas(){
    this.importar.FaturasEmAbertoPorUser("TXT").subscribe(
      resultado=>{
        this.faturasEmAberto = resultado
        this.faturaSelecionada = resultado[0]
      }
    )
  }

  dataview: boolean = false
  VisualizarFatura(){
    if(this.faturaSelecionada!=null){
      this.dataview=true
    }else{
      this.dataview=false
      this.messageService.add({severity: 'info', summary: 'Selecione uma fatura', detail: "Falta selecionar a fatura"});

    }
  }

  Aprovar(){
    this.importar.Aprovar(this.faturaSelecionada).subscribe(
      resultado=>{
        this.messageService.add({severity: 'success', summary: 'Aprovado', detail: "Arquivo aprovado"});
        this.ProcurarFaturas();
      }
    )
    this.ProcurarFaturas();
  }
  Deletar(){
    this.importar.Deletar(this.faturaSelecionada).subscribe(
      resultado=>{
        this.messageService.add({severity: 'success', summary: 'Deletado', detail: "Arquivo deletado"});
        this.ProcurarFaturas();
      }
    )
    this.ProcurarFaturas();
  }
}
