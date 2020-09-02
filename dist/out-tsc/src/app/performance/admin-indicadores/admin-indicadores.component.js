import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let AdminIndicadoresComponent = class AdminIndicadoresComponent {
    constructor() { }
    ngOnInit() {
        this.items = [
            { label: 'Cadastrar' },
            { label: 'Editar' },
            { label: 'Importar' }
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
AdminIndicadoresComponent = tslib_1.__decorate([
    Component({
        selector: 'app-admin-indicadores',
        templateUrl: './admin-indicadores.component.html',
        styleUrls: ['./admin-indicadores.component.css']
    }),
    tslib_1.__metadata("design:paramtypes", [])
], AdminIndicadoresComponent);
export { AdminIndicadoresComponent };
//# sourceMappingURL=admin-indicadores.component.js.map