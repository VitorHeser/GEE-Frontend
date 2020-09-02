import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { AdminService } from './../Admin.service';
import { MessageService } from 'primeng/api';
let CriacaodeusuarioComponent = class CriacaodeusuarioComponent {
    constructor(adminserv, messageService) {
        this.adminserv = adminserv;
        this.messageService = messageService;
        this.CadAtivo = false;
    }
    ngOnInit() {
        this.adminserv.listgerencias().subscribe(response => {
            this.gerencias = response;
        });
        this.adminserv.listsupervisoes().subscribe(response => {
            this.supervisoes = response;
        });
        this.adminserv.listunidades().subscribe(response => {
            this.unidades = response;
        });
    }
    salvar() {
        var usuario = {
            usuarioId: null,
            nome: this.CadNome,
            email: this.CadEmail,
            login: this.CadLogin,
            ativo: this.CadAtivo === true ? 1 : 0,
            senha: null,
            cargo: this.CadCargo,
            foto: this.CadFoto,
            gerenciaId: this.CadGerencia === undefined ? null : this.CadGerencia,
            supervisaoId: this.CadSupervisao === undefined ? null : this.CadSupervisao,
            undcodigo: this.CadUnidades === undefined ? null : this.CadUnidades
        };
        this.adminserv.InputUsuario(usuario).subscribe(response => {
            if (response.status === 201) {
                this.messageService.add({ sticky: true, severity: 'success', summary: 'Dados Salvos!',
                    detail: 'Usuário ' + usuario.nome + ' foi incluído com sucesso!' });
            }
        }, error => {
            this.messageService.add({ severity: 'error', summary: "Dados não Enviados!", detail: error.message, life: 500 });
        });
        console.log(usuario);
        this.CadAtivo = null;
        this.CadNome = null;
        this.CadEmail = null;
        this.CadLogin = null;
        this.CadGerencia = null;
        this.CadSupervisao = null;
        this.CadUnidades = null;
    }
};
CriacaodeusuarioComponent = tslib_1.__decorate([
    Component({
        selector: 'app-criacaodeusuario',
        templateUrl: './criacaodeusuario.component.html',
        styleUrls: ['./criacaodeusuario.component.css']
    }),
    tslib_1.__metadata("design:paramtypes", [AdminService, MessageService])
], CriacaodeusuarioComponent);
export { CriacaodeusuarioComponent };
//# sourceMappingURL=criacaodeusuario.component.js.map