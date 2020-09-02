import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {AppRoutes} from './app.routes';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


import { AccordionModule } from 'primeng/accordion';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { ChartModule } from 'primeng/chart';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipsModule } from 'primeng/chips';
import { CodeHighlighterModule } from 'primeng/codehighlighter';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';
import { FieldsetModule } from 'primeng/fieldset';
import { FileUploadModule } from 'primeng/fileupload';
import { FullCalendarModule } from 'primeng/fullcalendar';
import { GalleriaModule } from 'primeng/galleria';
import { GrowlModule } from 'primeng/growl';
import { InplaceModule } from 'primeng/inplace';
import { InputMaskModule } from 'primeng/inputmask';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { LightboxModule } from 'primeng/lightbox';
import { ListboxModule } from 'primeng/listbox';
import { MegaMenuModule } from 'primeng/megamenu';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { MultiSelectModule } from 'primeng/multiselect';
import { OrderListModule } from 'primeng/orderlist';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PaginatorModule } from 'primeng/paginator';
import { PanelModule } from 'primeng/panel';
import { PanelMenuModule } from 'primeng/panelmenu';
import { PasswordModule } from 'primeng/password';
import { PickListModule } from 'primeng/picklist';
import { ProgressBarModule } from 'primeng/progressbar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SlideMenuModule } from 'primeng/slidemenu';
import { SliderModule } from 'primeng/slider';
import { SpinnerModule } from 'primeng/spinner';
import { SplitButtonModule } from 'primeng/splitbutton';
import { StepsModule } from 'primeng/steps';
import { TabMenuModule } from 'primeng/tabmenu';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { TerminalModule } from 'primeng/terminal';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { ToastModule } from 'primeng/toast';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { TreeModule } from 'primeng/tree';
import { TreeTableModule } from 'primeng/treetable';
import { VirtualScrollerModule } from 'primeng/virtualscroller';

import { AppComponent} from './app.component';
import { AppMainComponent } from './app-main/app.main.component';
import { AppNotfoundComponent } from './pages/app.notfound.component';
import { AppErrorComponent } from './pages/app.error.component';
import { AppAccessdeniedComponent } from './pages/app.accessdenied.component';
import { AppLoginComponent } from './pages/app.login.component';

import {AppMenuComponent, AppSubMenuComponent} from './app-main/menu/app.menu.component';
import {AppMenuDemoComponent, AppSubMenuDemoComponent} from './app-main/menu/app.menu.demo.component';

import {AppSideBarComponent} from './app-main/menu/sidebar/app.sidebar.component';
import {AppSidebartabcontentComponent} from './app-main/menu/sidebar/app.sidebartabcontent.component';
import {AppTopbarComponent} from './app-main/menu/topbar/app.topbar.component';
import {AppFooterComponent} from './app-main/app.footer.component';
import {DashboardDemoComponent} from './demo/view/dashboarddemo.component';
import {SampleDemoComponent} from './demo/view/sampledemo.component';
import {FormsDemoComponent} from './demo/view/formsdemo.component';
import {DataDemoComponent} from './demo/view/datademo.component';
import {PanelsDemoComponent} from './demo/view/panelsdemo.component';
import {OverlaysDemoComponent} from './demo/view/overlaysdemo.component';
import {MenusDemoComponent} from './demo/view/menusdemo.component';
import {MessagesDemoComponent} from './demo/view/messagesdemo.component';
import {MiscDemoComponent} from './demo/view/miscdemo.component';
import {EmptyDemoComponent} from './demo/view/emptydemo.component';
import {ChartsDemoComponent} from './demo/view/chartsdemo.component';
import {FileDemoComponent} from './demo/view/filedemo.component';
import {UtilsDemoComponent} from './demo/view/utilsdemo.component';
import {DocumentationComponent} from './demo/view/documentation.component';

import {CarService} from './demo/service/carservice';
import {CountryService} from './demo/service/countryservice';
import {EventService} from './demo/service/eventservice';
import {NodeService} from './demo/service/nodeservice';
import { HomeComponent } from './home/home.component';

import { MessageService } from 'primeng/api';


import { LoginComponent } from './login/login.component';

import{AuthService} from './login/auth.service';
import { AuthGuard } from './guards/auth.guard.service';
import {TriStateCheckboxModule} from 'primeng/tristatecheckbox';
import { ImportOcrComponent } from './ImportarFaturas/importocr/importocr.component';
import { ImportService } from './ImportarFaturas/import.service';
import { ImporttxtComponent } from './ImportarFaturas/importtxt/importtxt.component';
import { FaturasAprovadasComponent } from './importarFaturas/faturas-aprovadas/faturas-aprovadas.component';
import { AprovadasService } from './importarFaturas/faturas-aprovadas/aprovadas.service';
import { VisualizadorDeFaturasComponent } from './importarfaturas/visualizador-de-faturas/visualizador-de-faturas.component';
import { AdministradorComponent } from './administrador/administrador.component';
import { DashboardsComponent } from './administrador/dashboards/dashboards.component';

