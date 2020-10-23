import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let TransporteComponent = class TransporteComponent {
    constructor() {
    }
    ngOnInit() {
        this.items =
            [
                { label: 'Dashboards' },
                { label: 'Agendamento' },
                { label: 'Cadastro' }
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
TransporteComponent = tslib_1.__decorate([
    Component({
        selector: 'app-transporte',
        templateUrl: './transporte.component.html',
        styleUrls: ['./transporte.component.css']
    }),
    tslib_1.__metadata("design:paramtypes", [])
], TransporteComponent);
export { TransporteComponent };
//# sourceMappingURL=transporte.component.js.map