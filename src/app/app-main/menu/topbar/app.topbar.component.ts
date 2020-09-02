import {Component} from '@angular/core';
import {AppMainComponent} from '../../app.main.component';
import { AuthService } from '../../../login/auth.service';
import { MessageService } from 'primeng/api';
import * as jwt_decode from "jwt-decode";
import { UserServiceService } from 'src/app/administrador/usuarios/user-service.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopbarComponent {
    nome: string;
    dadosUser: any;
    cargo: string;
    urlimage

    getDecodedAccessToken(): any {
      try{
          return JSON.parse(jwt_decode(sessionStorage.getItem('token')).iss);
      }
          catch(Error){
          return null;
      }
    } 
    constructor(
      private adminserv: UserServiceService,
        public app: AppMainComponent, 
        private messageService: MessageService,
        private authService: AuthService
        ) {
      var us = this.getDecodedAccessToken()
          
      this.urlimage = us.foto=="null" ? "./assets/users/profile-image.png" : this.adminserv.acharimagem(us.id);
      this.nome = sessionStorage.getItem('nome')
      authService.usuario(sessionStorage.getItem('email')).subscribe(response => {
          this.dadosUser = response,
          this.cargo = response['cargo']
          //console.log(response['cargo'])
          //console.log(response['foto'])
          
      })
    }
    fechar(){
        sessionStorage.clear()
    }

    senhapad=false
    novasenha
    novasenhaconfirm
    showsenhapad(){
        this.senhapad=true
    }
    alterarsenha(){
      
      if(this.novasenha === this.novasenhaconfirm){
        var id
        this.authService.usuario(sessionStorage.getItem('email'))
        .subscribe(res=>{//console.log(res)
        this.authService.senhaUpdate(res['iduser'] , this.novasenha)
        .subscribe(
          response => {
            if(response === null){
              this.messageService.add({severity:'success', summary: 'Sucesso!', detail:'Senha alterada corretamente!!!', life: 5000});
              this.senhapad = false;
            }
          },
          error =>  { 
            this.messageService.add({severity:'error', summary: "Senha não alterada!", detail:error.message, life: 5000});
            console.log(error)
          }
        );
      });
  
        this.senhapad = false;
      }else{
        this.messageService.add({severity:'error', summary: "Senha não alterada!", detail:'As senhas digitadas não conferem!!!', life: 5000});
      } 
    }
}
