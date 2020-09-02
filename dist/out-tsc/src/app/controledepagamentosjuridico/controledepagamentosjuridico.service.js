import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../app.api';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { ErrorHandler } from 'src/app/app.error-handler';
let ControledepagamentosjuridicoService = class ControledepagamentosjuridicoService {
    constructor(http) {
        this.http = http;
    }
    Pagamentos() {
        return this.http.get(`${API_CONFIG}/pagamentoJuridico`)
            .pipe(map((res) => res, catchError(ErrorHandler.handleError)));
    }
    editaveis() {
        return this.http.get(`${API_CONFIG}/pagamentoJuridico/editaveis`)
            .pipe(map((res) => res, catchError(ErrorHandler.handleError)));
    }
    emAprovacao() {
        return this.http.get(`${API_CONFIG}/pagamentoJuridico/emaprovacao`)
            .pipe(map((res) => res, catchError(ErrorHandler.handleError)));
    }
    Aprovando(nivel, centrosdecustos) {
        return this.http.get(`${API_CONFIG}/pagamentoJuridico/aprovando/${nivel}/${centrosdecustos}`)
            .pipe(map((res) => res, catchError(ErrorHandler.handleError)));
    }
    InputPagamento(corpo) {
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json');
        headers.append('Access-Control-Allow-Methods', 'POST');
        console.log(corpo);
        return this.http.post(`${API_CONFIG}/pagamentoJuridico`, corpo, { observe: 'response' })
            .pipe(map((response) => ({ data: response.headers,
            status: response.status,
            statusTexto: response.statusText,
        })));
    }
    UpdatePagamento(agendamento) {
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json');
        headers.append('Access-Control-Allow-Methods', 'POST');
        return this.http.put(`${API_CONFIG}/pagamentoJuridico/${agendamento.idPagamento}`, agendamento, { observe: 'response' })
            .pipe(map((response) => ({
            data: response.headers,
            status: response.status,
            statusTexto: response.statusText,
        })));
    }
};
ControledepagamentosjuridicoService = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [HttpClient])
], ControledepagamentosjuridicoService);
export { ControledepagamentosjuridicoService };
//# sourceMappingURL=controledepagamentosjuridico.service.js.map