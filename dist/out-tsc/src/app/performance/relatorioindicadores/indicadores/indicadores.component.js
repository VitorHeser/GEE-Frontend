import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { PerformanceService } from '../../performance.service';
let IndicadoresComponent = class IndicadoresComponent {
    constructor(indicadoresService) {
        this.indicadoresService = indicadoresService;
        this.title = 'projeto';
        this.INDICADORESlidos = [];
    }
    ngOnInit() {
        this.MontarArrayDeIndicadores(this.indicador);
    }
    chartTest(index, indic) {
        if (this.INDICADORESlidos.indexOf(indic) == -1) {
            this.INDICADORESlidos.push(indic);
            this.tipoindicador = indic;
        }
    }
    MontarArrayDeIndicadores(indicador) {
        this.indicadoresService.classindicadores(indicador)
            .subscribe(Indicadores => {
            this.ind = Indicadores.filter(el => el.ativo == 1);
            this.totalpaginas = this.ind.length + 1;
        });
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], IndicadoresComponent.prototype, "refer", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], IndicadoresComponent.prototype, "indicador", void 0);
IndicadoresComponent = tslib_1.__decorate([
    Component({
        selector: 'app-indicadores',
        templateUrl: './indicadores.component.html',
        styleUrls: ['./indicadores.component.css']
    }),
    tslib_1.__metadata("design:paramtypes", [PerformanceService])
], IndicadoresComponent);
export { IndicadoresComponent };
//# sourceMappingURL=indicadores.component.js.map