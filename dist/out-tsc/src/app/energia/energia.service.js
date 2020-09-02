import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../app.api';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { ErrorHandler } from 'src/app/app.error-handler';
let EnergiaService = class EnergiaService {
    constructor(http) {
        this.http = http;
    }
    cadastroMedidores() {
        return this.http.get(`${API_CONFIG}/energia/cadastro`)
            .pipe(map((res) => res, catchError(ErrorHandler.handleError)));
    }
    cadastroMedidoresAtualizar(bodyObj, tarifa) {
        const headers = new HttpHeaders().set("Content-Type", "application/json");
        return this.http.put(`${API_CONFIG}/energia/cadastro/${bodyObj.idEquipamento}`, JSON.stringify(bodyObj), { headers })
            .pipe(map(this.extractData), catchError(ErrorHandler.handleError));
    }
    statusMedidores(id) {
        return this.http.get(`${API_CONFIG}/energia/item/paraaprovar/${id}`)
            .pipe(map((res) => res, catchError(ErrorHandler.handleError)));
    }
    realizadoKw(dataini, datafim, id) {
        return this.http.get(`${API_CONFIG}/energia/data/${dataini}/${datafim}/${id}`)
            .pipe(map((res) => res, catchError(ErrorHandler.handleError)));
    }
    statusMedidoresAtualizar(bodyObj) {
        const headers = new HttpHeaders().set("Content-Type", "application/json");
        return this.http.put(`${API_CONFIG}/energia/item/${bodyObj.idEnergia}`, JSON.stringify(bodyObj), { headers })
            .pipe(map(this.extractData), catchError(ErrorHandler.handleError));
    }
    InserirStatus(bodyObj) {
        const headers = new HttpHeaders().set("Content-Type", "application/json");
        return this.http.post(`${API_CONFIG}/energia/item`, JSON.stringify(bodyObj), { headers })
            .pipe(map(this.extractData), catchError(ErrorHandler.handleError));
    }
    //CENARIOS
    LerCenario(id) {
        return this.http.get(`${API_CONFIG}/cenariosenergia/${id}`)
            .pipe(map((res) => res, catchError(ErrorHandler.handleError)));
    }
    LerCenarios() {
        return this.http.get(`${API_CONFIG}/cenariosenergia`)
            .pipe(map((res) => res, catchError(ErrorHandler.handleError)));
    }
    InserirCenario(bodyObj) {
        const headers = new HttpHeaders().set("Content-Type", "application/json");
        return this.http.post(`${API_CONFIG}/cenariosenergia`, JSON.stringify(bodyObj), { headers })
            .pipe(map(this.extractData), catchError(ErrorHandler.handleError));
    }
    UpdateCenario(bodyObj) {
        const headers = new HttpHeaders().set("Content-Type", "application/json");
        return this.http.put(`${API_CONFIG}/cenariosenergia/${bodyObj.id}`, JSON.stringify(bodyObj), { headers })
            .pipe(map(this.extractData), catchError(ErrorHandler.handleError));
    }
    atualizarIndicadores(bodyObj, idkw, idrs, idkwm3, idrsm3) {
        const headers = new HttpHeaders().set("Content-Type", "application/json");
        return this.http.put(`${API_CONFIG}/cenariosenergia/atualizarIndicadores/${idkw}/${idrs}/${idkwm3}/${idrsm3}`, JSON.stringify(bodyObj), { headers })
            .pipe(map(this.extractData), catchError(ErrorHandler.handleError));
    }
    extractData(res) {
        let body = res;
        return body;
    }
};
EnergiaService = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [HttpClient])
], EnergiaService);
export { EnergiaService };
//# sourceMappingURL=energia.service.js.map