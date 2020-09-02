import * as tslib_1 from "tslib";
import { Component, ViewChild, Injectable, EventEmitter } from '@angular/core';
import { ScrollPanel } from 'primeng/primeng';
import { EventEmitterService } from './../../../demo/service/EventEmitterService';
let AppSidebartabcontentComponent = class AppSidebartabcontentComponent {
    constructor() {
        this.clickMenuEmitter = new EventEmitter();
    }
    ngAfterViewInit() {
        setTimeout(() => { this.layoutMenuScrollerViewChild.moveBar(); }, 100);
    }
    onClick(event) {
        setTimeout(() => {
            this.layoutMenuScrollerViewChild.moveBar();
        }, 450);
        // sessionStorage.setItem('clickEvento',event['toElement'].innerText)
        //this.clickMenuEmitter.emit(event['toElement'].innerText)
        EventEmitterService.get('textChange').emit(event['toElement'].innerText);
        EventEmitterService.get('indicador').emit(event['toElement'].innerText);
    }
};
tslib_1.__decorate([
    ViewChild('scroller', { static: false }),
    tslib_1.__metadata("design:type", ScrollPanel)
], AppSidebartabcontentComponent.prototype, "layoutMenuScrollerViewChild", void 0);
AppSidebartabcontentComponent = tslib_1.__decorate([
    Component({
        /* tslint:disable:component-selector */
        selector: 'app-sidebarTabContent',
        /* tslint:enable:component-selector */
        template: `
        <div class="layout-submenu-content" (click)="onClick($event)">
            <p-scrollPanel #scroller [style]="{height: '100%'}">
                <ng-content></ng-content>
            </p-scrollPanel>
        </div>
    `
    }),
    Injectable({
        providedIn: 'root'
    })
], AppSidebartabcontentComponent);
export { AppSidebartabcontentComponent };
//# sourceMappingURL=app.sidebartabcontent.component.js.map