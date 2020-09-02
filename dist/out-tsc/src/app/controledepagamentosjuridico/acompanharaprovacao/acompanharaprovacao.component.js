import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ControledepagamentosjuridicoService } from '../controledepagamentosjuridico.service';
let AcompanharaprovacaoComponent = class AcompanharaprovacaoComponent {
    constructor(ControlePagamento, messageService) {
        this.ControlePagamento = ControlePagamento;
        this.messageService = messageService;
        this.sentencas = [];
    }
    ngOnInit() {
        this.ControlePagamento.emAprovacao().subscribe(response => {
            this.sentencas = response;
            console.log(response);
        });
    }
    showSentenca(sentenca) {
        this.sentencaSelectDate = null;
        this.sentencaSelect = sentenca;
        this.displayStatusSentenca = true;
        event.preventDefault();
    }
};
AcompanharaprovacaoComponent = tslib_1.__decorate([
    Component({
        selector: 'app-acompanharaprovacao',
        templateUrl: './acompanharaprovacao.component.html',
        styleUrls: ['./acompanharaprovacao.component.css']
    }),
    tslib_1.__metadata("design:paramtypes", [ControledepagamentosjuridicoService,
        MessageService])
], AcompanharaprovacaoComponent);
export { AcompanharaprovacaoComponent };
//# sourceMappingURL=acompanharaprovacao.component.js.map