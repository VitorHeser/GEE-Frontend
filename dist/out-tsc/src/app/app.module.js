import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AppRoutes } from './app.routes';
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
import { AppComponent } from './app.component';
import { AppMainComponent } from './app-main/app.main.component';
import { AppNotfoundComponent } from './pages/app.notfound.component';
import { AppErrorComponent } from './pages/app.error.component';
import { AppAccessdeniedComponent } from './pages/app.accessdenied.component';
import { AppLoginComponent } from './pages/app.login.component';
import { AppMenuComponent, AppSubMenuComponent } from './app-main/menu/app.menu.component';
import { AppMenuDemoComponent, AppSubMenuDemoComponent } from './app-main/menu/app.menu.demo.component';
import { AppSideBarComponent } from './app-main/menu/sidebar/app.sidebar.component';
import { AppSidebartabcontentComponent } from './app-main/menu/sidebar/app.sidebartabcontent.component';
import { AppTopbarComponent } from './app-main/menu/topbar/app.topbar.component';
import { AppFooterComponent } from './app-main/app.footer.component';
import { DashboardDemoComponent } from './demo/view/dashboarddemo.component';
import { SampleDemoComponent } from './demo/view/sampledemo.component';
import { FormsDemoComponent } from './demo/view/formsdemo.component';
import { DataDemoComponent } from './demo/view/datademo.component';
import { PanelsDemoComponent } from './demo/view/panelsdemo.component';
import { OverlaysDemoComponent } from './demo/view/overlaysdemo.component';
import { MenusDemoComponent } from './demo/view/menusdemo.component';
import { MessagesDemoComponent } from './demo/view/messagesdemo.component';
import { MiscDemoComponent } from './demo/view/miscdemo.component';
import { EmptyDemoComponent } from './demo/view/emptydemo.component';
import { ChartsDemoComponent } from './demo/view/chartsdemo.component';
import { FileDemoComponent } from './demo/view/filedemo.component';
import { UtilsDemoComponent } from './demo/view/utilsdemo.component';
import { DocumentationComponent } from './demo/view/documentation.component';
import { CarService } from './demo/service/carservice';
import { CountryService } from './demo/service/countryservice';
import { EventService } from './demo/service/eventservice';
import { NodeService } from './demo/service/nodeservice';
import { HomeComponent } from './home/home.component';
import { InputindicadoresComponent } from './performance/inputindicadores/inputindicadores.component';
import { ProjetosComponent } from './gpp/projetos/projetos.component';
import { MessageService } from 'primeng/api';
import { PagemainComponent } from './gpp/projetos/pagemain/pagemain.component';
import { PagestoriesComponent } from './gpp/projetos/pagestories/pagestories.component';
import { TarefasComponent } from './tarefas/tarefas.component';
import { TarefaConcluidaDirective } from './tarefas/shared/tarefa-concluida.directive';
import { TarefaService } from './tarefas/shared/tarefa.service';
import { GestaoDeliberacaoService } from './gestaodedeliberacao/gestaodeliberacao.service';
import { ListarComponent } from './tarefas/listar/listar.component';
import { CadastrarComponent } from './tarefas/cadastrar/cadastrar.component';
import { EditarComponent } from './tarefas/editar/editar.component';
import { SesuiteprojectComponent } from './gpp/projetos/sesuiteproject/sesuiteproject.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './login/auth.service';
import { AuthGuard } from './guards/auth.guard.service';
import { PerformanceService } from './performance/performance.service';
import { GraficosComponent } from './graficos/graficos.component';
import { MenurelatorioComponent } from './app-main/menu/sidebar/menurelatorio/menurelatorio.component';
import { RelatorioindicadoresComponent } from './performance/relatorioindicadores/relatorioindicadores.component';
import { CapaComponent } from './performance/relatorioindicadores/capa/capa.component';
import { IndicadoresComponent } from './performance/relatorioindicadores/indicadores/indicadores.component';
import { ResumoIndicadoresComponent } from './performance/relatorioindicadores/capa/resumo-indicadores/resumo-indicadores.component';
import { PainelprocessoComponent } from './gestaodedeliberacao/painelprocesso/painelprocesso.component';
import { PrintdeliberacaoComponent } from './gestaodedeliberacao/printdeliberacao/printdeliberacao.component';
import { TelaImpressaoRelatorioComponent } from './performance/tela-impressao-relatorio/tela-impressao-relatorio.component';
import { TransporteComponent } from './transporte/transporte.component';
import { DashboardsComponent } from './transporte/dashboards/dashboards.component';
import { AgendamentosComponent } from './transporte/agendamentos/agendamentos.component';
import { CadastroComponent } from './transporte/cadastro/cadastro.component';
import { GraficosTransporteComponent } from './transporte/graficos-transporte/graficos-transporte.component';
import { AprovarAgendamentoComponent } from './transporte/agendamentos/aprovar-agendamento/aprovar-agendamento.component';
import { CalendarioAgendamentosComponent } from './transporte/agendamentos/calendario-agendamentos/calendario-agendamentos.component';
import { AgendarVeiculoComponent } from './transporte/agendamentos/agendar-veiculo/agendar-veiculo.component';
import { TransporteService } from './transporte/transporte.service';
import { RpaComponent } from './rpa/rpa.component';
import { ListaAgendamentosComponent } from './transporte/agendamentos/lista-agendamentos/lista-agendamentos.component';
import { AdminIndicadoresComponent } from './performance/admin-indicadores/admin-indicadores.component';
import { NotificacoessispcComponent } from './notificacoessispc/notificacoessispc.component';
import { RpaService } from './rpa/rpa.service';
import { controledepagamentosjuridicoComponent } from './controledepagamentosjuridico/controledepagamentosjuridico.component';
import { CadastroPagamentoComponent } from './controledepagamentosjuridico/cadastro-pagamento/cadastro-pagamento.component';
import { ListapendentesComponent } from './controledepagamentosjuridico/listapendentes/listapendentes.component';
import { AcompanharaprovacaoComponent } from './controledepagamentosjuridico/acompanharaprovacao/acompanharaprovacao.component';
import { ControledepagamentosjuridicoService } from './controledepagamentosjuridico/controledepagamentosjuridico.service';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';
import { AprovarComponent } from './controledepagamentosjuridico/aprovar/aprovar.component';
import { AdminComponent } from './admin/admin.component';
import { CriacaodeusuarioComponent } from './admin/criacaodeusuario/criacaodeusuario.component';
import { ListadeusuariosComponent } from './admin/listadeusuarios/listadeusuarios.component';
import { CadastrarindicadorComponent } from './performance/admin-indicadores/cadastrarindicador/cadastrarindicador.component';
import { EditindicadoresComponent } from './performance/admin-indicadores/editarindicadores/editindicadores/editindicadores.component';
import { AdminService } from './admin/Admin.service';
import { AdminIndicadoresService } from './performance/admin-indicadores/admin-indicadores.service';
import { EditarcadastroindicadoresComponent } from './performance/admin-indicadores/editarindicadores/editarcadastroindicadores/editarcadastroindicadores.component';
import { GraficosIndicadoresComponent } from './graficos-indicadores/graficos-indicadores.component';
import { NovoIndicadorComponent } from './performance/admin-indicadores/cadastrarindicador/novo-indicador/novo-indicador.component';
import { EditarindicadoresComponent } from './performance/admin-indicadores/editarindicadores/editarindicadores.component';
import { ImportarComponent } from './performance/admin-indicadores/importar/importar.component';
import { ImportarOrcadosComponent } from './performance/admin-indicadores/importar/importar-orcados/importar-orcados.component';
import { ImportarBotsComponent } from './performance/admin-indicadores/importar/importar-bots/importar-bots.component';
import { NotificacoesService } from './notificacoessispc/notificacoes.service';
import { EnergiaComponent } from './energia/energia.component';
import { EnergiaService } from './energia/energia.service';
import { EquipamentosComponent } from './energia/equipamentos/equipamentos.component';
import { ForecastComponent } from './energia/forecast/forecast.component';
import { ForecastenergiaaguaComponent } from './energia/forecast/forecastenergiaagua/forecastenergiaagua.component';
import { ForecastenergiaesgotoComponent } from './energia/forecast/forecastenergiaesgoto/forecastenergiaesgoto.component';
import { ProjetosService } from './gpp/projetos/projetos.service';
import { CenariosComponent } from './energia/cenarios/cenarios.component';
import { OperacionalEsgotoComponent } from './operacional-esgoto/operacional-esgoto.component';
import { OperacionalEsgotoService } from './operacional-esgoto/operacional-esgoto.service';
import { OperacionalComponent } from './operacional/operacional.component';
let AppModule = class AppModule {
};
AppModule = tslib_1.__decorate([
    NgModule({
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
            TriStateCheckboxModule
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
            InputindicadoresComponent,
            ProjetosComponent,
            PagemainComponent,
            PagestoriesComponent,
            TarefasComponent,
            ListarComponent,
            CadastrarComponent,
            EditarComponent,
            TarefaConcluidaDirective,
            SesuiteprojectComponent,
            LoginComponent,
            GraficosComponent,
            MenurelatorioComponent,
            RelatorioindicadoresComponent,
            CapaComponent,
            IndicadoresComponent,
            ResumoIndicadoresComponent,
            PainelprocessoComponent,
            PrintdeliberacaoComponent,
            TelaImpressaoRelatorioComponent,
            TransporteComponent,
            DashboardsComponent,
            AgendamentosComponent,
            CadastroComponent,
            GraficosTransporteComponent,
            AprovarAgendamentoComponent,
            CalendarioAgendamentosComponent,
            AgendarVeiculoComponent,
            RpaComponent,
            ListaAgendamentosComponent,
            AdminIndicadoresComponent,
            NotificacoessispcComponent,
            controledepagamentosjuridicoComponent,
            CadastroPagamentoComponent,
            ListapendentesComponent,
            AcompanharaprovacaoComponent,
            AprovarComponent,
            AdminComponent,
            CriacaodeusuarioComponent,
            ListadeusuariosComponent,
            CadastrarindicadorComponent,
            EditindicadoresComponent,
            EditarcadastroindicadoresComponent,
            GraficosIndicadoresComponent,
            NovoIndicadorComponent,
            EditarindicadoresComponent,
            ImportarComponent,
            ImportarOrcadosComponent,
            ImportarBotsComponent,
            EnergiaComponent,
            EquipamentosComponent,
            ForecastComponent,
            ForecastenergiaaguaComponent,
            ForecastenergiaesgotoComponent,
            CenariosComponent,
            OperacionalEsgotoComponent,
            OperacionalComponent,
        ],
        providers: [
            { provide: LocationStrategy, useClass: HashLocationStrategy },
            CarService, CountryService, EventService, NodeService, MessageService, TarefaService,
            GestaoDeliberacaoService,
            PrintdeliberacaoComponent,
            TelaImpressaoRelatorioComponent,
            AuthService,
            AuthGuard,
            PerformanceService,
            TransporteService,
            RpaService,
            ControledepagamentosjuridicoService,
            AdminService,
            AdminIndicadoresService,
            NotificacoesService,
            EnergiaService,
            ProjetosService,
            OperacionalEsgotoService
        ],
        bootstrap: [AppComponent]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map