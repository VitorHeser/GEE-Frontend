import { Component, OnInit, ɵConsole } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ScdeserviceService } from 'src/app/medicao-fronteira/scde/scdeservice.service';
import { MercadolivreserviceService } from '../mercadolivreservice.service';

@Component({
  selector: 'app-ml-uns',
  templateUrl: './ml-uns.component.html',
  styleUrls: ['./ml-uns.component.css']
})
export class MlUnsComponent implements OnInit {



  displayDialog: boolean;

  unidade: any;

  MedidoresSCDE:any[]

  selectedunidade: any;

  newunidade: boolean;

  unidades: any[];
  Submercados: any[];

  cols: any[];

  idshow: boolean = true;

  constructor(private messageService: MessageService, private serv: MercadolivreserviceService, private servSCDE: ScdeserviceService) { }

  ngOnInit() {
    this.carregarUns()
    this.cols = [
      { field: 'id',          header: 'Id' },
      { field: 'nomeUnidade', header: 'Nome da UN'},
      { field: 'sistemaAgregador', header: 'Sistema Agregador'},
      ];
  }
  carregarUns(){
    this.serv.UNS().subscribe(
      result=>{
        this.unidades = result
        console.log(result)
        setTimeout(() => {
          this.carregando =false
        }, 14);
      }
    );

  }


  showDialogToAdd() {
      this.idshow = false
      this.newunidade = true;
      this.selectedunidade = this.Unidadenull()
      this.displayDialog = true;
  }

  carregando =false
  save() {
    this.carregando =true
    this.selectedunidade = this.UnidaConvert(this.selectedunidade)
    console.log(this.selectedunidade)
    this.serv.UNSUpdateNew(this.selectedunidade).subscribe(
      result=>{
        this.messageService.add({severity: 'success', summary: 'Sucesso', detail: "Unidade Adicionada/Alterada"});
        this.carregarUns()
      },
      error=>{
        this.messageService.add({severity: 'error', summary: 'Erro', detail: "Erro ao deletar"});
        this.carregarUns()
      }
    )
    this.unidade = this.Unidadenull();
    this.displayDialog = false;
  }

  delete() {
      this.serv.UNSDelete(this.selectedunidade).subscribe(
        result=>{
          this.messageService.add({severity: 'success', summary: 'Sucesso', detail: "Unidade Deletada"});
        },
        error=>{
          this.messageService.add({severity: 'error', summary: 'Erro', detail: "Erro ao deletar"});
        }
      )
      this.unidade = this.Unidadenull();
      this.displayDialog = false;
  }

  onRowSelect(event) {
      this.newunidade = false;
      this.unidade = this.cloneunidade(event.data);
      this.displayDialog = true;
  }

  cloneunidade(c: any): any {
      let unid=c;
      return unid;
  }

  Unidadenull(): any {
    var unid:any =
    {
      id: 0,
      nomeUnidade: null,
      sistemaAgregador: null,
    }
    return unid;
  }

  UnidaConvert(und): any {
    var unid:any =
    {
      id: und.id,
      nomeUnidade: und.nomeUnidade,
      sistemaAgregador: und.sistemaAgregador,
    }
    return unid;
  }


  //============================================================================================
  convert(dat){
    return dat.substring(6,10)+"-"+dat.substring(3,5)+"-"+dat.substring(0,2)+"T00:00:00"
  }
  displaySazonal = false
  Periodos=[]
  ArrObjPeriodos=[]



  media(arr){
    var total = 0
    for(var i =0;i<arr.length;i++){
      total += arr[i]
    }
    return total/arr.length
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


  //============================================================
  AbrirPArquivos = false
  AbrirPArquivoss(){
    this.AbrirPArquivos=true
  }
  showDialogMaximized(dialog){
    setTimeout(() => {
      dialog.maximize();
    }, 0);
  }
}
