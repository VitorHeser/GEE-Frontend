import {Component, AfterViewInit, ViewChild, OnDestroy, ElementRef, Injectable, Input, EventEmitter} from '@angular/core';
import {ScrollPanel} from 'primeng/primeng';
import { EventEmitterService } from './../../../demo/service/EventEmitterService';


@Component({
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
})

@Injectable({
    providedIn: 'root'
  })
export class AppSidebartabcontentComponent implements AfterViewInit {

    clickMenuEmitter = new EventEmitter<string>();

    @ViewChild('scroller', {static: false}) layoutMenuScrollerViewChild: ScrollPanel;

    ngAfterViewInit() {
      setTimeout(() => {this.layoutMenuScrollerViewChild.moveBar(); }, 100);
    }

    onClick(event: Event) {
      setTimeout(() => {
        this.layoutMenuScrollerViewChild.moveBar();
      }, 450);
     // sessionStorage.setItem('clickEvento',event['toElement'].innerText)
      //this.clickMenuEmitter.emit(event['toElement'].innerText)
      EventEmitterService.get('textChange').emit(event['toElement'].innerText);
      EventEmitterService.get('indicador').emit(event['toElement'].innerText);
    }
}
