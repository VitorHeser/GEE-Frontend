import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ProjetosService } from '../projetos.service';
let SesuiteprojectComponent = class SesuiteprojectComponent {
    constructor(messageService, projetosService) {
        this.messageService = messageService;
        this.projetosService = projetosService;
        this.projeto = [];
        this.sesuite = [];
        this.direcionamento = [];
        this.beneficios = [];
        this.licenca = [];
        this.riscoscontratual = [];
        this.riscosoperacionais = [];
    }
    ngOnInit() {
        this.idProjeto = Number.parseInt(sessionStorage.getItem('idProjeto'));
        this.nprojeto = sessionStorage.getItem('nomeProjeto');
        this.projetosService.projetosId(this.idProjeto)
            .subscribe(res => {
            //console.log(res)
            //Carregando Arrays das tabelas
            this.projeto = res;
            this.sesuite = res['sesuite'];
            this.direcionamento = this.sesuite['direcionamento'];
            this.beneficios = this.sesuite['beneficios'];
            this.licenca = this.sesuite['licenca'];
            this.riscoscontratual = this.sesuite['riscoscontratual'];
            this.riscosoperacionais = this.sesuite['riscosoperacionais'];
            //Carregando Informações Gerais
            this.respExecProjeto = this.sesuite['nvengenharia'];
            this.nvProjEngenharia = this.sesuite['responsavel'];
            this.objetivoIndepende = this.sesuite['objetivoindepende'].toString();
            this.investimentoRealizado = this.sesuite['teveinvestimento'].toString();
            this.projetoEnvolve = this.sesuite['envolve'];
            this.selecaoCesta = this.sesuite['tipo'];
            this.coreBusiness = this.sesuite['corebusiness'].toString();
            this.negocioExistente = this.sesuite['negocioexistente'].toString();
            this.principalMotivacao = this.sesuite['principalmotivacao'];
            this.melhoraEmpresa = this.sesuite['melhoraempresa'].toString();
            this.delineado = this.sesuite['delineado'];
            //Carregando direcionamento
            this.impactoAgua = this.direcionamento['impactoagua'].toString();
            this.impactoEsgoto = this.direcionamento['impactoesgoto'].toString();
            this.maturidade = this.direcionamento['maturidade'];
            this.modeloMercado = this.direcionamento['modelomercado'];
            this.diferencialCompetitivo = this.direcionamento['diferencialcompetitivo'];
            this.modeloConcessao = this.direcionamento['modeloconcessao'];
            this.sinergia = this.direcionamento['sinergia'];
            this.maturidadeRegiao = this.direcionamento['maturidaderegiao'];
            //Carregando beneficios
            this.impactoGestao = this.beneficios['impactogestao'];
            this.impactoMotivacao = this.beneficios['impactomotivacao'];
            this.impactoSeguranca = this.beneficios['impactoseguranca'];
            this.impactoSustentabilidade = this.beneficios['impactosustentabilidade'];
            this.outraMelhoria = this.beneficios['outramelhoria'].toString();
            //Carregando licenca
            this.impactoSocial = this.licenca['impactosocial'];
            this.relacionamentoPolitico = this.licenca['relacionamentopolitico'];
            this.relacionamentoSociedade = this.licenca['relacionamentosociedade'];
            this.impactoImagem = this.licenca['impactoimagem'];
            this.probabilidadeImpactoImagem = this.licenca['probabilidadeimpactoimagem'];
            this.impactoReputacional = this.licenca['impactoreputacional'];
            //Carregando risco contratual
            this.clausulaContratual = this.riscoscontratual['clausulacontratual'];
            this.tipoMeta = this.riscoscontratual['tipometa'];
            this.penalidade12meses = this.riscoscontratual['penalidade12meses'];
            this.penalidadeAplicavel = this.riscoscontratual['penalidadeaplicavel'];
            this.probabilidadePenalidade = this.riscoscontratual['probabilidadepenalidade'];
            this.postergacao = this.riscoscontratual['postergacao'];
            this.impactoPolitico = this.riscoscontratual['impactopolitico'];
            //Carregando riscosoperacionais
            this.impactoInterrupcao = this.riscosoperacionais['impactointerrupcao'];
            this.probabilidadeImpactoInterrupcao = this.riscosoperacionais['probabilidadeimpactointerrupcao'];
            this.custoInterrupcao = this.riscosoperacionais['custointerrupcao'];
            this.complexidadeExecucao = this.riscosoperacionais['complexidadeexecucao'];
            this.impactoSubstituacao = this.riscosoperacionais['impactosubstituicao'];
            this.probabilidadeImpactoSubstituacao = this.riscosoperacionais['probabilidadeimpactosubstituicao'];
            this.impactoAmbiental = this.riscosoperacionais['impactoambiental'];
            this.probabilidadeImpactoAmbiental = this.riscosoperacionais['probabilidadeimpactoambiental'];
            this.impactoIntegridade = this.riscosoperacionais['impactointegridade'];
            this.probabilidadeImpactoiIntegridade = this.riscosoperacionais['probabilidadeimpactointegridade'];
            this.riscoAtraso = this.riscosoperacionais['riscoatraso'];
            this.possuiLicenca = this.riscosoperacionais['possuilicenca'];
            this.emissaoLicenca = this.parseDate(this.riscosoperacionais['emissaolicenca']);
            this.validadeLicenca = this.parseDate(this.riscosoperacionais['validadelicenca']);
            this.prazoLicenca = this.riscosoperacionais['prazolicenca'];
            this.condicionanteLicenca = this.riscosoperacionais['condicionantelicenca'].toString();
        });
    }
    salvar() {
        //Salvando Informações Gerais
        this.sesuite['nvengenharia'] = this.respExecProjeto;
        this.sesuite['responsavel'] = this.nvProjEngenharia;
        this.sesuite['objetivoindepende'] = this.objetivoIndepende;
        this.sesuite['teveinvestimento'] = this.investimentoRealizado;
        this.sesuite['envolve'] = this.projetoEnvolve;
        this.sesuite['tipo'] = this.selecaoCesta;
        this.sesuite['corebusiness'] = this.coreBusiness;
        this.sesuite['negocioexistente'] = this.negocioExistente;
        this.sesuite['principalmotivacao'] = this.principalMotivacao;
        this.sesuite['melhoraempresa'] = this.melhoraEmpresa;
        this.sesuite['delineado'] = this.delineado;
        this.projeto['inicioprevisto'] = this.parseDate(this.projeto['inicioprevisto']);
        this.projeto['inicioreplanejado'] = this.parseDate(this.projeto['inicioreplanejado']);
        this.projeto['iniciorealizado'] = this.parseDate(this.projeto['iniciorealizado']);
        this.projeto['terminoprevisto'] = this.parseDate(this.projeto['terminoprevisto']);
        this.projeto['terminoreplanejado'] = this.parseDate(this.projeto['terminoreplanejado']);
        this.projeto['terminorealizado'] = this.parseDate(this.projeto['terminorealizado']);
        //Carregando direcionamento
        this.direcionamento['impactoagua'] = this.impactoAgua;
        this.direcionamento['impactoesgoto'] = this.impactoEsgoto;
        this.direcionamento['maturidade'] = this.maturidade;
        this.direcionamento['modelomercado'] = this.modeloMercado;
        this.direcionamento['diferencialcompetitivo'] = this.diferencialCompetitivo;
        this.direcionamento['modeloconcessao'] = this.modeloConcessao;
        this.direcionamento['sinergia'] = this.sinergia;
        this.direcionamento['maturidaderegiao'] = this.maturidadeRegiao;
        //Carregando beneficios
        this.beneficios['impactogestao'] = this.impactoGestao;
        this.beneficios['impactomotivacao'] = this.impactoMotivacao;
        this.beneficios['impactoseguranca'] = this.impactoSeguranca;
        this.beneficios['impactosustentabilidade'] = this.impactoSustentabilidade;
        this.beneficios['outramelhoria'] = this.outraMelhoria;
        //Carregando licenca
        this.licenca['impactosocial'] = this.impactoSocial;
        this.licenca['relacionamentopolitico'] = this.relacionamentoPolitico;
        this.licenca['relacionamentosociedade'] = this.relacionamentoSociedade;
        this.licenca['impactoimagem'] = this.impactoImagem;
        this.licenca['probabilidadeimpactoimagem'] = this.probabilidadeImpactoImagem;
        this.licenca['impactoreputacional'] = this.impactoReputacional;
        //Carregando risco contratual
        this.riscoscontratual['clausulacontratual'] = this.clausulaContratual;
        this.riscoscontratual['tipometa'] = this.tipoMeta;
        this.riscoscontratual['penalidade12meses'] = this.penalidade12meses;
        this.riscoscontratual['penalidadeaplicavel'] = this.penalidadeAplicavel;
        this.riscoscontratual['probabilidadepenalidade'] = this.probabilidadePenalidade;
        this.riscoscontratual['postergacao'] = this.postergacao;
        this.riscoscontratual['impactopolitico'] = this.impactoPolitico;
        //Carregando riscosoperacionais
        this.riscosoperacionais['impactointerrupcao'] = this.impactoInterrupcao;
        this.riscosoperacionais['probabilidadeimpactointerrupcao'] = this.probabilidadeImpactoInterrupcao;
        this.riscosoperacionais['custointerrupcao'] = this.custoInterrupcao;
        this.riscosoperacionais['complexidadeexecucao'] = this.complexidadeExecucao;
        this.riscosoperacionais['impactosubstituicao'] = this.impactoSubstituacao;
        this.riscosoperacionais['probabilidadeimpactosubstituicao'] = this.probabilidadeImpactoSubstituacao;
        this.riscosoperacionais['impactoambiental'] = this.impactoAmbiental;
        this.riscosoperacionais['probabilidadeimpactoambiental'] = this.probabilidadeImpactoAmbiental;
        this.riscosoperacionais['impactointegridade'] = this.impactoIntegridade;
        this.riscosoperacionais['probabilidadeimpactointegridade'] = this.probabilidadeImpactoiIntegridade;
        this.riscosoperacionais['riscoatraso'] = this.riscoAtraso;
        this.riscosoperacionais['possuilicenca'] = this.possuiLicenca;
        this.riscosoperacionais['emissaolicenca'] = this.emissaoLicenca;
        this.riscosoperacionais['validadelicenca'] = this.validadeLicenca;
        this.riscosoperacionais['condicionantelicenca'] = this.condicionanteLicenca;
        this.riscosoperacionais['prazolicenca'] = this.prazoLicenca;
        //Atualizando Arrays para envio
        this.sesuite['direcionamento'] = this.direcionamento;
        this.sesuite['beneficios'] = this.beneficios;
        this.sesuite['licenca'] = this.licenca;
        this.sesuite['riscoscontratual'] = this.riscoscontratual;
        this.sesuite['riscosoperacionais'] = this.riscosoperacionais;
        this.projeto['sesuite'] = this.sesuite;
        console.log(this.projeto);
        this.projetosService.projetosAtt(this.projeto, this.idProjeto)
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
    teste() {
        console.log(this.delineado);
        console.log(typeof this.delineado);
    }
    onRowEditCancel(index) {
        //car: Engenharia,
        //this.cars[index] = this.clonedCars[car.nomeEmpresa];
        //delete this.clonedCars[car.nomeEmpresa];
    }
    onTabOpen($event) {
        if ($event.index === 4) {
            //his.selected = !this.selected;
        }
    }
    onTabClose($event) {
        if ($event.index === 4) {
            //this.selected = !this.selected;
        }
    }
};
SesuiteprojectComponent = tslib_1.__decorate([
    Component({
        selector: 'app-sesuiteproject',
        templateUrl: './sesuiteproject.component.html'
    }),
    tslib_1.__metadata("design:paramtypes", [MessageService, ProjetosService])
], SesuiteprojectComponent);
export { SesuiteprojectComponent };
//# sourceMappingURL=sesuiteproject.component.js.map