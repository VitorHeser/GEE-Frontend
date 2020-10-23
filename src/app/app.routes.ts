import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders, NgModule } from '@angular/core';
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
import { AppLoginComponent } from './pages/app.login.component';
import { HomeComponent } from './home/home.component';

import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard.service';
import { ImportOcrComponent }from './ImportarFaturas/importocr/importocr.component'
import { ImporttxtComponent} from './ImportarFaturas/importtxt/importtxt.component'
import { CadastroDeUnidadesComponent} from './medicao-fronteira/scde/cadastro-de-unidades/cadastro-de-unidades.component'
import { SCDEComponent} from './medicao-fronteira/scde/scde.component'
import { GraficosSCDEComponent} from './medicao-fronteira/scde/graficos-scde/graficos-scde.component'
import { FechamentoSCDEComponent } from './medicao-fronteira/scde/fechamento-scde/fechamento-scde.component'
import { FaturasAprovadasComponent } from './importarFaturas/faturas-aprovadas/faturas-aprovadas.component';
import { ImportarBDsComponent } from './importar-bds/importar-bds.component';
import { EmpresasComponent } from './sete/empresas/empresas.component';
import { VersionamentoComponent } from './sete/versionamento/versionamento.component';
import { ViewComponent } from './sete/view/view.component';
import { UnidDeNegociosComponent } from './sete/unid-de-negocios/unid-de-negocios.component';
import { MensageriaService } from './administrador/mensageria/mensageria.service';
import { MensageriaComponent } from './administrador/mensageria/mensageria.component';
import { HemeraCadPontosComponent } from './medicao-fronteira/hemera/hemera-cad-pontos/hemera-cad-pontos.component';
import { MLCadsatroProdutosComponent } from './mercado-livre/ml-cadsatro-produtos/ml-cadsatro-produtos.component';
import { MLCadsatroContratosComponent } from './mercado-livre/ml-cadsatro-contratos/ml-cadsatro-contratos.component';
import { MLCadsatroContrapartesComponent } from './mercado-livre/ml-cadsatro-contrapartes/ml-cadsatro-contrapartes.component';
import { MLCadsatroSubmercadosComponent } from './mercado-livre/ml-cadsatro-submercados/ml-cadsatro-submercados.component';
import { MLVolumesBaseComponent } from './mercado-livre/ml-volumes-base/ml-volumes-base.component';
import { MLUCsComponent } from './mercado-livre/ml-ucs/ml-ucs.component';
import { GraficosanaliticosComponent } from './painel-gerencial/graficosanaliticos/graficosanaliticos.component';
import { PainelGerencialComponent } from './painel-gerencial/painel-gerencial.component';
import { UsuariosComponent } from './administrador/usuarios/usuarios.component';
import { EditUsersComponent } from './administrador/usuarios/edit-users/edit-users.component';
import { HemeraComponent } from './medicao-fronteira/hemera/hemera.component';
import { TarefasComponent } from './tarefas/tarefas.component';
import { View4Component } from './sete/view4/view4.component';
import { AuditoriasComponent } from './auditorias/auditorias.component';
import { CognOrcamentoComponent } from './painel-gerencial/cogn-orcamento/cogn-orcamento.component';
import { HemeraGraficosComponent } from './medicao-fronteira/hemera/hemera-graficos/hemera-graficos.component';
import { PainelEnergiaComponent } from './painel-gerencial/painel-energia/painel-energia.component';
import { Auditoria0019Component } from './auditorias/auditoria0019/auditoria0019.component';
import { Auditoria004BComponent } from './auditorias/auditoria004-b/auditoria004-b.component';
import { ScdeParametrizacaoComponent } from './mercado-livre/scde-parametrizacao/scde-parametrizacao.component';
import { ScdeDashboardsComponent } from './mercado-livre/scde-dashboards/scde-dashboards.component';
import { MlCadastroContrapartesCurtoprazoComponent } from './mercado-livre/ml-cadastro-contrapartes-curtoprazo/ml-cadastro-contrapartes-curtoprazo.component';
import { MlUnsComponent } from './mercado-livre/ml-uns/ml-uns.component';
import { FaturasPendentesComponent } from './auditorias/faturas-pendentes/faturas-pendentes.component';
import { DashHierarquicoComponent } from './painel-gerencial/dash-hierarquico/dash-hierarquico.component';


