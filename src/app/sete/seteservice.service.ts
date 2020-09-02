import { Injectable } from '@angular/core';

import {API_CONFIG} from '../app.api'

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map, catchError } from 'rxjs/operators';
import { ErrorHandler } from 'src/app/app.error-handler';

@Injectable()
export class SeteserviceService {


  constructor(private http: HttpClient){}
  

  httpOptions = {headers: new HttpHeaders().set('Authorization',sessionStorage.getItem('token'))}


  //=================================================================================
  Unidades(): Observable<any[]>{
    return  this.http.get(`${API_CONFIG}/SETERelatorioEmpresas`,this.httpOptions) 
    .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }
  UnidadesUpdateNew(unid): Observable<any[]>{
      return  this.http.put(`${API_CONFIG}/SETERelatorioEmpresas`,unid,this.httpOptions) 
      .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }
  UnidadeDelete(unid): Observable<any[]>{
      return  this.http.delete(`${API_CONFIG}/SETERelatorioEmpresas/${unid.id}`,this.httpOptions) 
      .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }

  //=================================================================================


  MigracoesACLAll(): Observable<any[]>{
    return  this.http.get(`${API_CONFIG}/SETEMigracaoACL`,this.httpOptions) 
    .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }
  MigracoesACL(und): Observable<any[]>{
    return  this.http.get(`${API_CONFIG}/SETEMigracaoACL/unidade/${und.id}`,this.httpOptions) 
    .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }
  MigracoesACLUpdateNew(unid): Observable<any[]>{
      return  this.http.put(`${API_CONFIG}/SETEMigracaoACL/${unid.id}`,unid,this.httpOptions) 
      .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }
  MigracoesACLDelete(unid): Observable<any[]>{
      return  this.http.delete(`${API_CONFIG}/SETEMigracaoACL/${unid.id}`,this.httpOptions) 
      .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }

  //=================================================================================


  UndNegocios(): Observable<any[]>{
    return  this.http.get(`${API_CONFIG}/SETEUndNegocio`,this.httpOptions) 
    .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }
  UndNegociosUpdateNew(unid): Observable<any[]>{
      return  this.http.put(`${API_CONFIG}/SETEUndNegocio/${unid.id}`,unid,this.httpOptions) 
      .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }
  UndNegociosDelete(unid): Observable<any[]>{
      return  this.http.delete(`${API_CONFIG}/SETEUndNegocio/${unid.id}`,this.httpOptions) 
      .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }



  //=================================================================================


  Reajustes(): Observable<any[]>{
    return  this.http.get(`${API_CONFIG}/SETEReajusteAnual`,this.httpOptions) 
    .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }
  ReajustesUpdateNew(unid): Observable<any[]>{
      return  this.http.put(`${API_CONFIG}/SETEReajusteAnual/${unid.id}`,unid,this.httpOptions) 
      .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }
  ReajustesDelete(unid): Observable<any[]>{
      return  this.http.delete(`${API_CONFIG}/SETEReajusteAnual/${unid.id}`,this.httpOptions) 
      .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }

  //=================================================================================


  RealizadoACRAnterior(): Observable<any[]>{
    return  this.http.get(`${API_CONFIG}/SETERealizadoACR`,this.httpOptions) 
    .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }
  RealizadoACRAnteriorUpdateNew(unid): Observable<any[]>{
      return  this.http.put(`${API_CONFIG}/SETERealizadoACR/${unid.id}`,unid,this.httpOptions) 
      .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }
  RealizadoACRAnteriorDelete(unid): Observable<any[]>{
      return  this.http.delete(`${API_CONFIG}/SETERealizadoACR/${unid.id}`,this.httpOptions) 
      .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }





  //=================================================================================
  Versoes(): Observable<any[]>{
    return  this.http.get(`${API_CONFIG}/SETEVersoes`,this.httpOptions) 
    .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }
  VersoesUpdateNew(unid): Observable<any[]>{
      return  this.http.put(`${API_CONFIG}/SETEVersoes`,unid,this.httpOptions) 
      .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }
  calculosdeversao(versao): Observable<any[]>{
    return  this.http.get(`${API_CONFIG}/SETEVersoesCalculos/versao/${versao}`,this.httpOptions) 
    .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }
  
  importarRelatorio(uploadedFiles : any, descricao : string, versao : string, anoinicio : string): Observable<any[]>{
    const formData = new FormData();
    formData.append('txt',uploadedFiles);
    formData.append('nome',descricao);
    formData.append('versao',versao);
    formData.append('anoinicio',anoinicio);

     return  this.http.post(`${API_CONFIG}/SETERelatorio/importBD/NewVersion`,formData,this.httpOptions) 
     .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }
  
  //=================================================================================
  
  ComparativoDeVersao(id1,id2): Observable<any[]>{
    return  this.http.get(`${API_CONFIG}/SETEVersoesCalculos/versao/compare/${id1}/${id2}`,this.httpOptions) 
    .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }
  
  
  
  
  //=================================================================================
  //EXEMPLO
  Extrato(inicio, fim): Observable<any[]>{
    return  this.http.get(`${API_CONFIG}/SCDEExtracao/pordata/${inicio}/${fim}`,this.httpOptions) 
    .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }

  
  //EXEMPLO
  importarFaturas(uploadedFiles : any, Distribuidora : string): Observable<any[]>{
    var nome = sessionStorage.getItem('email')
    const formData = new FormData();
    formData.append('txt',uploadedFiles);
    formData.append('Distribuidora',Distribuidora);
    formData.append('Usuario',nome);
    console.log(formData);

     return  this.http.post(`${API_CONFIG}/txt`,formData,this.httpOptions) 
     .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }
}
