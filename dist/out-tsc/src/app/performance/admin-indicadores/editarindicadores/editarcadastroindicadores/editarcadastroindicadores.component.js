import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { AdminIndicadoresService } from '../../admin-indicadores.service';
import { MessageService } from 'primeng/api';
import { PerformanceService } from '../../../performance.service';
let EditarcadastroindicadoresComponent = class EditarcadastroindicadoresComponent {
    constructor(adminindic, messageService, performanceService) {
        this.adminindic = adminindic;
        this.messageService = messageService;
        this.performanceService = performanceService;
        this.listaIndicadores = [];
        this.gridDeLista = false;
        //=========================================================================================================================================
        //=========================================================================================================================================
        //COMEÇA O PDIALOG
        this.editarCadastro = false;
        //DROPDOWNS
        this.classificacoesLista = [];
        this.tendenciaLista = [];
        this.tiporotuloLista = [];
        this.editargraficoseixos = [];
        this.editartiposgraficos = [];
        this.editarposicoes = [];
        this.editarestilos = [];
        this.editarcores = [];
        //-------------.................---------------------....................---------------------...................
        this.filtroGraficoData = new Date();
        this.visualizarGrafico = false;
        //===============================================================================================
        //ALTERAR ORDEM
        this.alteraOrdemCampos = false;
        //===============================================================================================
        //INSERIR E DELETAR CAMPOS DO GRAFICO
        this.inserirUmCampo = false;
        this.deletarUmCampo = false;
    }
    ngOnInit() {
        this.listaEdicaodeGraficoEixos = [
            { label: "orcado", value: "orcado" },
            { label: "realizado", value: "realizado" },
            { label: "orcadoAcumulado", value: "orcadoAcumulado" },
            { label: "realizadoAcumulado", value: "realizadoAcumulado" },
            { label: "orcadoMedia", value: "orcadoMedia" },
            { label: "realizadoMedia", value: "realizadoMedia" },
            { label: "Valor Retido", value: "valorretido" },
            { label: "Meta", value: "Meta" },
            { label: "Minimo", value: "Minimo" },
            { label: "Maximo", value: "Maximo" },
            { label: "Forecast", value: "forecast" },
            { label: "Forecast 2", value: "forecast2" },
            { label: "Forecast 3", value: "forecast3" },
            { label: "MetaAcumulada", value: "MetaAcumulada" },
            { label: "DentrodoPrazoReg", value: "DentrodoPrazoReg" },
            { label: "DentrodoPrazoNreg", value: "DentrodoPrazoNreg" }
        ];
        this.listaEdicaodeGraficoTipos = [
            { label: "bar", value: "bar" },
            { label: "line", value: "line" }
        ];
        this.listaEdicaodeGraficoPosicoes = [
            { label: "left", value: "left" },
            { label: "right", value: "right" }
        ];
        this.listaEdicaodeGraficoCores = [
            { label: '#273eac', value: '273eac' },
            { label: '#253f93', value: '253f93' },
            { label: '#007859', value: '007859' },
            { label: '#00aaad', value: '00aaad' },
            { label: '#00928d', value: '00928d' },
            { label: '#1d71b9', value: '1d71b9' },
            { label: '#6c8cc7', value: '6c8cc7' },
            { label: '#ba2025', value: 'ba2025' },
            { label: '#dc7528', value: 'dc7528' },
            { label: '#ffc20e', value: 'ffc20e' },
            { label: '#88d1d1', value: '88d1d1' }
        ];
        this.listaDeCamposParaRotulos = [
            { label: "Último Orçado", value: "ultimoorcado" },
            { label: "Orçado Acumulado", value: "orcadoacumulado" },
            { label: "Orçado Média", value: "orcadomedia" },
            { label: "Último Realizado", value: "ultimorealizado" },
            { label: "Realizado Acumulado", value: "realizadoacumulado" },
            { label: "Realizado Média", value: "realizadomedia" },
            { label: "Meta Média", value: "meta" },
            { label: "Meta Acumulada", value: "metaacumulada" },
            { label: "Mínimo Média", value: "minimo" },
            { label: "Máximo Média", value: "maximo" },
            { label: "Regulados DP", value: "reguladodp" },
            { label: "Não Regulados DP", value: "naoreguladodp" },
            { label: "Diferença = Campo2-Campo1", value: "diferenca" },
            { label: "Variação = 1-(Campo2/Campo1)", value: "variacao" },
        ];
        this.listaDeCamposParaRotulosMensal = [
            { label: "Orçado Mensal", value: "orcadomensal" },
            { label: "Último Orçado", value: "ultimoorcado" },
            { label: "Orçado Acumulado", value: "orcadoacumulado" },
            { label: "Orçado Média", value: "orcadomedia" },
            { label: "Mínimo Média", value: "minimo" },
            { label: "Máximo Média", value: "maximo" },
        ];
        this.classificacoesLista =
            [
                { label: "Atendimento", value: "ATENDIMENTO" },
                { label: "Serviços Comerciais", value: "SERVCOMERCIAL" },
                { label: "Comparativo", value: "CORPORATIVO" },
                { label: "Energia", value: "ENERGIA" },
                { label: "Faturamento", value: "FATURAMENTO" },
                { label: "Volumes", value: "VOLUMES" },
                { label: "Produtos Químicos", value: "PRODUTOSQUÍMICOS" },
                { label: "Comerciais", value: "FATURAMENTO" },
                { label: "Indicador Operacional", value: "INDICADOROPERACIONAL" },
                { label: "Cobrança", value: "COBRANCA" },
                { label: "Assertividade", value: "ASSERTIVIDADE" },
                { label: "Produtivade", value: "PRODUTIVIDADE" },
                { label: "Prazos", value: "PRAZOS" }
            ];
        this.tiporotuloLista = [
            { label: "Com Virgula", value: 1 },
            { label: "Sem Virgula", value: 2 },
            { label: "Horas", value: 3 },
            { label: "Porcentagem", value: 4 },
        ];
        this.tendenciaLista =
            [
                { label: "Melhor Positivo", value: "MELHORPOSITIVO" },
                { label: "Melhor Negativo", value: "MELHORNEGATIVO" },
                { label: "Melhor Entre Faixas", value: "MELHORENTREFAIXAS" }
            ];
        this.adminindic.gerencias().subscribe(gerencias => {
            this.FiltroListaGerencia = gerencias;
        });
    }
    //=========================================================================================================================================
    //=========================================================================================================================================
    //SOBRE A CONSULTA E REORDENAÇÃO 
    consultar() {
        this.listaIndicadores = [];
        this.adminindic.listaIndicadoresgerenc(this.FiltroGerenciaSelecionada.gerenciaId).subscribe(indicador => {
            if (indicador.length > 0) {
                this.listaIndicadores = indicador;
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Carregado com Sucesso' });
            }
            else {
                this.messageService.add({ severity: 'info', summary: 'Informação', detail: 'Sem indicadores para essa gerência.' });
            }
        });
    }
    ajustarOrdem() {
        console.log(this.listaIndicadores);
        for (var i = 0; i < this.listaIndicadores.length; i++) {
            //CODIGO DE UPDATE COMEÇA AQUI
            var objetoDaVez = this.listaIndicadores[i];
            objetoDaVez['ordem'] = i + 1;
            this.adminindic.cadastroIndicadoresAtt(objetoDaVez).subscribe(indicador => {
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Indicador ' + objetoDaVez.indicador + ' atualizado' });
            }, erro => {
                this.messageService.add({ severity: 'danger', summary: 'Erro', detail: 'Erro' });
            });
        }
    }
    fechalista() {
        this.listaIndicadores = [];
        this.gridDeLista = false;
    }
    aoFecharODialog() {
        this.visualizarGrafico = false;
        this.atualizarDadosdoArray();
        this.fecharvisualizacao();
        this.data = [];
        this.options = [];
        this.NovoCampo = [];
        this.editarCadastro = false;
        this.visualizarGrafico = false;
        this.consultar();
    }
    abrirDialog(indic) {
        this.indicadorSelecionado = indic;
        this.editarCadastro = true;
        for (var i = 0; i < this.tiporotuloLista.length; i++) {
            if (this.tiporotuloLista[i].value === this.indicadorSelecionado.rotuloVirgula) {
                this.editarIndicadorTipoRotulo = this.tiporotuloLista[i];
                break;
            }
        }
        for (var i = 0; i < this.classificacoesLista.length; i++) {
            if (this.classificacoesLista[i].value === this.indicadorSelecionado.classificacao) {
                this.editarIndicadorClassificacao = this.classificacoesLista[i];
                break;
            }
        }
        for (var i = 0; i < this.tendenciaLista.length; i++) {
            if (this.tendenciaLista[i].value === this.indicadorSelecionado.tendencia) {
                this.editarIndicadorTendencia = this.tendenciaLista[i];
                break;
            }
        }
        for (var i = 0; i < this.FiltroListaGerencia.length; i++) {
            if (this.FiltroListaGerencia[i].gerenciaId === this.indicadorSelecionado.gerencia) {
                this.editarIndicadorGerencia = this.FiltroListaGerencia[i];
                break;
            }
        }
        for (var i = 0; i < this.listaDeCamposParaRotulos.length; i++) {
            if (this.listaDeCamposParaRotulos[i].value === this.indicadorSelecionado.campo1) {
                this.editarIndicadorCampo1 = this.listaDeCamposParaRotulos[i];
                break;
            }
        }
        for (var i = 0; i < this.listaDeCamposParaRotulos.length; i++) {
            if (this.listaDeCamposParaRotulos[i].value === this.indicadorSelecionado.campo2) {
                this.editarIndicadorCampo2 = this.listaDeCamposParaRotulos[i];
                break;
            }
        }
        for (var i = 0; i < this.listaDeCamposParaRotulos.length; i++) {
            if (this.listaDeCamposParaRotulos[i].value === this.indicadorSelecionado.campo3) {
                this.editarIndicadorCampo3 = this.listaDeCamposParaRotulos[i];
                break;
            }
        }
        for (var i = 0; i < this.listaDeCamposParaRotulos.length; i++) {
            if (this.listaDeCamposParaRotulos[i].value === this.indicadorSelecionado.campo4) {
                this.editarIndicadorCampo4 = this.listaDeCamposParaRotulos[i];
                break;
            }
        }
        for (var i = 0; i < this.listaDeCamposParaRotulosMensal.length; i++) {
            if (this.listaDeCamposParaRotulosMensal[i].value === this.indicadorSelecionado.campoMensal) {
                this.editarIndicadorCampoMensal = this.listaDeCamposParaRotulosMensal[i];
                break;
            }
        }
        this.reloadArrays();
    }
    atualizarDadosdoArray() {
        this.indicadorSelecionado['classificacao'] = this.editarIndicadorClassificacao['value'];
        this.indicadorSelecionado['tendencia'] = this.editarIndicadorTendencia['value'];
        this.indicadorSelecionado['rotuloVirgula'] = this.editarIndicadorTipoRotulo['value'];
        this.indicadorSelecionado['campo1'] = this.editarIndicadorCampo1['value'];
        this.indicadorSelecionado['campo2'] = this.editarIndicadorCampo2['value'];
        this.indicadorSelecionado['campo3'] = this.editarIndicadorCampo3['value'];
        this.indicadorSelecionado['campo4'] = this.editarIndicadorCampo4['value'];
        this.indicadorSelecionado['campoMensal'] = this.editarIndicadorCampoMensal['value'];
        this.indicadorSelecionado['gerencia'] = this.editarIndicadorGerencia['gerenciaId'];
        console.log(this.indicadorSelecionado);
        console.log(this.editargraficoseixos);
        for (var i = 0; i < this.editarposicoes.length; i++) {
            this.indicadorSelecionado.campoDoGraficoId[i]['tipografico'] = this.editartiposgraficos[i]['value'];
            this.indicadorSelecionado.campoDoGraficoId[i]['eixo'] = this.editargraficoseixos[i]['value'];
            this.indicadorSelecionado.campoDoGraficoId[i]['posicao'] = this.editarposicoes[i]['value'];
            this.indicadorSelecionado.campoDoGraficoId[i]['estilo'] = this.editarestilos[i] === true ? "Pontilhado" : null;
        }
    }
    reloadArrays() {
        this.editargraficoseixos = [];
        this.editartiposgraficos = [];
        this.editarposicoes = [];
        this.editarestilos = [];
        this.editarcores = [];
        this.adminindic.UnicoIndicadores(this.indicadorSelecionado.indicadorId).subscribe(indicador => {
            this.indicadorSelecionado.campoDoGraficoId = indicador['campoDoGraficoId'];
            for (var i = 0; i < this.indicadorSelecionado.campoDoGraficoId.length; i++) {
                for (var j = 0; j < this.listaEdicaodeGraficoEixos.length; j++) {
                    console.log(this.indicadorSelecionado.campoDoGraficoId[i].eixo);
                    if (this.listaEdicaodeGraficoEixos[j].value === this.indicadorSelecionado.campoDoGraficoId[i].eixo) {
                        this.editargraficoseixos.push(this.listaEdicaodeGraficoEixos[j]);
                        break;
                    }
                }
                for (var j = 0; j < this.listaEdicaodeGraficoTipos.length; j++) {
                    if (this.listaEdicaodeGraficoTipos[j].value === this.indicadorSelecionado.campoDoGraficoId[i].tipografico) {
                        this.editartiposgraficos.push(this.listaEdicaodeGraficoTipos[j]);
                        break;
                    }
                }
                for (var j = 0; j < this.listaEdicaodeGraficoPosicoes.length; j++) {
                    if (this.listaEdicaodeGraficoPosicoes[j].value === this.indicadorSelecionado.campoDoGraficoId[i].posicao) {
                        this.editarposicoes.push(this.listaEdicaodeGraficoPosicoes[j]);
                        break;
                    }
                }
                for (var j = 0; j < this.listaEdicaodeGraficoCores.length; j++) {
                    if (this.listaEdicaodeGraficoCores[j].label === this.indicadorSelecionado.campoDoGraficoId[i].coreixo) {
                        this.editarcores.push(this.listaEdicaodeGraficoCores[j].value);
                        break;
                    }
                }
                if (this.indicadorSelecionado.campoDoGraficoId[i].estilo === "Pontilhado") {
                    this.editarestilos.push(true);
                }
                else {
                    this.editarestilos.push(false);
                }
            }
        });
    }
    atualizarvisualizacao() {
        this.visualizarGrafico = false;
        this.atualizarDadosdoArray();
        this.data = [];
        this.options = [];
        this.IniciaGrafico();
        this.visualizarGrafico = true;
    }
    atualizarCores(i, valor) {
        this.data = [];
        this.options = [];
        this.editarcores[i] = valor;
        this.indicadorSelecionado.campoDoGraficoId[i]['coreixo'] = "#" + valor;
        this.IniciaGrafico();
    }
    carregarGrafico() {
        this.data = [];
        this.options = [];
        this.atualizarDadosdoArray();
        this.filtroGraficoData.setDate(1);
        this.filtroGraficoDataConvertida = this.FormatarData(this.filtroGraficoData);
        this.IniciaGrafico();
        this.reloadArrays();
        this.visualizarGrafico = true;
    }
    fecharvisualizacao() {
        this.visualizarGrafico = false;
    }
    FormatarData(datareceb) {
        var dataFinal;
        if (datareceb.length < 20) {
            dataFinal = datareceb;
        }
        else {
            var data = datareceb, dia2 = data.getDate().toString().padStart(2, '0'), mes2 = (data.getMonth() + 1).toString().padStart(2, '0'), //+1 pois no getMonth Janeiro começa com zero.
            ano2 = data.getFullYear();
            dataFinal = ano2 + "-" + mes2 + "-" + dia2;
        }
        return dataFinal;
    }
    SalvarTudo(indicadorSelec) {
        console.log(indicadorSelec);
        this.atualizarDadosdoArray();
        for (var i = 0; i < indicadorSelec.campoDoGraficoId.length; i++) {
            var id = indicadorSelec.campoDoGraficoId[i].campoDoGraficoId;
            this.NovoCampo = indicadorSelec.campoDoGraficoId[i];
            this.NovoCampo.ordem = i;
            this.NovoCampo.indicadorId = {
                indicadorId: indicadorSelec.indicadorId
            };
            console.log(this.NovoCampo);
            this.SalvarCampoDoGrafico(id, this.NovoCampo);
            this.NovoCampo = [];
        }
        indicadorSelec.ativo = indicadorSelec.ativo === false ? 0 : 1;
        this.adminindic.cadastroIndicadoresAtt(indicadorSelec).subscribe(indicador => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Indicador ' + indicadorSelec.indicador + ' atualizado' });
        });
        this.aoFecharODialog();
    }
    AlteraOrdemDosCampos() {
        this.alteraOrdemCampos = true;
        this.gridDeLista = true;
    }
    ajustarOrdemDosCampos() {
        for (var i = 0; i < this.indicadorSelecionado.campoDoGraficoId.length; i++) {
            var id = this.indicadorSelecionado.campoDoGraficoId[i].campoDoGraficoId;
            this.NovoCampo = this.indicadorSelecionado.campoDoGraficoId[i];
            this.NovoCampo.ordem = i;
            this.NovoCampo.indicadorId = {
                indicadorId: this.indicadorSelecionado.indicadorId
            };
            this.SalvarCampoDoGrafico(id, this.NovoCampo);
            this.NovoCampo = [];
        }
    }
    fecharLista() {
        this.editargraficoseixos = [];
        this.editartiposgraficos = [];
        this.editarposicoes = [];
        this.editarestilos = [];
        this.editarcores = [];
        this.listaIndicadores = [];
        this.gridDeLista = false;
        this.FiltroGerenciaSelecionada = null;
    }
    selectcor(cor) {
        this.NovoCampoCor = cor;
    }
    inserirnovoCampo() {
        this.NovoCampoTipo = { label: "bar", value: "bar" };
        this.inserirUmCampo = true;
    }
    inserirnovoCampoOk() {
        this.NovoCampo = {
            estilo: this.NovoCampoEstilo === true ? "Pontilhado" : null,
            label: this.NovoCampoLabel,
            tipografico: this.NovoCampoTipo['value'],
            coreixo: "#" + this.NovoCampoCor == undefined ? "#273eac" : "#" + this.NovoCampoCor,
            eixo: this.NovoCampoEixo['value'],
            posicao: this.NovoCampoPosicao['value'],
            ordem: 100,
            campoDoGraficoId: null,
            indicadorId: {
                indicadorId: this.indicadorSelecionado.indicadorId
            }
        };
        this.SalvarCampoDoGrafico(0, this.NovoCampo);
        this.inserirUmCampo = false;
        this.NovoCampo = [];
        this.NovoCampoLabel = null;
        this.NovoCampoEixo = null;
        this.NovoCampoTipo = null;
        this.NovoCampoEstilo = null;
        this.NovoCampoPosicao = null;
        this.NovoCampoCor = null;
        this.reloadArrays();
        this.atualizarvisualizacao();
    }
    SalvarCampoDoGrafico(id, campo) {
        this.adminindic.atualizarCampos(campo, id).subscribe(indicador => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Rotulo ' + campo.label + ' atualizado' });
        });
    }
    deletarCampo(id) {
        this.adminindic.deletarCampos(id).subscribe(indicador => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Campo ' + id + ' deletado' });
            this.fecharvisualizacao();
            this.reloadArrays();
        });
    }
    atualizarCampo(i) {
        this.atualizarDadosdoArray();
        this.NovoCampo = this.indicadorSelecionado.campoDoGraficoId[i];
        this.NovoCampo.indicadorId = {
            indicadorId: this.indicadorSelecionado.indicadorId
        };
        console.log(this.NovoCampo);
        this.adminindic.atualizarCampos(this.NovoCampo, this.indicadorSelecionado.campoDoGraficoId[i].campoDoGraficoId).subscribe(indicador => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Campo ' + this.indicadorSelecionado.campoDoGraficoId[i].campoDoGraficoId + ' Atualizado' });
            this.reloadArrays();
        });
        this.NovoCampo = [];
    }
    //=============================================================================================
    //GRAFICOS
    IniciaGrafico() {
        console.log(this.filtroGraficoDataConvertida);
        this.performanceService.indicadores(this.filtroGraficoDataConvertida, this.indicadorSelecionado.indicadorId).subscribe(dados => {
            var maximo = 0;
            console.log(dados);
            for (var i = 34; i >= 0; i--) {
                if (dados[0][i] !== '01/01') {
                    maximo = i;
                    break;
                }
            }
            var eixo = dados[0].splice(1, maximo);
            var atributos = this.criarArrayDeAtributos(dados, maximo);
            this.MontarGrafico(eixo, atributos);
        });
    }
    criarArrayDeAtributos(dados, maximo) {
        var LinhaJson = "{";
        for (var j = 4; j < dados.length; j++) {
            var titulo = dados[j].splice(0, 1);
            var corpo = '[';
            for (var i = 0; i < maximo; i++) {
                var dado = dados[j][i] === '1980-01-01' ? null : dados[j][i] === '-' ? null : dados[j][i];
                var increment = i === (maximo - 1) ? ']' : ',';
                corpo = corpo + dado + increment;
            }
            var increment2 = j === (dados.length - 1) ? '}' : ',';
            LinhaJson = LinhaJson + '"' + titulo + '":' + corpo + increment2;
        }
        return JSON.parse(LinhaJson);
    }
    MontarGrafico(eixo, atributos) {
        var dataset = [];
        var Axes = [];
        var left = false;
        var right = false;
        for (var i = 0; i < this.indicadorSelecionado.campoDoGraficoId.length; i++) {
            dataset.push(this.indicadorSelecionado.campoDoGraficoId[i].estilo === 'Pontilhado' ?
                {
                    type: this.indicadorSelecionado.campoDoGraficoId[i].tipografico,
                    yAxisID: this.indicadorSelecionado.campoDoGraficoId[i].posicao === 'right' ? 'y-axis-2' : 'y-axis-1',
                    fill: false,
                    pointStyle: 'circle',
                    borderDash: [2, 2],
                    pointRadius: 0,
                    borderColor: this.indicadorSelecionado.campoDoGraficoId[i].coreixo,
                    backgroundColor: this.indicadorSelecionado.campoDoGraficoId[i].coreixo,
                    label: this.indicadorSelecionado.campoDoGraficoId[i].label,
                    data: atributos[this.indicadorSelecionado.campoDoGraficoId[i].eixo]
                } :
                {
                    type: this.indicadorSelecionado.campoDoGraficoId[i].tipografico,
                    yAxisID: this.indicadorSelecionado.campoDoGraficoId[i].posicao === 'right' ? 'y-axis-2' : 'y-axis-1',
                    fill: false,
                    borderColor: this.indicadorSelecionado.campoDoGraficoId[i].coreixo,
                    backgroundColor: this.indicadorSelecionado.campoDoGraficoId[i].coreixo,
                    label: this.indicadorSelecionado.campoDoGraficoId[i].label,
                    data: atributos[this.indicadorSelecionado.campoDoGraficoId[i].eixo]
                });
            left = this.indicadorSelecionado.campoDoGraficoId[i].posicao === 'left' ? true : left = true ? true : false;
            right = this.indicadorSelecionado.campoDoGraficoId[i].posicao === 'right' ? true : right = true ? true : false;
        }
        if (left === true) {
            Axes.push({
                type: 'linear',
                display: true,
                position: 'left',
                id: 'y-axis-1',
                gridLines: {
                    display: true,
                    drawborder: true,
                    drawOnChartArea: false
                },
                ticks: {
                    beginAtZero: true
                },
            });
        }
        if (right === true) {
            Axes.push({
                type: 'linear',
                display: true,
                position: 'right',
                id: 'y-axis-2',
                ticks: {
                    beginAtZero: true
                }
            });
        }
        this.data = {
            labels: eixo,
            datasets: dataset
        };
        this.options = {
            responsive: true,
            stacked: false,
            title: {
                display: true,
                fontSize: 16
            },
            gridLines: {
                display: true,
                drawborder: true,
                drawOnChartArea: false
            },
            scales: {
                yAxes: Axes
            },
            legend: {
                position: 'bottom'
            }
        };
    }
};
EditarcadastroindicadoresComponent = tslib_1.__decorate([
    Component({
        selector: 'app-editarcadastroindicadores',
        templateUrl: './editarcadastroindicadores.component.html',
        styleUrls: ['./editarcadastroindicadores.component.css']
    }),
    tslib_1.__metadata("design:paramtypes", [AdminIndicadoresService, MessageService, PerformanceService])
], EditarcadastroindicadoresComponent);
export { EditarcadastroindicadoresComponent };
//# sourceMappingURL=editarcadastroindicadores.component.js.map