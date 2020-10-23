import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/components/table/table';
import { AuditoriasService } from 'src/app/auditorias/auditorias.service';

@Component({
  selector: 'app-faturas-pendentes',
  templateUrl: './faturas-pendentes.component.html',
  styleUrls: ['./faturas-pendentes.component.css']
})
export class FaturasPendentesComponent implements OnInit {

  @Input() nomeParaFaturas;
  @Input() refParaFaturas;
  refParaFaturas2;
  @ViewChild('dt', {static: false}) table: Table;

  constructor(private auditServ:AuditoriasService   ) { }

  carregando = false
  lancamentos
  lancamentosFiltrados

  cols=[
    {header:"Referência"      ,               field:"referencia"},
    {header:"Classe Tarifária",               field:"classe"},
    {header:"Unidade de Negócio",             field:"unidade"},
    {header:"UC",                             field:"uc"},
    {header:"Equipamento",                    field:"equipamento"},
    {header:"Previsão de Emissão",            field:"emissaoPrevista"},
    {header:"Tolerância",                     field:"tolerancia"},
    {header:"Data Limite Lançamento",         field:"emissaoProposta"},
    {header:"Previsão Vencimento",            field:"vencimentoPrevisto"},
    {header:"Status",                         field:"status"},
  ]
  status=[
    {label:"Vencida",               value:"Vencida"},
    {label:"Próximo do Vencimento", value:"Proximo do Vencimento"},
    {label:"Pendente Lançamento",   value:"Pendente de Lancamento"},
    {label:"Disponível em Breve",   value:"Ficara Disponivel em Breve"},
    {label:"No Prazo",              value:"No Prazo"},
  ]
  unidadesDeNegocio=[]
  unidadesDeNegocioS=[]
  classesTarifarias=[]
  classesTarifariasS=[]

  ngOnInit() {
    this.refParaFaturas2 = this.traduzirdata2(this.refParaFaturas)
    this.Carregar()
  }


  Carregar(){
    this.carregando = true
    this.lancamentos=[]
    this.auditServ.FaturasNaoLancadas(this.refParaFaturas ,this.nomeParaFaturas).subscribe(
      resp=>{
        for(var i =0;i<resp.length;i++){
          this.lancamentos.push(resp[i])
          this.lancamentos[i].emissaoPrevista = this.traduzirdata(this.lancamentos[i].emissaoPrevista)
          this.lancamentos[i].emissaoProposta = this.traduzirdata(this.lancamentos[i].emissaoProposta)
          this.lancamentos[i].ultimaReferencia = this.traduzirdata(this.lancamentos[i].ultimaReferencia)
          this.lancamentos[i].vencimentoPrevisto = this.traduzirdata(this.lancamentos[i].vencimentoPrevisto)
          this.lancamentos[i].referencia = this.traduzirdata(this.lancamentos[i].referencia)
          if(this.unidadesDeNegocioS.indexOf(resp[i].unidade)==-1){
            this.unidadesDeNegocio.push({label: resp[i].unidade, value: resp[i].unidade})
            this.unidadesDeNegocioS.push(resp[i].unidade)
          }
          if(this.classesTarifariasS.indexOf(resp[i].classe)==-1){
            this.classesTarifarias.push({label: resp[i].classe, value: resp[i].classe})
            this.classesTarifariasS.push(resp[i].classe)
          }
        }
        setTimeout(() => {  
          this.carregando=false
          setTimeout(() => {  
            this.table.filter(this.traduzirdata(this.refParaFaturas), 'referencia', 'equals')
            setTimeout(() => {  
              this.Contadores(this.table.filteredValue)
            }, 1000);
          }, 50);
        }, 50);
      }
    );
  }

  //ItemsArray
  QtdTotal=0
  QtdVencida=0
  QtdVencimento=0
  QtdPendente=0
  QtdEmBreve=0
  QtdPrazo=0
  Contadores(array){
    this.QtdTotal=array.length
    this.QtdVencimento=array.filter(function(e){return e.status =='Proximo do Vencimento'}).length
    this.QtdPendente=array.filter(function(e){return e.status =='Pendente de Lancamento'}).length
    this.QtdEmBreve=array.filter(function(e){return e.status =='Ficara Disponivel em Breve'}).length
    this.QtdPrazo=array.filter(function(e){return e.status =='No Prazo'}).length
    this.QtdVencida=array.filter(function(e){return e.status =='Vencida'}).length

  }

  traduzirdata(str){
    return str!=null ? str.substring(8,10)+"/"+str.substring(5,7)+"/"+str.substring(0,4) : "";
  }
  traduzirdata2(str){
    return str!=null ?str.substring(5,7)+"/"+str.substring(0,4) : "";
  }

  dataAtualFormatada(data:Date){
    var dia  = data.getDate().toString(),
        diaF = (dia.length == 1) ? '0'+dia : dia,
        mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
        mesF = (mes.length == 1) ? '0'+mes : mes,
        anoF = data.getFullYear();
    return "01/"+mesF+"/"+anoF;
  }
  dataAtualFormatada2(data:Date){
    var dia  = data.getDate().toString(),
        diaF = (dia.length == 1) ? '0'+dia : dia,
        mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
        mesF = (mes.length == 1) ? '0'+mes : mes,
        anoF = data.getFullYear();
    return mesF+"/"+anoF;
  }

  onMultiselectChange(event,item) {
    this.table.filter(event.value,item, 'in')
    setTimeout(() => {  
      this.Contadores(this.table.filteredValue)
    }, 1000);
  }

  onDateSelect(value) {
    this.table.filter(this.dataAtualFormatada(value), 'referencia', 'equals')
    this.refParaFaturas2 = this.dataAtualFormatada2(value)
        console.log(this.lancamentos)
    setTimeout(() => {  
      this.Contadores(this.table.filteredValue)
    }, 1000);
  }
}
