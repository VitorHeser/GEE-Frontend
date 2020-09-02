import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../../app.api';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { ErrorHandler } from 'src/app/app.error-handler';
let AdminIndicadoresService = class AdminIndicadoresService {
    constructor(http) {
        this.http = http;
    }
    gerencias() {
        return this.http.get(`${API_CONFIG}/gerencias`)
            .pipe(map((res) => res, catchError(ErrorHandler.handleError)));
    }
    listaIndicadores() {
        return this.http.get(`${API_CONFIG}/cadindicadores`)
            .pipe(map((res) => res, catchError(ErrorHandler.handleError)));
    }
    UnicoIndicadores(id) {
        return this.http.get(`${API_CONFIG}/cadindicadores/${id}`)
            .pipe(map((res) => res, catchError(ErrorHandler.handleError)));
    }
    cadastroIndicadoresInserir(bodyObj) {
        const headers = new HttpHeaders().set("Content-Type", "application/json");
        return this.http.post(`${API_CONFIG}/cadindicadores`, JSON.stringify(bodyObj), { headers })
            .pipe(map(this.extractData), catchError(ErrorHandler.handleError));
    }
    cadastroIndicadoresAtt(bodyObj) {
        const headers = new HttpHeaders().set("Content-Type", "application/json");
        return this.http.put(`${API_CONFIG}/cadindicadores/${bodyObj.indicadorId}`, JSON.stringify(bodyObj), { headers })
            .pipe(map(this.extractData), catchError(ErrorHandler.handleError));
    }
    atualizarCampos(bodyObj, id) {
        const headers = new HttpHeaders().set("Content-Type", "application/json");
        return this.http.put(`${API_CONFIG}/cadindicadoresgraficos/${id}`, JSON.stringify(bodyObj), { headers })
            .pipe(map(this.extractData), catchError(ErrorHandler.handleError));
    }
    deletarCampos(id) {
        const headers = new HttpHeaders().set("Content-Type", "application/json");
        return this.http.delete(`${API_CONFIG}/cadindicadoresgraficos/${id}`)
            .pipe(map(this.extractData), catchError(ErrorHandler.handleError));
    }
    indicadoresByRange(data1, data2, indicador) {
        return this.http.get(`${API_CONFIG}/indicadores/porrange/${indicador}/${data1}/${data2}`)
            .pipe(map((res) => res, catchError(ErrorHandler.handleError)));
    }
    indicadoresByMonth(referencia, indicador) {
        return this.http.get(`${API_CONFIG}/indicadores/pormes/${indicador}/${referencia}`)
            .pipe(map((res) => res, catchError(ErrorHandler.handleError)));
    }
    listaIndicadoresgerenc(gerenc) {
        return this.http.get(`${API_CONFIG}/cadindicadores/gerencia/${gerenc}`)
            .pipe(map((res) => res, catchError(ErrorHandler.handleError)));
    }
    indicadoresAtt(bodyObj) {
        const headers = new HttpHeaders().set("Content-Type", "application/json");
        return this.http.put(`${API_CONFIG}/indicadores/${bodyObj.exeindicadorId}`, JSON.stringify(bodyObj), { headers })
            .pipe(map(this.extractData), catchError(ErrorHandler.handleError));
    }
    importarIndicador(bodyObj, fkindic) {
        const headers = new HttpHeaders().set("Content-Type", "application/json");
        return this.http.put(`${API_CONFIG}/indicadores/updateCsv/${fkindic}`, JSON.stringify(bodyObj), { headers })
            .pipe(map(this.extractData), catchError(ErrorHandler.handleError));
    }
    extractData(res) {
        let body = res;
        return body;
    }
    statusBots(robo) {
        return this.http.get(`${API_CONFIG}/cadrpa/statusbot/${robo}`)
            .pipe(map((res) => res, catchError(ErrorHandler.handleError)));
    }
    startBot(robo) {
        return this.http.get(`${API_CONFIG}/cadrpa/startbot/${robo}`)
            .pipe(map((res) => res, catchError(ErrorHandler.handleError)));
    }
    unidades() {
        return this.http.get(`${API_CONFIG}/unidades`)
            .pipe(map((res) => res, catchError(ErrorHandler.handleError)));
    }
    CarregarIndicadors(indicadorid, ano, datacorte, unidadeid, dialimite) {
        return this.http.get(`${API_CONFIG}/indicadores/novoindicador/${indicadorid}/${ano}/${datacorte}/${unidadeid}/${dialimite}`)
            .pipe(map((res) => res, catchError(ErrorHandler.handleError)));
    }
};
AdminIndicadoresService = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [HttpClient])
], AdminIndicadoresService);
export { AdminIndicadoresService };
//# sourceMappingURL=admin-indicadores.service.js.map