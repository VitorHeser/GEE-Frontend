import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../app.api';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { ErrorHandler } from 'src/app/app.error-handler';
let AdminService = class AdminService {
    constructor(http) {
        this.http = http;
    }
    selecionarusuario(user) {
        return this.http.get(`${API_CONFIG}/usuarios/${user.usuarioId}`)
            .pipe(map((res) => res, catchError(ErrorHandler.handleError)));
    }
    //LISTAS
    listusers() {
        return this.http.get(`${API_CONFIG}/usuarios/page`)
            .pipe(map((res) => res, catchError(ErrorHandler.handleError)));
    }
    listgerencias() {
        return this.http.get(`${API_CONFIG}/gerencias`)
            .pipe(map((res) => res, catchError(ErrorHandler.handleError)));
    }
    listsupervisoes() {
        return this.http.get(`${API_CONFIG}/supervisoes`)
            .pipe(map((res) => res, catchError(ErrorHandler.handleError)));
    }
    listunidades() {
        return this.http.get(`${API_CONFIG}/unidades`)
            .pipe(map((res) => res, catchError(ErrorHandler.handleError)));
    }
    listpermissoes() {
        return this.http.get(`${API_CONFIG}/perfis`)
            .pipe(map((res) => res, catchError(ErrorHandler.handleError)));
    }
    //OPERAÇÕES
    indicadoresAtt(user) {
        const headers = new HttpHeaders().set("Content-Type", "application/json");
        return this.http.put(`${API_CONFIG}/usuarios/${user.usuarioId}`, JSON.stringify(user), { headers }).pipe(map(this.extractData), catchError(ErrorHandler.handleError));
    }
    resetSenha(user) {
        const headers = new HttpHeaders().set("Content-Type", "application/json");
        return this.http.put(`${API_CONFIG}/usuarios/recupereSenhaUser/${user.usuarioId}`, JSON.stringify(user), { headers }).pipe(map(this.extractData), catchError(ErrorHandler.handleError));
    }
    updateUsers(user) {
        const headers = new HttpHeaders().set("Content-Type", "application/json");
        return this.http.put(`${API_CONFIG}/usuarios/${user.usuarioId}`, JSON.stringify(user), { headers }).pipe(map(this.extractData), catchError(ErrorHandler.handleError));
    }
    //atualizarPermissões
    updateUser(user) {
        const headers = new HttpHeaders().set("Content-Type", "application/json");
        return this.http.put(`${API_CONFIG}/usuarios/user/${user.usuarioId}`, JSON.stringify(user), { headers }).pipe(map(this.extractData), catchError(ErrorHandler.handleError));
    }
    //INSERIR USUÁRIO
    InputUsuario(user) {
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json');
        headers.append('Access-Control-Allow-Methods', 'POST');
        return this.http.post(`${API_CONFIG}/usuarios`, user, { observe: 'response' })
            .pipe(map((response) => ({ data: response.headers,
            status: response.status,
            statusTexto: response.statusText,
        })));
    }
    extractData(res) {
        let body = res;
        return body;
    }
};
AdminService = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [HttpClient])
], AdminService);
export { AdminService };
//# sourceMappingURL=Admin.service.js.map