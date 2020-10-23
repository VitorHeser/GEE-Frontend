import * as tslib_1 from "tslib";
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
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
import { AppMainComponent } from './app-main/app.main.component';
import { AppNotfoundComponent } from './pages/app.notfound.component';
import { AppErrorComponent } from './pages/app.error.component';
import { AppAccessdeniedComponent } from './pages/app.accessdenied.component';
import { HomeComponent } from './home/home.component';
import { InputindicadoresComponent } from './performance/inputindicadores/inputindicadores.component';
import { ProjetosComponent } from './gpp/projetos/projetos.component';
import { PagemainComponent } from './gpp/projetos/pagemain/pagemain.component';
import { CadastrarComponent } from './tarefas/cadastrar/cadastrar.component';
import { SesuiteprojectComponent } from './gpp/projetos/sesuiteproject/sesuiteproject.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard.service';
import { RelatorioindicadoresComponent } from './performance/relatorioindicadores/relatorioindicadores.component';
import { TelaImpressaoRelatorioComponent } from './performance/tela-impressao-relatorio/tela-impressao-relatorio.component';
import { PrintdeliberacaoComponent } from './gestaodedeliberacao/printdeliberacao/printdeliberacao.component';
import { PainelprocessoComponent } from './gestaodedeliberacao/painelprocesso/painelprocesso.component';
import { TransporteComponent } from './transporte/transporte.component';
import { AgendarVeiculoComponent } from './transporte/agendamentos/agendar-veiculo/agendar-veiculo.component';
import { RpaComponent } from './rpa/rpa.component';
import { AdminIndicadoresComponent } from './performance/admin-indicadores/admin-indicadores.component';
import { NotificacoessispcComponent } from './notificacoessispc/notificacoessispc.component';
import { controledepagamentosjuridicoComponent } from './controledepagamentosjuridico/controledepagamentosjuridico.component';
import { AdminComponent } from './admin/admin.component';
import { ForecastenergiaaguaComponent } from './energia/forecast/forecastenergiaagua/forecastenergiaagua.component';
import { ForecastenergiaesgotoComponent } from './energia/forecast/forecastenergiaesgoto/forecastenergiaesgoto.component';
import { EquipamentosComponent } from './energia/equipamentos/equipamentos.component';
import { CenariosComponent } from './energia/cenarios/cenarios.component';
export const routes = [
    /*  {
          path: 'tarefas',
          redirectTo: 'tarefas/listar',
          pathMatch: 'full'
      },
      ...TarefaRoutes,*/
    { path: '', component: AppMainComponent,
        children: [
            { path: '', component: HomeComponent, canActivate: [AuthGuard] },
            { path: 'dash', component: DashboardDemoComponent },
            { path: 'sample', component: SampleDemoComponent, canActivate: [AuthGuard] },
            { path: 'forms', component: FormsDemoComponent, canActivate: [AuthGuard] },
            { path: 'data', component: DataDemoComponent, canActivate: [AuthGuard] },
            { path: 'panels', component: PanelsDemoComponent, canActivate: [AuthGuard] },
            { path: 'overlays', component: OverlaysDemoComponent, canActivate: [AuthGuard] },
            { path: 'menus', component: MenusDemoComponent, canActivate: [AuthGuard] },
            { path: 'messages', component: MessagesDemoComponent, canActivate: [AuthGuard] },
            { path: 'misc', component: MiscDemoComponent, canActivate: [AuthGuard] },
            { path: 'empty', component: EmptyDemoComponent, canActivate: [AuthGuard] },
            { path: 'charts', component: ChartsDemoComponent, canActivate: [AuthGuard] },
            { path: 'file', component: FileDemoComponent, canActivate: [AuthGuard] },
            { path: 'utils', component: UtilsDemoComponent, canActivate: [AuthGuard] },
            { path: 'documentation', component: DocumentationComponent, canActivate: [AuthGuard] },
            { path: 'inputindicadores', component: InputindicadoresComponent, canActivate: [AuthGuard] },
            { path: 'projetos', component: ProjetosComponent },
            { path: 'mainprojeto', component: PagemainComponent },
            { path: 'cadastrar', component: CadastrarComponent, canActivate: [AuthGuard] },
            { path: 'relatorio', component: TelaImpressaoRelatorioComponent, canActivate: [AuthGuard] },
            { path: 'painelprocess', component: PainelprocessoComponent, canActivate: [AuthGuard] },
            { path: 'agendamento', component: AgendarVeiculoComponent, canActivate: [AuthGuard] },
            { path: 'transporte', component: TransporteComponent, canActivate: [AuthGuard] },
            { path: 'email', component: NotificacoessispcComponent, canActivate: [AuthGuard] },
            { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
            { path: 'cpjuridico', component: controledepagamentosjuridicoComponent, canActivate: [AuthGuard] },
            { path: 'indicadoresAdmin', component: AdminIndicadoresComponent, canActivate: [AuthGuard] },
            { path: 'energiaGestal', component: EquipamentosComponent },
            { path: 'forecastAgua', component: ForecastenergiaaguaComponent },
            { path: 'forecastEsgoto', component: ForecastenergiaesgotoComponent },
            { path: 'cenarios', component: CenariosComponent },
            { path: 'rpa', component: RpaComponent },
            { path: 'sesuiteproject', component: SesuiteprojectComponent, canActivate: [AuthGuard] },
        ]
    },
    { path: 'printPerformance/:id/:ref', component: RelatorioindicadoresComponent },
    { path: 'error', component: AppErrorComponent, canActivate: [AuthGuard] },
    { path: 'accessdenied', component: AppAccessdeniedComponent, canActivate: [AuthGuard] },
    { path: '404', component: AppNotfoundComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'printdelib', component: PrintdeliberacaoComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: '/404' },
];
export const AppRoutes = RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' });
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = tslib_1.__decorate([
    NgModule({
        imports: [RouterModule.forRoot(routes)],
        exports: [RouterModule]
    })
], AppRoutingModule);
export { AppRoutingModule };
//# sourceMappingURL=app.routes.js.map