import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-painel-gerencial',
  templateUrl: './painel-gerencial.component.html',
  styleUrls: ['./painel-gerencial.component.css']
})
export class PainelGerencialComponent implements OnInit {

  @Input() indx;
  constructor() { }

  ngOnInit() {
  }
  
  columns = []
  addColumn(){
    this.columns.push(this.columns.length);
  }


  removeColumn(){
    this.columns.splice(-1, 1);
  }

}
