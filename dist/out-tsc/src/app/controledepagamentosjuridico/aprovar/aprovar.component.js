import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ControledepagamentosjuridicoService } from '../controledepagamentosjuridico.service';
let AprovarComponent = class AprovarComponent {
    constructor(ControlePagamento, messageService) {
        this.ControlePagamento = ControlePagamento;
        this.messageService = messageService;
        this.displayEditPagamento = false;
    }
    ngOnInit() {
        this.atualizar();
    }
    atualizar() {
        this.pagamentos = [];
        this.ControlePagamento.Aprovando(this.Nivel, this.CentrosdeCustos).subscribe(response => {
            this.pagamentos = response;
            this.displayEditPagamento = false;
            console.log(response);
        });
    }
    aprovar(pagamentos) {
        pagamentos['aprovacao' + this.Nivel] = 1;
        pagamentos['aprovador' + this.Nivel] = sessionStorage.getItem('nome');
        this.ControlePagamento.UpdatePagamento(pagamentos).subscribe(response => {
            this.atualizar();
        });
    }
    reprovar(pagamentos) {
        pagamentos['aprovacao' + this.Nivel] = 0;
        pagamentos['aprovador' + this.Nivel] = sessionStorage.getItem('nome');
        this.ControlePagamento.UpdatePagamento(pagamentos).subscribe(response => {
            this.atualizar();
        });
    }
    showPagamentos(pagamentos) {
        this.sentencaSelect = pagamentos;
        this.displayEditPagamento = true;
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], AprovarComponent.prototype, "Nivel", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], AprovarComponent.prototype, "CentrosdeCustos", void 0);
AprovarComponent = tslib_1.__decorate([
    Component({
        selector: 'app-aprovar',
        templateUrl: './aprovar.component.html',
        styleUrls: ['./aprovar.component.css']
    }),
    tslib_1.__metadata("design:paramtypes", [ControledepagamentosjuridicoService,
        MessageService])
], AprovarComponent);
export { AprovarComponent };
//# sourceMappingURL=aprovar.component.js.map