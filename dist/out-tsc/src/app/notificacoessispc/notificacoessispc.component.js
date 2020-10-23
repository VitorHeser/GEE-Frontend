import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { NotificacoesService } from './notificacoes.service';
import { MessageService } from 'primeng/api';
let NotificacoessispcComponent = class NotificacoessispcComponent {
    constructor(not, messageService) {
        this.not = not;
        this.messageService = messageService;
        this.email = [];
        this.carregando = false;
        //MODELOS
        //=================================================================================================
        this.modelos = false;
        //NOVO MODELO
        //=================================================================================================
        this.novoModeloP = false;
    }
    ngOnInit() {
        this.not.UsuariosSispc().subscribe(response => {
            this.ArrEmails = response;
        });
    }
    AoSalvar() {
        this.carregando = true;
        this.email = [];
        for (var i = 0; i < this.OpcEmails.length; i++) {
            this.email.push(this.OpcEmails[i]["email"]);
        }
        this.not.enviarNotificacao(this.email, this.Assunto, this.Texto).subscribe(response => {
            this.messageService.add({ sticky: true, severity: 'success', summary: 'Dados Salvos!',
                detail: 'Dados enviados com sucesso!' });
            console.log('Dados enviados com sucesso!');
            this.Assunto = "";
            this.Texto = "";
            this.OpcEmails = null;
        }, error => {
            this.messageService.add({ severity: 'error', summary: "Dados não Enviados!", detail: error.message, life: 500 });
            console.log(error);
        });
        this.carregando = false;
    }
    Modelos() {
        this.modelos = true;
        this.not.ListaDeModelos().subscribe(resp => {
            this.modelosCadastrados = resp;
        });
    }
    selecionarModelo(i) {
        this.Texto = i.texto;
        this.Assunto = i.assunto;
        this.modelos = false;
    }
    novoModelo() {
        this.novoModeloP = true;
    }
    SalvarNovoModelo() {
        this.not.ListaDeModelosNovo(0, this.NomeDoModelo, this.Assunto, this.Texto).subscribe(response => {
            this.messageService.add({ sticky: true, severity: 'success', summary: 'Dados Salvos!',
                detail: 'Dados enviados com sucesso!' });
            console.log('Dados enviados com sucesso!');
            this.Assunto = "";
            this.Texto = "";
            this.OpcEmails = null;
        }, error => {
            this.messageService.add({ severity: 'error', summary: "Dados não Enviados!", detail: error.message, life: 500 });
            console.log(error);
        });
        this.novoModeloP = false;
    }
    //DELETAR MODELO
    //=================================================================================================
    deletarModelo(i) {
        this.not.ListaDeletar(i.id).subscribe(response => {
            this.messageService.add({ sticky: true, severity: 'success', summary: 'Dados Salvos!',
                detail: 'Dados enviados com sucesso!' });
            console.log('Dados enviados com sucesso!');
            this.Assunto = "";
            this.Texto = "";
            this.OpcEmails = null;
        }, error => {
            this.messageService.add({ severity: 'error', summary: "Dados não Enviados!", detail: error.message, life: 500 });
            console.log(error);
        });
        this.modelos = false;
    }
};
NotificacoessispcComponent = tslib_1.__decorate([
    Component({
        selector: 'app-notificacoessispc',
        templateUrl: './notificacoessispc.component.html',
        styleUrls: ['./notificacoessispc.component.css']
    }),
    tslib_1.__metadata("design:paramtypes", [NotificacoesService, MessageService])
], NotificacoessispcComponent);
export { NotificacoessispcComponent };
//# sourceMappingURL=notificacoessispc.component.js.map