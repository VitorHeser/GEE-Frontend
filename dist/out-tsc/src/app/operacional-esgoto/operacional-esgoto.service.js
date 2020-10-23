import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../app.api';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { ErrorHandler } from 'src/app/app.error-handler';
let OperacionalEsgotoService = class OperacionalEsgotoService {
    constructor(http) {
        this.http = http;
    }
    classindicadores(gerencia) {
        return this.http.get(`${API_CONFIG}/cadindicadores/gerencia/${gerencia}`)
            .pipe(map((res) => res, catchError(ErrorHandler.handleError)));
    }
    indicadoresAtt2(Indicador) {
        const headers = new HttpHeaders()
            .set("Content-Type", "application/json");
        return this.http.put(`${API_CONFIG}/indicadores/${Indicador.exeindicadorId}`, JSON.stringify(Indicador), { headers })
            .pipe(map(this.extractData), catchError(ErrorHandler.handleError));
    }
    extractData(res) {
        let body = res;
        return body;
    }
};
OperacionalEsgotoService = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [HttpClient])
], OperacionalEsgotoService);
export { OperacionalEsgotoService };
//# sourceMappingURL=operacional-esgoto.service.js.map