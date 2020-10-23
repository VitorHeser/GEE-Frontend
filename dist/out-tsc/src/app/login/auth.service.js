import * as tslib_1 from "tslib";
import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_CONFIG } from '../app.api';
import { map, catchError } from 'rxjs/operators';
import * as jwt_decode from "jwt-decode";
import { ErrorHandler } from '../app.error-handler';
let AuthService = class AuthService {
    constructor(router, http) {
        this.router = router;
        this.http = http;
        this.usuarioAutenticado = false;
        this.auth = [];
        this.mostrarMenuEmitter = new EventEmitter();
        this.dados = [];
    }
    extractData(res) {
        let body = res;
        return body;
    }
    //Requisições Http
    fazerLogin(usuario) {
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');
        headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        var stat;
        return this.http.post(`${API_CONFIG}/login`, { email: usuario.email, senha: usuario.senha }, { observe: 'response' })
            .pipe(map((response) => ({ data: response.headers,
            status: response.status,
            statusTexto: response.statusText,
        }), catchError(ErrorHandler.handleError)));
    }
    senhaUpdate(id, senha) {
        const headers = new HttpHeaders()
            .set("Content-Type", "application/json");
        let bodyObj = {
            "senha": senha
        };
        return this.http.put(`${API_CONFIG}/usuarios/attsenha/${id}`, JSON.stringify(bodyObj), { headers })
            .pipe(map(this.extractData), catchError(ErrorHandler.handleError));
    }
    // Obtendo e decodificando o Token e permissoes
    getToken(token) {
        return this.token = token;
    }
    getDecodedAccessToken(token) {
        try {
            return jwt_decode(this.token);
        }
        catch (Error) {
            return null;
        }
    }
    //Métodos de checagem
    checkAutenticado(status) {
        if (status == 200) {
            this.usuarioAutenticado = true;
            this.mostrarMenuEmitter.emit(true);
            //console.log(this.mostrarMenuEmitter)
        }
        else {
            this.usuarioAutenticado = false;
            this.mostrarMenuEmitter.emit(false);
            //console.log(this.mostrarMenuEmitter)
        }
        return this.usuarioAutenticado;
    }
    usuarioEstaAutenticado() {
        return this.usuarioAutenticado;
    }
    usuario(email) {
        return this.http.get(`${API_CONFIG}/usuarios/email/${email}`)
            .pipe(map((res) => res, catchError(ErrorHandler.handleError)));
    }
    userDados() {
        var tokenDecode = this.getDecodedAccessToken(this.token);
        function capitalizar(text) {
            var loweredText = text.toLowerCase();
            var words = loweredText.split(" ");
            for (var a = 0; a < words.length; a++) {
                var w = words[a];
                var firstLetter = w[0];
                if (w.length > 3) {
                    w = firstLetter.toUpperCase() + w.slice(1);
                }
                else if (w.length == 1 && firstLetter != 'e') {
                    w = firstLetter.toUpperCase();
                }
                else {
                    w = firstLetter + w.slice(1);
                }
                words[a] = w;
            }
            return words.join(" ");
        }
        this.dados.push({ key: 'usuarioId', valor: tokenDecode.jti, lista: [] });
        //console.log('Id: '+ tokenDecode.jti)
        sessionStorage.setItem('id', tokenDecode.jti);
        sessionStorage.setItem('email', tokenDecode.sub.substring(1, (tokenDecode.sub.length - 1)));
        //console.log(sessionStorage.getItem('email'))
        this.dados.push({ key: 'email', valor: tokenDecode.sub, lista: [] });
        sessionStorage.setItem('nome', capitalizar(this.dados[1].valor.toString().substring(1, this.dados[1].valor.indexOf('.'))) + ' ' + capitalizar(this.dados[1].valor.toString().substring(this.dados[1].valor.indexOf('.') + 1, this.dados[1].valor.indexOf('@'))));
        this.dados.push({ key: 'datalogin', valor: tokenDecode.iat, lista: [] });
        this.dados.push({ key: 'dataexpire', valor: tokenDecode.exp, lista: [] });
        var dateIni = new Date(0);
        var dateExp = new Date(0);
        dateIni.setUTCSeconds(parseInt(this.dados[2].valor));
        dateExp.setUTCSeconds(parseInt(this.dados[3].valor));
        //console.log('Data Login: '+ dateIni);
        //console.log('Data Validade: '+ dateExp);
        // Verificando permissões
        tokenDecode.roles.forEach((element, index) => {
            this.auth.push(element['authority']);
            sessionStorage.setItem("permissao " + index, element['authority']);
            console.log(element);
        });
        return this.dados;
    }
    permissoes() {
        var permissao1 = this.auth[0];
        sessionStorage.setItem("permissao1", permissao1);
        //console.log(permissao1)
        return permissao1;
    }
};
AuthService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [Router,
        HttpClient])
], AuthService);
export { AuthService };
//# sourceMappingURL=auth.service.js.map