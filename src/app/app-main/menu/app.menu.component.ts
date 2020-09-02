import {Component, Input, OnInit} from '@angular/core';
import {trigger, state, style, transition, animate} from '@angular/animations';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import * as jwt_decode from "jwt-decode";
import {MenuItem} from 'primeng/primeng';
import {AppMainComponent} from '../app.main.component';

@Component({
    selector: 'app-menu',
    template: `
            <div class="menu-scroll-content">
            <ul app-submenu [item]="model" root="true" class="navigation-menu" visible="true" parentActive="true"></ul>
            </div>
            `
})
export class AppMenuComponent implements OnInit {

    public model: any[]=[];
    public permissoes: any[] = []; 



    constructor(public app: AppMainComponent) {
        
    }

    indicadores: any[];
    gerencias: any[];

    PermPaineisAnaliticos = false
    PermGestaoDeFaturas1 = false
    PermGestaoDeFaturas2 = false 
    PermGestaoDeContratos1 = false
    PermGestaoDeContratos2 = false
    PermMedicoesDeFronteiras1 = false
    PermMedicoesDeFronteiras2 = false
    PermProjecoesTarifarias1 = false
    PermProjecoesTarifarias2 = false
    PermAdmin = false
    
    getDecodedAccessToken(): any {
        try{
            return jwt_decode(sessionStorage.getItem('token'));
        }
            catch(Error){
            return null;
        }
    }
    ngOnInit() {
        var us = JSON.parse(this.getDecodedAccessToken().iss)
        console.log(us)

        for(var j=0;j<us.perfis.length;j++){
            var perfil = us.perfis[j]
            switch(perfil.id){
                case 10:
                    this.PermPaineisAnaliticos=true;
                    this.PermGestaoDeFaturas1=true;
                    this.PermGestaoDeFaturas2=true;
                    this.PermGestaoDeContratos1=true;
                    this.PermGestaoDeContratos2=true;
                    this.PermMedicoesDeFronteiras1=true;
                    this.PermMedicoesDeFronteiras2=true;
                    this.PermProjecoesTarifarias1=true;
                    this.PermProjecoesTarifarias2=true;
                    this.PermAdmin=true;
                    break;
                case 1:
                    this.PermPaineisAnaliticos=true;
                    break;

                case 2:
                    this.PermGestaoDeFaturas1=true;
                    break;
                case 3:
                    this.PermGestaoDeFaturas2=true;
                    break;

                case 4:
                    this.PermGestaoDeContratos1=true;
                    break;
                case 5:
                    this.PermGestaoDeContratos2=true;
                    break;
             
                case 6:
                    this.PermMedicoesDeFronteiras1=true;
                    break;
                case 7:
                    this.PermMedicoesDeFronteiras2=true;
                    break;                    
             
                case 8:
                    this.PermProjecoesTarifarias1=true;
                    break;
                case 9:
                    this.PermProjecoesTarifarias2=true;
                    break;                    
            } 
        }
        
        
        
        
        
        
        //Preencehendo array de permissoes e liberando acessos
        let i =0
        if(this.PermPaineisAnaliticos){
            this.model.push( 
                {
                    label: 'Painéis Analíticos', icon: 'timeline',
                    
                    items: 
                    [
                        {
                            label: 'Painel Gerencial', icon: 'timeline', routerLink: '/Gerencial'
                        },
                        {
                            label: 'Painel Analítico', icon: 'timeline', routerLink:'/Analisys'
                        },
                    ] 
                }
            );
        }
        if(this.PermGestaoDeFaturas1 || this.PermGestaoDeFaturas2){
            this.model.push( 
                {
                    label: 'Automação de Faturas', icon: 'assignment',
                    
                    items: 
                    this.PermGestaoDeFaturas1 ==true ? 
                    [
                        {
                            label: 'TXT', icon: 'assignment', routerLink: '/txt'
                        },
                        {
                            label: 'OCR', icon: 'remove_red_eye', routerLink:'/ocr'
                        }, 
                        {
                            label: 'Faturas Importadas', icon: 'list', routerLink: '/fataprovadas'
                        }
                    ] :
                    [
                        {
                            label: 'TXT', icon: 'assignment', routerLink: '/txt'
                        },
                        {
                            label: 'OCR', icon: 'remove_red_eye', routerLink:'/ocr'
                        }
                    ] 
                },
            );
        }
        if(this.PermGestaoDeContratos1 || this.PermGestaoDeContratos2){
            this.model.push( 
                {
                    label: 'Gestão de Contratos', icon: 'description',
                    
                    items: this.PermGestaoDeContratos1 == true ?
                    [ 
                        {   label: 'UC\'s', icon: 'description', routerLink: '/MLUC'    },
                        {   label: 'Fornecedor', icon: 'description', routerLink:'/MLContrapartes'  },
                        {   label: 'Submercados', icon: 'description', routerLink: '/MLSubmercados' },
                        {   label: 'Contratos', icon: 'description', routerLink: '/MLContratos'     },
                        {   label: 'Produtos', icon: 'description', routerLink: '/MLProdutos'       },
                        {   label: 'Análise Contratual', icon: 'timeline', routerLink: '/MLBase'    }
                    ] :
                    [ 
                        {   label: 'Análise Contratual', icon: 'timeline', routerLink: '/MLBase'    }
                    ] 
                },
            );
        }
        
        if(this.PermMedicoesDeFronteiras1 || this.PermMedicoesDeFronteiras2){
            this.model.push( 
                {
                    label: 'Medições de Fronteira', icon: 'timer',
                    
                    items:  //DEntro do operador o que ainda será construído
                    [
                        {
                            label: 'SCDE', icon: 'timer',
                            
                            items:  this.PermMedicoesDeFronteiras1 ==true?
                            [
                                {
                                    label: 'Cadastro de Pontos', icon: 'description', routerLink:'/scdecad'
                                },
                                {
                                    label: 'Extrato', icon: 'timeline', routerLink: '/scdeextrat'
                                },
                                {
                                    label: 'Gráficos', icon: 'timeline', routerLink: '/scdegraph'
                                }
                            ] :  
                            [
                                {
                                    label: 'Extrato', icon: 'timeline', routerLink: '/scdeextrat'
                                },
                                {
                                    label: 'Gráficos', icon: 'timeline', routerLink: '/scdegraph'
                                }
                            ] 
                        },
                        {
                            label: 'HEMERA', icon: 'timer',
                            
                            items:  this.PermMedicoesDeFronteiras1 ==true?
                            [
                                {
                                    label: 'Cadastro de Pontos', icon: 'description', routerLink:'/hemeracad'
                                },
                                {
                                    label: 'Extrato', icon: 'timeline', routerLink: '/hemeraextrat'
                                },
                            ] :
                            [
                                {
                                    label: 'Extrato', icon: 'timeline', routerLink: '/hemeraextrat'
                                },
                            ] 

                        },
                    ]
                },
            );
        }
        
        if(this.PermProjecoesTarifarias1 || this.PermProjecoesTarifarias2){
            this.model.push( 
                {
                    label: 'Projeções Tarifárias (SETE)', icon: 'attach_money',
                    
                    items:  this.PermProjecoesTarifarias1 ==true ? 
                    [
                        {
                            label: 'Distribuidoras', icon: 'description', routerLink:'/seteEmpresas'
                        },
                        {
                            label: 'Unidades de Negócios', icon: 'description', routerLink:'/seteUndNegocios'
                        },
                        {
                            label: 'Versionamento', icon: 'subject', routerLink:'/seteVersoes'
                        },
                        {
                            label: 'Análise de Projeções', icon: 'timeline', routerLink:'/seteView'
                        },
                        {
                            label: 'Comparativo de Projeções', icon: 'timeline', routerLink:'/seteCompare'
                        },
                    ] :
                    [
                        {
                            label: 'Análise de Projeções', icon: 'timeline', routerLink:'/seteView'
                        },
                        {
                            label: 'Comparativo de Projeções', icon: 'timeline', routerLink:'/seteCompare'
                        },
                    ] 
                },
            );
        }
        if(this.PermAdmin){
            this.model.push( 
                {
                    label: 'Calendário', icon: 'today', routerLink:'/tarefas'
                },
                );
                this.model.push( 
                    {
                        label: 'Mensageria', icon: 'mail-outline', routerLink:'/mensagens'
                },
                );
                this.model.push( 
                    {
                        label: 'Importações',  icon: 'import_export', routerLink:'/importarBD'
                    },
                );
                this.model.push( 
                    {
                        label: 'Usuários', icon: 'group', routerLink:'/users'
                    }
                );
        }



    }//fechando subscribe de gerencia


}

@Component({
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
})
export class AppSubMenuComponent {

    @Input() item: MenuItem;

    @Input() root: boolean;

    @Input() visible: boolean;

    _parentActive: boolean;

    activeIndex: number;

    hover: boolean;

    constructor(public app: AppMainComponent, public router: Router, public location: Location) {}

    itemClick(event: Event, item: MenuItem, index: number) {
        // avoid processing disabled items
        if (item.disabled) {
            event.preventDefault();
            return true;
        }

        // activate current item and deactivate active sibling if any
        this.activeIndex = (this.activeIndex === index) ? null : index;

        // execute command
        if (item.command) {
            item.command({originalEvent: event, item});
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

    isActive(index: number): boolean {
        return this.activeIndex === index;
    }

    unsubscribe(item: any) {
        if (item.eventEmitter) {
            item.eventEmitter.unsubscribe();
        }

        if (item.items) {
            for (const childItem of item.items) {
                this.unsubscribe(childItem);
            }
        }
    }

    @Input() get parentActive(): boolean {
        return this._parentActive;
    }

    set parentActive(val: boolean) {
        this._parentActive = val;

        if (!this._parentActive) {
            this.activeIndex = null;
        }
    }
}
