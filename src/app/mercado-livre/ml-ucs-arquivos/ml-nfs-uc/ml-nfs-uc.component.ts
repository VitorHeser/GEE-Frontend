import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { MlUcsArquivosServiceService } from '../ml-ucs-arquivos-service.service';

@Component({
  selector: 'app-ml-nfs-uc',
  templateUrl: './ml-nfs-uc.component.html',
  styleUrls: ['./ml-nfs-uc.component.css']
})
export class MlNfsUcComponent implements OnInit {

  @Input() Unidade
  @Input() Referencia
  
  cols = [
    { field: 'classificacao',        header: 'Classificação' },
    { field: 'mesReferencia',  header: 'Referência'}
  ];
  Opcoes = [
    { value: 'DEVEC',    label: 'DEVEC' },
  ];
  constructor(private messageService: MessageService, private serv:MlUcsArquivosServiceService) { }

  FaturasSemFiltro
  Faturas

  FaturasDistribuicao
  

  ngOnInit() {
    this.PreencherDatas()
    this.Referencia = this.Referencia==null ? this.menMonth(new Date(),0) : this.menMonth(this.Referencia,0)
    this.Referencia.setDate(1)
    this.dataSelect = this.Referencia
    this.CarregarFaturas()
  }
  CarregarFaturas(){
    this.serv.notasDoFornecedor(this.Unidade.id,this.dataAtualFormatada(this.Referencia)).subscribe(
      resp=>{
        this.FaturasSemFiltro=  resp
        console.log(resp)
      }
    )
  }


  DeletarFatura(id){
    this.serv.DeletarFatura(id).subscribe(
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
        // console.log(this.Classificacao)
        this.serv.importarRelatorio(file,this.nome,ref,this.Unidade.id, this.Classificacao)
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

}
