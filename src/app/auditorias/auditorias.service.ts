import { Injectable } from '@angular/core';


import {API_CONFIG} from '../app.api'


import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map, catchError } from 'rxjs/operators';
import { ErrorHandler } from 'src/app/app.error-handler';

@Injectable()
export class AuditoriasService {
  constructor(private http: HttpClient){}
   
  httpOptions = {headers: new HttpHeaders().set('Authorization',sessionStorage.getItem('token'))}
  importarSAP(): Observable<any[]>{
     return  this.http.get(`${API_CONFIG}/RelatoriosDeAuditorias/SAP`,this.httpOptions) 
     .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }
  importarViridis(): Observable<any[]>{
     return  this.http.get(`${API_CONFIG}/RelatoriosDeAuditorias/Viridis`,this.httpOptions) 
     .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }
  auditorias(dat): Observable<any[]>{
     return  this.http.get(`${API_CONFIG}/RelatoriosDeAuditorias/Auditorias/${dat}`,this.httpOptions) 
     .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }
  auditoria1(dat): Observable<any[]>{
     return  this.http.get(`${API_CONFIG}/RelatoriosDeAuditorias/Auditoria1/${dat}`,this.httpOptions) 
     .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }
  auditoria2(dat): Observable<any[]>{
     return  this.http.get(`${API_CONFIG}/RelatoriosDeAuditorias/Auditoria2/${dat}`,this.httpOptions) 
     .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }
  auditoria3(dat): Observable<any[]>{
     return  this.http.get(`${API_CONFIG}/RelatoriosDeAuditorias/Auditoria3/${dat}`,this.httpOptions) 
     .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }
  auditoria4(dat): Observable<any[]>{
     return  this.http.get(`${API_CONFIG}/RelatoriosDeAuditorias/Auditoria4/${dat}`,this.httpOptions) 
     .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }
  auditoria5(dat): Observable<any[]>{
     return  this.http.get(`${API_CONFIG}/RelatoriosDeAuditorias/Auditoria5/${dat}`,this.httpOptions) 
     .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }
  auditoria6(dat): Observable<any[]>{
     return  this.http.get(`${API_CONFIG}/RelatoriosDeAuditorias/Auditoria6/${dat}`,this.httpOptions) 
     .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }


  QtdFaturas(dat,usr): Observable<any[]>{
     return  this.http.get(`${API_CONFIG}/Rel003/relatorio/contagem/${dat}/${usr}`,this.httpOptions) 
     .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }
  FaturasNaoLancadas(dat,usr): Observable<any[]>{
     return  this.http.get(`${API_CONFIG}/Rel003/relatorio/${dat}/${usr}`,this.httpOptions) 
     .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }
}
