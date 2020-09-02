import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { MensageriaService } from './mensageria.service';

@Component({
  selector: 'app-mensageria',
  templateUrl: './mensageria.component.html',
  styleUrls: ['./mensageria.component.css']
})
export class MensageriaComponent implements OnInit {

  constructor(private not:MensageriaService,private messageService: MessageService) {}
  // ArrEmails
  ngOnInit() {
  }
  
  ModeloAtivo = {
    id:0,
    destinatarios: "",
    apelido: "",
    titulo: "",
    texto: ""
  }
  
  emails: string[];
  email:any[]=[];
  carregando: boolean = false


  AoSalvar(){
    this.carregando = true
    this.ModeloAtivo.destinatarios = this.emails.toString()
    this.email=[];
    this.not.enviarNotificacao(this.ModeloAtivo).subscribe(
      response => {
          console.log(this.emails)
          this.messageService.add({sticky: true, severity:'success', summary: 'Dados Salvos!', 
          detail:'Dados enviados com sucesso!'});
          console.log('Dados enviados com sucesso!')

      },
      error =>  { 
        this.messageService.add({severity:'error', summary: "Dados não Enviados!", detail: error.message, life: 500});
        console.log(error)
      }
    );
    this.carregando = false
  }

  //MODELOS
  //=================================================================================================
  modelos:boolean = false
  modelosCadastrados


  Modelos(){
    this.modelos = true
    this.not.ListaDeModelos().subscribe(
      resp=>{
        this.modelosCadastrados = resp;
      }
    );
  }
    
  selecionarModelo(i){
    this.emails = i.destinatarios.split(",")
    this.ModeloAtivo = i
    this.modelos = false
  }


  //NOVO MODELO
  //=================================================================================================
  novoModeloP: boolean = false
  NomeDoModelo
  novoModelo(){
    this.novoModeloP = true
  }
    
  SalvarNovoModelo(int){
    this.ModeloAtivo.id = int
    this.ModeloAtivo.destinatarios = this.emails.toString()
    this.not.ListaSalvar(this.ModeloAtivo).subscribe(
      response => {
          this.messageService.add({sticky: true, severity:'success', summary: 'Dados Salvos!', 
          detail:'Dados enviados com sucesso!'});
          console.log('Dados enviados com sucesso!')
      },
      error =>  { 
        this.messageService.add({severity:'error', summary: "Dados não Enviados!", detail: error.message, life: 500});
        console.log(error)
      }
    );
    this.novoModeloP = false
  }

  //DELETAR MODELO
  //=================================================================================================

  deletarModelo(i){
    this.not.ListaDeletar(i.id).subscribe(
      response => {
          this.messageService.add({sticky: true, severity:'success', summary: 'Dados Salvos!', 
          detail:'Dados enviados com sucesso!'});
          console.log('Dados enviados com sucesso!')
      },
      error =>  { 
        this.messageService.add({severity:'error', summary: "Dados não Enviados!", detail: error.message, life: 500});
        console.log(error)
      }
    );
    this.modelos = false
  }

}
