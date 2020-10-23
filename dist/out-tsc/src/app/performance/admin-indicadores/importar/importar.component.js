import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let ImportarComponent = class ImportarComponent {
    onstructor() { }
    ngOnInit() {
        this.items = [
            { label: 'Importar Orçados' },
            { label: 'Importar Dados para o Ano' }
        ];
        this.trocadeitemIndex(1);
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
ImportarComponent = tslib_1.__decorate([
    Component({
        selector: 'app-importar',
        templateUrl: './importar.component.html',
        styleUrls: ['./importar.component.css']
    })
], ImportarComponent);
export { ImportarComponent };
//# sourceMappingURL=importar.component.js.map