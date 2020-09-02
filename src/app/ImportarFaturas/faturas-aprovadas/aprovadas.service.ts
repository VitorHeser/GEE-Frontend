import{Injectable} from '@angular/core'


import {API_CONFIG} from '../../app.api'


import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map, catchError } from 'rxjs/operators';
import { ErrorHandler } from 'src/app/app.error-handler';


@Injectable()
export class AprovadasService {

  constructor(private http: HttpClient){}

  httpOptions = {headers: new HttpHeaders().set('Authorization',sessionStorage.getItem('token'))}

  FaturasAprovadas(){
    return  this.http.get(`${API_CONFIG}/fatura/aprovadas`,this.httpOptions) 
    .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }
  Retornar(id: any){
    return  this.http.post(`${API_CONFIG}/fatura/retornar/${id}`,null,this.httpOptions) 
    .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }
}
