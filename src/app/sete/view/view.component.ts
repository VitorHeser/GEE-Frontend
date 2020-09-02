import { Component, OnInit, Input } from '@angular/core';
import { MessageService } from 'primeng/api';
import { SeteserviceService } from '../seteservice.service';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

    versoes
    versoesSelect
    
    Versao

    empresas

    loading=false

    @Input() versao=8;

    constructor(private messageService: MessageService, private serv: SeteserviceService) { }

    ngOnInit() {
        this.serv.Versoes().subscribe(
          res=>{
            this.versoes = res
            // this.versoesSelect = res[(res.length-1)]
            this.versoesSelect = res[0]
            // console.log(this.versoesSelect)
            this.carregarVersoes()
          }
        )
    }
    carregarVersoes(){
      this.loading=false
      setTimeout(() => {  
        this.loading=true 
      }, 200);

    }

   
    
}