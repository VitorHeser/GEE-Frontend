import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { TransporteService } from '../transporte.service';
let DashboardsComponent = class DashboardsComponent {
    constructor(transporteService) {
        this.transporteService = transporteService;
    }
    ngOnInit() {
        this.Gerencias = [
            { label: '', value: 0 },
            { label: 'Comercial', value: 1 },
            { label: 'Operacional', value: 2 }
        ];
        this.Supervisoes = [
            { label: '', value: 0 },
            { label: 'Fiscalizacao', value: 1 },
            { label: 'Eletromecanica', value: 2 }
        ];
        this.condutores = [
            { label: '', value: 0 },
            { label: 'Albert Einstein', value: 1 },
            { label: 'Fred Mercury', value: 2 },
            { label: 'José Vincente', value: 3 }
        ];
        this.cols1 = [
            { field: 'indice', header: '#  ' },
            { field: 'placa', header: 'Placas' },
            { field: 'condutor', header: 'Condutores' },
            { field: 'nome', header: 'Responsáveis Pelo Veículo' },
            { field: 'gerencia', header: 'Gerencias' },
            { field: 'departamento', header: 'Departamento' }
        ];
        this.ranking1 = [
            { indice: 1, placa: 'HFE6699', condutor: 'NÃO IDENTIFICADO', nome: 'Fulano de Tal', gerencia: 'Comercial', departamento: 'Fiscalização' },
            { indice: 2, placa: 'HFE6710', condutor: 'José da Silva', nome: 'Beltrano Silva', gerencia: 'Operacional Água', departamento: 'Eletromecânica' },
            { indice: 3, placa: 'HFE6711', condutor: 'NÃO IDENTIFICADO', nome: 'Sicrano Oliveira', gerencia: 'Comercial', departamento: 'Comissão de Fraudes' },
            { indice: 4, placa: 'HFE6712', condutor: 'Weslley S.', nome: 'Fred Mercury', gerencia: 'Planejamento', departamento: 'Planejamento' },
            { indice: 5, placa: 'HFE6713', condutor: 'Mahatma Gandhi', nome: 'Mahatma Gandhi', gerencia: 'Operacional', departamento: 'Eletromecânica' },
            { indice: 6, placa: 'HFE6714', condutor: 'Antonio Jobim', nome: 'Antonio Jobim', gerencia: 'Frotas', departamento: 'Frotas' },
            { indice: 7, placa: 'HFE6715', condutor: 'NÃO IDENTIFICADO', nome: 'Larissa de Macedo', gerencia: 'Frotas', departamento: 'Frotas' },
            { indice: 8, placa: 'HFE6716', condutor: 'Luiz Gonzaga', nome: 'Weslley S.', gerencia: 'Serviços', departamento: 'Corte e Religação' },
            { indice: 9, placa: 'HFE6717', condutor: 'José da Silva', nome: 'José da Silva', gerencia: 'Serviços', departamento: 'Manutenção' },
            { indice: 10, placa: 'HFE6718', condutor: 'NÃO IDENTIFICADO', nome: 'José das Couves', gerencia: 'Operacional Água', departamento: 'Automação' }
        ];
        this.transporteService.ParaAprovar()
            .subscribe(Agendamento => {
            console.log(Agendamento);
            this.agendamentospendentes = Agendamento.length;
        });
        this.transporteService.Aprovados()
            .subscribe(Agendamento => {
            console.log(Agendamento);
            this.agendamentosregistrados = Agendamento.length;
        });
        this.transporteService.Aprovados()
            .subscribe(Agendamento => {
            console.log(Agendamento);
            this.agendamentosaprovados = Agendamento.filter(item => item.aprovacao === 1).length;
        });
    }
};
DashboardsComponent = tslib_1.__decorate([
    Component({
        selector: 'app-dashboards',
        templateUrl: './dashboards.component.html',
        styleUrls: ['./dashboards.component.css']
    }),
    tslib_1.__metadata("design:paramtypes", [TransporteService])
], DashboardsComponent);
export { DashboardsComponent };
//# sourceMappingURL=dashboards.component.js.map