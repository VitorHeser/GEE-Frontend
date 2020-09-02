import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { PerformanceService } from '../performance/performance.service';
let GraficosIndicadoresComponent = class GraficosIndicadoresComponent {
    constructor(performanceService) {
        this.performanceService = performanceService;
    }
    ngOnInit() {
        this.performanceService.indicadores(this.refer, this.indicador['indicadorId']).subscribe(dados => {
            var maximo = 0;
            for (var i = 34; i >= 0; i--) {
                if (dados[0][i] !== '01/01') {
                    maximo = i;
                    break;
                }
            }
            var eixo = dados[0].splice(1, maximo);
            var atributos = this.criarArrayDeAtributos(dados, maximo);
            this.MontarGrafico(eixo, this.indicador, atributos);
        });
    }
    criarArrayDeAtributos(dados, maximo) {
        var LinhaJson = "{";
        for (var j = 4; j < dados.length; j++) {
            var titulo = dados[j].splice(0, 1);
            var corpo = '[';
            for (var i = 0; i < maximo; i++) {
                var dado = dados[j][i] === '1980-01-01' ? null : dados[j][i] === '-' ? null : dados[j][i];
                var increment = i === (maximo - 1) ? ']' : ',';
                corpo = corpo + dado + increment;
            }
            var increment2 = j === (dados.length - 1) ? '}' : ',';
            LinhaJson = LinhaJson + '"' + titulo + '":' + corpo + increment2;
        }
        return JSON.parse(LinhaJson);
    }
    MontarGrafico(eixo, indicador, atributos) {
        var dataset = [];
        var Axes = [];
        var left = false;
        var right = false;
        for (var i = 0; i < indicador.campoDoGraficoId.length; i++) {
            dataset.push(indicador.campoDoGraficoId[i].estilo === 'Pontilhado' ?
                {
                    type: indicador.campoDoGraficoId[i].tipografico,
                    yAxisID: indicador.campoDoGraficoId[i].posicao === 'right' ? 'y-axis-2' : 'y-axis-1',
                    fill: false,
                    pointStyle: 'circle',
                    borderDash: [2, 2],
                    pointRadius: 0,
                    borderColor: indicador.campoDoGraficoId[i].coreixo,
                    backgroundColor: indicador.campoDoGraficoId[i].coreixo,
                    label: indicador.campoDoGraficoId[i].label,
                    data: atributos[indicador.campoDoGraficoId[i].eixo]
                } :
                {
                    type: indicador.campoDoGraficoId[i].tipografico,
                    yAxisID: indicador.campoDoGraficoId[i].posicao === 'right' ? 'y-axis-2' : 'y-axis-1',
                    fill: false,
                    borderColor: indicador.campoDoGraficoId[i].coreixo,
                    backgroundColor: indicador.campoDoGraficoId[i].coreixo,
                    label: indicador.campoDoGraficoId[i].label,
                    data: atributos[indicador.campoDoGraficoId[i].eixo]
                });
            left = indicador.campoDoGraficoId[i].posicao === 'left' ? true : left = true ? true : false;
            right = indicador.campoDoGraficoId[i].posicao === 'right' ? true : right = true ? true : false;
        }
        if (left === true) {
            Axes.push({
                type: 'linear',
                display: true,
                position: 'left',
                id: 'y-axis-1',
                gridLines: {
                    display: true,
                    drawborder: true,
                    drawOnChartArea: false
                },
                ticks: {
                    beginAtZero: true
                },
            });
        }
        if (right === true) {
            Axes.push({
                type: 'linear',
                display: true,
                position: 'right',
                id: 'y-axis-2',
                ticks: {
                    beginAtZero: true
                }
            });
        }
        this.data = {
            labels: eixo,
            datasets: dataset
        };
        this.options = {
            responsive: true,
            stacked: false,
            title: {
                display: true,
                fontSize: 16
            },
            gridLines: {
                display: true,
                drawborder: true,
                drawOnChartArea: false
            },
            scales: {
                yAxes: Axes
            },
            legend: {
                position: 'bottom'
            }
        };
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], GraficosIndicadoresComponent.prototype, "refer", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], GraficosIndicadoresComponent.prototype, "indicador", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Boolean)
], GraficosIndicadoresComponent.prototype, "comentarios", void 0);
GraficosIndicadoresComponent = tslib_1.__decorate([
    Component({
        selector: 'app-graficos-indicadores',
        templateUrl: './graficos-indicadores.component.html',
        styleUrls: ['./graficos-indicadores.component.css']
    }),
    tslib_1.__metadata("design:paramtypes", [PerformanceService])
], GraficosIndicadoresComponent);
export { GraficosIndicadoresComponent };
//# sourceMappingURL=graficos-indicadores.component.js.map