export const routes: Routes = [
    { path: '', component: AppMainComponent,
        children: [
            { path: '', component: HomeComponent, canActivate: [AuthGuard]},
            // { path: '', component: HomeComponent},

            //EXEMPLOS 
            { path: 'dash', component: DashboardDemoComponent},
            { path: 'sample', component: SampleDemoComponent},
            { path: 'forms', component: FormsDemoComponent},
            { path: 'data', component: DataDemoComponent },
            { path: 'panels', component: PanelsDemoComponent},
            { path: 'overlays', component: OverlaysDemoComponent },
            { path: 'menus', component: MenusDemoComponent},
            { path: 'messages', component: MessagesDemoComponent },
            { path: 'misc', component: MiscDemoComponent },
            { path: 'empty', component: EmptyDemoComponent },
            { path: 'file', component: FileDemoComponent},
            { path: 'charts', component: ChartsDemoComponent },
            { path: 'utils', component: UtilsDemoComponent},
            { path: 'documentation', component: DocumentationComponent},

            //TAREFAS
            { path: 'auditorias', component: AuditoriasComponent, canActivate: [AuthGuard]},
            { path: 'auditoriasRel019', component: Auditoria0019Component, canActivate: [AuthGuard]},
            { path: 'auditoriasRel04B', component: Auditoria004BComponent, canActivate: [AuthGuard]},
            { path: 'faturasnaolancadas', component: FaturasPendentesComponent, canActivate: [AuthGuard]},

            //TAREFAS
            { path: 'tarefas', component: TarefasComponent, canActivate: [AuthGuard]},

            //USERS
            { path: 'users', component: UsuariosComponent, canActivate: [AuthGuard]},
            { path: 'edUser', component: EditUsersComponent, canActivate: [AuthGuard]},
            

            //COGNOS
            { path: 'PainelEnergia', component: PainelEnergiaComponent, canActivate: [AuthGuard]},
            { path: 'Orcamento', component: CognOrcamentoComponent, canActivate: [AuthGuard]},
            { path: 'Analisys', component: GraficosanaliticosComponent, canActivate: [AuthGuard]},
            { path: 'Gerencial', component: PainelGerencialComponent, canActivate: [AuthGuard]},
            { path: 'hierariquia', component: DashHierarquicoComponent},
            
            //FATURAS
            { path: 'ocr', component: ImportOcrComponent, canActivate: [AuthGuard]},
            { path: 'txt', component: ImporttxtComponent, canActivate: [AuthGuard]},
            { path: 'fataprovadas', component: FaturasAprovadasComponent, canActivate: [AuthGuard]},

            //IMPORTACAO
            { path: 'importarBD', component: ImportarBDsComponent, canActivate: [AuthGuard]},
            
            //MENSAGERIA
            { path: 'mensagens', component: MensageriaComponent, canActivate: [AuthGuard]},
            
            //SETE
            { path: 'seteEmpresas', component: EmpresasComponent, canActivate: [AuthGuard]},
            { path: 'seteUndNegocios', component: UnidDeNegociosComponent, canActivate: [AuthGuard]},
            { path: 'seteVersoes', component: VersionamentoComponent, canActivate: [AuthGuard]},
            { path: 'seteView', component: ViewComponent},
            { path: 'seteCompare', component: View4Component, canActivate: [AuthGuard]},
            
            //SCDE
            { path: 'scdecad', component: CadastroDeUnidadesComponent, canActivate: [AuthGuard]},
            { path: 'scdeextrat', component: SCDEComponent, canActivate: [AuthGuard]},
            { path: 'scdegraph', component: GraficosSCDEComponent, canActivate: [AuthGuard]},
            { path: 'scdecloser', component: FechamentoSCDEComponent, canActivate: [AuthGuard]},
            { path: 'scdeparametrizacao', component: ScdeParametrizacaoComponent, canActivate: [AuthGuard]},
            { path: 'scdedashboards', component: ScdeDashboardsComponent,canActivate: [AuthGuard]},

            //HEMERA
            { path: 'hemeracad', component: HemeraCadPontosComponent, canActivate: [AuthGuard]},
            { path: 'hemeragraph', component: HemeraGraficosComponent, canActivate: [AuthGuard]},
            { path: 'hemeraextrat', component: HemeraComponent, canActivate: [AuthGuard]},


            //MERCADO LIVRE
            { path: 'MLContrapartes', component: MLCadsatroContrapartesComponent},
            { path: 'MLContrapartesCurtoPrazo', component: MlCadastroContrapartesCurtoprazoComponent},
            { path: 'MLContratos', component: MLCadsatroContratosComponent,canActivate: [AuthGuard]},
            { path: 'MLProdutos', component: MLCadsatroProdutosComponent,canActivate: [AuthGuard]},
            { path: 'MLSubmercados', component: MLCadsatroSubmercadosComponent,canActivate: [AuthGuard]},
            { path: 'MLBase', component: MLVolumesBaseComponent,canActivate: [AuthGuard]},
            { path: 'MLUC', component: MLUCsComponent,canActivate: [AuthGuard]},
            { path: 'MLUN', component: MlUnsComponent,canActivate: [AuthGuard]},

            
            
        ]
    },
    // { path: 'printPerformance/:id/:ref', component: RelatorioindicadoresComponent},
    { path: 'error', component: AppErrorComponent, canActivate: [AuthGuard]},
    { path: 'accessdenied', component: AppAccessdeniedComponent, canActivate: [AuthGuard]},
    { path: '404', component: AppNotfoundComponent, canActivate: [AuthGuard]},
    { path: 'login', component: LoginComponent },
    { path: '**', redirectTo: '/404'},
	//...TarefaRoutes
    

];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'});

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],

exports: [ RouterModule ]
})
export class AppRoutingModule {}
