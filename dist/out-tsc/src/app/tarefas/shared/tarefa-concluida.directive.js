import * as tslib_1 from "tslib";
import { Directive, Input, ElementRef } from '@angular/core';
import { Tarefa } from './tarefa.model';
let TarefaConcluidaDirective = class TarefaConcluidaDirective {
    constructor(element) {
        this.element = element;
    }
    ngOnInit() {
        if (this.tarefa.estaConcluida()) {
            this.element.nativeElement.style.textDecoration = 'line-through';
        }
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Tarefa)
], TarefaConcluidaDirective.prototype, "tarefa", void 0);
TarefaConcluidaDirective = tslib_1.__decorate([
    Directive({
        selector: '[tarefaConcluida]'
    }),
    tslib_1.__metadata("design:paramtypes", [ElementRef])
], TarefaConcluidaDirective);
export { TarefaConcluidaDirective };
//# sourceMappingURL=tarefa-concluida.directive.js.map