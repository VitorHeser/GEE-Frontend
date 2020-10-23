import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let AdminComponent = class AdminComponent {
    constructor() { }
    ngOnInit() {
        this.items = [
            { label: 'Cadastrar Usuário' },
            { label: 'Lista de Usuários' }
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
AdminComponent = tslib_1.__decorate([
    Component({
        selector: 'app-admin',
        templateUrl: './admin.component.html',
        styleUrls: ['./admin.component.css']
    }),
    tslib_1.__metadata("design:paramtypes", [])
], AdminComponent);
export { AdminComponent };
//# sourceMappingURL=admin.component.js.map