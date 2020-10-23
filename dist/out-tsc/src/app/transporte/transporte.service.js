import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../app.api';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { ErrorHandler } from 'src/app/app.error-handler';
let TransporteService = class TransporteService {
    constructor(http) {
        this.http = http;
    }
    Gerencias() {
        return this.http.get(`${API_CONFIG}/gerencias`)
            .pipe(map((res) => res, catchError(ErrorHandler.handleError)));
    }
    //CADASTRO
    //=============================================================================================
    veiculos() {
        return this.http.get(`${API_CONFIG}/veiculos`).pipe(map((res) => res, catchError(ErrorHandler.handleError)));
    }
    InputVeiculo(veiculo) {
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json');
        headers.append('Access-Control-Allow-Methods', 'POST');
        return this.http.post(`${API_CONFIG}/veiculos`, veiculo, { observe: 'response' })
            .pipe(map((response) => ({ data: response.headers,
            status: response.status,
            statusTexto: response.statusText,
        })));
    }
    UpdateVeiculo(veiculo) {
        const headers = new HttpHeaders()
            .set("Content-Type", "application/json");
        return this.http.put(`${API_CONFIG}/veiculos/${veiculo.veiculoId}`, JSON.stringify(veiculo), { headers })
            .pipe(map(this.extractData), catchError(ErrorHandler.handleError));
    }
    extractData(res) {
        let body = res;
        return body;
    }
    //AGENDAMENTO
    //=============================================================================================
    ParaAprovar() {
        return this.http.get(`${API_CONFIG}/agendamento/aprovar`)
            .pipe(map((res) => res, catchError(ErrorHandler.handleError)));
    }
    Condutores() {
        return this.http.get(`${API_CONFIG}/condutores`)
            .pipe(map((res) => res, catchError(ErrorHandler.handleError)));
    }
    Aprovados() {
        return this.http.get(`${API_CONFIG}/agendamento/aprovados`)
            .pipe(map((res) => res, catchError(ErrorHandler.handleError)));
    }
    Disponiveis(datainicio, datafim) {
        return this.http.get(`${API_CONFIG}/agendamento/disponiveis/${datainicio}/${datafim}/`)
            .pipe(map((res) => res, catchError(ErrorHandler.handleError)));
    }
    InputAgendamento(agendamento) {
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json');
        headers.append('Access-Control-Allow-Methods', 'POST');
        return this.http.post(`${API_CONFIG}/agendamento`, agendamento, { observe: 'response' })
            .pipe(map((response) => ({ data: response.headers,
            status: response.status,
            statusTexto: response.statusText,
        })));
    }
    UpdateAgendamento(agendamento) {
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json');
        headers.append('Access-Control-Allow-Methods', 'POST');
        return this.http.put(`${API_CONFIG}/agendamento/${agendamento.agendamentoId}`, agendamento, { observe: 'response' })
            .pipe(map((response) => ({
            data: response.headers,
            status: response.status,
            statusTexto: response.statusText,
        })));
    }
};
TransporteService = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [HttpClient])
], TransporteService);
export { TransporteService };
//# sourceMappingURL=transporte.service.js.map