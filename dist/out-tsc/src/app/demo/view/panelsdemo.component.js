import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let PanelsDemoComponent = class PanelsDemoComponent {
    ngOnInit() {
        this.items = [
            { label: 'Angular.io', icon: 'ui-icon-link', url: 'http://angular.io' },
            { label: 'Theming', icon: 'ui-icon-brush', routerLink: ['/theming'] }
        ];
    }
};
PanelsDemoComponent = tslib_1.__decorate([
    Component({
        templateUrl: './panelsdemo.component.html',
        styles: [`
        :host ::ng-deep button {
            margin-right: .25em;
        }
    `]
    })
], PanelsDemoComponent);
export { PanelsDemoComponent };
//# sourceMappingURL=panelsdemo.component.js.map