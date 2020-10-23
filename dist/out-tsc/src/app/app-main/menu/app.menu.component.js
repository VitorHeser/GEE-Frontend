import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AppMainComponent } from '../app.main.component';
import { PerformanceService } from './../../performance/performance.service';
let AppMenuComponent = class AppMenuComponent {
    constructor(app, performanceService) {
        this.app = app;
        this.performanceService = performanceService;
        this.permissoes = [];
        this.usuDesenvolvimento = false;
        this.usuPerformance = false;
        this.usuComissao = false;
        this.usuTransporte = false;
        this.usuJuridicoPagamentos = false;
        this.usuProjetos = false;
        this.admSispc = false;
        this.admPerformance = false;
        this.admEnergia = false;
        this.usuJuridicoPagamentosAprovacao = false;
    }
    ngOnInit() {
        //Preencehendo array de permissoes e liberando acessos
        let i = 0;
        while (sessionStorage.getItem("permissao " + i) != null) {
            let permissao = sessionStorage.getItem("permissao " + i);
            this.permissoes.push(permissao);
            //Liberando acessos
            if (permissao === "ROLE_ADMIN") {
                this.usuPerformance = true;
                this.usuComissao = true;
                this.usuTransporte = true;
                this.admEnergia = true;
            }
            else if (permissao === "ROLE_DESENVOLVIMENTO") {
                this.usuDesenvolvimento = true;
            }
            else if (permissao === "ROLE_USER_COMISSAO") {
                this.usuComissao = true;
            }
            else if (permissao === "ROLE_USER_FROTAS") {
                this.usuTransporte = true;
            }
            else if (permissao === "ROLE_ADMIN_INDICADOR") {
                this.usuPerformance = true;
                this.admPerformance = true;
            }
            else if (permissao === "ROLE_ADMIN_ENERGIA") {
                this.admEnergia = true;
            }
            else if (permissao === "ROLE_USER_INDICADOR") {
                this.usuPerformance = true;
            }
            else if (permissao === "ROLE_ADMIN_PROJETOS") {
                this.usuProjetos = true;
            }
            else if (permissao === "ROLE_ADMIN_SISPC") {
                this.admSispc = true;
            }
            else if (permissao === "ROLE_OPERACIONAL_ESGOTO") {
                this.usuOperacional = true;
                this.usuOperacionalEsgoto = true;
            }
            else if (permissao === "ROLE_OPERACIONAL_AGUA") {
                this.usuOperacional = true;
                this.usuOperacionalAgua = true;
            }
            else if (permissao === "ROLE_OPERACIONAL_ELETROMECANICA") {
                this.usuOperacional = true;
                this.usuEletromecanica = true;
            }
            else if (permissao === "ROLE_JURIDICO_PAGAMENTOS" || permissao.indexOf("JURIDICO_APROVACAO") > 0) {
                this.usuJuridicoPagamentos = true;
            }
            i++;
        }
        console.log(this.usuPerformance);
        // console.log(this.permissoes)
        this.performanceService.classindicadores(6)
            .subscribe(response => {
            this.indicadores = response;
            //console.log(response)
        });
        this.performanceService.gerencias()
            .subscribe(response => {
            this.gerencias = response.splice(2, Number.MAX_VALUE);
            this.model = [];
            //Começando a construção do Menu
            //Performance
            if (this.usuPerformance === true) {
                this.model.push({
                    label: 'Performance', icon: 'timeline',
                    items: this.permissoes[1] === "ROLE_DESENVOLVIMENTO" ? //DEntro do operador o que ainda será construído
                        [
                            {
                                label: 'Acompanhamento', icon: 'subject',
                                items: this.gerencias
                            },
                            {
                                label: 'Fechamento', icon: 'subject',
                                items: [
                                    { label: 'Relatórios por área', icon: 'subject' },
                                    { label: 'Arquivamento', icon: 'subject' }
                                ]
                            },
                            {
                                label: 'Configurações', icon: 'subject',
                                items: [
                                    { label: 'Indicadores', icon: 'subject', routerLink: '/indicadoresAdmin' }
                                ]
                            }
                        ] :
                        this.admPerformance === true ? //DEntro do operador o que ainda será construído
                            [
                                {
                                    label: 'Acompanhamento', icon: 'subject',
                                    items: this.gerencias
                                },
                                {
                                    label: 'Configurações', icon: 'settings',
                                    items: [
                                        { label: 'Indicadores', icon: 'build', routerLink: '/indicadoresAdmin' }
                                    ]
                                }
                            ] :
                            [
                                {
                                    label: 'Acompanhamento', icon: 'subject',
                                    items: this.gerencias
                                }
                            ]
                });
            }
            //Em Construção...
            if (this.usuDesenvolvimento = true) { // usado temporariamente esse perfil por estar ain
                this.model.push({ label: 'Planejamento', icon: 'equalizer',
                    items: [
                        { label: 'Informativos', icon: 'envelope', routerLink: '/email' },
                        { label: 'Capex', icon: 'subject' },
                        { label: 'Opex', icon: 'subject' },
                        { label: 'DRE', icon: 'subject' },
                        { label: 'GPP', icon: 'view_list',
                            items: [
                                { label: 'Dashboard', icon: 'subject' },
                                { label: 'Projetos', icon: 'subject', routerLink: '/projetos' },
                                { label: 'Processos', icon: 'call_split' }
                            ]
                        },
                        { label: 'RPA', icon: 'pi-android',
                            items: [
                                { label: 'Robos', icon: '', routerLink: '/rpa' }
                            ]
                        },
                    ]
                }, { label: 'Diretoria', icon: 'business_center',
                    items: [
                        { label: 'Indicadores', icon: 'subject' },
                        { label: 'Projetos', icon: 'subject' }
                    ]
                }, { label: 'Administrativo', icon: 'domain',
                    items: [
                        { label: 'Contratos', icon: 'subject' },
                        { label: 'Facilities', icon: 'subject' },
                        { label: 'Compras', icon: 'subject' }
                    ]
                }, { label: 'Serviços', icon: 'build',
                    items: []
                }, { label: 'Comunicação', icon: 'videocam',
                    items: []
                }, { label: 'Jurídico', icon: 'gavel',
                    items: [
                        { label: 'Controle de Pagamentos', routerLink: '/cpjuridico', icon: 'subject' },
                        { label: 'Processos', icon: 'subject' },
                        { label: 'Regulatório', icon: 'subject' }
                    ]
                }, { label: 'Recursos Humanos', icon: 'people',
                    items: []
                }, { label: 'EHS', icon: 'local_florist',
                    items: [
                        { label: 'Planejamento', icon: 'subject' },
                        { label: 'Gestão', icon: 'subject' }
                    ]
                });
            }
            if (this.usuJuridicoPagamentos === true) {
                this.model.push({ label: 'Jurídico', icon: 'gavel',
                    items: [
                        { label: 'Controle de Pagamentos', routerLink: '/cpjuridico', icon: 'subject' },
                    ]
                });
            }
            if (this.usuProjetos === true) {
                this.model.push({ label: 'Planejamento', icon: 'equalizer',
                    items: [
                        { label: 'GPP', icon: 'view_list',
                            items: [
                                { label: 'Projetos', icon: 'subject', routerLink: '/projetos' }
                            ]
                        }
                    ]
                });
            }
            if (this.usuOperacional === true) {
                var operesg = this.usuOperacionalEsgoto === true ?
                    { label: 'Operação Esgoto', icon: 'subject' }
                    : null;
                var operagu = this.usuOperacionalAgua === true ?
                    { label: 'Operação Água', icon: 'subject' }
                    : null;
                var operEle = this.usuEletromecanica === true ?
                    { label: 'Eletromecânica', icon: 'settings_input_component',
                        items: [
                            { label: 'Preventivas/Corretivas', icon: 'subject' },
                            { label: 'Inventário', icon: 'subject' }
                        ]
                    }
                    : null;
                var oper = { label: 'Operacional', icon: 'invert_colors',
                    items: [
                        operesg,
                        operagu,
                        operEle
                    ]
                };
                this.model.push(oper);
            }
            //Comissão
            if (this.usuComissao === true) {
                this.model.push({ label: 'Comercial', icon: 'monetization_on',
                    items: [
                        {
                            label: 'Comissão de Fraudes', icon: 'subject',
                            items: [
                                { label: 'Gestão de deliberações', icon: 'subject', routerLink: '/painelprocess' } /*,
                                {label: 'Controle de fraudes', icon: 'subject'}   */
                            ]
                        } /*,
                        {label: 'Receita', icon: 'subject'},
                        {label: 'Cobrança', icon: 'subject'},
                        {label: 'Atendimento', icon: 'subject'},
                        {label: 'Cadastro', icon: 'subject'}*/
                    ]
                });
            }
            //Energia
            if (this.admEnergia === true) {
                this.model.push({ label: 'Energia', icon: 'wb_incandescent',
                    items: [
                        {
                            label: 'Equipamentos', icon: 'wb_incandescent', routerLink: '/energiaGestal'
                        },
                        {
                            label: 'Cenarios', icon: 'subject', routerLink: '/cenarios'
                        },
                        {
                            label: 'Forecast', icon: 'monetization_on',
                            items: [
                                { label: 'Forecast Agua', icon: 'monetization_on', routerLink: '/forecastAgua' },
                                { label: 'Forecast Esgoto', icon: 'monetization_on', routerLink: '/forecastEsgoto' } /*,
                                {label: 'Controle de fraudes', icon: 'subject'}   */
                            ]
                        } /*,
                        {label: 'Receita', icon: 'subject'},
                        {label: 'Cobrança', icon: 'subject'},
                        {label: 'Atendimento', icon: 'subject'},
                        {label: 'Cadastro', icon: 'subject'}*/
                    ]
                });
            }
            // GLobal com pequena alteração para usuários transportes
            this.model.push({ label: 'Transporte', icon: 'directions_car',
                items: [
                    //Operador ternário controle usuario
                    this.usuTransporte === true ?
                        { label: 'Gestão de Frotas', icon: 'subject', routerLink: '/transporte' } :
                        { label: 'Agendamento', icon: 'subject', routerLink: '/agendamento' }
                ]
            });
            if (this.admSispc === true) {
                this.model.push({ label: 'Administrador', icon: 'settings',
                    items: [
                        { label: 'Acessos', routerLink: '/admin', icon: 'person' },
                        { label: 'Notificações', routerLink: '/email', icon: 'notifications' }
                    ]
                });
            }
        });
    } //fechando subscribe de gerencia
};
AppMenuComponent = tslib_1.__decorate([
    Component({
        selector: 'app-menu',
        template: `
            <div class="menu-scroll-content">
            <ul app-submenu [item]="model" root="true" class="navigation-menu" visible="true" parentActive="true"></ul>
            </div>
            `
    }),
    tslib_1.__metadata("design:paramtypes", [AppMainComponent, PerformanceService])
], AppMenuComponent);
export { AppMenuComponent };
let AppSubMenuComponent = class AppSubMenuComponent {
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
], AppSubMenuComponent.prototype, "item", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Boolean)
], AppSubMenuComponent.prototype, "root", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Boolean)
], AppSubMenuComponent.prototype, "visible", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Boolean),
    tslib_1.__metadata("design:paramtypes", [Boolean])
], AppSubMenuComponent.prototype, "parentActive", null);
AppSubMenuComponent = tslib_1.__decorate([
    Component({
        /* tslint:disable:component-selector */
        selector: '[app-submenu]',
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
], AppSubMenuComponent);
export { AppSubMenuComponent };
//# sourceMappingURL=app.menu.component.js.map