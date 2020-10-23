import { Injectable } from '@angular/core';


import {API_CONFIG} from '../../app.api'


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
   Unidades(user): Observable<any[]>{
      return  this.http.get(`${API_CONFIG}/SCDEMedidores/allfind/${user}`,this.httpOptions) 
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
   ExtratoMedidores(inicio, fim, unidadeid): Observable<any[]>{
      return  this.http.put(`${API_CONFIG}/SCDEExtracao/pordataMedidores/${inicio}/${fim}`,unidadeid,this.httpOptions) 
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



   
   listusers(): Observable<any[]>{
      return  this.http.get(`${API_CONFIG}/SCDEMedidores/UsuariosDisponiveis`,this.httpOptions) 
      .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
   }
   Agentes(): Observable<any[]>{
      return  this.http.get(`${API_CONFIG}/SCDEMedidores/agentes`,this.httpOptions) 
      .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
   }
   
   AgentesUsuarios(user): Observable<any[]>{
      return  this.http.get(`${API_CONFIG}/SCDEMedidores/agentesuser/${user}`,this.httpOptions) 
      .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
   }
   UsuariosAgentes(agente): Observable<any[]>{
      return  this.http.get(`${API_CONFIG}/SCDEMedidores/useragentes/${agente}`,this.httpOptions) 
      .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
   }
   SaveAgentes(user,agentes): Observable<any[]>{
      return  this.http.post(`${API_CONFIG}/SCDEMedidores/useragentes/${user}`,agentes,this.httpOptions) 
      .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
   }


   
   ListaFechamentos(un,ref): Observable<any[]>{
      return  this.http.post(`${API_CONFIG}/SCDEExtracao/dash/${ref}`,un,this.httpOptions) 
      .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
   }
   Grafico1Acumulado(un,ref,tipo): Observable<any[]>{
      return  this.http.post(`${API_CONFIG}/SCDEExtracao/graficosDash/${ref}/${tipo}`,un,this.httpOptions) 
      .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
   }
   Grafico2Acumulado(un,ref): Observable<any[]>{
      return  this.http.post(`${API_CONFIG}/SCDEExtracao/graficosDashUnd/${ref}`,un,this.httpOptions) 
      .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
   }
}
