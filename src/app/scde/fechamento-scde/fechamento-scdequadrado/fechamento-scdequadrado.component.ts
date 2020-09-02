import { Component, OnInit, Input } from '@angular/core';
import { ScdeserviceService } from '../../scdeservice.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-fechamento-scdequadrado',
  templateUrl: './fechamento-scdequadrado.component.html',
  styleUrls: ['./fechamento-scdequadrado.component.css']
})
export class FechamentoSCDEQuadradoComponent implements OnInit {

  @Input() grupo;
  @Input() tipoSelecionado;
  @Input() date1;
  @Input() date2;
  unidades =[]
  totalAtivo =0.0
  totalReativo =0.0
  constructor(private messageService: MessageService,private serv: ScdeserviceService) { }



  ngOnInit() {
    var inicio = this.dataAtualFormatada(this.date1);
    var fim = this.dataAtualFormatada(this.date2);
    this.serv.UnidadesPorGrupo(this.grupo).subscribe(
      res=>{
        for(var i =0;i<res.length;i++){
          this.serv.importarGraficosSCDE(this.tipoSelecionado,res[i].id,inicio,fim).subscribe(
            res=>{
              // this.messageService.add({severity: 'success', summary: 'Sucesso', detail: "Gráfico carregado com sucesso"});
              this.unidades.push(
                {
                  unidade: res['unidade'].unidade,
                  medidor: res['unidade'].medidor,
                  realizadoAtivo: this.numberParaReal(res['realizadoAtivo']),
                  realizadoReativo: this.numberParaReal(res['realizadoReativo'])
                }
              )
              this.totalAtivo = this.totalAtivo + res['realizadoAtivo']
              this.totalReativo = this.totalReativo +res['realizadoReativo']
            },
            erro=>{
              this.messageService.add({severity: 'error', summary: 'Erro', detail: "Ocorreu algum tipo de erro com o servidor"});
            }
          )
        }
      }
    )
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
