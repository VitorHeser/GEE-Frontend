import { Injectable } from '@angular/core';


import {API_CONFIG} from '../app.api'


import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map, catchError } from 'rxjs/operators';
import { ErrorHandler } from 'src/app/app.error-handler';

@Injectable()
export class GraficosDash1Service {

   
   constructor(private http: HttpClient){}
   
   httpOptions = {headers: new HttpHeaders().set('Authorization',sessionStorage.getItem('token'))}
   importarUnidades(): Observable<any[]>{
      
      return  this.http.get(`${API_CONFIG}/appPerformance/unidades`,this.httpOptions) 
      .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
   }
   importarRegionais(): Observable<any[]>{
      return  this.http.get(`${API_CONFIG}/appPerformance/regionais`,this.httpOptions) 
      .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
   }
   importarRegionaisEGraph(Ano,ultano): Observable<any[]>{
         return  this.http.get(`${API_CONFIG}/appPerformance/GraficosIniciais/${Ano}/${ultano}`,this.httpOptions) 
         .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
   }


   importarEixos(nomeunidade,idAguaEsg,Ano,ultano): Observable<any[]>{
      return  this.http.get(`${API_CONFIG}/appPerformance/indicador/${nomeunidade}/${idAguaEsg}/${Ano}/${ultano}`,this.httpOptions) 
      .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
   }
   importarGraph(nomeunidade,idAguaEsg,Ano,ultano): Observable<any[]>{
      return  this.http.get(`${API_CONFIG}/appPerformance/indicadorGraph/${nomeunidade}/${idAguaEsg}/${Ano}/${ultano}`,this.httpOptions) 
      .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
   }
   importarGraphConsCust(idConsCust,Ano,ultano): Observable<any[]>{
      return  this.http.get(`${API_CONFIG}/appPerformance/indicadorConsol/${idConsCust}/${Ano}/${ultano}`,this.httpOptions) 
      .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
   }
   importarGraphConsCust2(Ano,ultano): Observable<any[]>{
      return  this.http.get(`${API_CONFIG}/appPerformance/indicadorConsol/${Ano}/${ultano}`,this.httpOptions) 
      .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
   }


   RelatorioViridisSap1(): Observable<any[]>{
      return  this.http.get(`${API_CONFIG}/relatorioViridisSap1`,this.httpOptions) 
      .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
   }
   RelatorioViridisSap2(): Observable<any[]>{
      return  this.http.get(`${API_CONFIG}/relatorioViridisSap2`,this.httpOptions) 
      .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
   }
   RelatorioViridisPasta(): Observable<any[]>{
      return  this.http.get(`${API_CONFIG}/relatorioViridisPasta`,this.httpOptions) 
      .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
   }
}
