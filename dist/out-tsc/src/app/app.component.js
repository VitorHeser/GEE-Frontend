import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
let AppComponent = class AppComponent {
    constructor(messageService) {
        this.messageService = messageService;
        this.statusbot = "Pronto";
    }
    resolveAfter5Seconds() {
        return new Promise(resolve => {
            setTimeout(() => {
                this.statusbot = "Pronto";
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'A Importação dos dados para o indicador ' + ' criado' });
                // }, 30000);
            }, 30000);
        });
    }
    ;
};
AppComponent = tslib_1.__decorate([
    Component({
        selector: 'app-root',
        template: '<router-outlet></router-outlet>',
    }),
    tslib_1.__metadata("design:paramtypes", [MessageService])
], AppComponent);
export { AppComponent };
//# sourceMappingURL=app.component.js.map