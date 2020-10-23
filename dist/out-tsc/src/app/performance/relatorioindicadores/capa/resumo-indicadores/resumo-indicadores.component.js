import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { PerformanceService } from '../../../performance.service';
let ResumoIndicadoresComponent = class ResumoIndicadoresComponent {
    constructor(indicadoresService) {
        this.indicadoresService = indicadoresService;
    }
    ngOnInit() {
        this.Validador(this.element, this.refer);
    }
    Validador(indic, referencia) {
        this.indicadoresService.indicadoresResumo(referencia, indic.indicadorId)
            .subscribe(indicador => {
            var IndicadorCadastro = indic;
            var Resumo = [];
            Resumo = indicador[3];
            // Resumo = Resumo.splice(1, Number.MAX_VALUE)
            //ROTULOS DE COMENTARIOS
            //========================================================================================
            var eixo = [];
            eixo = indicador[0];
            eixo = eixo.splice(1, Number.MAX_VALUE);
            eixo = eixo.filter(item => item !== null);
            var comentarios = [];
            comentarios = indicador[1];
            comentarios = comentarios.splice(1, Number.MAX_VALUE);
            var responsaveis = [];
            responsaveis = indicador[2];
            responsaveis = responsaveis.splice(1, Number.MAX_VALUE);
            this.CondicionalDeGraficos(IndicadorCadastro, Resumo);
        });
    }
    //MESMA CLASSE DO QUE O graficos.component.ts
    CondicionalDeGraficos(IndicadorCadastro, resumo) {
        //RETIRAR DA PRIMEIRA LINHA OS ROTULOS
        //========================================================================================
        let orcadoMensal = parseFloat(resumo.splice(1, 1));
        let orcadoAcumulad = parseFloat(resumo.splice(1, 1));
        let realizadoAcumulad = parseFloat(resumo.splice(1, 1));
        let PrevisaoMensal = parseFloat(resumo.splice(1, 1));
        let OrcadoMedia = parseFloat(resumo.splice(1, 1));
        let RealMedia = parseFloat(resumo.splice(1, 1));
        let Minimo = parseFloat(resumo.splice(1, 1));
        let Maximo = parseFloat(resumo.splice(1, 1));
        let Meta = parseFloat(resumo.splice(1, 1));
        let MetaAcum = parseFloat(resumo.splice(1, 1));
        let ReguladoDp = parseFloat(resumo.splice(1, 1));
        let NaoReguladoDp = parseFloat(resumo.splice(1, 1));
        let UltReal = parseFloat(resumo.splice(1, 1));
        let UltOrcado = parseFloat(resumo.splice(1, 1));
        //MONTAR OBJETO COM OS DADOS DO RESUMO
        //========================================================================================
        var ResumoDosEixos = {
            orcadomensal: orcadoMensal,
            orcadoacumulado: orcadoAcumulad,
            orcadomedia: OrcadoMedia,
            realizadoacumulado: realizadoAcumulad,
            realizadomedia: RealMedia,
            metaacumulada: MetaAcum,
            meta: Meta,
            minimo: Minimo,
            maximo: Maximo,
            reguladodp: ReguladoDp,
            naoreguladodp: NaoReguladoDp,
            ultimorealizado: UltReal,
            ultimoorcado: UltOrcado
        };
        this.RotuloOrcadoMensal = ResumoDosEixos[IndicadorCadastro.campoMensal];
        this.RotuloPrevisaoMensal = PrevisaoMensal;
        //CONSTRUIR OS CAMPOS DE ROTULOS COM O CADASTRO DE INDICADORES
        //========================================================================================
        this.campo1 = IndicadorCadastro.rotulocampo1;
        this.campo2 = IndicadorCadastro.rotulocampo2;
        this.campo3 = IndicadorCadastro.rotulocampo3;
        this.campo4 = IndicadorCadastro.rotulocampo4;
        //CONSTRUIR OS CAMPOS DE CALCULO COM O CADASTRO DE INDICADORES
        //========================================================================================
        this.campoCalc1 = ResumoDosEixos[IndicadorCadastro.campo1];
        this.campoCalc2 = ResumoDosEixos[IndicadorCadastro.campo2];
        var cam3 = IndicadorCadastro.campo3 === 'variacao'
            ? this.campoCalc1 === 0
                ? 0
                : ((-(1 - (this.campoCalc1 / this.campoCalc2))) * 100).toFixed(2)
            : ResumoDosEixos[IndicadorCadastro.campo4];
        cam3 = IndicadorCadastro.campo3 === 'diferenca'
            ? (this.campoCalc2 - this.campoCalc1).toFixed(2)
            : cam3;
        this.campoCalc3 = cam3;
        var cam4 = IndicadorCadastro.campo4 === 'variacao'
            ? this.campoCalc1 === 0
                ? 0
                : ((-(1 - (this.campoCalc1 / this.campoCalc2))) * 100).toFixed(2)
            : ResumoDosEixos[IndicadorCadastro.campo4];
        cam4 = IndicadorCadastro.campo4 === 'diferenca'
            ? (this.campoCalc2 - this.campoCalc1).toFixed(2)
            : cam4;
        this.campoCalc4 = cam4;
        //SELECIONAR TENDENDCIAS DE EIXO
        //========================================================================================
        switch (IndicadorCadastro.tendencia) {
            case "MELHORPOSITIVO": {
                if (this.campoCalc2 < this.campoCalc1) {
                    this.Cor1 = "Red";
                }
                break;
            }
            case "MELHORNEGATIVO": {
                if (this.campoCalc2 > this.campoCalc1) {
                    this.Cor1 = "Red";
                }
                break;
            }
            case "MELHORENTREFAIXAS": {
                if (ResumoDosEixos['realizadomedia'] > ResumoDosEixos['maximo']
                    || ResumoDosEixos['realizadomedia'] < ResumoDosEixos['minimo']) {
                    this.Cor1 = "Red";
                }
                break;
            }
        }
        this.Cor2 = this.Cor1;
        this.Cor3 = this.Cor1;
        this.Cor4 = this.Cor1;
        //SELECIONAR TENDENDCIAS DE EIXO
        //========================================================================================
        switch (IndicadorCadastro.rotuloVirgula) {
            case 1: {
                this.campoCalc1 = converterComDecimal(this.campoCalc1);
                this.campoCalc2 = converterComDecimal(this.campoCalc2);
                this.campoCalc3 = converterComDecimal(this.campoCalc3);
                this.campoCalc4 = converterComDecimal(this.campoCalc4);
                this.RotuloOrcadoMensal = converterComDecimal(this.RotuloOrcadoMensal * 1);
                this.RotuloPrevisaoMensal = converterComDecimal(this.RotuloPrevisaoMensal * 1);
                break;
            }
            case 2: {
                this.campoCalc1 = converterSemDecimal(this.campoCalc1);
                this.campoCalc2 = converterSemDecimal(this.campoCalc2);
                this.campoCalc3 = converterSemDecimal(this.campoCalc3);
                this.campoCalc4 = converterSemDecimal(this.campoCalc4);
                this.RotuloOrcadoMensal = converterSemDecimal(this.RotuloOrcadoMensal * 1);
                this.RotuloPrevisaoMensal = converterSemDecimal(this.RotuloPrevisaoMensal * 1);
                break;
            }
            case 3: {
                this.campoCalc1 = ConverterParaHora(this.campoCalc1);
                this.campoCalc2 = ConverterParaHora(this.campoCalc2);
                this.RotuloOrcadoMensal = ConverterParaHora(this.RotuloOrcadoMensal * 1);
                this.RotuloPrevisaoMensal = ConverterParaHora(this.RotuloPrevisaoMensal * 1);
                break;
            }
        }
        //FUNÇÕES
        //========================================================================================
        function converterComDecimal(z) {
            let v = z.toFixed(2);
            v = v.replace(/\D/g, ""); // permite digitar apenas numero
            v = v.replace(/(\d{1})(\d{14})$/, "$1.$2"); // coloca ponto antes dos ultimos digitos
            v = v.replace(/(\d{1})(\d{11})$/, "$1.$2"); // coloca ponto antes dos ultimos 13 digitos
            v = v.replace(/(\d{1})(\d{8})$/, "$1.$2"); // coloca ponto antes dos ultimos 10 digitos
            v = v.replace(/(\d{1})(\d{5})$/, "$1.$2"); // coloca ponto antes dos ultimos 7 digitos
            v = v.replace(/(\d{1})(\d{1,2})$/, "$1,$2"); // coloca virgula antes dos ultimos 4 digitos
            return v;
        }
        function converterSemDecimal(z) {
            let v = z.toFixed(0);
            v = v.replace(/\D/g, ""); // permite digitar apenas numero
            v = v.replace(/(\d{1})(\d{12})$/, "$1.$2"); // coloca ponto antes dos ultimos digitos
            v = v.replace(/(\d{1})(\d{9})$/, "$1.$2"); // coloca ponto antes dos ultimos 13 digitos
            v = v.replace(/(\d{1})(\d{6})$/, "$1.$2"); // coloca ponto antes dos ultimos 10 digitos
            v = v.replace(/(\d{1})(\d{3})$/, "$1.$2"); // coloca ponto antes dos ultimos 7 digitos
            return v;
        }
        function ConverterParaHora(s) {
            if (s < 0) {
                s = s * -1;
            }
            function duas_casas(numero) {
                if (numero <= 9) {
                    numero = "0" + parseInt(numero);
                }
                return numero;
            }
            var hora = Math.trunc(s / 3600);
            var minuto = Math.trunc(s / 60) - (hora * 60);
            var segundo = Math.trunc(s) - (hora * 3600) - (minuto * 60);
            hora = duas_casas(hora);
            minuto = duas_casas(minuto);
            segundo = duas_casas(segundo);
            var formatado = hora + ":" + minuto + ":" + segundo;
            return formatado;
        }
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], ResumoIndicadoresComponent.prototype, "element", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], ResumoIndicadoresComponent.prototype, "refer", void 0);
ResumoIndicadoresComponent = tslib_1.__decorate([
    Component({
        selector: 'app-resumo-indicadores',
        templateUrl: './resumo-indicadores.component.html',
        styleUrls: ['./resumo-indicadores.component.css']
    }),
    tslib_1.__metadata("design:paramtypes", [PerformanceService])
], ResumoIndicadoresComponent);
export { ResumoIndicadoresComponent };
//# sourceMappingURL=resumo-indicadores.component.js.map