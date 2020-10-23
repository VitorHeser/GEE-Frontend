import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ProjetosService } from '../projetos.service';
let PagemainComponent = class PagemainComponent {
    constructor(messageService, projetosService) {
        this.messageService = messageService;
        this.projetosService = projetosService;
        this.selectedCadFluxo = [];
        this.regIniDia = null;
        this.regIniMes = null;
        this.regIniAno = null;
        this.regFimDia = null;
        this.regFimMes = null;
        this.regFimAno = null;
        this.inicioprevisto = null;
        this.inicioreplanejado = null;
        this.iniciorealizado = null;
        this.terminoprevisto = null;
        this.terminoreplanejado = null;
        this.terminorealizado = null;
        this.clonedCars = {};
        this.uploadedFiles = [];
        this.cols3 = [{ field: null, header: null }];
        this.licencas = [];
        this.partesInteressadas = [];
        this.arrProjeto = [];
        this.arrRegulatorio = [];
        this.radar = [{ label: null, value: null }];
        this.indices = [{ label: null, value: null }];
        this.stats = [{ label: null, value: null }];
        this.partesInt = [];
        this.partes = [];
        this.fluxos = [];
        this.descrevendo = null;
        this.idProjeto = Number.parseInt(sessionStorage.getItem('idProjeto'));
        this.projeto = sessionStorage.getItem('nomeProjeto');
        this.projetosService.getFluxoInvestimento().then(data => this.fluxoInvest = data);
        this.projetosService.getAnos().then(data => this.anos = data);
        this.projetosService.getMeses().then(data => this.meses = data);
        this.projetosService.getDias().then(data => this.dias = data);
        this.projetosService.getFases().then(data => this.fasesProjetos = data);
        this.projetosService.getStatusGlobal().then(data => this.status = data);
        this.projetosService.getEngenharia().then(data => this.cars = data);
        this.projetosService.getProcessos().then(data => this.processos = data);
        this.projetosService.getLicencas().then(data => this.licencas = data);
        this.oFluxo = {
            "regulatorioId": null,
            "fluxoinvestimento": null,
            "inicio": null,
            "termino": null,
            "valorprojeto": null,
            "descricao": null,
            "aprovacao": null,
            "moeda": null,
            "projetoId": {
                "projetoId": this.idProjeto
            }
        };
        this.attFluxo = {
            "regulatorioId": null,
            "fluxoinvestimento": null,
            "inicio": null,
            "termino": null,
            "valorprojeto": null,
            "descricao": null,
            "aprovacao": null,
            "moeda": null,
            "projetoId": {
                "projetoId": this.idProjeto
            }
        };
    }
    ngOnInit() {
        this.projetosService.projetosId(this.idProjeto)
            .subscribe(res => {
            //console.log(res)
            this.arrProjeto = res;
            this.selectedLocal = this.arrProjeto['localidade'];
            this.selectedRadar = this.arrProjeto['radar'];
            this.selectedStatusGlobal = this.arrProjeto['statusgloblal'];
            this.selectedGravidade = this.arrProjeto['gravidade'];
            this.selectedTendencia = this.arrProjeto['tendencia'];
            this.selectedUrgencia = this.arrProjeto['urgencia'];
            this.inicioprevisto = this.parseDate(this.arrProjeto['inicioprevisto']);
            this.inicioreplanejado = this.parseDate(this.arrProjeto['inicioreplanejado']);
            this.iniciorealizado = this.parseDate(this.arrProjeto['iniciorealizado']);
            this.terminoprevisto = this.parseDate(this.arrProjeto['terminoprevisto']);
            this.terminoreplanejado = this.parseDate(this.arrProjeto['terminoreplanejado']);
            this.terminorealizado = this.parseDate(this.arrProjeto['terminorealizado']);
            this.partesInteressadas = this.arrProjeto['partestinteressadas'];
            this.projetosService.partesInteressadas()
                .subscribe(response => {
                this.partesInt = response;
                for (var i = 0; i < response.length + 1; i++) {
                    this.partes.push(false);
                }
                this.partesInteressadas.forEach((parte, index) => {
                    this.partes[parte['orgaoId']] = true;
                });
            });
            try {
                this.projetosService.regulatorios(this.idProjeto)
                    .subscribe(res => {
                    res.forEach(flux => {
                        this.fluxoInvest.forEach(elem => {
                            if (elem['value'] === flux['fluxoinvestimento']) {
                                this.fluxos.push(elem);
                            }
                        });
                    });
                    this.selectedFluxo = res[res.length - 1]['fluxoinvestimento'];
                    this.idRevisao = res.length - 1;
                    console.log("tentei aqui => " + this.selectedFluxo);
                    this.atualizarRevisao(this.selectedFluxo);
                });
            }
            catch (_a) {
                this.atualizarRevisao(this.attFluxo);
            }
        });
        this.indices = [
            { label: '01', value: 1 },
            { label: '02', value: 2 },
            { label: '03', value: 3 },
            { label: '04', value: 4 },
            { label: '05', value: 5 },
        ];
        this.localidades = [
            { label: 'Todas', value: null },
            { label: 'Arraial do Cabo', value: 'Arraial do Cabo' },
            { label: 'Cabo Frio', value: 'Cabo Frio' },
            { label: 'Iguaba Grande', value: 'Iguaba Grande' },
            { label: 'São Pedro da Aldeia', value: 'São Pedro da Aldeia' },
            { label: 'Armação dos Búzios', value: 'Armação dos Búziosr' },
            { label: 'ETA', value: 'ETA' }
        ];
        this.files2 = [
            {
                label: "Produção",
                data: "Documents Folder",
                expandedIcon: "ui-icon-folder-open",
                collapsedIcon: "ui-icon-folder",
                children: [
                    { label: "Implantação do Sistema", icon: "ui-icon-insert-drive-file", data: "Expenses Document" },
                    { label: "Ampliação do Sistema", icon: "ui-icon-insert-drive-file", data: "Expenses Document" },
                    { label: "Melhoria do Sistema", icon: "ui-icon-insert-drive-file", data: "Resume Document" }
                ]
            },
            {
                label: "Adução",
                data: "Home Folder",
                expandedIcon: "ui-icon-folder-open",
                collapsedIcon: "ui-icon-folder",
                children: [
                    { label: "Implantação do Sistema", icon: "ui-icon-insert-drive-file", data: "Expenses Document" },
                    { label: "Ampliação do Sistema", icon: "ui-icon-insert-drive-file", data: "Expenses Document" },
                    { label: "Melhoria do Sistema", icon: "ui-icon-insert-drive-file", data: "Resume Document" }
                ]
            },
        ];
        this.colors = [
            { label: 'White', value: 'White' },
            { label: 'Green', value: 'Green' },
            { label: 'Silver', value: 'Silver' },
            { label: 'Black', value: 'Black' },
            { label: 'Red', value: 'Red' },
            { label: 'Maroon', value: 'Maroon' },
            { label: 'Brown', value: 'Brown' },
            { label: 'Orange', value: 'Orange' },
            { label: 'Blue', value: 'Blue' }
        ];
        this.cols = [
            { field: 'nomeEmpresa', header: 'Empresa' },
            { field: 'respEmpresa', header: 'Responsável' },
            { field: 'status', header: 'Status' },
            { field: 'tipo', header: 'Tipo do Projeto' },
            { field: 'previsto', header: 'Previsto' },
            { field: 'replanejado', header: 'Replanejado' },
            { field: 'realizado', header: 'Realizado' },
            { field: 'realizado', header: 'Contrato Físico' },
            { field: 'realizado', header: 'Contrato Sistêmico' }
        ];
        this.cols2 = [
            { field: 'nProcesso', header: 'Numero do Processo' },
            { field: 'responsavel', header: 'Responsável' },
            { field: 'envio', header: 'Envio' },
            { field: 'retorno', header: 'Retorno' },
        ];
        this.cols3 = [
            { field: 'numeroLicenca', header: 'Número' },
            { field: 'tipoLicenca', header: 'Tipo' },
            { field: 'status', header: 'Status' },
            { field: 'orgao', header: 'Orgão' },
            { field: 'descricao', header: 'Descrição' },
            { field: 'protocolo', header: 'Protocolo' },
            { field: 'inicio', header: 'Início' },
            { field: 'termino', header: 'Término' }
        ];
    }
    aprovarRev() {
        this.oFluxo['aprovacao'] = 'Aprovada';
        //console.log(this.oFluxo)
        this.atualizarRegulatorio();
    }
    atualizarRevisao(fluxo) {
        this.oFluxo = [];
        this.regIniDia = null;
        this.regIniMes = null;
        this.regIniAno = null;
        this.regFimDia = null;
        this.regFimMes = null;
        this.regFimAno = null;
        this.projetosService.regulatorios(this.idProjeto)
            .subscribe(res => {
            let aux = [];
            res.forEach(flu => aux.push(flu['fluxoinvestimento']));
            console.log('olhe aqui => ' + aux);
            this.oFluxo = res[aux.indexOf(fluxo, 0)];
            this.selectedFluxo = this.oFluxo['fluxoinvestimento'];
            this.selectedMoedaReg = this.oFluxo['moeda'];
            if (this.oFluxo['aprovacao'] === 'Aprovada') {
                this.aprov = false;
            }
            else {
                this.aprov = true;
            }
            //===============================================================//
            // * Aqui melhorar esse condicional para as diversas hipóteses * //
            //===============================================================//
            if (this.regFimAno = null) { }
            else {
                this.regIniDia = this.oFluxo.inicio.dayOfMonth < 10 ? "0" + this.oFluxo.inicio.dayOfMonth : this.oFluxo.inicio.dayOfMonth.toString();
                this.regIniMes = this.oFluxo.inicio.monthValue < 10 ? "0" + this.oFluxo.inicio.monthValue : this.oFluxo.inicio.monthValue.toString();
                this.regIniAno = this.oFluxo.inicio.year.toString();
                this.regFimDia = this.oFluxo.termino.dayOfMonth < 10 ? "0" + this.oFluxo.termino.dayOfMonth : this.oFluxo.termino.dayOfMonth.toString();
                this.regFimMes = this.oFluxo.termino.monthValue < 10 ? "0" + this.oFluxo.termino.monthValue : this.oFluxo.termino.monthValue.toString();
                this.regFimAno = this.oFluxo.termino.year.toString();
            }
        });
    }
    enviarReg(cad) {
        this.attFluxo = {
            "regulatorioId": null,
            "fluxoinvestimento": cad,
            "inicio": null,
            "termino": null,
            "valorprojeto": null,
            "descricao": this.descrevendo,
            "aprovacao": "Em Andamento",
            "moeda": null,
            "projetoId": {
                "projetoId": this.idProjeto
            }
        };
        this.projetosService.regulatoriosAdd(this.attFluxo)
            .subscribe(response => {
            if (response === null) {
                this.messageService.add({ sticky: true, severity: 'success', summary: 'Dados Salvos!',
                    detail: 'Dados enviados com sucesso!' });
                console.log('Dados enviados com sucesso!');
            }
        }, error => {
            this.messageService.add({ severity: 'error', summary: "Dados não Enviados!",
                detail: error.message, life: 5000 });
            console.log(error);
        });
    }
    salvarGerais() {
        //console.log(this.partes)
        this.partesInteressadas = [];
        this.partes.forEach((parte, index) => {
            if (parte === true) {
                this.partesInteressadas.push(this.partesInt[index - 1]);
            }
        });
        //console.log(this.partesInteressadas)
        this.arrProjeto['radar'] = this.selectedRadar;
        this.arrProjeto['statusgloblal'] = this.selectedStatusGlobal;
        this.arrProjeto['tendencia'] = this.selectedGravidade;
        this.arrProjeto['gravidade'] = this.selectedTendencia;
        this.arrProjeto['urgencia'] = this.selectedUrgencia;
        this.arrProjeto['localidade'] = this.selectedLocal;
        this.arrProjeto['inicioprevisto'] = this.inicioprevisto;
        this.arrProjeto['inicioreplanejado'] = this.inicioreplanejado;
        this.arrProjeto['iniciorealizado'] = this.iniciorealizado;
        this.arrProjeto['terminoprevisto'] = this.terminoprevisto;
        this.arrProjeto['terminoreplanejado'] = this.terminoreplanejado;
        this.arrProjeto['terminorealizado'] = this.terminorealizado;
        this.arrProjeto['partestinteressadas'] = this.partesInteressadas;
        this.projetosService.projetosAtt(this.arrProjeto, this.idProjeto)
            .subscribe(response => {
            if (response === null) {
                this.messageService.add({ sticky: true, severity: 'success', summary: 'Dados Salvos!',
                    detail: 'Dados enviados com sucesso!' });
                console.log('Dados enviados com sucesso!');
            }
        }, error => {
            this.messageService.add({ severity: 'error', summary: "Dados não Enviados!",
                detail: error.message, life: 5000 });
            console.log(error);
        });
    }
    atualizarRegulatorio() {
        this.attFluxo = {
            "regulatorioId": this.oFluxo.regulatorioId,
            "fluxoinvestimento": this.oFluxo.fluxoinvestimento,
            "inicio": this.oFluxo.inicio,
            "termino": this.oFluxo.termino,
            "valorprojeto": this.oFluxo.valorprojeto,
            "descricao": this.oFluxo.descricao,
            "aprovacao": this.oFluxo.aprovacao,
            "moeda": this.oFluxo.moeda,
            "projetoId": {
                "projetoId": this.idProjeto
            }
        };
        console.log(this.attFluxo);
        this.projetosService.regulatoriosAtt(this.attFluxo, this.oFluxo.regulatorioId)
            .subscribe(response => {
            if (response === null) {
                this.messageService.add({ sticky: true, severity: 'success', summary: 'Dados Salvos!',
                    detail: 'Dados enviados com sucesso!' });
                console.log('Dados enviados com sucesso!');
            }
        }, error => {
            this.messageService.add({ severity: 'error', summary: "Dados não Enviados!",
                detail: error.message, life: 5000 });
            console.log(error);
        });
    }
    //Método que transforma data formato Json para date
    parseDate(value) {
        if (value === null) { }
        else {
            let year = value.year;
            let month = value.monthValue;
            if (month < 10) {
                month = "0" + month;
            }
            let day = value.dayOfMonth;
            if (day < 10) {
                day = "0" + day;
            }
            value = new Date(year + "-" + month + "-" + day + "T00:00:00");
        }
        return value;
    }
    modelaData(dia, mes, ano, discriminador) {
        let vdia;
        let vmes;
        let resultado;
        if (ano === null) {
            resultado = null;
        }
        else {
            mes === null ? vmes = '12' : vmes = mes;
            if (dia === null) {
                if (vmes === '02') {
                    vdia = '28';
                }
                else if (vmes === '04' || vmes === '06' || vmes === '09' || vmes === '11') {
                    vdia = '30';
                }
                else {
                    vdia = '31';
                }
            }
            else {
                vdia = dia;
                //console.log(vdia)
                //console.log(typeof  vdia)
            }
            resultado = new Date(ano + "-" + vmes + "-" + vdia + "T00:00:00.000");
        }
        if (discriminador === 'ri') {
            this.oFluxo.inicio = resultado;
        }
        else if (discriminador === 'rt') {
            this.oFluxo.termino = resultado;
        }
    }
    onRowEditInit(car) {
        this.clonedCars[car.nomeEmpresa] = Object.assign({}, car);
    }
    onRowEditSave(car) {
        if (car.nomeEmpresa != null) {
            delete this.clonedCars[car.nomeEmpresa];
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Car is updated' });
        }
        else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Year is required' });
        }
    }
    onRowEditCancel(car, index) {
        this.cars[index] = this.clonedCars[car.nomeEmpresa];
        delete this.clonedCars[car.nomeEmpresa];
    }
    onTabOpen($event) {
        if ($event.index === 4) {
            this.selected = !this.selected;
        }
    }
    onTabClose($event) {
        if ($event.index === 4) {
            this.selected = !this.selected;
        }
    }
    onUpload(event) {
        for (const file of event.files) {
            this.uploadedFiles.push(file);
        }
        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: 'File Uploaded', detail: '' });
    }
};
PagemainComponent = tslib_1.__decorate([
    Component({
        selector: 'app-pagemain',
        templateUrl: './pagemain.component.html',
        styleUrls: ['./pagemain.component.css']
    }),
    tslib_1.__metadata("design:paramtypes", [MessageService, ProjetosService])
], PagemainComponent);
export { PagemainComponent };
//# sourceMappingURL=pagemain.component.js.map