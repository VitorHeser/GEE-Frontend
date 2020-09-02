import{Injectable} from '@angular/core'


import {API_CONFIG, API_CONFIG_DOCS} from '../app.api'


import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map, catchError } from 'rxjs/operators';
import { ErrorHandler } from 'src/app/app.error-handler';


@Injectable()
export class ImportService {

  constructor(private http: HttpClient){           
  }
              

  httpOptions = {headers: new HttpHeaders().set('Authorization',sessionStorage.getItem('token'))}

  importarFaturasOcr(uploadedFiles : any, Distribuidora : string): Observable<any[]>{
    var nome = sessionStorage.getItem('email')
    const formData = new FormData();
    formData.append('pdf',uploadedFiles);
    formData.append('Distribuidora',Distribuidora);
    formData.append('Usuario',nome);
    console.log(formData);
    

     return  this.http.post(`${API_CONFIG}/pdf`,formData,this.httpOptions) 
     .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }
  importarFaturasTxt(uploadedFiles : any, Distribuidora : string): Observable<any[]>{
    var nome = sessionStorage.getItem('email')
    
    const formData = new FormData();
    formData.append('txt',uploadedFiles);
    formData.append('Distribuidora',Distribuidora);
    formData.append('Usuario',nome);
    console.log(formData);

     return  this.http.post(`${API_CONFIG}/txt`,formData,this.httpOptions) 
     .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }

  FaturasEmAbertoPorUser(tipo ){
    var nome = sessionStorage.getItem('email')
    return  this.http.get(`${API_CONFIG}/fatura/usuario/${nome}/${tipo}`,this.httpOptions) 
    .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }

  Aprovar(obj){
    return  this.http.post(`${API_CONFIG}/fatura/aprovar/${obj.a_Id}`,obj,this.httpOptions) 
    .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }
  Deletar(obj){
    return  this.http.delete(`${API_CONFIG}/fatura/${obj.a_Id}`,this.httpOptions) 
    .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }




  ImagemFatura(id,num){
    return `${API_CONFIG_DOCS}/fatura/foto/${id}/${num}`
  }
}
