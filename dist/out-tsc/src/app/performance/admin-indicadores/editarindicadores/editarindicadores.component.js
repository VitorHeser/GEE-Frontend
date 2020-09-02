import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let EditarindicadoresComponent = class EditarindicadoresComponent {
    constructor() { }
    ngOnInit() {
        this.items = [
            { label: 'Editar Cadastro' },
            { label: 'Editar Orçados' }
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
EditarindicadoresComponent = tslib_1.__decorate([
    Component({
        selector: 'app-editarindicadores',
        templateUrl: './editarindicadores.component.html',
        styleUrls: ['./editarindicadores.component.css']
    }),
    tslib_1.__metadata("design:paramtypes", [])
], EditarindicadoresComponent);
export { EditarindicadoresComponent };
//# sourceMappingURL=editarindicadores.component.js.map