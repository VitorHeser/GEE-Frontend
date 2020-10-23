import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { AdminIndicadoresService } from '../../admin-indicadores.service';
import { MessageService } from 'primeng/api';
import { AppComponent } from 'src/app/app.component';
let ImportarBotsComponent = class ImportarBotsComponent {
    constructor(adminindic, messageService, comp) {
        this.adminindic = adminindic;
        this.messageService = messageService;
        this.comp = comp;
        this.bots = [];
        this.botsLista = [];
        this.displayDialog = false;
        this.diadecortereferencia = 30;
        this.diadecorteciclo = 0;
        this.habilitaCorteMes = true;
        this.habilitaCorteCiclo = true;
    }
    ngOnInit() {
        this.adminindic.listaIndicadores().subscribe(indicador => {
            this.filtroListaIndicador = indicador;
        });
        this.adminindic.unidades().subscribe(indicador => {
            this.filtroUnidade = indicador;
        });
        this.bots = [
            { label: "Inserir Orçados", value: 1, funcao: "Carregar orçados.", status: this.comp.statusbot }
        ];
        this.botsLista = this.bots;
        console.log(this.botsLista);
    }
    SelecionarBot(bot) {
        this.botselecionado = bot;
        this.displayDialog = true;
    }
    StartBot() {
        this.messageService.add({ severity: 'info', summary: 'Iniciando Tarefa', detail: 'Tarefa Iniciada .. Informaremos quando terminar' });
        this.adminindic.CarregarIndicadors(this.indicadorselecionado.indicadorId, this.anodoimport, this.diadecortereferencia, this.unidadeselecionada.unidadeId, this.diadecorteciclo).subscribe();
        this.comp.statusbot = "Executando";
        this.botselecionado.status = "Executando";
        this.botselecionado.status = this.comp.resolveAfter5Seconds();
    }
    onDialogHide() {
        this.displayDialog = false;
        this.botselecionado = null;
    }
    aoAlterardiaDeCorteRef($event) {
    }
    aoAlterardiaDeCorteCiclo($event) {
    }
    naoseaplicadiaDeCorteMes() {
        if (this.habilitaCorteMes === true) {
            this.diadecortereferencia = 30;
        }
        else {
            this.diadecortereferencia = 0;
            this.diadecorteciclo = 0;
            this.habilitaCorteCiclo = true;
        }
    }
    naoseaplicadiaDeCorteCiclo() {
        if (this.habilitaCorteCiclo === true) {
            this.diadecorteciclo = 0;
        }
        else {
            this.diadecorteciclo = 0;
            this.diadecortereferencia = 30;
            this.habilitaCorteMes = true;
        }
    }
};
ImportarBotsComponent = tslib_1.__decorate([
    Component({
        selector: 'app-importar-bots',
        templateUrl: './importar-bots.component.html',
        styleUrls: ['./importar-bots.component.css']
    }),
    tslib_1.__metadata("design:paramtypes", [AdminIndicadoresService, MessageService, AppComponent])
], ImportarBotsComponent);
export { ImportarBotsComponent };
//# sourceMappingURL=importar-bots.component.js.map