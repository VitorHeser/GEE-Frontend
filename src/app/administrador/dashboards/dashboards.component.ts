import { Component, OnInit } from '@angular/core';
import { GraficosDash1Service } from '../../painel-gerencial/graficos-dash1.service'
import { SeteserviceService } from 'src/app/sete/seteservice.service';
import { EventService } from 'src/app/demo/service/eventservice';
import * as jwt_decode from "jwt-decode";
import { UserServiceService } from '../usuarios/user-service.service';

@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboards.component.html',
  styleUrls: ['./dashboards.component.css']
})
export class DashboardsComponent implements OnInit {
  nome
  AguaEsg

  urlimage

  Empresas: any[] = []

  //=============================================================================
  campodehora = false
  formatodedata = "mm/yy"
  formatoview = "month"
  datecons2:Date = new Date(new Date().setMonth(new Date().getMonth() - 2))
  datecons1:Date = new Date(new Date().setMonth(new Date().getMonth() - 13))
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
    private servicSETE:SeteserviceService    ) { }

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



    this.servic.importarUnidades().subscribe(
      result=>{
        for(var i =0;i<result.length;i++){
          var str = result[i]
          this.Empresas.push({ label: str, value: str })
        }
      }
    )
    this.nome = sessionStorage.getItem('nome')
    this.date1=this.datecons1
    this.date2=this.datecons2
    this.date1.setDate(1)
    this.date2.setDate(1)
    this.visivel=true
  }

  fechatudo(){
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

  dataAtualFormatada(data:Date){
    var dia  = data.getDate().toString(),
        diaF = (dia.length == 1) ? '0'+dia : dia,
        mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
        mesF = (mes.length == 1) ? '0'+mes : mes,
        anoF = data.getFullYear(),
        hora  = (data.getHours()).toString(), //+1 pois no getMonth Janeiro começa com zero.
        min  = (data.getMinutes()).toString();
    return anoF+"-"+mesF+"-"+diaF;
  }





}
