import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { TarefaService } from './../shared/tarefa.service';
let ListarComponent = class ListarComponent {
    constructor(tarefaService) {
        this.tarefaService = tarefaService;
    }
    ngOnInit() {
        this.tarefas = this.tarefaService.buscar();
        console.log(this.tarefas);
    }
};
ListarComponent = tslib_1.__decorate([
    Component({
        selector: 'app-listar',
        templateUrl: './listar.component.html',
        styleUrls: ['./listar.component.css']
    }),
    tslib_1.__metadata("design:paramtypes", [TarefaService])
], ListarComponent);
export { ListarComponent };
//# sourceMappingURL=listar.component.js.map