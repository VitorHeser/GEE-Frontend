import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ScdeserviceService } from 'src/app/medicao-fronteira/scde/scdeservice.service';
import { MercadolivreserviceService } from '../../mercadolivreservice.service';
import { MlUcsArquivosServiceService } from '../ml-ucs-arquivos-service.service';

@Component({
  selector: 'app-ml-nf-fornecedor',
  templateUrl: './ml-nf-fornecedor.component.html',
  styleUrls: ['./ml-nf-fornecedor.component.css']
})
export class MlNfFornecedorComponent implements OnInit {

  @Input() Unidade
  @Input() Referencia
  
  cols = [
    { field: 'id',             header: 'Identificador' },
    { field: 'NomeArquivo',    header: 'Nome do Arquivo' },
    { field: 'classificacao',        header: 'Classificação' },
    { field: 'MesReferencia',  header: 'Referência'}
  ];
  Opcoes = [
    { value: 'Fornecimento',    label: 'Fornecimento' },
  ];
  constructor(private messageService: MessageService, private serv:MlUcsArquivosServiceService, private servSCDE: MercadolivreserviceService) { }

  FaturasSemFiltro
  Faturas

  FaturasDistribuicao
  unidades
  unidadesFiltradas

  ngOnInit() {
    this.PreencherDatas()
    this.Referencia = this.Referencia==null ? this.menMonth(new Date(),0) : this.menMonth(this.Referencia,0)
    this.Referencia.setDate(1)
    this.dataSelect = this.Referencia
    console.log(this.Referencia)
    this.CarregarFaturas()
  }
  CarregarFaturas(){
    this.FaturasSemFiltro=[]
    this.serv.BuscarFaturasImportadas2(this.Unidade.id).subscribe(
      resp=>{
        this.FaturasSemFiltro=  resp
      }
    )
    this.servSCDE.UCS().subscribe(
      result=>{
        this.unidades = result
      }
    );
  }


  DeletarFatura(id){
    this.serv.DeletarFatura2(id).subscribe(
      resultado  =>  {
        this.messageService.add({severity: 'success', summary: 'Arquivo Deletado', detail: "Arquivo Deletado"});
        this.CarregarFaturas();
      },erro=>{
        this.messageService.add({severity: 'error', summary: 'Erro ao deletar', detail: "Erro ao deletar"});

      }
    )
  }

  datasDisponiveis=[]
  dataSelect
  PreencherDatas(){
    this.datasDisponiveis=[]
    this.datasDisponiveis.push({ value: this.menMonth(new Date(),0), label: this.dataFormat(new Date()) })
    this.datasDisponiveis.push({ value: this.menMonth(new Date(),1), label: this.dataFormat(this.menMonth(new Date(),1)) })
    this.datasDisponiveis.push({ value: this.menMonth(new Date(),2), label: this.dataFormat(this.menMonth(new Date(),2)) })
    this.datasDisponiveis.push({ value: this.menMonth(new Date(),3), label: this.dataFormat(this.menMonth(new Date(),3)) })
    this.datasDisponiveis.push({ value: this.menMonth(new Date(),4), label: this.dataFormat(this.menMonth(new Date(),4)) })
    this.datasDisponiveis.push({ value: this.menMonth(new Date(),5), label: this.dataFormat(this.menMonth(new Date(),5)) })
    this.datasDisponiveis.push({ value: this.menMonth(new Date(),6), label: this.dataFormat(this.menMonth(new Date(),6)) })
    this.datasDisponiveis.push({ value: this.menMonth(new Date(),7), label: this.dataFormat(this.menMonth(new Date(),7)) })
    this.datasDisponiveis.push({ value: this.menMonth(new Date(),8), label: this.dataFormat(this.menMonth(new Date(),8)) })
    this.datasDisponiveis.push({ value: this.menMonth(new Date(),9), label: this.dataFormat(this.menMonth(new Date(),9)) })
    this.datasDisponiveis.push({ value: this.menMonth(new Date(),10), label: this.dataFormat(this.menMonth(new Date(),10)) })
    this.datasDisponiveis.push({ value: this.menMonth(new Date(),11), label: this.dataFormat(this.menMonth(new Date(),11)) })
    
  }
  abrirpdf(idpdf){
    this.serv.AbrirPDF2(idpdf)
  }
  TrocarData(){
    this.Referencia = this.dataSelect
  }

