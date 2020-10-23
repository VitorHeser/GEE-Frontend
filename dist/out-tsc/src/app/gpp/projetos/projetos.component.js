import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { ProjetosService } from './projetos.service';
let ProjetosComponent = class ProjetosComponent {
    constructor(projetosService, messageService, router) {
        this.projetosService = projetosService;
        this.messageService = messageService;
        this.router = router;
        this.data = {
            datasets: [{
                    data: [
                        11,
                        16,
                        7,
                        3,
                        14
                    ],
                    backgroundColor: [
                        "#FF6384",
                        "#4BC0C0",
                        "#FFCE56",
                        "#E7E9ED",
                        "#36A2EB"
                    ],
                    label: 'My dataset'
                }],
        };
        this.localidades = [
            { label: 'Todos', value: null },
            { label: 'Arraial do Cabo', value: 'Arraial do Cabo' },
            { label: 'Cabo Frio', value: 'Cabo Frio' },
            { label: 'Iguaba Grande', value: 'Iguaba Grande' },
            { label: 'São Pedro da Aldeia', value: 'São Pedro' },
            { label: 'Armação dos Búzios', value: 'Búzios' },
            { label: 'ETA', value: 'ETA' }
        ];
        this.stats = [
            { label: 'Não Iniciado', value: 'Não Iniciado' },
            { label: 'Em Andamento', value: 'Em Andamento' },
            { label: 'Concluído', value: 'Concluído' },
            { label: 'Paralisado', value: 'Paralisado' },
            { label: 'Não se Aplica', value: 'Não se Aplica' },
        ];
        this.area = [
            { label: 'Comercial', value: 'Comercial' },
            { label: 'Operacional', value: 'Operacional' },
            { label: 'Servicos', value: 'Servicos' },
            { label: 'Planejamento', value: 'Planejamento' }
        ];
        this.rad = [
            { label: '2019', value: 2019 },
            { label: '2020', value: 2020 },
            { label: '2021', value: 2021 },
            { label: '2022', value: 2022 }
        ];
        this.indices = [
            { label: '01', value: 1 },
            { label: '02', value: 2 },
            { label: '03', value: 3 },
            { label: '04', value: 4 },
            { label: '05', value: 5 },
        ];
    }
    ngOnInit() {
        sessionStorage.removeItem('idProjeto');
        sessionStorage.removeItem('nomeProjeto');
        this.projetosService.projetos()
            .subscribe(res => {
            console.log(res);
            this.projetos = res;
        });
        this.municipio = [
            { label: 'Todos', value: null },
            { label: 'Arraial do Cabo', value: 'Arraial do Cabo' },
            { label: 'Cabo Frio', value: 'Cabo Frio' },
            { label: 'Iguaba Grande', value: 'Iguaba Grande' },
            { label: 'São Pedro da Aldeia', value: 'São Pedro' },
            { label: 'Armação dos Búzios', value: 'Búzios' },
            { label: 'ETA', value: 'ETA' }
        ];
        this.status = [
            { label: 'Em Andamento', value: 'Em Andamento' },
            { label: 'Paralisado', value: 'Paralisado' },
            { label: 'Cancelado', value: 'Cancelado' },
            { label: 'Concluido', value: 'Concluído' }
        ];
        this.cols = [
            { field: 'projetoId', header: 'N° Projeto' },
            { field: 'projeto', header: 'Nome' },
            { field: 'statusgloblal', header: 'Status' },
            { field: 'setor', header: 'Setor' },
            //{ field: 'responsavel', header: 'Responsavel' },
            //{ field: 'localidade', header: 'Município' }, 
            { field: 'radar', header: 'Marco' }
        ];
    }
    abrir() {
        sessionStorage.setItem('idProjeto', this.selectedProjeto['projetoId']);
        sessionStorage.setItem('nomeProjeto', this.selectedProjeto['projeto']);
        this.router.navigate(['/mainprojeto']);
    }
    enviar() {
        this.inserir = {
            projetoId: null,
            projeto: this.nomeProject,
            localidade: this.local,
            setor: this.setor,
            responsavel: null,
            statusgloblal: this.stat,
            radar: this.radar,
            gravidade: this.valGravidade,
            urgencia: this.valUrgencia,
            tendencia: this.valTendencia,
            inicioprevisto: null,
            inicioreplanejado: null,
            iniciorealizado: null,
            terminoprevisto: null,
            terminoreplanejado: null,
            terminorealizado: null,
            financeiro: {},
            contratacao: {},
            obra: {},
            comissionamento: {},
            comprovacao: {},
            licoes: {},
            sesuite: {
                sesuiteId: null,
                cognosid: null,
                nprojeto: null,
                unidade: null,
                escopo: null,
                justificativa: null,
                premissas: null,
                nvengenharia: null,
                responsavel: null,
                preenchimento: null,
                area: null,
                email: null,
                tel: null,
                teveinvestimento: null,
                envolve: null,
                tipo: null,
                corebusiness: null,
                negocioexistente: null,
                principalmotivacao: null,
                melhoraempresa: null,
                delineado: null,
                beneficios: {},
                direcionamento: {},
                licenca: {},
                riscoscontratual: {},
                riscosoperacionais: {}
            }
        };
        this.projetosService.projetosAdd(this.inserir)
            .subscribe(res => {
            console.log(res);
            this.messageService.add({ sticky: true, severity: 'success', summary: 'Dados Salvos!',
                detail: 'Dados enviados com sucesso!' });
            this.dialogVisible = false;
            //this.router.navigate(['/inputindicadores']);
            location.reload();
        }, error => {
            this.messageService.add({ severity: 'error', summary: "Dados não Enviados!",
                detail: error.message, life: 5000 });
            console.log(error);
        });
    }
    onYearChange(event, dt) {
        if (this.yearTimeout) {
            clearTimeout(this.yearTimeout);
        }
        this.yearTimeout = setTimeout(() => {
            dt.filter(event.value, 'year', 'gt');
        }, 250);
    }
};
ProjetosComponent = tslib_1.__decorate([
    Component({
        selector: 'app-projetos',
        templateUrl: './projetos.component.html'
    }),
    tslib_1.__metadata("design:paramtypes", [ProjetosService, MessageService, Router])
], ProjetosComponent);
export { ProjetosComponent };
//# sourceMappingURL=projetos.component.js.map