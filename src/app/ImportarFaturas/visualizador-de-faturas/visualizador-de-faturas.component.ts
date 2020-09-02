import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-visualizador-de-faturas',
  templateUrl: './visualizador-de-faturas.component.html',
  styleUrls: ['./visualizador-de-faturas.component.css']
})
export class VisualizadorDeFaturasComponent implements OnInit {

  constructor() { }

  
  @Input() faturaSelecionada;
  ngOnInit() {
  }

}
