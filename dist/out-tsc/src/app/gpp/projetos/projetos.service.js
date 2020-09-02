import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../../app.api';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { ErrorHandler } from 'src/app/app.error-handler';
let ProjetosService = class ProjetosService {
    constructor(http) {
        this.http = http;
    }
    getFluxoInvestimento() {
        return this.http.get('assets/data/dados-modulo-projeto.json')
            .toPromise()
            .then(res => res.fluxoinvestimento)
            .then(data => data);
    }
    getAnos() {
        return this.http.get('assets/data/dados-modulo-projeto.json')
            .toPromise()
            .then(res => res.anos)
            .then(data => data);
    }
    getMeses() {
        return this.http.get('assets/data/dados-modulo-projeto.json')
            .toPromise()
            .then(res => res.meses)
            .then(data => data);
    }
    getDias() {
        return this.http.get('assets/data/dados-modulo-projeto.json')
            .toPromise()
            .then(res => res.dias)
            .then(data => data);
    }
    getFases() {
        return this.http.get('assets/data/dados-modulo-projeto.json')
            .toPromise()
            .then(res => res.fasesprojetos)
            .then(data => data);
    }
    getStatusGlobal() {
        return this.http.get('assets/data/dados-modulo-projeto.json')
            .toPromise()
            .then(res => res.statusglobal)
            .then(data => data);
    }
    getEngenharia() {
        return this.http.get('assets/data/dados-modulo-projeto.json')
            .toPromise()
            .then(res => res.engenharia)
            .then(data => data);
    }
    getProcessos() {
        return this.http.get('assets/data/dados-modulo-projeto.json')
            .toPromise()
            .then(res => res.processos)
            .then(data => data);
    }
    getLicencas() {
        return this.http.get('assets/data/dados-modulo-projetos.json')
            .toPromise()
            .then(res => res.licencas)
            .then(data => data);
    }
    projetos() {
        return this.http.get(`${API_CONFIG}/projetos`)
            .pipe(map((res) => res, catchError(ErrorHandler.handleError)));
    }
    regulatorios(projetosId) {
        return this.http.get(`${API_CONFIG}/projetos/${projetosId}/regulatorios`)
            .pipe(map((res) => res, catchError(ErrorHandler.handleError)));
    }
    partesInteressadas() {
        return this.http.get(`${API_CONFIG}/partesinteressadas`)
            .pipe(map((res) => res, catchError(ErrorHandler.handleError)));
    }
    projetosId(projetosId) {
        return this.http.get(`${API_CONFIG}/projetos/${projetosId}`)
            .pipe(map((res) => res, catchError(ErrorHandler.handleError)));
    }
    projetosAdd(dados) {
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');
        headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        console.log(dados);
        return this.http.post(`${API_CONFIG}/projetos`, dados, { observe: 'response' })
            .pipe(map((response) => ({ data: response.headers,
            status: response.status,
            statusTexto: response.statusText
        }), catchError(ErrorHandler.handleError)));
    }
    projetosAtt(arrProjeto, id) {
        const headers = new HttpHeaders()
            .set("Content-Type", "application/json");
        let bodyObj = arrProjeto;
        return this.http.put(`${API_CONFIG}/projetos/${id}`, JSON.stringify(bodyObj), { headers })
            .pipe(map(this.extractData), catchError(ErrorHandler.handleError));
    }
    extractData(res) {
        let body = res;
        return body;
    }
    regulatoriosAdd(dados) {
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');
        headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        console.log(dados);
        return this.http.post(`${API_CONFIG}/regulatorios`, dados, { observe: 'response' })
            .pipe(map((response) => ({ data: response.headers,
            status: response.status,
            statusTexto: response.statusText
        }), catchError(ErrorHandler.handleError)));
    }
    regulatoriosAtt(arrProjeto, id) {
        const headers = new HttpHeaders()
            .set("Content-Type", "application/json");
        let bodyObj = arrProjeto;
        return this.http.put(`${API_CONFIG}/regulatorios/${id}`, JSON.stringify(bodyObj), { headers })
            .pipe(map(this.extractData), catchError(ErrorHandler.handleError));
    }
};
ProjetosService = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [HttpClient])
], ProjetosService);
export { ProjetosService };
//# sourceMappingURL=projetos.service.js.map