import { Injectable } from '@angular/core';


import {API_CONFIG} from '../app.api'


import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map, catchError } from 'rxjs/operators';
import { ErrorHandler } from 'src/app/app.error-handler';

@Injectable()
export class HemeraserviceService {
  this: any;

  constructor(private http: HttpClient){}



  httpOptions = {headers: new HttpHeaders().set('Authorization',sessionStorage.getItem('token'))}

  GruposDeUnidades(): Observable<any[]>{
      return  this.http.get(`${API_CONFIG}/HemeraMedidores/grupos`,this.httpOptions) 
      .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
   }
   UnidadesPorGrupo(grupo): Observable<any[]>{
      return  this.http.get(`${API_CONFIG}/HemeraMedidores/unidporgrupos/${grupo}`,this.httpOptions) 
      .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
   }
  Unidades(): Observable<any[]>{
     return  this.http.get(`${API_CONFIG}/HemeraMedidores`,this.httpOptions) 
     .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }
  UnidadesUpdateNew(unid: any): Observable<any[]>{
     return  this.http.put(`${API_CONFIG}/HemeraMedidores`,unid,this.httpOptions) 
     .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }
  UnidadeDelete(unid: any): Observable<any[]>{
     return  this.http.delete(`${API_CONFIG}/HemeraMedidores/${unid.id}`,this.httpOptions) 
     .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }


  
   Extrato(inicio, fim,med): Observable<any[]>{
      return  this.http.get(`${API_CONFIG}/HemeraExtracao/pordata/${inicio}/${fim}/${med}`,this.httpOptions) 
      .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
   }
   
   importarGraficosSCDE(idPeriodico,idUnidade,inicio,fim): Observable<any[]>{
      return  this.http.get(`${API_CONFIG}/HemeraExtracao/graficos/${idPeriodico}/${idUnidade}/${inicio}/${fim}`,this.httpOptions) 
      .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
   }

}
