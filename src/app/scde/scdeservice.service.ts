import { Injectable } from '@angular/core';


import {API_CONFIG} from '../app.api'


import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map, catchError } from 'rxjs/operators';
import { ErrorHandler } from 'src/app/app.error-handler';
import { Unidade } from './unidade.model';

@Injectable()
export class ScdeserviceService {
  this: any;

  constructor(private http: HttpClient){}



  httpOptions = {headers: new HttpHeaders().set('Authorization',sessionStorage.getItem('token'))}

   GruposDeUnidades(): Observable<any[]>{
      return  this.http.get(`${API_CONFIG}/SCDEMedidores/grupos`,this.httpOptions) 
      .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
   }
   UnidadesPorGrupo(grupo): Observable<any[]>{
      return  this.http.get(`${API_CONFIG}/SCDEMedidores/unidporgrupos/${grupo}`,this.httpOptions) 
      .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
   }
   Unidades(): Observable<any[]>{
      return  this.http.get(`${API_CONFIG}/SCDEMedidores`,this.httpOptions) 
      .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
   }
   UnidadesUpdateNew(unid: Unidade): Observable<any[]>{
      return  this.http.put(`${API_CONFIG}/SCDEMedidores`,unid,this.httpOptions) 
      .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
   }
   UnidadeDelete(unid: Unidade): Observable<any[]>{
      return  this.http.delete(`${API_CONFIG}/SCDEMedidores/${unid.id}`,this.httpOptions) 
      .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
   }


  
   Extrato(inicio, fim, unidadeid): Observable<any[]>{
      return  this.http.get(`${API_CONFIG}/SCDEExtracao/pordata/${inicio}/${fim}/${unidadeid}`,this.httpOptions) 
      .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
   }
   
   importarGraficosSCDE(idPeriodico,idUnidade,inicio,fim): Observable<any[]>{
      return  this.http.get(`${API_CONFIG}/SCDEExtracao/graficos/${idPeriodico}/${idUnidade}/${inicio}/${fim}`,this.httpOptions) 
      .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
   }

   importarSCDEParaSubmercado(inicio,fim): Observable<any[]>{
      return  this.http.get(`${API_CONFIG}/SCDEExtracao/porsubmercado/${inicio}/${fim}`,this.httpOptions) 
      .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
   }
   importarPerdas(inicio,fim): Observable<any[]>{
      return  this.http.get(`${API_CONFIG}/MercLivrePerdas/${inicio}/${fim}`,this.httpOptions) 
      .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
   }
   SalvarPerdas(perda): Observable<any[]>{
      return  this.http.put(`${API_CONFIG}/MercLivrePerdas`,perda,this.httpOptions) 
      .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
   }
}
