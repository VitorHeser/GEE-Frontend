import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AppMainComponent } from '../app.main.component';
let AppMenuDemoComponent = class AppMenuDemoComponent {
    constructor(app) {
        this.app = app;
    }
    ngOnInit() {
        this.model = [
            { label: 'Dashboard', icon: 'dashboard', routerLink: ['/dash'] },
            {
                label: 'Themes', icon: 'palette', badge: '5',
                items: [
                    { label: 'Blue - Amber', icon: 'brush', command: (event) => { this.changeTheme('blue'); } },
                    { label: 'Teal - Amber', icon: 'brush', command: (event) => { this.changeTheme('teal'); } },
                    { label: 'Blue Grey - Green', icon: 'brush', command: (event) => { this.changeTheme('blue-grey'); } },
                    { label: 'Cyan - Yellow', icon: 'brush', command: (event) => { this.changeTheme('cyan'); } },
                    { label: 'Dark - Blue', icon: 'brush', command: (event) => { this.changeTheme('dark-blue'); } },
                    { label: 'Dark - Green', icon: 'brush', command: (event) => { this.changeTheme('dark-green'); } },
                    { label: 'Light Blue - Green', icon: 'brush', command: (event) => { this.changeTheme('light-blue'); } },
                    { label: 'Indio - Cyan', icon: 'brush', command: (event) => { this.changeTheme('indigo'); } },
                    { label: 'Deep Purple - Pink', icon: 'brush', command: (event) => { this.changeTheme('deep-purple'); } },
                    { label: 'Green - Yellow', icon: 'brush', command: (event) => { this.changeTheme('green'); } }
                ]
            },
            {
                label: 'Menu Modes', icon: 'settings_application',
                items: [
                    { label: 'Static Menu', icon: 'menu', command: () => this.app.changeToStaticMenu() },
                    { label: 'Overlay Menu', icon: 'exit_to_app', command: () => this.app.changeToOverlayMenu() },
                    { label: 'Light Menu', icon: 'label_outline', command: () => this.app.darkMenu = false },
                    { label: 'Dark Menu', icon: 'label', command: () => this.app.darkMenu = true }
                ]
            },
            {
                label: 'Components', icon: 'list', badge: '2', badgeStyleClass: 'red-badge',
                items: [
                    { label: 'Sample Page', icon: 'desktop_mac', routerLink: ['/sample'] },
                    { label: 'Forms', icon: 'input', routerLink: ['/forms'] },
                    { label: 'Data', icon: 'grid_on', routerLink: ['/data'] },
                    { label: 'Panels', icon: 'content_paste', routerLink: ['/panels'] },
                    { label: 'Overlays', icon: 'content_copy', routerLink: ['/overlays'] },
                    { label: 'Menus', icon: 'menu', routerLink: ['/menus'] },
                    { label: 'Messages', icon: 'message', routerLink: ['/messages'] },
                    { label: 'Charts', icon: 'insert_chart', routerLink: ['/charts'] },
                    { label: 'File', icon: 'attach_file', routerLink: ['/file'] },
                    { label: 'Misc', icon: 'toys', routerLink: ['/misc'] }
                ]
            },
            {
                label: 'Template Pages', icon: 'get_app',
                items: [
                    { label: 'Empty Page', icon: 'hourglass_empty', routerLink: ['/empty'] },
                    { label: 'Landing Page', icon: 'flight_land', url: 'assets/pages/landing.html', target: '_blank' },
                    { label: 'Login Page', icon: 'verified_user', routerLink: ['/login'], target: '_blank' },
                    { label: 'Error Page', icon: 'error', routerLink: ['/error'], target: '_blank' },
                    { label: '404 Page', icon: 'error_outline', routerLink: ['/404'], target: '_blank' },
                    { label: 'Access Denied Page', icon: 'security', routerLink: ['/accessdenied'], target: '_blank' }
                ]
            },
            {
                label: 'Menu Hierarchy', icon: 'menu',
                items: [
                    {
                        label: 'Submenu 1', icon: 'subject',
                        items: [
                            {
                                label: 'Submenu 1.1', icon: 'subject',
                                items: [
                                    { label: 'Submenu 1.1.1', icon: 'subject' },
                                    { label: 'Submenu 1.1.2', icon: 'subject' },
                                    { label: 'Submenu 1.1.3', icon: 'subject' },
                                ]
                            },
                            {
                                label: 'Submenu 1.2', icon: 'subject',
                                items: [
                                    { label: 'Submenu 1.2.1', icon: 'subject' },
                                    { label: 'Submenu 1.2.2', icon: 'subject' }
                                ]
                            },
                        ]
                    },
                    {
                        label: 'Submenu 2', icon: 'subject',
                        items: [
                            {
                                label: 'Submenu 2.1', icon: 'subject',
                                items: [
                                    { label: 'Submenu 2.1.1', icon: 'subject' },
                                    { label: 'Submenu 2.1.2', icon: 'subject' },
                                    { label: 'Submenu 2.1.3', icon: 'subject' },
                                ]
                            },
                            {
                                label: 'Submenu 2.2', icon: 'subject',
                                items: [
                                    { label: 'Submenu 2.2.1', icon: 'subject' },
                                    { label: 'Submenu 2.2.2', icon: 'subject' }
                                ]
                            },
                        ]
                    }
                ]
            },
            { label: 'Utils', icon: 'build', routerLink: ['/utils'] },
            { label: 'Documentation', icon: 'find_in_page', routerLink: ['/documentation'] }
        ];
    }
    changeTheme(theme) {
        const themeLink = document.getElementById('theme-css');
        const layoutLink = document.getElementById('layout-css');
        themeLink.href = 'assets/theme/theme-' + theme + '.css';
        layoutLink.href = 'assets/layout/css/layout-' + theme + '.css';
    }
};
AppMenuDemoComponent = tslib_1.__decorate([
    Component({
        selector: 'app-menu-demo',
        template: `
        <div class="menu-scroll-content">
            <ul app-submenudemo [item]="model" root="true" class="navigation-menu" visible="true" parentActive="true"></ul>
        </div>
    `
    }),
    tslib_1.__metadata("design:paramtypes", [AppMainComponent])
], AppMenuDemoComponent);
export { AppMenuDemoComponent };
let AppSubMenuDemoComponent = class AppSubMenuDemoComponent {
    constructor(app, router, location) {
        this.app = app;
        this.router = router;
        this.location = location;
    }
    itemClick(event, item, index) {
        // avoid processing disabled items
        if (item.disabled) {
            event.preventDefault();
            return true;
        }
        // activate current item and deactivate active sibling if any
        this.activeIndex = (this.activeIndex === index) ? null : index;
        // execute command
        if (item.command) {
            item.command({ originalEvent: event, item });
        }
        // prevent hash change
        if (item.items || (!item.url && !item.routerLink)) {
            event.preventDefault();
        }
        // hide menu
        if (!item.items && this.app.overlay) {
            this.app.sidebarActive = false;
        }
    }
    isActive(index) {
        return this.activeIndex === index;
    }
    unsubscribe(item) {
        if (item.eventEmitter) {
            item.eventEmitter.unsubscribe();
        }
        if (item.items) {
            for (const childItem of item.items) {
                this.unsubscribe(childItem);
            }
        }
    }
    get parentActive() {
        return this._parentActive;
    }
    set parentActive(val) {
        this._parentActive = val;
        if (!this._parentActive) {
            this.activeIndex = null;
        }
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], AppSubMenuDemoComponent.prototype, "item", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Boolean)
], AppSubMenuDemoComponent.prototype, "root", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Boolean)
], AppSubMenuDemoComponent.prototype, "visible", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Boolean),
    tslib_1.__metadata("design:paramtypes", [Boolean])
], AppSubMenuDemoComponent.prototype, "parentActive", null);
AppSubMenuDemoComponent = tslib_1.__decorate([
    Component({
        /* tslint:disable:component-selector */
        selector: '[app-submenudemo]',
        /* tslint:enable:component-selector */
        template: `
        <ng-template ngFor let-child let-i="index" [ngForOf]="(root ? item : item.items)">
            <li [ngClass]="{'active-menuitem': isActive(i)}" [class]="child.badgeStyleClass" *ngIf="child.visible === false ? false : true">
                <a [href]="child.url||'#'" (click)="itemClick($event,child,i)" class="ripplelink"
                   *ngIf="!child.routerLink" [attr.tabindex]="!visible ? '-1' : null" [attr.target]="child.target"
                    (mouseenter)="hover=true" (mouseleave)="hover=false">
                    <i class="material-icons">{{child.icon}}</i>
                    <span>{{child.label}}</span>
                    <span class="ink" *ngIf="hover"></span>
                    <span class="menuitem-badge" *ngIf="child.badge">{{child.badge}}</span>
                    <i class="material-icons" *ngIf="child.items">keyboard_arrow_down</i>
                </a>

                <a (click)="itemClick($event,child,i)" class="ripplelink" *ngIf="child.routerLink"
                    [routerLink]="child.routerLink" routerLinkActive="active-menuitem-routerlink"
                   [routerLinkActiveOptions]="{exact: true}" [attr.tabindex]="!visible ? '-1' : null" [attr.target]="child.target"
                    (mouseenter)="hover=true" (mouseleave)="hover=false">
                    <i class="material-icons">{{child.icon}}</i>
                    <span>{{child.label}}</span>
                    <span class="ink" *ngIf="hover"></span>
                    <span class="menuitem-badge" *ngIf="child.badge">{{child.badge}}</span>
                    <i class="material-icons" *ngIf="child.items">keyboard_arrow_down</i>
                </a>
                <ul app-submenu [item]="child" *ngIf="child.items" [parentActive]="isActive(i)" [@children]="isActive(i) ?
                'visible' : 'hidden'" [visible]="isActive(i)"></ul>
            </li>
        </ng-template>
    `,
        animations: [
            trigger('children', [
                state('hidden', style({
                    height: '0px'
                })),
                state('visible', style({
                    height: '*'
                })),
                transition('visible => hidden', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
                transition('hidden => visible', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
            ])
        ]
    }),
    tslib_1.__metadata("design:paramtypes", [AppMainComponent, Router, Location])
], AppSubMenuDemoComponent);
export { AppSubMenuDemoComponent };
//# sourceMappingURL=app.menu.demo.component.js.map