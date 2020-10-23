import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AprovadasService } from './aprovadas.service';
import { Fatura } from '../import.model';

@Component({
  selector: 'app-faturas-aprovadas',
  templateUrl: './faturas-aprovadas.component.html',
  styleUrls: ['./faturas-aprovadas.component.css']
})
export class FaturasAprovadasComponent implements OnInit {

  constructor(private messageService: MessageService, private imp:AprovadasService) { }

  faturasAprovadas: Fatura[] =[]
  faturaSelecionada:Fatura

  ngOnInit() {
    this.imp.FaturasAprovadas()
        .subscribe(
        resultado  =>  {
          this.faturasAprovadas = resultado;
          this.faturaSelecionada = resultado[0]
        }
      );
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

  Retornar(){
    this.imp.Retornar(this.faturaSelecionada.a_Id)
        .subscribe(
        resultado  =>  {
          this.faturasAprovadas = resultado;
          this.dataview=false
        }
      );
  }
}
