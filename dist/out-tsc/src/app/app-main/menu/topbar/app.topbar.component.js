import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { AppMainComponent } from '../../app.main.component';
import { AuthService } from '../../../login/auth.service';
let AppTopbarComponent = class AppTopbarComponent {
    constructor(app, authService) {
        this.app = app;
        this.authService = authService;
        this.nome = sessionStorage.getItem('nome');
        authService.usuario(sessionStorage.getItem('email')).subscribe(response => {
            this.dadosUser = response,
                this.cargo = response['cargo'];
            //console.log(response['cargo'])
            //console.log(response['foto'])
            if (response['foto'] === null) {
                this.imgPerfil = "assets/layout/images/profile-image.png";
            }
            else {
                this.imgPerfil = response['foto'];
            }
        });
    }
    fechar() {
        sessionStorage.clear();
    }
};
AppTopbarComponent = tslib_1.__decorate([
    Component({
        selector: 'app-topbar',
        templateUrl: './app.topbar.component.html'
    }),
    tslib_1.__metadata("design:paramtypes", [AppMainComponent, AuthService])
], AppTopbarComponent);
export { AppTopbarComponent };
//# sourceMappingURL=app.topbar.component.js.map