import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { PerformanceService } from './../../../../performance/performance.service';
let MenurelatorioComponent = class MenurelatorioComponent {
    constructor(performanceService) {
        this.performanceService = performanceService;
        this.qtd = 0;
        this.permissoes = [];
        this.usuPerformance = false;
        this.usuComissao = false;
        this.usuTransporte = false;
    }
    ngOnInit() {
        this.preenchergerencias();
        //Preencehendo array de permissoes e liberando acessos
        let i = 0;
        while (sessionStorage.getItem("permissao " + i) != null) {
            let permissao = sessionStorage.getItem("permissao " + i);
            this.permissoes.push(permissao);
            //Liberando acessos
            if (permissao === "ROLE_ADMIN") {
                this.usuPerformance = true;
                this.usuComissao = true;
                this.usuTransporte = true;
            }
            else if (permissao === "ROLE_ADMIN_COMISSAO") {
                this.usuComissao = true;
            }
            else if (permissao === "ROLE_ADMIN_FROTAS") {
                this.usuTransporte = true;
            }
            else if (permissao === "ROLE_ADMIN_INDICADOR") {
                this.usuPerformance
                    = true;
            }
            i++;
        }
    }
    preenchergerencias() {
        this.performanceService.gerencias()
            .subscribe(response => {
            this.gerencias = [];
            this.items = [];
            this.gerencias = response.splice(2, Number.MAX_VALUE);
            for (var i = 0; i < this.gerencias.length; i++) {
                this.performanceService.classindicadores(this.gerencias[i]['gerenciaId'])
                    .subscribe(response2 => {
                    this.qtd = response2.length;
                    if (this.qtd == 0) {
                        this.gerencias.splice(i, 1);
                    }
                });
                this.gerencias[i]['routerLink'] = '/relatorio';
                //console.log(this.gerencias)
            }
            this.Preencheitems();
        });
    }
    Preencheitems() {
        this.items = this.usuPerformance === true ?
            [
                {
                    label: 'Performance', icon: 'timeline', routerLink: '/relatorio'
                }
            ] :
            [];
    }
};
MenurelatorioComponent = tslib_1.__decorate([
    Component({
        selector: 'app-menurelatorio',
        template: `
          <ul app-submenu [item]="items" target="_blank" root="true" id="items" class="navigation-menu" visible="true" parentActive="true"></ul>
          `
    }),
    tslib_1.__metadata("design:paramtypes", [PerformanceService])
], MenurelatorioComponent);
export { MenurelatorioComponent };
//# sourceMappingURL=menurelatorio.component.js.map