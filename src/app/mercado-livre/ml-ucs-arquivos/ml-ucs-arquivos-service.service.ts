import { Injectable } from '@angular/core';


import {API_CONFIG} from '../../app.api'


import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map, catchError } from 'rxjs/operators';
import { ErrorHandler } from 'src/app/app.error-handler';

@Injectable()
export class MlUcsArquivosServiceService {


  constructor(private http: HttpClient){}

  httpOptions = {headers: new HttpHeaders().set('Authorization',sessionStorage.getItem('token'))}

  //============================================================================
  //DEVEC
  BuscarFaturasImportadas(id): Observable<any[]>{
    return  this.http.get(`${API_CONFIG}/MercLivreFaturas/${id}`,this.httpOptions) 
    .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }
  DeletarFatura(id): Observable<any[]>{
    return  this.http.delete(`${API_CONFIG}/MercLivreFaturas/${id}`,this.httpOptions) 
    .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }

  AbrirPDF(id){
    var win = window.open(`${API_CONFIG}/DownFaturaML/devec/${id}`
    ,'_blank'
    ,"width=1050,height=1050, status=yes, toolbar=no, menubar=no, location=no, addressbar=no, top=200, left=300")
    win.focus();
  }
  BuscarFaturaVridis(id): Observable<any[]>{
    return  this.http.get(`${API_CONFIG}/MercLivreFaturas/Distribuicao/${id}`,this.httpOptions) 
    .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }
  AbrirPDFViridis(link){
    var win = window.open(link
    ,'_blank'
    ,"width=1050,height=1050, status=yes, toolbar=no, menubar=no, location=no, addressbar=no, top=200, left=300")
    win.focus();
  }
  
  importarRelatorio(uploadedFiles : any, nome: string, referencia: string, Unidade: string, Classificacao: string): Observable<any[]>{
    const formData = new FormData();
    formData.append('arquivo',uploadedFiles);
    formData.append('idUC',Unidade);
    formData.append('MesRef',referencia);
    formData.append('NomeDoArquivo',nome);
    formData.append('Classif',Classificacao);

     return  this.http.post(`${API_CONFIG}/MercLivreFaturas/faturas/adicionar`,formData,this.httpOptions) 
     .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }


  BuscarFaturasDistribuicao(unidade,data): Observable<any[]>{
    return  this.http.get(`${API_CONFIG}/MercLivreFaturas/DistribuicaoModelar/${unidade}/${data}`,this.httpOptions) 
    .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }

  //============================================================================
  //FATURAS DISTRIBUIÇÃO
  BuscarFaturasImportadas2(id): Observable<any[]>{
    return  this.http.get(`${API_CONFIG}/MercLivreFaturasFornecedor/${id}`,this.httpOptions) 
    .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }
  DeletarFatura2(id): Observable<any[]>{
    return  this.http.delete(`${API_CONFIG}/MercLivreFaturasFornecedor/${id}`,this.httpOptions) 
    .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }

  AbrirPDF2(id){
    var win = window.open(`${API_CONFIG}/DownFaturaML/forn/${id}`
    ,'_blank'
    ,"width=1050,height=1050, status=yes, toolbar=no, menubar=no, location=no, addressbar=no, top=200, left=300")
    win.focus();
  }
  
  importarRelatorio2(uploadedFiles : any, nome: string, referencia: string, Unidade: string, Classificacao: string): Observable<any[]>{
    const formData = new FormData();
    formData.append('arquivo',uploadedFiles);
    formData.append('idUC',Unidade);
    formData.append('MesRef',referencia);
    formData.append('NomeDoArquivo',nome);
    formData.append('Classif',Classificacao);

     return  this.http.post(`${API_CONFIG}/MercLivreFaturasFornecedor/faturas/adicionar`,formData,this.httpOptions) 
     .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }

  //==============================================================================
  //Lançamentos
  notasDoFornecedor(id,ref){
    return  this.http.get(`${API_CONFIG}/MercLivreFaturasFornecedor/porUc/${id}/${ref}`,this.httpOptions) 
    .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }


  deletarLancamento(id){
    return  this.http.delete(`${API_CONFIG}/MercLivreFaturasFornecedor/delLancamento/${id}`,this.httpOptions) 
    .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }
  
  adLancamento(idUc,rateio,idLancamento): Observable<any[]>{
    const formData = new FormData();
    formData.append('idUC',idUc);
    formData.append('rateio',rateio);
    formData.append('idLancamento',idLancamento);
     return  this.http.post(`${API_CONFIG}/MercLivreFaturasFornecedor/adLancamento`,formData,this.httpOptions) 
     .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }
  altLancamento(obj): Observable<any[]>{
     return  this.http.put(`${API_CONFIG}/MercLivreFaturasFornecedor/alterar/${obj.id}`,obj,this.httpOptions) 
     .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }
  SalvarTudo(obj){
    return  this.http.put(`${API_CONFIG}/MercLivreFaturasFornecedor`,obj,this.httpOptions) 
    .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }
}
