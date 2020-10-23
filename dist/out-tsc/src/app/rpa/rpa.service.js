import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../app.api';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { ErrorHandler } from 'src/app/app.error-handler';
let RpaService = class RpaService {
    constructor(http) {
        this.http = http;
    }
    cadastroBots() {
        return this.http.get(`${API_CONFIG}/cadrpa`)
            .pipe(map((res) => res, catchError(ErrorHandler.handleError)));
    }
    statusBots() {
        return this.http.get(`${API_CONFIG}/statusbot`)
            .pipe(map((res) => res, catchError(ErrorHandler.handleError)));
    }
};
RpaService = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [HttpClient])
], RpaService);
export { RpaService };
//# sourceMappingURL=rpa.service.js.map