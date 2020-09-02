import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { ErrorHandler } from 'src/app/app.error-handler';
let HomeComponent = class HomeComponent {
    constructor(http) {
        this.http = http;
        this.condicoes = [];
        this.datas = [];
        this.min = [];
        this.max = [];
        this.chuva = [];
        this.monName = new Array("Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Out", "Nov", "Dez");
        this.dayName = new Array("Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado");
    }
    tempoagora() {
        return this.http.get(`http://apiadvisor.climatempo.com.br/api/v1/weather/locale/6314/current?token=3e05a68626051b9ef2b47c482e876f0d`)
            .pipe(map((res) => res, catchError(ErrorHandler.handleError)));
    }
    temposemana() {
        return this.http.get(`http://apiadvisor.climatempo.com.br/api/v1/forecast/locale/6314/days/15?token=3e05a68626051b9ef2b47c482e876f0d`)
            .pipe(map((res) => res, catchError(ErrorHandler.handleError)));
    }
    ngOnInit() {
        // console.log(sessionStorage.getItem("permissao 2"))    traz permissão
        this.tempoagora()
            .subscribe(tempo => {
            let d;
            //console.log(tempo['data']), mostra o tempo completo
            this.temperatura = tempo['data'].temperature;
            this.hoje = tempo['data'].date;
            this.condicao = tempo['data'].condition;
            d = new Date();
            this.mes = this.monName[d.getMonth()];
            this.diasemana = this.dayName[d.getDay()];
            this.diasemana1 = this.dayName[d.getDay() + 1];
            this.diasemana2 = this.dayName[d.getDay() + 2];
            this.diasemana3 = this.dayName[d.getDay() + 3];
            this.diasemana4 = this.dayName[d.getDay() + 4];
            this.dia = d.getDate();
            this.ano = d.getFullYear();
            this.hoje = this.dia + " " + this.mes + " " + this.ano;
        });
        this.temposemana()
            .subscribe(tempo => {
            // console.log(tempo['data']),
            this.previsoes = tempo['data'],
                this.previsoes.forEach(element => {
                    this.chuva.push(element['rain']['probability']),
                        this.condicoes.push(element['text_icon']['text']['pt']),
                        this.datas.push(element['date_br']),
                        this.min.push(element['temperature']['min']),
                        this.max.push(element['temperature']['max']);
                });
            this.manha = this.previsoes[0]['text_icon']['text']['phrase']['morning'];
            this.tarde = this.previsoes[0]['text_icon']['text']['phrase']['afternoon'];
            this.noite = this.previsoes[0]['text_icon']['text']['phrase']['night'];
            //console.log(this.manha)
        });
    }
};
HomeComponent = tslib_1.__decorate([
    Component({
        selector: 'app-home',
        templateUrl: './home.component.html',
        styleUrls: ['./home.component.css']
    }),
    tslib_1.__metadata("design:paramtypes", [HttpClient])
], HomeComponent);
export { HomeComponent };
//# sourceMappingURL=home.component.js.map