import { ConjuntodegraficosComponent } from './painel-gerencial/conjuntodegraficos/conjuntodegraficos.component';
import { GraficosComponent } from './painel-gerencial/graficos/graficos.component';
import { GraficosDash1Service } from './painel-gerencial/graficos-dash1.service';
import { GraficosanaliticosComponent } from './painel-gerencial/graficosanaliticos/graficosanaliticos.component';
import { SCDEComponent } from './scde/scde.component';
import { ScdeserviceService } from './scde/scdeservice.service';
import { CadastroDeUnidadesComponent } from './scde/cadastro-de-unidades/cadastro-de-unidades.component';
import { GraficosSCDEComponent } from './scde/graficos-scde/graficos-scde.component'
import { GraficosScComponent } from './scde/graficos/graficosscde.component';
import { FechamentoSCDEComponent } from './scde/fechamento-scde/fechamento-scde.component';
import { FechamentoSCDEQuadradoComponent } from './scde/fechamento-scde/fechamento-scdequadrado/fechamento-scdequadrado.component';
import { ResumoCognosPrincipalComponent } from './administrador/dashboards/resumo-cognos-principal/resumo-cognos-principal.component';
import { ResumoCognosAnosComponent } from './administrador/dashboards/resumo-cognos-anos/resumo-cognos-anos.component';
import { ImportarBDsComponent } from './importar-bds/importar-bds.component'
import { ImportarArquivosServiceService } from './importar-bds/importar-arquivos-service.service';
import { SeteComponent } from './sete/sete.component';
import { VersionamentoComponent } from './sete/versionamento/versionamento.component';
import { EmpresasComponent } from './sete/empresas/empresas.component';
import { ViewComponent } from './sete/view/view.component'
import { SeteserviceService } from './sete/seteservice.service';
import { UnidDeNegociosComponent } from './sete/unid-de-negocios/unid-de-negocios.component';
import { View3Component } from './sete/view3/view3.component';
import { View2Component } from './sete/view2/view2.component';
import { ReajustesComponent } from './sete/reajustes/reajustes.component';
import { MigracaoAclComponent } from './sete/unid-de-negocios/migracao-acl/migracao-acl.component';
import { MensageriaComponent } from './administrador/mensageria/mensageria.component'
import { MensageriaService } from './administrador/mensageria/mensageria.service';
import { HemeraComponent } from './hemera/hemera.component';
import { HemeraCadPontosComponent } from './hemera/hemera-cad-pontos/hemera-cad-pontos.component';
import { HemeraserviceService } from './hemera/hemeraservice.service';
import { MercadoLivreComponent } from './mercado-livre/mercado-livre.component';
import { MLCadsatroContrapartesComponent } from './mercado-livre/ml-cadsatro-contrapartes/ml-cadsatro-contrapartes.component';
import { MLCadsatroContratosComponent } from './mercado-livre/ml-cadsatro-contratos/ml-cadsatro-contratos.component';
import { MLCadsatroProdutosComponent } from './mercado-livre/ml-cadsatro-produtos/ml-cadsatro-produtos.component';
import { MLCadsatroSubmercadosComponent } from './mercado-livre/ml-cadsatro-submercados/ml-cadsatro-submercados.component';
import { MercadolivreserviceService } from './mercado-livre/mercadolivreservice.service';
import { MLVolumesBaseComponent } from './mercado-livre/ml-volumes-base/ml-volumes-base.component';
import { MLVolBaseGraficosComponent } from './mercado-livre/ml-volumes-base/ml-vol-base-graficos/ml-vol-base-graficos.component';
import { MLUCsComponent } from './mercado-livre/ml-ucs/ml-ucs.component';
import { PainelGerencialComponent } from './painel-gerencial/painel-gerencial.component';
import { UsuariosComponent } from './administrador/usuarios/usuarios.component';
import { UserServiceService } from './administrador/usuarios/user-service.service';
import { AdUserComponent } from './ad-user/ad-user.component';
import { EditUsersComponent } from './administrador/usuarios/edit-users/edit-users.component';
import { TarefasComponent } from './tarefas/tarefas.component';
import { TarefasService } from './tarefas/tarefas.service';
import { View4Component } from './sete/view4/view4.component';
import { ViewAnaliseComponent } from './sete/view4/view-analise/view-analise.component';

