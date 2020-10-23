import { Injectable } from '@angular/core';


import {API_CONFIG} from '../app.api'


import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map, catchError } from 'rxjs/operators';
import { ErrorHandler } from 'src/app/app.error-handler';

@Injectable()
export class MercadolivreserviceService {
  this: any;

  constructor(private http: HttpClient){}



  httpOptions = {headers: new HttpHeaders().set('Authorization',sessionStorage.getItem('token'))}

   ContraPartes(): Observable<any[]>{
      return  this.http.get(`${API_CONFIG}/MercLivreContraPartes`,this.httpOptions) 
      .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
   }
   ContraPartesUpdateNew(unid: any): Observable<any[]>{
      return  this.http.put(`${API_CONFIG}/MercLivreContraPartes`,unid,this.httpOptions) 
      .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
   }
   ContraPartesDelete(unid: any): Observable<any[]>{
      return  this.http.delete(`${API_CONFIG}/MercLivreContraPartes/${unid.id}`,this.httpOptions) 
      .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
   }




   Contratos(): Observable<any[]>{
      return  this.http.get(`${API_CONFIG}/MercLivreContratos`,this.httpOptions) 
      .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
   }
   ContratosUpdateNew(unid: any): Observable<any[]>{
      return  this.http.put(`${API_CONFIG}/MercLivreContratos`,unid,this.httpOptions) 
      .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
   }
   ContratosDelete(unid: any): Observable<any[]>{
      return  this.http.delete(`${API_CONFIG}/MercLivreContratos/${unid.id}`,this.httpOptions) 
      .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
   }


   Produtos(): Observable<any[]>{
      return  this.http.get(`${API_CONFIG}/MercLivreProdutos`,this.httpOptions) 
      .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
   }
   ProdutosUpdateNew(unid: any): Observable<any[]>{
      return  this.http.put(`${API_CONFIG}/MercLivreProdutos/${unid.id}`,unid,this.httpOptions) 
      .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
   }
   ProdutosDelete(unid: any): Observable<any[]>{
      return  this.http.delete(`${API_CONFIG}/MercLivreProdutos/${unid.id}`,this.httpOptions) 
      .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
   }



   
   Submercados(): Observable<any[]>{
      return  this.http.get(`${API_CONFIG}/MercLivreSubmercados`,this.httpOptions) 
      .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
   }
   SubmercadosUpdateNew(unid: any): Observable<any[]>{
      return  this.http.put(`${API_CONFIG}/MercLivreSubmercados`,unid,this.httpOptions) 
      .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
   }
   SubmercadosDelete(unid: any): Observable<any[]>{
      return  this.http.delete(`${API_CONFIG}/MercLivreSubmercados/${unid.id}`,this.httpOptions) 
      .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
   }


   
   UNS(): Observable<any[]>{
      return  this.http.get(`${API_CONFIG}/MercLivreUn`,this.httpOptions) 
      .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
   }
   UNSUpdateNew(unid: any): Observable<any[]>{
      return  this.http.put(`${API_CONFIG}/MercLivreUn/${unid.id}`,unid,this.httpOptions) 
      .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
   }
   UNSDelete(unid: any): Observable<any[]>{
      return  this.http.delete(`${API_CONFIG}/MercLivreUn/${unid.id}`,this.httpOptions) 
      .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
   }

   
   UCS(): Observable<any[]>{
      return  this.http.get(`${API_CONFIG}/MercLivreUc`,this.httpOptions) 
      .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
   }
   UCSUpdateNew(unid: any): Observable<any[]>{
      return  this.http.put(`${API_CONFIG}/MercLivreUc/${unid.id}`,unid,this.httpOptions) 
      .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
   }
   UCSDelete(unid: any): Observable<any[]>{
      return  this.http.delete(`${API_CONFIG}/MercLivreUc/${unid.id}`,this.httpOptions) 
      .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
   }
   periodosall(): Observable<any[]>{
      return  this.http.get(`${API_CONFIG}/MercLivreVolSazo2`,this.httpOptions) 
      .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
   }
   periodos(uc): Observable<any[]>{
      return  this.http.get(`${API_CONFIG}/MercLivreVolSazo2/${uc}`,this.httpOptions) 
      .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
   }
   periodosUpdateNew(unid: any): Observable<any[]>{
      return  this.http.put(`${API_CONFIG}/MercLivreVolSazo2/${unid.id}`,unid,this.httpOptions) 
      .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
   }

   
   ContraPartesCurtoPrazo(): Observable<any[]>{
      return  this.http.get(`${API_CONFIG}/MercLivreFornCurtPrazo`,this.httpOptions) 
      .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
   }
   ContraPartesCurtoPrazoUpdateNew(unid: any): Observable<any[]>{
      return  this.http.put(`${API_CONFIG}/MercLivreFornCurtPrazo`,unid,this.httpOptions) 
      .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
   }
   ContraPartesCurtoPrazoDelete(unid: any): Observable<any[]>{
      return  this.http.delete(`${API_CONFIG}/MercLivreFornCurtPrazo/${unid.id}`,this.httpOptions) 
      .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
   }

}
