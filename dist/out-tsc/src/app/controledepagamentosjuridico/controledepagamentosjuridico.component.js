import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let controledepagamentosjuridicoComponent = class controledepagamentosjuridicoComponent {
    constructor() {
        this.items = [];
        this.CentrodeCusto = [];
        this.usuNivel = 0;
        this.centrosDeCustos = null;
    }
    ngOnInit() {
        //Preencehendo array de permissoes e liberando acessos
        let i = 0;
        while (sessionStorage.getItem("permissao " + i) != null) {
            let permissao = sessionStorage.getItem("permissao " + i);
            //Liberando acessos
            if (permissao === "ROLE_JURIDICO_PAGAMENTOS") {
                this.usuPagamentos = true;
            }
            else if (permissao === "ROLE_JURIDICO_APROVACAO1") {
                this.usuAprovacao = true;
                this.usuNivel = 1;
            }
            else if (permissao === "ROLE_JURIDICO_APROVACAO3") {
                this.usuAprovacao = true;
                this.usuNivel = 3;
            }
            else if (permissao.substring(0, 24) === "ROLE_JURIDICO_APROVACAO2") {
                this.usuAprovacao = true;
                this.usuNivel = 2;
                var cc = permissao.substring(25, Number.MAX_VALUE);
                this.centrosDeCustos = this.centrosDeCustos == null ? cc : this.centrosDeCustos + "," + cc;
            }
            i++;
        }
        if (this.usuPagamentos == true) {
            this.items.push({ label: 'Cadastro' });
            this.items.push({ label: 'Lista' });
            this.items.push({ label: 'Acompanhar Aprovações' });
        }
        if (this.usuAprovacao == true) {
            this.items.push({ label: 'Aprovador' });
        }
        console.log(this.centrosDeCustos);
        this.activeItem = this.items[0];
    }
    trocadeitem(activeItem) {
        this.activeItem = activeItem['activeItem'];
        this.activeItemIndex = this.items.indexOf(this.activeItem);
    }
    trocadeitemIndex(index) {
        this.activeItem = this.items[index];
        this.activeItemIndex = index;
    }
};
controledepagamentosjuridicoComponent = tslib_1.__decorate([
    Component({
        selector: 'app-controledepagamentosjuridico',
        templateUrl: './controledepagamentosjuridico.component.html',
        styleUrls: ['./controledepagamentosjuridico.component.css']
    }),
    tslib_1.__metadata("design:paramtypes", [])
], controledepagamentosjuridicoComponent);
export { controledepagamentosjuridicoComponent };
//# sourceMappingURL=controledepagamentosjuridico.component.js.map