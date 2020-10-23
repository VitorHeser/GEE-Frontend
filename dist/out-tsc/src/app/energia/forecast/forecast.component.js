import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let ForecastComponent = class ForecastComponent {
    constructor() { }
    ngOnInit() {
        this.items = [
            { label: 'Água' },
            { label: 'Esgoto' }
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
ForecastComponent = tslib_1.__decorate([
    Component({
        selector: 'app-forecast',
        templateUrl: './forecast.component.html',
        styleUrls: ['./forecast.component.css']
    }),
    tslib_1.__metadata("design:paramtypes", [])
], ForecastComponent);
export { ForecastComponent };
//# sourceMappingURL=forecast.component.js.map