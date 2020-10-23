import { Injectable } from '@angular/core';
import {API_CONFIG} from '../../app.api'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map, catchError } from 'rxjs/operators';
import { ErrorHandler } from 'src/app/app.error-handler';


@Injectable({
  providedIn: 'root'
})
export class MensageriaService {

  constructor(private http: HttpClient){}
  

  httpOptions = {headers: new HttpHeaders().set('Authorization',sessionStorage.getItem('token'))}

  
  ListaDeModelos(): Observable<any[]>{
    return  this.http.get(`${API_CONFIG}/notificacao`,this.httpOptions) 
    .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }

  ListaDeletar(id): Observable<any>{
    return this.http.delete<any>(`${API_CONFIG}/notificacao/${id}`,this.httpOptions)
    .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }
  ListaSalvar(obj): Observable<any>{
    return this.http.put<any>(`${API_CONFIG}/notificacao/${obj.id}`,obj,this.httpOptions)
    .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }
  enviarNotificacao(ModeloAtivo): Observable<any>{
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Methods', 'POST');
    return this.http.post<any>(`${API_CONFIG}/notificacao/enviarEmail`,ModeloAtivo,this.httpOptions)
      .pipe(
        map((response) => ({data: response.headers, 
                            status: response.status,
                            statusTexto: response.statusText,
                            })) 
      );
  }
}
