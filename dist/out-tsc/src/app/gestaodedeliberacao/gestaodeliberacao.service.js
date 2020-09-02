import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { ErrorHandler } from 'src/app/app.error-handler';
import { API_CONFIG } from '../app.api';
let GestaoDeliberacaoService = class GestaoDeliberacaoService {
    constructor(http) {
        this.http = http;
    }
    //Pesquisar notificação
    notificacao(termo, stat) {
        return this.http.get(`${API_CONFIG}/birregularidades/termo/${termo}/status/${stat}`)
            .pipe(map((res) => res, catchError(ErrorHandler.handleError)));
    }
    idProcesso(idProcesso) {
        return this.http.get(`${API_CONFIG}/gestaodeliberacao/${idProcesso}`)
            .pipe(map((res) => res, catchError(ErrorHandler.handleError)));
    }
    processo(idIrreg) {
        return this.http.get(`${API_CONFIG}/gestaodeliberacao/irreg/${idIrreg}`)
            .pipe(map((res) => res, catchError(ErrorHandler.handleError)));
    }
    endentrega(matricula) {
        return this.http.get(`${API_CONFIG}/endentrega/${matricula}`)
            .pipe(map((res) => res, catchError(ErrorHandler.handleError)));
    }
    InputTeste(ask, bid, epoch, id, quote, symbol) {
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');
        headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        return this.http.post(`${API_CONFIG}/zteste`, { ask: ask, bid: bid, epoch: epoch, id: id, quote: quote, symbol: symbol }, { observe: 'response' })
            .pipe(map((response) => ({ data: response.headers,
            status: response.status,
            statusTexto: response.statusText,
        })));
    }
    //Inputar os dados de Deliberação
    InputDeliberacao(idIrregularidade, dataAviso1, dataAviso2, dataAviso3, mesRetroativo, titular, usuarioPresente, contrato, num_ligacao, carta, cartaProcedente, ro, num_termo, colaborador, protocolo, cartacedoc) {
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');
        headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        return this.http.post(`${API_CONFIG}/gestaodeliberacao`, { idIrregularidade: idIrregularidade, dataAviso1: dataAviso1, dataAviso2: dataAviso2, dataAviso3: dataAviso3, mesRetroativo: mesRetroativo,
            titular: titular, usuarioPresente: usuarioPresente, contrato: contrato, num_ligacao: num_ligacao,
            carta: carta, cartaProcedente: cartaProcedente, ro: ro, num_termo: num_termo, colaborador: colaborador, protocolo: protocolo, cartacedoc: cartacedoc }, { observe: 'response' })
            .pipe(map((response) => ({ data: response.headers,
            status: response.status,
            statusTexto: response.statusText,
        })));
    }
};
GestaoDeliberacaoService = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [HttpClient])
], GestaoDeliberacaoService);
export { GestaoDeliberacaoService };
//# sourceMappingURL=gestaodeliberacao.service.js.map