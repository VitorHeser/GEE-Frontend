import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { TarefaService } from './shared/tarefa.service';
import { MessageService } from 'primeng/api';
let TarefasComponent = class TarefasComponent {
    constructor(tarefaService, messageService) {
        this.tarefaService = tarefaService;
        this.messageService = messageService;
    }
    ngOnInit() {
        this.tarefas = this.tarefaService.buscar();
        //console.log(this.tarefas)
    }
    teste() {
        this.tarefaService.buscar();
    }
    temTarefas() {
        return this.tarefas.length > 0;
    }
    remover($event, tarefa) {
        $event.preventDefault();
        if (confirm('Você deseja remover a tarefa ' + tarefa.getNome() + '?')) {
            this.tarefaService.remover(tarefa);
            this.tarefas = this.tarefaService.buscar();
        }
    }
    alterarStatus(tarefa) {
        if (confirm('Você alterar o status da tarefa ' + tarefa.getNome() + '?')) {
            this.tarefaService.alterarStatus(tarefa);
            this.tarefas = this.tarefaService.buscar();
        }
    }
    onRowEditInit(tarefa) {
        this.clonedTarefa[tarefa.nome] = Object.assign({}, tarefa);
    }
    onRowEditSave(tarefa) {
        if (tarefa.nome != null) {
            delete this.clonedTarefa[tarefa.nome];
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Car is updated' });
        }
        else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Year is required' });
        }
    }
    onRowEditCancel(tarefa, index) {
        this.tarefas[index] = this.clonedTarefa[tarefa.nome];
        delete this.clonedTarefa[tarefa.nome];
    }
};
TarefasComponent = tslib_1.__decorate([
    Component({
        selector: 'app-tarefas',
        templateUrl: './tarefas.component.html'
    }),
    tslib_1.__metadata("design:paramtypes", [TarefaService, MessageService])
], TarefasComponent);
export { TarefasComponent };
//# sourceMappingURL=tarefas.component.js.map