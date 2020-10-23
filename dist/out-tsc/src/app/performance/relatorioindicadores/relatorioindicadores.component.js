import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
let RelatorioindicadoresComponent = class RelatorioindicadoresComponent {
    constructor(messageService, route) {
        this.messageService = messageService;
        this.route = route;
        this.comparar = [];
        this.idgerencias = [];
    }
    ngOnInit() {
        this.route.params.subscribe(parametros => {
            this.indicador = parametros['id'];
            this.refer = parametros['ref'];
        });
        this.messageService.add({ severity: 'info', summary: 'Referência', detail: 'Aguarde a geração do relatório', life: 9000 });
    }
    procurarGerencias() {
    }
};
RelatorioindicadoresComponent = tslib_1.__decorate([
    Component({
        selector: 'app-relatorioindicadores',
        templateUrl: './relatorioindicadores.component.html',
        styleUrls: ['./relatorioindicadores.component.css']
    }),
    tslib_1.__metadata("design:paramtypes", [MessageService, ActivatedRoute])
], RelatorioindicadoresComponent);
export { RelatorioindicadoresComponent };
//# sourceMappingURL=relatorioindicadores.component.js.map