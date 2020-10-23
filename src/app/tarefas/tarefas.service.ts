import { Injectable } from '@angular/core';

import {API_CONFIG} from '../app.api'

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map, catchError } from 'rxjs/operators';
import { ErrorHandler } from 'src/app/app.error-handler';

@Injectable()
export class TarefasService {


  constructor(private http: HttpClient){}
  

  httpOptions = {headers: new HttpHeaders().set('Authorization',sessionStorage.getItem('token'))}

  TarefasPorReferencia(): Observable<any[]>{
    return  this.http.get(`${API_CONFIG}/Tarefas`,this.httpOptions) 
    .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }
  Tarefas(): Observable<any[]>{
    return  this.http.get(`${API_CONFIG}/Tarefas`,this.httpOptions) 
    .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }
  TarefasUpdate(unid): Observable<any[]>{
      return  this.http.put(`${API_CONFIG}/Tarefas`,unid,this.httpOptions) 
      .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }
  TarefasNew(unid): Observable<any[]>{
      return  this.http.post(`${API_CONFIG}/Tarefas`,unid,this.httpOptions) 
      .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }
  TarefasDelete(unid): Observable<any[]>{
      return  this.http.delete(`${API_CONFIG}/Tarefas/${unid.id}`,this.httpOptions) 
      .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }
}
