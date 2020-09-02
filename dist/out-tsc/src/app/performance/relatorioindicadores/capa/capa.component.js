import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { PerformanceService } from '../../performance.service';
import { AuthService } from '../../../login/auth.service';
let CapaComponent = class CapaComponent {
    constructor(performanceService, authService) {
        this.performanceService = performanceService;
        this.authService = authService;
        this.nome = sessionStorage.getItem('nome');
        this.email = sessionStorage.getItem('email');
        var data = new Date(), diaF = ((data.getDate()) < 10 ? "0" + (data.getDate()) : (data.getDate())), mesF = ((data.getMonth() + 1) < 10 ? "0" + (data.getMonth() + 1) : (data.getMonth() + 1)), anoF = data.getFullYear(), hora = ((data.getHours()) < 10 ? "0" + (data.getHours()) : (data.getHours())), minuto = ((data.getMinutes()) < 10 ? "0" + (data.getMinutes()) : (data.getMinutes())), dias = new Array('Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado');
        this.date = dias[data.getDay()] + " - " + diaF + "/" + mesF + "/" + anoF + " " + hora + ":" + minuto;
    }
    ngOnInit() {
        console.log(this.indicador);
        this.performanceService.gerencias()
            .subscribe(response => {
            var items = [];
            items = response.splice(2, Number.MAX_VALUE);
            for (var i = 0; i < items.length; i++) {
                console.log(items[i]['gerenciaId'] + " = " + this.indicador);
                if (items[i]['gerenciaId'] == this.indicador) {
                    this.NomeGerencia = items[i]['label'];
                    break;
                }
            }
        });
        this.MontarArrayDeIndicadores(this.indicador);
    }
    MontarArrayDeIndicadores(indicador) {
        this.performanceService.classindicadores(indicador)
            .subscribe(Indicadores => {
            this.ind = Indicadores.filter(el => el.ativo == 1);
        });
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], CapaComponent.prototype, "refer", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], CapaComponent.prototype, "indicador", void 0);
CapaComponent = tslib_1.__decorate([
    Component({
        selector: 'app-capa',
        templateUrl: './capa.component.html',
        styleUrls: ['./capa.component.css']
    }),
    tslib_1.__metadata("design:paramtypes", [PerformanceService, AuthService])
], CapaComponent);
export { CapaComponent };
//# sourceMappingURL=capa.component.js.map