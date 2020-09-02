import { Component, OnInit } from '@angular/core';
import { GraficosDash1Service } from '../painel-gerencial/graficos-dash1.service';
import { SeteserviceService } from '../sete/seteservice.service';
import { EventService } from '../demo/service/eventservice';
import * as jwt_decode from "jwt-decode";
import { UserServiceService } from '../administrador/usuarios/user-service.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-ad-user',
  templateUrl: './ad-user.component.html',
  styleUrls: ['./ad-user.component.css']
})
export class AdUserComponent implements OnInit {
  nome
  AguaEsg



  urlimage

  Empresas: any[] = []

  //=============================================================================
  campodehora = false
  formatodedata = "mm/yy"
  formatoview = "month"
  datecons2:Date = new Date(new Date().setMonth(new Date().getMonth()))
  datecons1:Date = new Date(new Date().setMonth(new Date().getMonth() - 12))
  date2:Date
  date1:Date
  
  //=============================================================================
  //LABEL POR EMPRESAS
  optionsDropDown = [
    {label: 'Consumo', value:1},
    {label: 'Custo', value:2}
  ]
  optionSelected = {label: 'Consumo', value:1}
  //=============================================================================




  constructor(
    private adminserv: UserServiceService,
    private servic:GraficosDash1Service,
    private servicSETE:SeteserviceService,
    private eventService: EventService
    ) { }

  convertToDate(data){
    var dtHoje = data;
    dtHoje.setMonth(dtHoje.getMonth() -12);//lembrando que o mes é um inteiro de 0-11
    return dtHoje;
  }
  PermPaineisAnaliticos = false
  PermMedicoesDeFronteiras = false
  


  getDecodedAccessToken(): any {
    try{
        return JSON.parse(jwt_decode(sessionStorage.getItem('token')).iss);
    }
        catch(Error){
        return null;
    }
  } 
  ngOnInit() {
    var us = this.getDecodedAccessToken()
    this.urlimage = us.foto=="null" ? "./assets/users/profile-image.png" : this.adminserv.acharimagem(us.id);
    console.log(us.perfis)

    for(var j=0;j<us.perfis.length;j++){
        var perfil = us.perfis[j]
        switch(perfil.id){
            case 10:
                this.PermPaineisAnaliticos=true;
                this.PermMedicoesDeFronteiras=true;
                break;
            case 1:
                this.PermPaineisAnaliticos=true;
                break;
            case 6:
            case 7:
                this.PermMedicoesDeFronteiras=true;
                break;                        
        } 
    }

    console.log(this.PermPaineisAnaliticos + " - "+this.PermMedicoesDeFronteiras)

    var dataincio = this.dataAtualFormatada(this.datecons1)
    var datafim = this.dataAtualFormatada(this.datecons2)
    this.servic.importarGraph("Regional R1",1,dataincio,datafim).subscribe(
      result=>{
        // console.log(result)
        var dados = result["consumoEnergia"].filter(function(val){return val!=null})
        this.date2 = new Date(new Date().setMonth(new Date().getMonth() - 12+(dados.length-1)))   
        this.date2.setDate(1)
        this.date1 = new Date(this.date2)
        this.date1.setDate(1)
        this.date1.setMonth(this.date1.getMonth()-11)
        this.recarregar();
      }
    )


    this.servic.importarUnidades().subscribe(
      result=>{
        for(var i =0;i<result.length;i++){
          var str = result[i]
          this.Empresas.push({ label: str, value: str })
        }
      }
    )
    this.nome = sessionStorage.getItem('nome')
    this.PegararraydeRelatorios()


    //APAGA ISSO AQUI DEPOIS
    // this.indicSCDEShow()
  }

