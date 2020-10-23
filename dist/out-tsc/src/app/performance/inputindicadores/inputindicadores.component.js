import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { MessageService } from 'primeng/api';
import { EventEmitterService } from '../../demo/service/EventEmitterService';
import { PerformanceService } from './../performance.service';
import { AuthService } from '../../login/auth.service';
let InputindicadoresComponent = class InputindicadoresComponent {
    constructor(messageService, performanceService, authService) {
        this.messageService = messageService;
        this.performanceService = performanceService;
        this.authService = authService;
        this.hoje = new Date();
        this.ontem = new Date(this.hoje.getFullYear(), this.hoje.getMonth(), this.hoje.getDate() - 1);
        this.referencia = new Date(this.hoje.getFullYear(), this.hoje.getMonth(), 1);
        this.refer = this.referencia.toISOString().substr(0, 10);
        this.setor = 'app works!';
        this.classtemp = new Array();
        this.resumo = new Array();
        this.barraAtiva = false;
        this.ind = [];
        this.mostrarMenu = false;
        this.classificacoes = new Array();
        this.dadosIndicador = [];
        this.indicador1 = [];
        this.comparar = [];
        this.idgerencias = [];
        this.setores = [];
        this.testeIni = true;
        EventEmitterService.get('textChange').subscribe(data => {
            this.indicador1 = [],
                this.comparar = [],
                this.idgerencias = [],
                this.resumo = [],
                this.classificacoes = [],
                this.idgerenciasretornado = 0,
                this.classtemp = [],
                this.setor = data,
                this.codSetor(data);
            //this.indicador(this.idgerenciasretornado),
            //console.log(this.idgerenciasretornado)
        });
    }
    onChangeTime(event) {
        this.refer = this.referencia.toISOString().substr(0, 10);
    }
    ngOnInit() {
        this.date = this.ontem;
        this.cols = [
            { field: 'vin', header: 'Indicador' },
            { field: 'year', header: 'Realizado' },
            { field: 'orcado', header: 'Orçado' },
            { field: 'color', header: 'Forecast' }
        ];
        this.pt = {
            firstDayOfWeek: 1,
            dayNames: ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"],
            dayNamesShort: ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"],
            dayNamesMin: ["D", "S", "T", "Q", "Q", "S", "S"],
            monthNames: ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"],
            monthNamesShort: ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"],
            today: 'Hoje',
            clear: 'Limpar'
        };
        this.dadosIndicador = [
            { label: 'Orçado', valor: this.orcado },
            { label: 'Realizado', valor: this.realizado },
            { label: 'Pecld', valor: this.pecld },
            { label: 'Forecast', valor: this.forecast },
            { label: 'Forecast2', valor: this.forecast2 },
            { label: 'Forecast3', valor: this.forecast3 },
            { label: 'Mínimo', valor: this.minimo },
            { label: 'Máximo', valor: this.maximo },
            { label: 'Meta', valor: this.meta },
            { label: 'Previsão', valor: this.previsao },
            { label: 'DP', valor: this.dentroprazo },
            { label: 'VlRet', valor: this.vlrretido },
            { label: 'FP', valor: this.foraprazo },
            { label: 'DP Reguladas', valor: this.dentroprazoreg },
            { label: 'FP Reguladas', valor: this.foraprazoreg },
            { label: 'Atendente', valor: this.atendente },
            { label: 'Atendimento', valor: this.atendimento },
        ];
        //  console.log(this.dadosIndicador)
    }
    // aqui  tem um bug na hora de 
    onTabOpen($event) {
        this.desativaBarra();
        var texto = '';
        texto = this.classificacoes[$event.index];
        // console.log(texto) 
        //console.log(this.setor)
        this.indicador(texto);
    }
    onTabClose($event) {
        this.desativaBarra();
    }
    codSetor(dado) {
        this.performanceService.gerencias().subscribe(response => {
            var ger = response.splice(2, Number.MAX_VALUE);
            //console.log("PROCURAR GERENCIAS")
            for (var i = 0; i < ger.length; i++) {
                this.comparar.push(ger[i]['icon'] + ger[i]['label']);
                this.idgerencias.push(ger[i]['gerenciaId']);
                this.setores.push(ger[i]['label']);
            }
            this.gerencia2 = dado;
            //console.log("PROCURAR INDICADOR")
            for (var i = 0; i < this.comparar.length; i++) {
                if (this.comparar[i].includes(this.gerencia2)) {
                    this.idgerenciasretornado = this.idgerencias[i];
                    this.setor = this.setores[i];
                    //requisição pra definir a classificação dos indicadores
                    this.performanceService.classindicadores(this.idgerenciasretornado)
                        .subscribe(response => {
                        response.forEach(element => {
                            this.classtemp.push(element['classificacao']);
                        });
                        this.classificacoes = this.classtemp.filter((este, i) => this.classtemp.indexOf(este) === i);
                    });
                }
            }
        });
    }
    indicador(header) {
        //console.log(header)
        this.classificacoes.forEach(classe => {
            if (classe === header) {
                this.performanceService.classindicadores(this.idgerenciasretornado)
                    .subscribe(response => {
                    response.forEach(res => {
                        if (classe === res['classificacao']) {
                            //console.log(res)
                            this.resumo = [];
                            this.performanceService.indicadoresResumo(this.refer, res['indicadorId'])
                                .subscribe(Indicadores => {
                                this.realacum = parseFloat(Indicadores[0][3]).toLocaleString(), //'pt-BR', { style: 'currency', currency: 'BRL' }),
                                    this.orcadoacum = parseFloat(Indicadores[0][2]).toLocaleString(),
                                    this.previsao = parseFloat(Indicadores[0][4]).toLocaleString(),
                                    this.resumo.push({
                                        'vin': res['indicador'],
                                        'year': this.realacum,
                                        'orcado': this.orcadoacum,
                                        'color': this.previsao,
                                        'id': res['indicadorId'],
                                        'classe': ['classificacao']
                                    });
                            });
                        }
                    });
                });
            }
        });
    }
    selectIndicador(indicador) {
        console.log(indicador);
        if (this.barraAtiva) {
            alert('Feche o Gráfico para passar para o próximo indicador!!!');
        }
        else {
            // bug no primeiro clique dá undefined por tempo de execução
            this.performanceService.classindicadores(this.idgerenciasretornado)
                .subscribe(Indicadores => {
                this.indicatore = Indicadores.filter(item => item.indicadorId === parseInt(indicador.id));
                //console.log(this.ind)
                this.indicatore.forEach(res => {
                    if (this.indicatore[0]) {
                        this.ind = res;
                        // console.log(res)
                        this.classs = res.classificacao;
                    }
                });
                console.log(this.ind);
                this.selectedIndicador = indicador;
                this.indi = indicador.vin;
                this.nind = indicador.id;
                this.barraAtiva = true;
            });
            this.messageService.add({ severity: 'info', summary: 'Indicador Selecionado', detail: 'Indicador: ' + indicador.vin });
        }
    }
    desativaBarra() {
        this.barraAtiva = false;
    }
    pesquisarIndicador(data) {
        this.orcado = 0;
        this.realizado = 0;
        this.pecld = 0;
        this.forecast = 0;
        this.forecast2 = 0;
        this.forecast3 = 0;
        this.minimo = 0;
        this.maximo = 0;
        this.meta = 0;
        this.dentroprazo = 0;
        this.vlrretido = 0;
        this.foraprazo = 0;
        this.dentroprazoreg = 0;
        this.foraprazoreg = 0;
        this.atendente = 0;
        this.atendimento = 0;
        this.comentario = "";
        this.acao = "";
        this.analise = "";
        this.colaborador = "";
        this.indicadorId = 0;
        this.undcodigo = 0;
        this.performanceService.indicadoresByDay(this.nind, data.toISOString().substr(0, 10))
            .subscribe(indicadores => {
            this.indica = indicadores;
            this.exeindicadorId = indicadores['exeindicadorId'],
                this.datareferencia = indicadores['datareferencia'],
                this.dataindicador = indicadores['dataindicador'],
                this.ciclo = indicadores['ciclo'],
                this.periodicidade = indicadores['periodicidade'];
            if (this.classs === 'ATENDIMENTO') {
                this.orcado = indicadores['orcado'] === null ? indicadores['orcado'] : this.segHora(indicadores['orcado']),
                    this.realizado = indicadores['realizado'] === null ? indicadores['realizado'] : this.segHora(indicadores['realizado']);
            }
            else {
                this.orcado = indicadores['orcado'] === null ? indicadores['orcado'] : indicadores['orcado'].toLocaleString(),
                    this.realizado = indicadores['realizado'] === null ? indicadores['realizado'] : indicadores['realizado'].toLocaleString();
            }
            //this.realizadokg = indicadores['realizadokg'].toLocaleString(),
            this.pecld = indicadores['pecld'] === null ? indicadores['pecld'] : indicadores['pecld'].toLocaleString(),
                this.forecast = indicadores['forecast'] === null ? indicadores['forecast'] : indicadores['forecast'].toLocaleString(),
                this.forecast2 = indicadores['forecast2'] === null ? indicadores['forecast2'] : indicadores['forecast2'].toLocaleString(),
                this.forecast3 = indicadores['forecast3'] === null ? indicadores['forecast3'] : indicadores['forecast3'].toLocaleString(),
                this.minimo = indicadores['minimo'] === null ? indicadores['minimo'] : indicadores['minimo'].toLocaleString(),
                this.maximo = indicadores['maximo'] === null ? indicadores['maximo'] : indicadores['maximo'].toLocaleString(),
                this.meta = indicadores['meta'] === null ? indicadores['meta'] : indicadores['meta'].toLocaleString(),
                this.dentroprazo = indicadores['dentroprazo'] === null ? indicadores['dentroprazo'] : indicadores['dentroprazo'].toLocaleString(),
                this.vlrretido = indicadores['valorretido'] === null ? indicadores['valorretido'] : indicadores['valorretido'].toLocaleString(),
                this.foraprazo = indicadores['foraprazo'] === null ? indicadores['foraprazo'] : indicadores['foraprazo'].toLocaleString(),
                this.dentroprazoreg = indicadores['dentroprazoreg'] === null ? indicadores['dentroprazoreg'] : indicadores['dentroprazoreg'].toLocaleString(),
                this.foraprazoreg = indicadores['foraprazoreg'] === null ? indicadores['foraprazoreg'] : indicadores['foraprazoreg'].toLocaleString(),
                this.previsao = indicadores['previsao'] === null ? indicadores['previsao'] : indicadores['previsao'].toLocaleString(),
                this.atendente = indicadores['atendente'],
                this.atendimento = indicadores['atendimento'],
                this.comentario = indicadores['comentario'],
                this.acao = indicadores['acao'],
                this.analise = indicadores['analise'],
                this.colaborador = indicadores['colaborador'],
                this.indicadorId = indicadores['indicadorId'].indicadorId,
                this.undcodigo = indicadores['undcodigo'].unidadeId;
            //console.log("requisicao bem sucedida!", indicadores)
        }, error => {
            //console.log("Erro: ", error);
            this.messageService.add({ severity: 'error', summary: "Falha na Consulta!", detail: error.message, life: 5000 });
        });
    }
    // recebe formato hora e converte em segundos
    horaSeg(hora) {
        this.hora = parseInt(hora.substring(0, 3)) * 3600;
        this.minuto = parseInt(hora.substring(3, 6)) * 60;
        this.segundo = parseInt(hora.substring(6, 9));
        this.convertido = this.hora.valueOf() + this.minuto.valueOf() + this.segundo.valueOf();
        return this.convertido;
    }
    // recebe segundos e converte formato hora
    segHora(seg) {
        this.segundo = parseInt(seg) % 60;
        this.segundo = parseInt(this.segundo.toString());
        this.minutos = parseInt(seg) / 60;
        this.minuto = this.minutos % 60;
        this.minuto = parseInt(this.minuto.toString());
        this.hora = this.minutos / 60;
        this.hora = parseInt(this.hora.toString());
        var reserv = new Date(0, 0, 0, this.hora, this.minuto, this.segundo);
        this.hms = reserv.toTimeString().substring(0, 8);
        //console.log("Aqui agora: ", this.hms); // deve mostrar "01:16:07"
        return this.hms;
    }
    abreInput() {
        this.pesquisarIndicador(this.ontem);
    }
    atualizaDados() {
        //console.log(this.classs)
        if (this.classs === 'ATENDIMENTO') {
            //console.log('Está aqui')
            this.orcado = this.horaSeg(this.orcado.toString());
            this.realizado = this.horaSeg(this.realizado.toString());
        }
        else {
            // console.log('Não,está aqui')
            this.orcado = this.orcado.replace(/([\u0300-\u036f]|[^0-9,])/g, '').replace(/\D/g, '.');
            this.realizado = this.realizado.replace(/([\u0300-\u036f]|[^0-9,])/g, '').replace(/\D/g, '.');
        }
        //this.realizadokg = this.recebeDados(this.realizadokg)
        this.pecld = this.pecld.replace(/([\u0300-\u036f]|[^0-9,])/g, '').replace(/\D/g, '.');
        this.forecast = this.forecast.replace(/([\u0300-\u036f]|[^0-9,])/g, '').replace(/\D/g, '.');
        this.forecast2 = this.forecast2.replace(/([\u0300-\u036f]|[^0-9,])/g, '').replace(/\D/g, '.');
        this.forecast3 = this.forecast3.replace(/([\u0300-\u036f]|[^0-9,])/g, '').replace(/\D/g, '.');
        this.minimo = this.minimo.replace(/([\u0300-\u036f]|[^0-9,])/g, '').replace(/\D/g, '.');
        this.maximo = this.maximo.replace(/([\u0300-\u036f]|[^0-9,])/g, '').replace(/\D/g, '.');
        this.meta = this.meta.replace(/([\u0300-\u036f]|[^0-9,])/g, '').replace(/\D/g, '.');
        this.dentroprazo = this.dentroprazo.replace(/([\u0300-\u036f]|[^0-9,])/g, '').replace(/\D/g, '.');
        this.vlrretido = this.vlrretido.replace(/([\u0300-\u036f]|[^0-9,])/g, '').replace(/\D/g, '.');
        this.foraprazo = this.foraprazo.replace(/([\u0300-\u036f]|[^0-9,])/g, '').replace(/\D/g, '.');
        this.previsao = this.previsao.replace(/([\u0300-\u036f]|[^0-9,])/g, '').replace(/\D/g, '.');
        this.dentroprazoreg = this.dentroprazoreg.replace(/([\u0300-\u036f]|[^0-9,])/g, '').replace(/\D/g, '.');
        this.foraprazoreg = this.foraprazoreg.replace(/([\u0300-\u036f]|[^0-9,])/g, '').replace(/\D/g, '.');
        this.performanceService.indicadoresAtt(this.exeindicadorId, this.datareferencia, this.dataindicador, this.ciclo, this.orcado, this.realizado, this.pecld, this.atendente, this.atendimento, this.comentario, this.forecast, this.minimo, this.maximo, this.meta, this.previsao, this.dentroprazo, this.foraprazo, this.dentroprazoreg, this.foraprazoreg, this.acao, this.analise, sessionStorage.getItem('nome'), this.indicadorId, this.undcodigo, this.vlrretido, this.forecast2, this.forecast3)
            .subscribe(response => {
            if (response === null) {
                //console.log("OK!!!!!!"),
                this.messageService.add({ severity: 'success', summary: 'Sucesso!', detail: 'Dados enviados corretamente!!!', life: 5000 });
            }
        }, error => {
            this.messageService.add({ severity: 'error', summary: "Dados não Enviados!", detail: error.message, life: 5000 });
            //console.log(error)
        });
        console.log(this.performanceService);
        this.desativaBarra();
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], InputindicadoresComponent.prototype, "indicad", void 0);
InputindicadoresComponent = tslib_1.__decorate([
    Component({
        selector: 'app-inputindicadores',
        templateUrl: './inputindicadores.component.html',
    }),
    tslib_1.__metadata("design:paramtypes", [MessageService, PerformanceService, AuthService])
], InputindicadoresComponent);
export { InputindicadoresComponent };
//# sourceMappingURL=inputindicadores.component.js.map