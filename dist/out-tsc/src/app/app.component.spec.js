/* tslint:disable:no-unused-variable */
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { AppMainComponent } from './app-main/app.main.component';
import { AppTopbarComponent } from './app-main/menu/topbar/app.topbar.component';
import { AppSideBarComponent } from './app-main/menu/sidebar/app.sidebar.component';
import { AppFooterComponent } from './app-main/app.footer.component';
import { AppSidebartabcontentComponent } from './app-main/menu/sidebar/app.sidebartabcontent.component';
import { AppMenuComponent, AppSubMenuComponent } from './app-main/menu/app.menu.component';
import { AppMenuDemoComponent } from './app-main/menu/app.menu.demo.component';
import { ScrollPanelModule } from 'primeng/primeng';
describe('AppComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, ScrollPanelModule],
            declarations: [AppComponent,
                AppMainComponent,
                AppTopbarComponent,
                AppSideBarComponent,
                AppSidebartabcontentComponent,
                AppMenuComponent,
                AppMenuDemoComponent,
                AppSubMenuComponent,
                AppFooterComponent
            ]
        });
        TestBed.compileComponents();
    });
    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));
});
//# sourceMappingURL=app.component.spec.js.map