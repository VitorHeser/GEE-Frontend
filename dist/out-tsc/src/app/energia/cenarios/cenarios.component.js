import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { EnergiaService } from '../energia.service';
import { MessageService } from 'primeng/api';
import { PerformanceService } from '../../performance/performance.service';
let CenariosComponent = class CenariosComponent {
    constructor(messageService, medServ, perf) {
        this.messageService = messageService;
        this.medServ = medServ;
        this.perf = perf;
        this.carregando = false;
        this.dialogSelectCenario = false;
        this.listaCenarios = [];
        this.selecionadoCenario = null;
        this.dialogSelectTabela = false;
        this.dialogSelectUnidade = false;
    }
    ngOnInit() {
        this.carregar();
    }
    carregar() {
        this.listaCenarios = [];
        this.carregando = true;
        this.medServ.LerCenarios().subscribe(lista => {
            this.listaCenarios = lista;
            this.carregando = false;
            this.dialogSelectTabela = false;
            this.selecionadoCenario = null;
            this.listaUnidadesDoCenario = null;
            this.dialogSelectUnidade = false;
            this.dialogSelectCenario = true;
        });
    }
    secionarCenario(cenario) {
        this.carregando = true;
        this.dialogSelectCenario = false;
        this.selecionadoCenario = cenario;
        this.medServ.LerCenario(this.selecionadoCenario.id).subscribe(cenario => {
            this.selecionadoCenario = cenario;
            this.dialogSelectTabela = true;
            this.carregando = false;
        });
    }
    destrinchar(unidades) {
        this.listaUnidadesDoCenario = unidades;
        this.dialogSelectUnidade = true;
    }
    outroCenario() {
        this.carregar();
    }
    //===================================================================================================================================================
    enviarParaIndicadores() {
        this.messageService.add({ severity: 'info', summary: 'Aguarde', detail: 'Aguarde a mensagem de confirmação' });
        this.carregando = true;
        this.dialogSelectTabela = false;
        var indicadroDeKw = this.selecionadoCenario.classificacao === 1 ? 12 : 13;
        var indicadroDeRS = this.selecionadoCenario.classificacao === 1 ? 14 : 15;
        var indicadroDeKwM3 = this.selecionadoCenario.classificacao === 1 ? 74 : 78;
        var indicadroDeRSM3 = this.selecionadoCenario.classificacao === 1 ? 75 : 79;
        this.medServ.atualizarIndicadores(this.selecionadoCenario, indicadroDeKw, indicadroDeRS, indicadroDeKwM3, indicadroDeRSM3).subscribe(resp => {
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Dados enviados com Sucesso' });
            this.carregar();
        });
    }
};
CenariosComponent = tslib_1.__decorate([
    Component({
        selector: 'app-cenarios',
        templateUrl: './cenarios.component.html',
        styleUrls: ['./cenarios.component.css']
    }),
    tslib_1.__metadata("design:paramtypes", [MessageService, EnergiaService, PerformanceService])
], CenariosComponent);
export { CenariosComponent };
//# sourceMappingURL=cenarios.component.js.map