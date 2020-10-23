import { Component, Input, OnInit } from '@angular/core';
import {MessageService} from 'primeng/api';
import { UserServiceService } from 'src/app/administrador/usuarios/user-service.service';
import { ScdeserviceService } from 'src/app/medicao-fronteira/scde/scdeservice.service';
import { MercadolivreserviceService } from '../mercadolivreservice.service';

@Component({
  selector: 'app-scde-parametrizacao',
  templateUrl: './scde-parametrizacao.component.html',
  styleUrls: ['./scde-parametrizacao.component.css']
})
export class ScdeParametrizacaoComponent implements OnInit {

  constructor(private serv:ScdeserviceService, private messageService: MessageService, private mlserv:MercadolivreserviceService) { }

  @Input() usuario;

  Agentes=[]
  AgentesUtilizados=[]
  AgentesUtilizadosS=[]
  // usuarios=[]

  displayDialog=false

  cols = [
    {field: "dado", header: "Agente"},
    {field: "agreg", header: "Agreg"}
  ]
  
  ngOnInit() {
    this.Recarregar()
  }
  Recarregar() {
    this.serv.AgentesUsuarios(this.usuario.login).subscribe(
      response =>{
        for(var i = 0;i<response.length;i++){
          this.AgentesUtilizados.push({dado: response[i]})
          this.AgentesUtilizadosS.push(response[i])
        }
        this.mlserv.UNS().subscribe(
          resp=>{
            for(var i = 0;i<resp.length;i++){
              if(this.AgentesUtilizadosS.indexOf(resp[i].nomeUnidade)==-1)
                this.Agentes.push({dado: resp[i].nomeUnidade, agreg: resp[i].sistemaAgregador})
            }
            this.displayDialog=true
          }
        )
      }
    )
  }

  save(){
    var dadostring = []
    for(var i =0;i<this.AgentesUtilizados.length;i++){
      dadostring.push(this.AgentesUtilizados[i].dado)
    }
    this.serv.SaveAgentes(this.usuario.login,dadostring).subscribe(
      response =>{
        this.messageService.add({sticky: true, severity:'success', summary: 'Dados Salvos!', detail:'Salvo com sucesso!'});
        this.displayDialog=false
      }
    )

  }
}
