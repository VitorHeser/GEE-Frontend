import { Component, OnInit } from '@angular/core';
import { AuditoriasService } from '../auditorias.service';
import { Auditoria19Service } from './auditoria19.service';
import { MessageService } from 'primeng/api';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { CsvDataService } from 'src/app/csv-data.service';

@Component({
  selector: 'app-auditoria0019',
  templateUrl: './auditoria0019.component.html',
  styleUrls: ['./auditoria0019.component.css']
})
export class Auditoria0019Component implements OnInit {

  date1=new Date('2020-01-02');
  date2=new Date();

  UndNeg=[]
  UndNegSelect=null
  Eqps=[]
  EqpsSelect=[]

  carregando=false
  loading=true
  suprimirZeros = false//Check de suprimir zerados
  pintarZeros = false//Check de pintar zerados
  ListaDeIndicadores =[ //Indicadores para analisar
    {value:"consumoForaPonta", label:"Consumo Fora Ponta"},
    {value:"consumoPonta", label:"Consumo Ponta"},
    {value:"custo", label:"Custo"},
    {value:"volume", label:"Volume"}
  ];
  indicadorInicial = this.ListaDeIndicadores[0].value;//Indicador Selecionado Primeiro



  dadosDoArray=[]

  constructor(private messageService: MessageService,private servic:Auditoria19Service) { }

  ngOnInit() {
    this.servic.UnidadesDeNegocio().subscribe(
      resp=>{
        for(var i =0;i<resp.length;i++){
          this.UndNeg.push({label: resp[i],value: resp[i]})
        }
      }
    )
    // /*APAGAR DEPOIS*/this.DialogAnalise2 = true
  }
  SelecionarEquip(){
    this.Eqps = []
    this.EqpsSelect = []
    this.servic.Equipamentos(this.UndNegSelect).subscribe(
      resp=>{
        for(var i =0;i<resp.length;i++){
          this.Eqps.push({label: resp[i][0],value: resp[i][1]})
          this.EqpsSelect.push(resp[i][1])
        }
      }
    )
  }
  Procurar(){
    if(this.UndNegSelect==null){
      this.messageService.add({severity: 'warn', summary: 'Campos', detail: "Os Campos Data Inicio, Data Fim e Local de instalação são obrigatórios"});
    // }else if(this.EqpsSelect.length>100){
      // this.messageService.add({severity: 'warn', summary: 'Selecione menos Locais de Instalação', detail: "O array de Locais de instalação é maior que 100 Locais"});
    }else if(this.EqpsSelect.length==0){
      this.messageService.add({severity: 'warn', summary: 'Selecione pelo menos um Local de Instalação', detail: "O array de Locais de instalação é 0"});
    }else{
      this.loading = true
      this.carregando=true
      this.dadosDoArray=[]
      if(this.EqpsSelect!==null){
        this.servic.Array(this.dataAtualFormatada(this.date1),this.dataAtualFormatada(this.date2),this.EqpsSelect).subscribe(
          resp=>{
            this.dadosDoArray=resp
            this.converterarremobj()
          }
        )
      }
    }
  }
  dadosDoArrayObj=[]//Array Importado e tratado para ser exibido
  ColsFrozen=[]//Colunas Fixas
  Cols=[]//Colunas Móveis
  converterarremobj(){
    //INSTANCIANDO VARIÁVEIS  
    var arr = this.dadosDoArray
    // console.log(arr)
    this.Cols=[]
    this.ColsFrozen=[]
    var objcols= false
    this.dadosDoArrayObj=[]
    
    //DEFININDO COLUNAS FIXAS
    this.ColsFrozen.push({field:"equipamento", header: "Local de Instalação", width:"200px"})
    this.ColsFrozen.push({field:"classeTarifaria", header: "Classe Tarifária", width:"100px"})
    // this.ColsFrozen.push({field:"uc", header: "UC", width:"70px"})
    this.ColsFrozen.push({field:"tipo", header: "Tipo", width:"70px"})

    //CRIANDO ARRAY ESPECIAL PARA A TABELA FROZEN
    for(var i =0;i<arr.length;i++){
      var total=0;
      var o = arr[i]
      
      //MONTANDO OBJETOS JSON COM STRING
      var Stringobj = `{
        "equipamento": "${o.equipamento}",
        "unidadeDeNegocio": "${o.unidadeDeNegocio}",
        "tipo": "${o.ucs.length>0 ? o.ucs[0].TipoLI : '-' }",
        "classeTarifaria": "${o.ucs.length>0 ? o.ucs[0].ClasseTarifaria : '-' }",
        "uc": "${o.ucs.length>0 ? o.ucs[0].CodigoDeUc : '-' }"`
      for(var j=0;j<o.eixo.length;j++){
        total = total +o[this.indicadorInicial][j]
        Stringobj= Stringobj+`,"mes${j}": ${o[this.indicadorInicial][j]} `
        
        //OBJCOLS É O VERIFICADOR SE JÁ FOI INCLUÍDO 1 ARRAY DE COLUNAS
        if(objcols==false){
          this.Cols.push({field:`mes${j}`, header: o.eixo[j], width:"100px"})
        }
      }
      Stringobj= Stringobj+`}`
      //CONVERTENDO A STRING CRIADA EM JSON
      var objetojson = JSON.parse(Stringobj)
      
      //SUPRIMIR LANÇAMENTOS QUE ESTÃO ZERADOS DO INÍCIO AO FIM DO PERÍODO
      if(this.suprimirZeros==true && total>0){
        this.dadosDoArrayObj.push(objetojson)
      }else if(this.suprimirZeros==false){
        this.dadosDoArrayObj.push(objetojson)
      }
      objcols=true
    }
    setTimeout(() => {  
      this.carregando =true
      this.loading = false
    }, 50);
  }


  DialogAnalise1 = false
  DialogAnalise2 = false


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
    return anoF+"-"+mesF+"-01";
  }
  showDialogMaximized(dialog){
    setTimeout(() => {
      dialog.maximize();
    }, 0);
  }
  extraircsv(){
    var array = []
    for(var i =0;i<this.dadosDoArray.length;i++){
      var o = this.dadosDoArray[i]
      var p = this.dadosDoArray[i]

      var Stringobj = `{
        "Indicador": "${this.indicadorInicial }",
        "Local": "${o.equipamento}",
        "Tipo": "${o.ucs.length>0 ? o.ucs[0].TipoLI : '-' }",
        "Classe_Tarifaria": "${o.ucs.length>0 ? o.ucs[0].ClasseTarifaria : '-' }",
        "UC": "${o.ucs.length>0 ? o.ucs[0].CodigoDeUc : '-' }"`
      for(var j=0;j<p.eixo.length;j++){
        Stringobj= Stringobj+`,"${p.eixo[j]}": "${p[this.indicadorInicial][j].toLocaleString(undefined, {minimumFractionDigits: 2,maximumFractionDigits: 2})}" `
      }
      Stringobj= Stringobj+`}`

      //CONVERTENDO A STRING CRIADA EM JSON
      var objetojson = JSON.parse(Stringobj)
      array.push(objetojson)
    }
    CsvDataService.exportToCsv('Relatorio.csv',array)
  }
}