  dataAtualFormatada(data:Date){
    var dia  = data.getDate().toString(),
        diaF = (dia.length == 1) ? '0'+dia : dia,
        mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
        mesF = (mes.length == 1) ? '0'+mes : mes,
        anoF = data.getFullYear();
    return anoF+"-"+mesF+"-"+diaF;
  }

  menMonth(month: Date,i){
    month.setMonth(month.getMonth()-i)
    month.setDate(1)
    month.setHours(1)
    month.setMinutes(1)
    month.setSeconds(1)
    month.setMilliseconds(1)
    return month
  }
  dataFormat(data:Date){
    var mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
        mesF = (mes.length == 1) ? '0'+mes : mes,
        anoF = data.getFullYear();
    return mesF+"/"+anoF;
  }
  dataFormat2(data:Date){
    var mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
        mesF = (mes.length == 1) ? '0'+mes : mes,
        anoF = data.getFullYear();
    return mesF+"-"+anoF;
  }

  //==============================================================
  //NOVA FATURA
  nome
  Classificacao = this.Opcoes[0].value
  uploadedFiles=[]
  onUpload(event) {
    if(this.nome == null){
      this.messageService.add({severity: 'warn', summary: 'Nome do Arquivo', detail: "Digite o nome do Arquivo"});
    }else{
      for(let file of event.files) {
        this.uploadedFiles = []
        var ref = this.dataAtualFormatada(this.Referencia) 
        console.log(this.Classificacao)
        this.serv.importarRelatorio2(file,this.nome,ref,this.Unidade.id, this.Classificacao)
        .subscribe(
          resultado  =>  {
            this.messageService.add({severity: 'success', summary: 'Arquivo Importado', detail: "Arquivo importado" + file.name});
            this.CarregarFaturas();
          },erro=>{
            this.messageService.add({severity: 'error', summary: 'Erro ao importar', detail: "Erro ao importar"});

          }
        );

      }
    }
  }

  //EDITAR RATEIO
  UnidadeSelecionada
  Ativacao=false
  RatearUnidade(und){
    console.log(und)
    this.Ativacao=true
    this.UnidadeSelecionada = und
    this.unidadesFiltradas
  }



  deletarRateio(id){
    var indx = 0
    for(var i=0;i<this.UnidadeSelecionada.contratos.length;i++){
      var item = this.UnidadeSelecionada.contratos[i]
      if(item.id==id){
        indx=i
        break;
      }
    }
    this.serv.deletarLancamento(id)
    .subscribe(
      resultado  =>  {
        this.messageService.add({severity: 'success', summary: 'Sucesso', detail: "Sucesso"});
        setTimeout(() => {  
          this.UnidadeSelecionada.contratos.splice(indx,1)
          this.CarregarFaturas();
        }, 100);
      },erro=>{
        this.messageService.add({severity: 'error', summary: 'Erro', detail: "Erro"});

      }
    );
  }
  adicionarRateio(id){
    this.serv.adLancamento(1,0,id).subscribe(
      resultado  =>  {
        this.messageService.add({severity: 'success', summary: 'Sucesso', detail: "Sucesso"});
        this.UnidadeSelecionada.contratos.push(resultado)
      },erro=>{
        this.messageService.add({severity: 'error', summary: 'Erro', detail: "Erro"});

      }
    );
  }
  alterarRateio(obj){
    this.serv.altLancamento(obj).subscribe(
      resultado  =>  {
        this.messageService.add({severity: 'success', summary: 'Sucesso', detail: "Sucesso"});
      },erro=>{
        this.messageService.add({severity: 'error', summary: 'Erro', detail: "Erro"});

      }
    );
  }
  salvarAlteracoes(obj){
    this.serv.SalvarTudo(obj).subscribe(
      resultado  =>  {
        this.messageService.add({severity: 'success', summary: 'Sucesso', detail: "Sucesso"});
        setTimeout(() => {  
          this.Ativacao=false
          this.CarregarFaturas();
        }, 100);
      },erro=>{
        this.messageService.add({severity: 'error', summary: 'Erro', detail: "Erro"});
        setTimeout(() => {  
          this.Ativacao=false
          this.CarregarFaturas();
        }, 100);
      }
    );

  }

}
