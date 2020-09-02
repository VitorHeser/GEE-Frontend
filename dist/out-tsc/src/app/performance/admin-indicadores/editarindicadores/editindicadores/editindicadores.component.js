import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { AdminIndicadoresService } from '../../admin-indicadores.service';
import { MessageService } from 'primeng/api';
let EditindicadoresComponent = class EditindicadoresComponent {
    constructor(adminindic, messageService) {
        this.adminindic = adminindic;
        this.messageService = messageService;
        this.editing = false;
        this.ListaOk = false;
        this.ListaParaEnviar = false;
        this.CarregarVisible = false;
        this.porcentagemconcluido = 0;
        this.listaAlterada = [];
    }
    ngOnInit() {
        this.adminindic.listaIndicadores().subscribe(indicador => {
            this.filtroListaIndicador = indicador;
        });
    }
    onDialogHide() {
        this.ListaOk = false;
        this.listaCompleta = [];
        this.listaAlterada = [];
        this.editing = false;
    }
    atualizar() {
        this.adminindic.indicadoresByMonth(this.FormatarData(this.filtroData), this.filtroIndicador.indicadorId)
            .subscribe(indicador => {
            this.listaCompleta = indicador;
            this.ListaOk = true;
            this.atualizar2();
        });
    }
    atualizar2() {
        this.listaCompletaImutavel = [];
        this.adminindic.indicadoresByMonth(this.FormatarData(this.filtroData), this.filtroIndicador.indicadorId)
            .subscribe(indicador => {
            this.listaCompletaImutavel = indicador;
        });
    }
    FormatarData(datareceb) {
        var dataFinal;
        if (datareceb.length < 20) {
            dataFinal = datareceb;
        }
        else {
            var data = datareceb, dia2 = data.getDate().toString().padStart(2, '0'), mes2 = (data.getMonth() + 1).toString().padStart(2, '0'), //+1 pois no getMonth Janeiro começa com zero.
            ano2 = data.getFullYear();
            dataFinal = ano2 + "-" + mes2 + "-" + dia2;
        }
        return dataFinal;
    }
    SolicitarAlteracao() {
        this.listaAlterada = [];
        for (var i = 0; i < this.listaCompletaImutavel.length; i++) {
            console.log(this.listaCompleta[i]);
            console.log(this.listaCompletaImutavel[i]);
            if (this.listaCompletaImutavel[i].datareferencia !== this.FormatarData(this.listaCompleta[i].datareferencia) ||
                this.listaCompletaImutavel[i].orcado !== this.listaCompleta[i].orcado ||
                this.listaCompletaImutavel[i].realizado !== this.listaCompleta[i].realizado ||
                this.listaCompletaImutavel[i].forecast !== this.listaCompleta[i].forecast ||
                this.listaCompletaImutavel[i].forecast2 !== this.listaCompleta[i].forecast2 ||
                this.listaCompletaImutavel[i].forecast3 !== this.listaCompleta[i].forecast3 ||
                this.listaCompletaImutavel[i].minimo !== this.listaCompleta[i].minimo ||
                this.listaCompletaImutavel[i].maximo !== this.listaCompleta[i].maximo ||
                this.listaCompletaImutavel[i].meta !== this.listaCompleta[i].meta ||
                this.listaCompletaImutavel[i].valorretido !== this.listaCompleta[i].valorretido ||
                this.listaCompletaImutavel[i].dentroprazoreg !== this.listaCompleta[i].dentroprazoreg ||
                this.listaCompletaImutavel[i].previsao !== this.listaCompleta[i].previsao ||
                this.listaCompletaImutavel[i].dentroprazo !== this.listaCompleta[i].dentroprazo) {
                this.listaCompleta[i].datareferencia = this.FormatarData(this.listaCompleta[i].datareferencia);
                this.listaAlterada.push(this.listaCompleta[i]);
            }
        }
        this.ListaOk = false;
        // this.listaAlterada=this.listaCompleta
        if (this.listaAlterada.length > 0) {
            this.ListaParaEnviar = true;
        }
        this.listaCompleta = [];
        this.atualizar2();
    }
    AprovarAlteracoes() {
        this.CarregarVisible = true;
        for (var i = 0; i < this.listaAlterada.length; i++) {
            this.porcentagemconcluido = Math.floor(((i + 1) / this.listaAlterada.length) * 100);
            //CODIGO DE INSERT COMEÇA AQUI
            //============================================================================================
            var objetoDaVez = this.listaAlterada[i];
            this.adminindic.indicadoresAtt(objetoDaVez).subscribe(indicador => {
                this.messageService.add({ severity: 'info', summary: 'Success', detail: 'Linha de Indicadores ' + objetoDaVez.exeindicadorId + ' alterado' });
            });
            //============================================================================================
            if (this.porcentagemconcluido >= 100) {
                this.porcentagemconcluido = 100;
                this.messageService.add({ severity: 'info', summary: 'Success', detail: 'Process Completed' });
            }
        }
        this.listaAlterada = [];
        this.ListaParaEnviar = false;
        this.CarregarVisible = false;
    }
    CancelarAlteracoes() {
        this.onDialogHide();
    }
};
EditindicadoresComponent = tslib_1.__decorate([
    Component({
        selector: 'app-editindicadores',
        templateUrl: './editindicadores.component.html',
        styles: [`
        .old-car {
            background-color: #1CA979 !important;
            color: #ffffff !important;
        }

        .very-old-car {
            background-color: #2CA8B1 !important;
            color: #ffffff !important;
        }
    `
        ]
    }),
    tslib_1.__metadata("design:paramtypes", [AdminIndicadoresService, MessageService])
], EditindicadoresComponent);
export { EditindicadoresComponent };
//# sourceMappingURL=editindicadores.component.js.map