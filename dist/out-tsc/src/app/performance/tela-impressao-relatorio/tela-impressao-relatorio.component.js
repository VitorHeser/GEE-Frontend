import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { PerformanceService } from './../../performance/performance.service';
import { MessageService } from 'primeng/api';
let TelaImpressaoRelatorioComponent = class TelaImpressaoRelatorioComponent {
    constructor(messageService, performanceService) {
        this.messageService = messageService;
        this.performanceService = performanceService;
        this.referencia = '';
    }
    ngOnInit() {
        this.performanceService.gerencias()
            .subscribe(response => {
            this.items = [];
            this.items = response.splice(2, Number.MAX_VALUE);
            for (var i = 0; i < this.items.length; i++) {
                this.items[i]['routerLink'] = '/printPerformance';
            }
        });
    }
    retirarDados(i) {
    }
    novoRelatorio(valor) {
        this.performanceService.classindicadores(valor)
            .subscribe(response2 => {
            var qtd = response2.length;
            if (qtd > 0 && this.referencia.length > 0) {
                this.messageService.add({ severity: 'success', summary: '', detail: 'Gerando relatório', life: 5000 });
                var win = window.open('#/printPerformance/' + valor + '/' + this.referencia, '_blank', "width=1050,height=1050");
                win.focus();
            }
            else if (this.referencia == '') {
                this.messageService.add({ severity: 'info', summary: 'Referência', detail: 'Favor selecionar a referência.', life: 5000 });
            }
            else {
                this.messageService.add({ severity: 'info', summary: 'Ausência de Indicadores', detail: 'Sem indicadores para essa gerência.', life: 5000 });
            }
        });
    }
    onChangeTime($event) {
        console.log(this.convertTime($event));
        this.referencia = this.convertTime($event);
    }
    convertTime(str) {
        var date = new Date(str), year = ("0" + (date.getFullYear())).slice(-4), mnth = ("0" + (date.getMonth() + 1)).slice(-2), day = ("0" + date.getDate()).slice(-2);
        return year + "-" + mnth + "-" + day;
    }
};
TelaImpressaoRelatorioComponent = tslib_1.__decorate([
    Component({
        selector: 'app-tela-impressao-relatorio',
        templateUrl: './tela-impressao-relatorio.component.html',
        styleUrls: ['./tela-impressao-relatorio.component.css']
    }),
    tslib_1.__metadata("design:paramtypes", [MessageService, PerformanceService])
], TelaImpressaoRelatorioComponent);
export { TelaImpressaoRelatorioComponent };
//# sourceMappingURL=tela-impressao-relatorio.component.js.map