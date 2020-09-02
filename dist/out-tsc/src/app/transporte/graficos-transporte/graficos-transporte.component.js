import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
let GraficosTransporteComponent = class GraficosTransporteComponent {
    constructor() {
    }
    ngOnInit() {
        if (this.tipoEixo == "dia") {
            this.eixo = ['01/jan', '02/jan', '03/jan', '04/jan', '05/jan', '06/jan', '07/jan', '08/jan', '09/jan', '10/jan', '11/jan', '12/jan', '13/jan', '14/jan', '15/jan', '16/jan', '17/jan', '18/jan', '19/jan', '20/jan', '21/jan', '22/jan', '23/jan', '24/jan', '25/jan', '26/jan', '27/jan', '28/jan', '29/jan', '30/jan', '31/jan'];
            if (this.tipoGraf == "bar" || this.tipoGraf == "barline") {
                this.orcado = [230, 230, 230, 230, 230, 230, 230, 230, 230, 230, 230, 230, 230, 230, 230, 230, 230, 230, 230, 230, 230, 230, 230, 230, 230, 230, 230, 230, 230, 230, 230];
                this.realiz = [150, 250, 290, 230, 255, 167];
            }
            else {
                this.orcado = [60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60];
                this.realiz = [75, 65, 100, 70, 55, 45, 66, 70, 64, 69, 50, 55, 69, 52];
            }
        }
        else if (this.tipoEixo == "mes") {
            this.eixo = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
            if (this.tipoGraf == "bar" || this.tipoGraf == "barline") {
                this.orcado = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120];
                this.realiz = [15, 25, 29, 43, 55, 67];
            }
            else {
                this.orcado = [60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60];
                this.realiz = [60, 55, 59, 63, 67, 61];
            }
        }
        this.grafico(this.eixo, this.orcado, this.realiz, this.tipoGraf);
    }
    //TIPO TMA TME 2 EIXOS
    grafico(eixo, orcado, realiz, tipoGraf) {
        var eixo1;
        var eixo2;
        if (tipoGraf == 'barline') {
            eixo1 = 'bar';
            eixo2 = 'line';
        }
        else {
            eixo1 = tipoGraf;
            eixo2 = tipoGraf;
        }
        var menor = this.descobrirMenor(orcado, realiz);
        var maior = this.descobrirMaior(orcado, realiz);
        this.data = {
            labels: eixo,
            datasets: [
                {
                    type: eixo2,
                    fill: false,
                    label: 'Realizado',
                    borderWidth: 1,
                    backgroundColor: '#253F93',
                    borderColor: '#253F93',
                    data: realiz
                },
                {
                    type: eixo1,
                    fill: false,
                    borderDash: [2, 2],
                    pointRadius: 0,
                    borderWidth: 1,
                    label: 'Orçado',
                    backgroundColor: '#6C8CC7',
                    borderColor: '#6C8CC7',
                    data: orcado
                }
            ]
        };
        this.options = {
            responsive: false,
            stacked: false,
            title: {
                display: true,
                fontSize: 16
            },
            legend: {
                position: 'bottom'
            },
            scales: {
                yAxes: [{
                        ticks: {
                            min: menor,
                            max: maior
                        },
                        gridLines: {
                            display: false,
                            drawborder: false,
                            drawOnChartArea: false
                        }
                    }],
                xAxes: [{
                        gridLines: {
                            display: false,
                            drawborder: false,
                            drawOnChartArea: false
                        }
                    }]
            }
        };
    }
    descobrirMenor(orcado, realizado) {
        var menor;
        if (Math.min.apply(this, orcado) < Math.min.apply(this, realizado)) {
            menor = Math.min.apply(this, orcado);
        }
        else {
            menor = Math.min.apply(this, realizado);
        }
        if (menor < 5) {
            menor = 0;
        }
        else {
            menor = menor - 5;
        }
        return menor;
    }
    descobrirMaior(orcado, realizado) {
        var maior;
        if (Math.max.apply(this, orcado) < Math.max.apply(this, realizado)) {
            maior = Math.max.apply(this, realizado) + 5;
        }
        else {
            maior = Math.max.apply(this, orcado) + 5;
        }
        return maior;
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], GraficosTransporteComponent.prototype, "tipoGraf", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], GraficosTransporteComponent.prototype, "tipoEixo", void 0);
GraficosTransporteComponent = tslib_1.__decorate([
    Component({
        selector: 'app-graficos-transporte',
        templateUrl: './graficos-transporte.component.html',
        styleUrls: ['./graficos-transporte.component.css']
    }),
    tslib_1.__metadata("design:paramtypes", [])
], GraficosTransporteComponent);
export { GraficosTransporteComponent };
//# sourceMappingURL=graficos-transporte.component.js.map