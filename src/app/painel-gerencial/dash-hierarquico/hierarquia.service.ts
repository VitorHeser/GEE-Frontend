import { Injectable } from '@angular/core';


import {API_CONFIG} from '../../app.api'


import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map, catchError } from 'rxjs/operators';
import { ErrorHandler } from 'src/app/app.error-handler';

@Injectable()
export class HierarquiaService {

  constructor(private http: HttpClient) { }
  httpOptions = {headers: new HttpHeaders().set('Authorization',sessionStorage.getItem('token'))}

  relatorioTendencia(indic,inicio,fim): Observable<any[]>{
     return  this.http.get(`${API_CONFIG}/appPerformance/TendenciasPrincipais/${indic}/${inicio}/${fim}`,this.httpOptions) 
     .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }
}