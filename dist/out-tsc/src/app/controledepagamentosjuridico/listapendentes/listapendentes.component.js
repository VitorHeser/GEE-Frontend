import * as tslib_1 from "tslib";
import { Component } from "@angular/core";
import { MessageService } from 'primeng/api';
import { ControledepagamentosjuridicoService } from '../controledepagamentosjuridico.service';
let ListapendentesComponent = class ListapendentesComponent {
    constructor(ControlePagamento, messageService) {
        this.ControlePagamento = ControlePagamento;
        this.messageService = messageService;
        this.sentencas = [];
        this.displayEditSentenca = false;
    }
    ngOnInit() {
        this.AtualizarLista();
    }
    AtualizarLista() {
        this.sentencas = [];
        this.ControlePagamento.editaveis().subscribe(response => {
            this.sentencas = response;
            console.log(response);
        });
        this.ListaCentroDeCusto =
            [
                { label: null, value: null },
                { label: 'PR10200005 - Jurídico Estratégico', value: 'PR10200005', aprovador: 'niella.cancado@prolagos.com.br' },
                { label: 'PR10600007  - Gerência Operacional Água', value: 'PR106000071', aprovador: 'jose.marino@aegea.com.br' },
                { label: 'PR10600007  - Gerência Operacional Esgoto', value: 'PR106000072', aprovador: 'mario.goncalves@serraambiental.com.br' },
                { label: 'PR10700007  - Gerência Comercial', value: 'PR10700007', aprovador: 'vitor.gabriel@aguasdomirante.com.br' },
                { label: 'PR10500002  - Administração', value: 'PR10500002 ', aprovador: 'andre.pires@aegea.com.br' },
                { label: 'PR10800004  - Gerência De Serviços', value: 'PR10800004', aprovador: 'wellington.blanck@aegea.com.br ' },
                { label: 'PR10400008  - Ndi', value: 'PR10400008', aprovador: 'aline.povoas@prolagos.com.br' },
                { label: 'PR10300001 - Diretoria Executiva', value: 'PR10300001', aprovador: 'jose.almeida@prolagos.com.br' },
                { label: 'PR10200001  - Presidência', value: 'PR10200001', aprovador: 'sergio.braga@prolagos.com.br' }
            ];
        this.ListaEscritorios = [
            { label: null, value: null },
            { label: 'Bergqvist & Alvarez Advogados', value: 'Bergqvist & Alvarez Advogados' },
            { label: 'Campos Chagas & Ferrari Advogados', value: 'Campos Chagas & Ferrari Advogados' },
            { label: 'Carlos Magno Advogados Associados', value: 'Carlos Magno Advogados Associados' },
            { label: 'Chamon Santana Sociedade De Advogados', value: 'Chamon Santana Sociedade De Advogados' },
            { label: 'Guimarães Irmes E Araújo Advogados', value: 'Guimarães Irmes E Araújo Advogados' },
            { label: 'Lacaz, Pereira, Gurevich & Schoueri', value: 'Lacaz, Pereira, Gurevich & Schoueri' },
            { label: 'Luciane Pinheiro Pedro Sociedade Individual De Advocacia', value: 'Luciane Pinheiro Pedro Sociedade Individual De Advocacia' },
            { label: 'Mannheimer, Perez e Lyra Advogados', value: 'Mannheimer, Perez e Lyra Advogados' },
            { label: 'Mattos Filho; Veiga Filho; Marrey Jr E Quiroga Advogados', value: 'Mattos Filho; Veiga Filho; Marrey Jr E Quiroga Advogados' },
            { label: 'Vieira & Britto Advogados Associados', value: 'Vieira & Britto Advogados Associados' }
        ];
        this.ListaContas = [
            { label: null, value: null },
            { label: '412600011-CUSTAS JUDICIAIS', value: '412600011' },
            { label: '512600011-CUSTAS JUDICIAIS', value: '512600011' },
            { label: '412300001-INDENIZAÇÕES CÍVEIS', value: '412300001' },
            { label: '512300001-INDENIZAÇÕES CÍVEIS', value: '512300001' },
            { label: '412300002-INDENIZAÇÕES TRABALHISTAS', value: '412300002' },
            { label: '512300002-INDENIZAÇÕES TRABALHISTAS', value: '512300002' },
            { label: '126100001-DEPOSITOS JUDICIAIS', value: '126100001' },
            { label: '126100002-BLOQUEIOS JUDICIAIS', value: '126100002' }
        ];
        this.ListaFornecedores = [
            { label: null, value: null },
            { label: 'BANCO DO BRASIL S.A - SETOR PUBLICO', value: '820330' },
            { label: 'TRIBUNAL DE JUSTICA DO ESTADO DO RJ', value: '820248' },
            { label: 'SUPREMO TRIBUNAL FEDERAL', value: '107280' },
            { label: 'SECRETARIA DO SUPERIOR TRIBUNAL DE JUSTICA', value: '820162' },
            { label: 'TRIBUNAL REGIONAL DO TRABALHO DA 1ª REGIAO', value: '820178' }
        ];
    }
    showSentenca(sentenca) {
        this.sentencaSelectDate = null;
        this.sentencaSelect = sentenca;
        this.displayEditSentenca = true;
        event.preventDefault();
    }
    Salvar(sentencas) {
        sentencas["enviadoParaAprovacao"] = sentencas.valor > 5000 ? 3 : sentencas.valor > 1000 ? 2 : 1;
        this.ControlePagamento.UpdatePagamento(sentencas).subscribe(response => {
            this.sentencas = response;
            this.displayEditSentenca = false;
            this.sentencaSelect = null;
            this.AtualizarLista();
        });
    }
    EnviarAprovacao(sentencas) {
        sentencas["enviadoParaAprovacao"] = sentencas.valor > 5000 ? 3 : sentencas.valor > 1000 ? 2 : 1;
        sentencas["aprovador1"] = null;
        sentencas["aprovador2"] = null;
        sentencas["aprovador3"] = null;
        sentencas["aprovacao1"] = null;
        sentencas["aprovacao2"] = null;
        sentencas["aprovacao3"] = null;
        this.ControlePagamento.UpdatePagamento(sentencas).subscribe(response => {
            this.sentencas = response;
            this.displayEditSentenca = false;
            this.sentencaSelect = null;
            this.AtualizarLista();
        });
    }
};
ListapendentesComponent = tslib_1.__decorate([
    Component({
        selector: 'app-listapendentes',
        templateUrl: './listapendentes.component.html',
        styleUrls: ['./listapendentes.component.css']
    }),
    tslib_1.__metadata("design:paramtypes", [ControledepagamentosjuridicoService,
        MessageService])
], ListapendentesComponent);
export { ListapendentesComponent };
//# sourceMappingURL=listapendentes.component.js.map