import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../login/auth.service';
let AuthGuard = class AuthGuard {
    constructor(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    canActivate(route, state) {
        if (this.authService.usuarioEstaAutenticado()) {
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }
};
AuthGuard = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [AuthService,
        Router])
], AuthGuard);
export { AuthGuard };
//# sourceMappingURL=auth.guard.service.js.map