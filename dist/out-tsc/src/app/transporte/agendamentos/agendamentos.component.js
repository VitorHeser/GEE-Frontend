import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let AgendamentosComponent = class AgendamentosComponent {
    constructor() {
    }
    ngOnInit() {
        this.items = [
            { label: 'Agendar Veículos' },
            { label: 'Aprovar Agendamentos' },
            { label: 'Lista de Agendamentos' }
        ];
        this.trocadeitemIndex(0);
    }
    trocadeitem(activeItem) {
        this.activeItem = activeItem['activeItem'];
        this.activeItemIndex = this.items.indexOf(this.activeItem);
    }
    trocadeitemIndex(index) {
        this.activeItem = this.items[index];
        this.activeItemIndex = index;
    }
};
AgendamentosComponent = tslib_1.__decorate([
    Component({
        selector: 'app-agendamentos',
        templateUrl: './agendamentos.component.html',
        styleUrls: ['./agendamentos.component.css']
    }),
    tslib_1.__metadata("design:paramtypes", [])
], AgendamentosComponent);
export { AgendamentosComponent };
//# sourceMappingURL=agendamentos.component.js.map