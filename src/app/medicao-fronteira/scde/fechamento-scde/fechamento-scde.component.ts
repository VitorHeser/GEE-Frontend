import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ScdeserviceService } from '../scdeservice.service';

@Component({
  selector: 'app-fechamento-scde',
  templateUrl: './fechamento-scde.component.html',
  styleUrls: ['./fechamento-scde.component.css']
})
export class FechamentoSCDEComponent implements OnInit {

  tiposDeExtracao
  unidadesLista:any=[]


  tipoSelecionado = 2
  unidadesSelecionadas


  constructor(private messageService: MessageService,private serv: ScdeserviceService) { }
  ngOnInit() {
    this.serv.GruposDeUnidades().subscribe(
      res=>{
        for(var i =0;i<res.length;i++){
          this.unidadesLista.push({ label: res[i], value: res[i] })

        }
      }
    )

    this.tiposDeExtracao = [
        {label: 'Diário', value: 2},
        {label: 'Mensal', value: 3}
    ];
  }

  //AO SELECIONAR O TIPO DE EXTRACAO
  visualizar = true
  campodehora = false
  formatodedata = "dd/mm/yy"
  formatoview = "date"
  limite=120

  trocandotipo(){
    this.visualizar = false
    if(this.tipoSelecionado==2){
      this.campodehora = false
      this.formatodedata = "dd/mm/yy"
      this.formatoview = "date"
    }else if(this.tipoSelecionado==3){
      this.campodehora = false
      this.formatodedata = "mm/yy"
      this.formatoview = "month"
    }

    setTimeout(() => {  
      this.visualizar=true 
    }, 100);
  }

  

  //AO EXTRAIR
  date1
  date2
  GraficoVisible=false
  RealizadoAtivo
  RealizadoReativo
  
  arraydevisualizacao = []

  carregarDados(){
    this.GraficoVisible=false
    var inicio
    var fim
    var daydiff
    var tipoextrato
    

    if(this.tipoSelecionado==2){
      this.limite=120
      daydiff = (this.date2-this.date1)/ (60 * 60 * 24 * 1000)
      tipoextrato=" Dias"

    }else if(this.tipoSelecionado==3){
      this.limite=48
      daydiff = (this.date2-this.date1)/ (60 * 60 * 24 * 30 * 1000)
      tipoextrato=" Meses"
    }
    

    
    if(this.date1==null || this.date2==null){
      this.messageService.add({severity: 'warn', summary: 'Datas', detail: "Preencha as datas corretamente"});
    }else if(this.date1>this.date2){
      this.messageService.add({severity: 'warn', summary: 'Datas', detail: "A data de inicio não pode ser maior que a data final."});
    }else if(daydiff>this.limite){
      this.messageService.add({severity: 'warn', summary: 'Datas', detail: "O extrato não pode ser maior do que "+this.limite+" "+tipoextrato});
    }else{
      for(var i =0;i<this.unidadesSelecionadas.length;i++){
        
    
      }

    }
  }
}
