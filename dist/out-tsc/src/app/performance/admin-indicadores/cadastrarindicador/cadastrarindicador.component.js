import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
let CadastrarindicadorComponent = class CadastrarindicadorComponent {
    constructor(messageService) {
        this.messageService = messageService;
    }
    ngOnInit() {
        this.items = [
            { label: 'Cadastrar' }
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
CadastrarindicadorComponent = tslib_1.__decorate([
    Component({
        selector: 'app-cadastrarindicador',
        templateUrl: './cadastrarindicador.component.html',
        styleUrls: ['./cadastrarindicador.component.css']
    }),
    tslib_1.__metadata("design:paramtypes", [MessageService])
], CadastrarindicadorComponent);
export { CadastrarindicadorComponent };
//# sourceMappingURL=cadastrarindicador.component.js.map