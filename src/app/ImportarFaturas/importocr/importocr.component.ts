import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import {MenuItem, Dialog} from 'primeng/primeng';
import { ImportService } from '../import.service';
import { Fatura } from '../import.model';

@Component({
  selector: 'app-ocr',
  templateUrl: './importocr.component.html',
  styleUrls: ['./importocr.component.css']
})
export class ImportOcrComponent implements OnInit {

  
  images: any[] = [];

  constructor(private messageService: MessageService, private importar: ImportService) { }

  uploadedFiles: any[] = [];
  megaMenuItems: MenuItem[];
  Concessionarias: MenuItem[];

  ConcessionariaSelected =null;

  ngOnInit() {

    

    this.Concessionarias = [
      { label:'CPFL Paulista'}
    ]
    this.megaMenuItems = [
      { label: 'Aprovar', icon: 'ui-icon-check', command: (event: Event) => this.Aprovar()},
      { label: 'Deletar', icon: 'ui-icon-delete', command: (event: Event) => this.Deletar()},
      { label: ' | '},
      { label: 'Atualizar', icon: 'ui-icon-refresh', command: (event: Event) => this.Atualizar()},
      { label: 'Visualizar', icon: 'ui-icon-remove-red-eye', command: (event: Event) => this.Visualizar()},
      { label: ' | '},
      { label: 'Anterior', icon: 'ui-icon-skip-previous', command: (event: Event) => this.Anterior()},
      { label: 'Próximo', icon: 'ui-icon-skip-next', command: (event: Event) => this.Proximo()},
      
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
        this.importar.importarFaturasOcr(file,this.ConcessionariaSelected.label)
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
  faturasEmAberto=[]
  ProcurarFaturas(){
    this.importar.FaturasEmAbertoPorUser("OCR").subscribe(
      resultado=>{
        this.faturasEmAberto = resultado
        this.faturaSelecionada = resultado[0]
      }
    )
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

  Proximo(){
    if(this.faturasEmAberto.indexOf(this.faturaSelecionada)<this.faturasEmAberto.length){
      var valor = this.faturasEmAberto.indexOf(this.faturaSelecionada)
      this.faturaSelecionada = this.faturasEmAberto[valor+1]
    }
  }
  Anterior(){
    if(this.faturasEmAberto.indexOf(this.faturaSelecionada)>0){
      var valor = this.faturasEmAberto.indexOf(this.faturaSelecionada)
      this.faturaSelecionada = this.faturasEmAberto[valor-1]
    }
  }
  Atualizar(){
    this.ProcurarFaturas();
  }



  //=========================================================================
  //fotos
  dataview = false
  Visualizar(){
    this.dataview = true;
    this.images = []
    for(var i = 1; i<=this.faturaSelecionada.a_ID_QUANTIDADEDEFOTOS; i++){
      console.log('assets/Faturas/'+this.faturaSelecionada.a_Id+'/'+this.faturaSelecionada.a_Id+' - '+i)
      this.images.push(
        {source: 'assets/Faturas/'+this.faturaSelecionada.a_Id+'/'+this.faturaSelecionada.a_Id+' - '+i+'.png'}
        );
    }
  }
  showDialogMaximized(dialog: Dialog) {
    setTimeout(() => {
      dialog.maximize();
    }, 0);
  }

  //=======================================================================================
  id=1;

}