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
import { CadastroDeUnidadesComponent} from './scde/cadastro-de-unidades/cadastro-de-unidades.component'
import { SCDEComponent} from './scde/scde.component'
import { GraficosSCDEComponent} from './scde/graficos-scde/graficos-scde.component'
import { FechamentoSCDEComponent } from './scde/fechamento-scde/fechamento-scde.component'
import { FaturasAprovadasComponent } from './importarFaturas/faturas-aprovadas/faturas-aprovadas.component';
import { ImportarBDsComponent } from './importar-bds/importar-bds.component';
import { EmpresasComponent } from './sete/empresas/empresas.component';
import { VersionamentoComponent } from './sete/versionamento/versionamento.component';
import { ViewComponent } from './sete/view/view.component';
import { UnidDeNegociosComponent } from './sete/unid-de-negocios/unid-de-negocios.component';
import { MensageriaService } from './administrador/mensageria/mensageria.service';
import { MensageriaComponent } from './administrador/mensageria/mensageria.component';
import { HemeraCadPontosComponent } from './hemera/hemera-cad-pontos/hemera-cad-pontos.component';
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
import { HemeraComponent } from './hemera/hemera.component';
import { TarefasComponent } from './tarefas/tarefas.component';
import { View4Component } from './sete/view4/view4.component';


export const routes: Routes = [
  /*  {
		path: 'tarefas',
		redirectTo: 'tarefas/listar',
		pathMatch: 'full'
	},
	...TarefaRoutes,*/
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
            { path: 'tarefas', component: TarefasComponent, canActivate: [AuthGuard]},

            //USERS
            { path: 'users', component: UsuariosComponent, canActivate: [AuthGuard]},
            { path: 'edUser', component: EditUsersComponent, canActivate: [AuthGuard]},
            

            //COGNOS
            { path: 'Analisys', component: GraficosanaliticosComponent, canActivate: [AuthGuard]},
            { path: 'Gerencial', component: PainelGerencialComponent, canActivate: [AuthGuard]},
            
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
            { path: 'seteView', component: ViewComponent, canActivate: [AuthGuard]},
            { path: 'seteCompare', component: View4Component, canActivate: [AuthGuard]},
            
            //SCDE
            { path: 'scdecad', component: CadastroDeUnidadesComponent, canActivate: [AuthGuard]},
            { path: 'scdeextrat', component: SCDEComponent, canActivate: [AuthGuard]},
            { path: 'scdegraph', component: GraficosSCDEComponent, canActivate: [AuthGuard]},
            { path: 'scdecloser', component: FechamentoSCDEComponent, canActivate: [AuthGuard]},

            //HEMERA
            { path: 'hemeracad', component: HemeraCadPontosComponent, canActivate: [AuthGuard]},
            { path: 'hemeraextrat', component: HemeraComponent, canActivate: [AuthGuard]},


            //MERCADO LIVRE
            { path: 'MLContrapartes', component: MLCadsatroContrapartesComponent, canActivate: [AuthGuard]},
            { path: 'MLContratos', component: MLCadsatroContratosComponent,       canActivate: [AuthGuard]},
            { path: 'MLProdutos', component: MLCadsatroProdutosComponent,         canActivate: [AuthGuard]},
            { path: 'MLSubmercados', component: MLCadsatroSubmercadosComponent,   canActivate: [AuthGuard]},
            { path: 'MLBase', component: MLVolumesBaseComponent,   canActivate: [AuthGuard]},
           { path: 'MLUC', component: MLUCsComponent,                  canActivate: [AuthGuard]},

            
            
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