@NgModule({
    imports: [
    RouterModule,
        CommonModule,
        BrowserModule,
        FormsModule,
        AppRoutes,
        HttpClientModule,
        BrowserAnimationsModule,
        AccordionModule,
        AutoCompleteModule,
        BreadcrumbModule,
        ButtonModule,
        CalendarModule,
        CardModule,
        CarouselModule,
        ChartModule,
        CheckboxModule,
        ChipsModule,
        CodeHighlighterModule,
        ConfirmDialogModule,
        ColorPickerModule,
        ContextMenuModule,
        DataViewModule,
        DialogModule,
        DropdownModule,
        EditorModule,
        FieldsetModule,
        FileUploadModule,
        FullCalendarModule,
        GalleriaModule,
        GrowlModule,
        InplaceModule,
        InputMaskModule,
        InputSwitchModule,
        InputTextModule,
        InputTextareaModule,
        LightboxModule,
        ListboxModule,
        MegaMenuModule,
        MenuModule,
        MenubarModule,
        MessageModule,
        MessagesModule,
        MultiSelectModule,
        OrderListModule,
        OrganizationChartModule,
        OverlayPanelModule,
        PaginatorModule,
        PanelModule,
        PanelMenuModule,
        PasswordModule,
        PickListModule,
        ProgressBarModule,
        RadioButtonModule,
        RatingModule,
        ScrollPanelModule,
        SelectButtonModule,
        SlideMenuModule,
        SliderModule,
        SpinnerModule,
        SplitButtonModule,
        StepsModule,
        TableModule,
        TabMenuModule,
        TabViewModule,
        TerminalModule,
        TieredMenuModule,
        ToastModule,
        ToggleButtonModule,
        ToolbarModule,
        TooltipModule,
        TreeModule,
        TreeTableModule,
        VirtualScrollerModule,
        TriStateCheckboxModule,
        GalleriaModule
    ],
    declarations: [
        AppComponent,
        AppMainComponent,
        AppMenuComponent,
        AppMenuDemoComponent,
        AppSubMenuComponent,
        AppSubMenuDemoComponent,
        AppSideBarComponent,
        AppSidebartabcontentComponent,
        AppTopbarComponent,
        AppFooterComponent,
        DashboardDemoComponent,
        SampleDemoComponent,
        FormsDemoComponent,
        DataDemoComponent,
        PanelsDemoComponent,
        OverlaysDemoComponent,
        MenusDemoComponent,
        MessagesDemoComponent,
        MessagesDemoComponent,
        MiscDemoComponent,
        ChartsDemoComponent,
        EmptyDemoComponent,
        FileDemoComponent,
        UtilsDemoComponent,
        DocumentationComponent,
        AppNotfoundComponent,
        AppErrorComponent,
        AppAccessdeniedComponent,
        AppLoginComponent,
        HomeComponent,
  	    LoginComponent,
        ImportOcrComponent,
        ImporttxtComponent,
        FaturasAprovadasComponent,
        VisualizadorDeFaturasComponent,
        AdministradorComponent,
        DashboardsComponent,
        UsuariosComponent,
        ConjuntodegraficosComponent,
        GraficosComponent,
        GraficosanaliticosComponent,
        SCDEComponent,
        CadastroDeUnidadesComponent,
        GraficosSCDEComponent,
        GraficosScComponent,
        FechamentoSCDEComponent,
        FechamentoSCDEQuadradoComponent,
        ResumoCognosPrincipalComponent,
        ResumoCognosAnosComponent,
        ImportarBDsComponent,
        SeteComponent,
        VersionamentoComponent,
        EmpresasComponent,
        ViewComponent,
        UnidDeNegociosComponent,
        View3Component,
        View2Component,
        ReajustesComponent,
        MigracaoAclComponent,
        MensageriaComponent,
        HemeraComponent,
        HemeraCadPontosComponent,
        MercadoLivreComponent,
        MLCadsatroContrapartesComponent,
        MLCadsatroContratosComponent,
        MLCadsatroProdutosComponent,
        MLCadsatroSubmercadosComponent,
        MLVolumesBaseComponent,
        MLVolBaseGraficosComponent,
        MLUCsComponent,
        PainelGerencialComponent,
        AdUserComponent,
        EditUsersComponent,
        TarefasComponent,
        View4Component,
        ViewAnaliseComponent,
    ],
    providers: [
        {provide: LocationStrategy, useClass: HashLocationStrategy},
        CarService, CountryService, EventService, NodeService, MessageService,
        AuthService,
        AuthGuard,
        ImportService,
        AprovadasService,
        ConjuntodegraficosComponent,
        GraficosComponent,
        GraficosDash1Service,
        ScdeserviceService,
        ImportarArquivosServiceService,
        SeteserviceService,
        View3Component,
        View2Component,
        MigracaoAclComponent,
        MensageriaService,
        HemeraserviceService,
        MercadolivreserviceService,
        UserServiceService,
        TarefasService
        
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
