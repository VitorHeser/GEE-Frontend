import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let EnergiaComponent = class EnergiaComponent {
    constructor() { }
    ngOnInit() {
        this.items = [
            { label: 'Equipamentos' },
            { label: 'Forecast' }
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
EnergiaComponent = tslib_1.__decorate([
    Component({
        selector: 'app-energia',
        templateUrl: './energia.component.html',
        styleUrls: ['./energia.component.css']
    }),
    tslib_1.__metadata("design:paramtypes", [])
], EnergiaComponent);
export { EnergiaComponent };
//# sourceMappingURL=energia.component.js.map