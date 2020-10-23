import{Injectable} from '@angular/core'


import {API_CONFIG} from '../app.api'


import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map, catchError } from 'rxjs/operators';
import { ErrorHandler } from 'src/app/app.error-handler';


@Injectable()
export class ImportarArquivosServiceService {

  constructor(private http: HttpClient){}

  httpOptions = {headers: new HttpHeaders().set('Authorization',sessionStorage.getItem('token'))}

  importarArquivo(endereco, arquivo, apagar): Observable<any[]>{
    var nome = sessionStorage.getItem('email')
    const formData = new FormData();
    formData.append('txt',arquivo);
    formData.append('apagar',apagar);
    console.log(formData);

     return  this.http.post(`${API_CONFIG}/${endereco}`,formData,this.httpOptions) 
     .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }
}
