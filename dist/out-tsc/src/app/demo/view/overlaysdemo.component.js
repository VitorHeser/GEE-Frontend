import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { CarService } from '../service/carservice';
import { ConfirmationService } from 'primeng/primeng';
let OverlaysDemoComponent = class OverlaysDemoComponent {
    constructor(carService, confirmationService) {
        this.carService = carService;
        this.confirmationService = confirmationService;
    }
    ngOnInit() {
        this.carService.getCarsSmall().then(cars => this.cars = cars.splice(0, 5));
        this.cols = [
            { field: 'vin', header: 'Vin' },
            { field: 'year', header: 'Year' },
            { field: 'brand', header: 'Brand' },
            { field: 'color', header: 'Color' }
        ];
        this.images = [];
        this.images.push({ source: 'assets/demo/images/sopranos/sopranos1.jpg',
            thumbnail: 'assets/demo/images/sopranos/sopranos1_small.jpg', title: 'Nature 1' });
        this.images.push({ source: 'assets/demo/images/sopranos/sopranos2.jpg',
            thumbnail: 'assets/demo/images/sopranos/sopranos2_small.jpg', title: 'Nature 2' });
        this.images.push({ source: 'assets/demo/images/sopranos/sopranos3.jpg',
            thumbnail: 'assets/demo/images/sopranos/sopranos3_small.jpg', title: 'Nature 3' });
        this.images.push({ source: 'assets/demo/images/sopranos/sopranos4.jpg',
            thumbnail: 'assets/demo/images/sopranos/sopranos4_small.jpg', title: 'Nature 4' });
    }
    confirm() {
        this.confirmationService.confirm({
            message: 'Are you sure to perform this action?'
        });
    }
};
OverlaysDemoComponent = tslib_1.__decorate([
    Component({
        templateUrl: './overlaysdemo.component.html',
        providers: [ConfirmationService]
    }),
    tslib_1.__metadata("design:paramtypes", [CarService, ConfirmationService])
], OverlaysDemoComponent);
export { OverlaysDemoComponent };
//# sourceMappingURL=overlaysdemo.component.js.map