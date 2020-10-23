import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { HemeraserviceService } from '../hemeraservice.service';

@Component({
  selector: 'app-hemera-graficos',
  templateUrl: './hemera-graficos.component.html',
  styleUrls: ['./hemera-graficos.component.css']
})
export class HemeraGraficosComponent implements OnInit {
  tiposDeExtracao
  unidadesLista


  tipoSelecionado = 1
  unidadeSelecionada

  date1
  date2
  


  constructor(private messageService: MessageService,private serv: HemeraserviceService) { }

  ngOnInit() {
    this.serv.Unidades().subscribe(
      res=>{
        this.unidadesLista = res
      }
    )

    this.tiposDeExtracao = [
        {label: '15 min', value: 1},
        {label: 'Diário', value: 2},
        {label: 'Mensal', value: 3}
    ];
  }

  //AO SELECIONAR O TIPO DE EXTRACAO
  visualizar = true
  campodehora = true
  formatodedata = "dd/mm/yy"
  formatoview = "date"
  limite=120

  trocandotipo(){
    this.visualizar = false
    if(this.tipoSelecionado==1){
      this.campodehora = true
      this.formatodedata = "dd/mm/yy"
      this.formatoview = "date"
    }else if(this.tipoSelecionado==2){
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
  arrayParaGrafico
  GraficoVisible=false
  RealizadoAtivo
  // RealizadoReativo

  carregarDados(){
    this.GraficoVisible=false
    var inicio
    var fim
    var daydiff
    var tipoextrato
    

    if(this.tipoSelecionado==1){
      inicio = this.dataAtualFormatadahr(this.date1);
      fim = this.dataAtualFormatadahr(this.date2);
      this.limite=720
      daydiff = (this.date2-this.date1)/ (60 * 60 * 1000)
      tipoextrato=" Horas"

    }else if(this.tipoSelecionado==2){
      inicio = this.dataAtualFormatada(this.date1);
      fim = this.dataAtualFormatada(this.date2);
      this.limite=120
      daydiff = (this.date2-this.date1)/ (60 * 60 * 24 * 1000)
      tipoextrato=" Dias"

    }else if(this.tipoSelecionado==3){
      inicio = this.dataAtualFormatada(this.date1);
      fim = this.dataAtualFormatada(this.date2);
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

      this.serv.importarGraficosHemera(this.tipoSelecionado,this.unidadeSelecionada.id,inicio,fim).subscribe(
        res=>{
          this.arrayParaGrafico = res
          this.GraficoVisible=true
          this.messageService.add({severity: 'success', summary: 'Sucesso', detail: "Gráfico carregado com sucesso"});
          this.RealizadoAtivo = this.numberParaReal(res['realizadoAtivo'])
          // this.RealizadoReativo = this.numberParaReal(res['realizadoReativo'])
        },
        erro=>{
          this.messageService.add({severity: 'error', summary: 'Erro', detail: "Ocorreu algum tipo de erro com o servidor"});
        }
      )
    }
  }

  numberParaReal(numero){
    var formatado = (numero).toLocaleString('pt-BR'); 
    return formatado;
  }

  dataAtualFormatadahr(data:Date){
    var dia  = data.getDate().toString(),
        diaF = (dia.length == 1) ? '0'+dia : dia,
        mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
        mesF = (mes.length == 1) ? '0'+mes : mes,
        anoF = data.getFullYear(),
        hora  = (data.getHours()).toString(), //+1 pois no getMonth Janeiro começa com zero.
        horaF = (hora.length == 1) ? '0'+hora : hora,
        min  = (data.getMinutes()).toString(), //+1 pois no getMonth Janeiro começa com zero.
        minF = (min.length == 1) ? '0'+min : min;
    return anoF+"-"+mesF+"-"+diaF + " "+horaF+":"+minF+":00";
  }  
  dataAtualFormatada(data:Date){
    var dia  = data.getDate().toString(),
        diaF = (dia.length == 1) ? '0'+dia : dia,
        mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
        mesF = (mes.length == 1) ? '0'+mes : mes,
        anoF = data.getFullYear(),
        hora  = (data.getHours()).toString(), //+1 pois no getMonth Janeiro começa com zero.
        horaF = (hora.length == 1) ? '0'+hora : hora,
        min  = (data.getMinutes()).toString(), //+1 pois no getMonth Janeiro começa com zero.
        minF = (min.length == 1) ? '0'+min : min;
    return anoF+"-"+mesF+"-"+diaF;
  }
}