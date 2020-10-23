import { Injectable } from '@angular/core';


import {API_CONFIG} from '../../app.api'


import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map, catchError } from 'rxjs/operators';
import { ErrorHandler } from 'src/app/app.error-handler';

@Injectable()
export class Auditoria004bService {
  constructor(private http: HttpClient){}
   
  httpOptions = {headers: new HttpHeaders().set('Authorization',sessionStorage.getItem('token'))}
  unidades(): Observable<any[]>{
     return  this.http.get(`${API_CONFIG}/Rel004b/unidades`,this.httpOptions) 
     .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }

  Array(inicio,fim,Eqps): Observable<any[]>{
    return  this.http.post(`${API_CONFIG}/Rel004b/Analise01/${inicio}/${fim}`,Eqps,this.httpOptions) 
    .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }
}
