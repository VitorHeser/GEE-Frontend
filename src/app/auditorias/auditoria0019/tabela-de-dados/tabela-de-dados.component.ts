import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tabela-de-dados',
  templateUrl: './tabela-de-dados.component.html',
  styleUrls: ['./tabela-de-dados.component.css']
})
export class TabelaDeDadosComponent implements OnInit {
 
  @Input() Cols;
  @Input() ColsFrozen;
  @Input() dadosDoArrayObj;
  @Input() pintarZeros;
  ngOnInit() { }
  constructor() { }



}