  fechatudo(){
    this.dialogRelatorios = false
    this.dialogSETE = false
    this.indicadoresSCDE = false
    this.indicadoresAnaliticos = false
    this.indicadoresDeEnergia = false
  }
  //====================================ULTIMA VERSAO SETE===================================
  UltimaVersaoSETE
  dialogSETE=false
  indicSETEShow(){
    this.fechatudo()
    this.servicSETE.Versoes().subscribe(
      res=>{
        var i = res.length-1
        this.UltimaVersaoSETE = res[i]
        this.dialogSETE = true
      }
    )
    
  }
  
  //==================================INDICADORES DE ENERGIA=================================
  indicadoresDeEnergia:boolean = false
  indicEnergShow(){
    this.fechatudo()
    this.indicadoresDeEnergia = true
  }
  //==================================INDICADORES ANALITICOS=================================
  indicadoresAnaliticos:boolean = false
  indicAnalitShow(){
    this.fechatudo()
    this.indicadoresAnaliticos = true
  }
  //==================================INDICADORES SCDE=================================
  indicadoresSCDE:boolean = false
  indicSCDEShow(){
    this.fechatudo()
    this.indicadoresSCDE = true
  }

  //=========================================================================================
  showDialogMaximized(dialog){
    setTimeout(() => {
      dialog.maximize();
    }, 0);
  }
  visivel = true
  recarregar(){
    this.visivel=false 
    setTimeout(() => {  
      this.visivel=true 
    }, 50);
    
  }
  
  //=========================================================================================
  dialogRelatorios=false
  colsVirSap:any[]
  relatorioviridissap1:any[] = []
  relatorioviridissap2:any[] = []
  relatorioviridispasta:any[] = []
  relatorio:any[]
  PegararraydeRelatorios(){
    // this.servic.RelatorioViridisSap1().subscribe(
    //   result=>{
    //     this.relatorioviridissap1 = result
    //   }
    // )
    // this.servic.RelatorioViridisSap2().subscribe(
    //   result=>{
    //     this.relatorioviridissap2 = result
    //   }
    // )
    // this.servic.RelatorioViridisPasta().subscribe(
    //   result=>{
    //     this.relatorioviridispasta = result
    //   }
    // )
  }




  abrirdialogtablerelatorio(val){
    this.fechatudo()
    if(val==1){
      this.relatorio = this.relatorioviridissap1
      this.colsVirSap  = [
        { header: 'Fatura',          field: 'fatura' },
        { header: 'Partes',          field: 'partes' },
        { header: 'Equipamento',     field: 'equipa' },
        { header: 'Contrato',        field: 'contra' },
        { header: 'Status',          field: 'status' },
        { header: 'Referência',      field: 'refere' },
        { header: 'Status Viridis',  field: 'stViri' },
        { header: 'Status SAP',      field: 'stSAPr' }
      ];
      this.dialogRelatorios = true
    }else if(val==2){
      this.relatorio = this.relatorioviridissap2
      this.colsVirSap  = [
        { header: 'Fatura',           field: 'fatura' },
        { header: 'Id Fiscal',        field: 'idFiscal' },
        { header: 'Data da Fatura',   field: 'dataFatura' },
        { header: 'Doc. Compras',     field: 'docCompras' },
        { header: 'Data Vencimento',  field: 'dataVenc' },
        { header: 'Log ERP',          field: 'logERP' },
        { header: 'Série NF',         field: 'nserie' },
        { header: 'N material Forn.', field: 'nmaterialForn' }
      ];
      this.dialogRelatorios = true
    }else if(val==3){
      this.relatorio = this.relatorioviridispasta
      this.colsVirSap  = [
        { header: 'Timestamp',           field: 'timestamp' },
        { header: 'Referência', field: 'mes' },
        { header: 'UC',   field: 'uc' },
        { header: 'Fatura',         field: 'fatura' },
        { header: 'Empresa',        field: 'empresa' },
        { header: 'Obs',     field: 'observacao' },
        { header: 'Série',  field: 'serieNF' },
        { header: 'Pedido',          field: 'pedido' },
        { header: 'Data Pedido SAP', field: 'dataPedidoCriadoSap' }
      ];
      this.dialogRelatorios = true
    }
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
