import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { CarService } from '../service/carservice';
import { EventService } from '../service/eventservice';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
let DashboardDemoComponent = class DashboardDemoComponent {
    constructor(carService, eventService) {
        this.carService = carService;
        this.eventService = eventService;
    }
    ngOnInit() {
        this.carService.getCarsSmall().then(cars => this.cars = cars);
        this.cols = [
            { field: 'vin', header: 'Vin' },
            { field: 'year', header: 'Year' },
            { field: 'brand', header: 'Brand' },
            { field: 'color', header: 'Color' }
        ];
        this.eventService.getEvents().then(events => { this.events = events; });
        this.cities = [];
        this.cities.push({ label: 'Select City', value: null });
        this.cities.push({ label: 'New York', value: { id: 1, name: 'New York', code: 'NY' } });
        this.cities.push({ label: 'Rome', value: { id: 2, name: 'Rome', code: 'RM' } });
        this.cities.push({ label: 'London', value: { id: 3, name: 'London', code: 'LDN' } });
        this.cities.push({ label: 'Istanbul', value: { id: 4, name: 'Istanbul', code: 'IST' } });
        this.cities.push({ label: 'Paris', value: { id: 5, name: 'Paris', code: 'PRS' } });
        this.chartData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'First Dataset',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    borderColor: '#FFC107'
                },
                {
                    label: 'Second Dataset',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: false,
                    borderColor: '#03A9F4'
                }
            ]
        };
        this.items = [
            { label: 'New', icon: 'ui-icon-add' },
            { label: 'Open', icon: 'ui-icon-archive' }
        ];
        this.fullcalendarOptions = {
            plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
            defaultDate: '2016-01-12',
            header: {
                right: 'prev,next, today',
                left: 'title'
            }
        };
    }
};
DashboardDemoComponent = tslib_1.__decorate([
    Component({
        templateUrl: './dashboard.component.html'
    }),
    tslib_1.__metadata("design:paramtypes", [CarService, EventService])
], DashboardDemoComponent);
export { DashboardDemoComponent };
//# sourceMappingURL=dashboarddemo.component.js.map