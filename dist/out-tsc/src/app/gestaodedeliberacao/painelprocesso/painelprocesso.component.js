import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { GestaoDeliberacaoService } from './../gestaodeliberacao.service';
import { MessageService } from 'primeng/api';
import { PrintdeliberacaoComponent } from './../printdeliberacao/printdeliberacao.component';
let PainelprocessoComponent = class PainelprocessoComponent {
    constructor(service, print, messageService) {
        this.service = service;
        this.print = print;
        this.messageService = messageService;
        this.items = [
            { label: 'Aguardando Comparecimento', value: 'Aguardand' },
            { label: 'À revelia', value: 'revelia' },
            { label: 'Cancelado', value: 'Canc' },
            { label: 'Negociado', value: 'Negoc' }
        ];
        this.item = 'Aguardand';
    }
    ngOnInit() {
        this.mesRetroativo = null;
        this.checkTitular = [];
        this.checkPresenca = [];
        this.checkCarta = [];
        this.checkPresenca = [];
        this.checkOcorrencia = [];
    }
    combo(e) {
        this.pesquisarNot(this.termo);
    }
    //Método que transforma data formato Json para date
    parseDate(value) {
        console.log(value);
        let year = value.year;
        let month = value.monthValue;
        if (month < 10) {
            month = "0" + month;
        }
        let day = value.dayOfMonth;
        if (day < 10) {
            day = "0" + day;
        }
        return new Date(year + "-" + month + "-" + day + "T00:00:00");
        console.log(value);
    }
    imprimir() {
        //Checando o modelo de carta a ser usado
        if (this.checkCarta == 1) {
            if (this.checkProcedente == 1) {
                this.modelo = 'DP';
            }
            else {
                this.modelo = 'DI';
            }
        }
        else {
            if (this.checkPresenca == 1) {
                this.modelo = 'SD';
            }
            else {
                this.modelo = 'A';
            }
        }
        //definindo descriçao de irregularidades e retroativo
        if (this.irreg2 === undefined || this.irreg2 === null) {
            this.irreg2 = '';
        }
        else {
            this.irreg2 = ', ' + this.irreg2;
        }
        if (this.irreg3 === undefined || this.irreg3 === null) {
            this.irreg3 = '';
        }
        else {
            this.irreg3 = ', ' + this.irreg3;
        }
        const numero = require('numero-por-extenso');
        var meses;
        if (this.mesRetroativo == 1) {
            meses = 'mês';
        }
        else {
            meses = 'meses';
        }
        // Definindo texto do valor da multa
        if (this.valMulta <= this.valTotal) {
            if (this.valMulta == this.valTotal) {
                this.textoMulta = 'no valor de R$ ' + this.valMulta.toLocaleString('pt-BR') + ' (' + numero.porExtenso(this.valMulta, numero.estilo.monetario) + '),';
            }
            else {
                if (this.valRetro > 0) {
                    if (this.valTroca > 0) {
                        this.textoMulta = 'no valor de R$ ' + this.valMulta.toLocaleString('pt-BR') + ' (' + numero.porExtenso(this.valMulta, numero.estilo.monetario) + '),' +
                            ' acrescido do valor de R$ ' + this.valRetro.toLocaleString('pt-BR') + ' (' + numero.porExtenso(this.valRetro, numero.estilo.monetario) + '),' + 'equivalente a ' + this.mesRetroativo + ' ' + meses + ' de consumo retroativo' +
                            ', bem como o valor de R$ ' + this.valTroca.toLocaleString('pt-BR') + ' (' + numero.porExtenso(this.valTroca, numero.estilo.monetario) + '),' + ' referente ao novo hidrômetro' +
                            'totalizando R$ ' + this.valTotal.toLocaleString('pt-BR') + ' (' + numero.porExtenso(this.valTotal, numero.estilo.monetario) + '),';
                    }
                    else {
                        this.textoMulta = 'no valor de R$ ' + this.valMulta.toLocaleString('pt-BR') + ' (' + numero.porExtenso(this.valMulta, numero.estilo.monetario) + '),' +
                            ' acrescido do valor de R$ ' + this.valRetro.toLocaleString('pt-BR') + ' (' + numero.porExtenso(this.valRetro, numero.estilo.monetario) + '),' + 'equivalente a ' + this.mesRetroativo + ' ' + meses + ' de consumo retroativo ' +
                            'totalizando R$ ' + this.valTotal.toLocaleString('pt-BR') + ' (' + numero.porExtenso(this.valTotal, numero.estilo.monetario) + '),';
                    }
                }
                else {
                    if (this.valTroca > 0) {
                        this.textoMulta = 'no valor de R$ ' + this.valMulta.toLocaleString('pt-BR') + ' (' + numero.porExtenso(this.valMulta, numero.estilo.monetario) + '),' +
                            ', bem como o valor de R$ ' + this.valTroca.toLocaleString('pt-BR') + ' (' + numero.porExtenso(this.valTroca, numero.estilo.monetario) + '),' + ' referente ao novo hidrômetro' +
                            'totalizando R$ ' + this.valTotal.toLocaleString('pt-BR') + ' (' + numero.porExtenso(this.valTotal, numero.estilo.monetario) + '),';
                    }
                }
            }
        }
        else {
            if (this.valRetro > 0) {
                if (this.valTroca > 0) {
                    this.textoMulta = 'no valor de R$ ' + this.valMulta.toLocaleString('pt-BR') + ' (' + numero.porExtenso(this.valMulta, numero.estilo.monetario) + '),' +
                        ' acrescido do valor de R$ ' + this.valRetro.toLocaleString('pt-BR') + ' (' + numero.porExtenso(this.valRetro, numero.estilo.monetario) + '),' + 'equivalente a ' + this.mesRetroativo + ' ' + meses + ' de consumo retroativo' +
                        ', bem como o valor de R$ ' + this.valTroca.toLocaleString('pt-BR') + ' (' + numero.porExtenso(this.valTroca, numero.estilo.monetario) + '),' + ' referente ao novo hidrômetro' +
                        'e aplicado um desconto de ' + this.valDesconto.toLocaleString('pt-BR') + ' (' + numero.porExtenso(this.valDesconto, numero.estilo.monetario) + '),' +
                        'totalizando R$ ' + this.valTotal.toLocaleString('pt-BR') + ' (' + numero.porExtenso(this.valTotal, numero.estilo.monetario) + '),';
                }
                else {
                    this.textoMulta = 'no valor de R$ ' + this.valMulta.toLocaleString('pt-BR') + ' (' + numero.porExtenso(this.valMulta, numero.estilo.monetario) + '),' +
                        ' acrescido do valor de R$ ' + this.valRetro.toLocaleString('pt-BR') + ' (' + numero.porExtenso(this.valRetro, numero.estilo.monetario) + '),' + 'equivalente a ' + this.mesRetroativo + ' ' + meses + ' de consumo retroativo ' +
                        'e aplicado um desconto de ' + this.valDesconto.toLocaleString('pt-BR') + ' (' + numero.porExtenso(this.valDesconto, numero.estilo.monetario) + '),' +
                        'totalizando R$ ' + this.valTotal.toLocaleString('pt-BR') + ' (' + numero.porExtenso(this.valTotal, numero.estilo.monetario) + '),';
                }
            }
            else {
                if (this.valTroca > 0) {
                    this.textoMulta = 'no valor de R$ ' + this.valMulta.toLocaleString('pt-BR') + ' (' + numero.porExtenso(this.valMulta, numero.estilo.monetario) + '),' +
                        ', bem como o valor de R$ ' + this.valTroca.toLocaleString('pt-BR') + ' (' + numero.porExtenso(this.valTroca, numero.estilo.monetario) + '),' + ' referente ao novo hidrômetro' +
                        'e aplicado um desconto de ' + this.valDesconto.toLocaleString('pt-BR') + ' (' + numero.porExtenso(this.valDesconto, numero.estilo.monetario) + '),' +
                        'totalizando R$ ' + this.valTotal.toLocaleString('pt-BR') + ' (' + numero.porExtenso(this.valTotal, numero.estilo.monetario) + '),';
                }
                else {
                    this.textoMulta = 'no valor de R$ ' + this.valMulta.toLocaleString('pt-BR') + ' (' + numero.porExtenso(this.valMulta, numero.estilo.monetario) + '),' +
                        'e aplicado um desconto de ' + this.valDesconto.toLocaleString('pt-BR') + ' (' + numero.porExtenso(this.valDesconto, numero.estilo.monetario) + '),' +
                        'totalizando R$ ' + this.valTotal.toLocaleString('pt-BR') + ' (' + numero.porExtenso(this.valTotal, numero.estilo.monetario) + '),';
                }
            }
        }
        this.print.criaPDF(this.modelo, ("000000" + this.ndeliberacao).slice(-6) + '/' + this.ano, this.rua, this.bairro, this.cidade, this.dataJulgado, this.processo, this.termo, this.parseDate(this.dataNotificacao), this.matricula.toString(), this.irreg1, this.irreg2, this.irreg3, this.cliente, this.textoMulta, this.mesRetroativo, this.dataDefesa, this.checkOcorrencia, this.hd, this.ruaResumida, this.ruaEntrega, this.numeroEntrega, this.complementoEntrega, this.bairroEntrega, this.cidadeEntrega, this.checkPresenca, this.dataAR);
    }
    pesquisarNot(termo) {
        this.irregs = [
            { codigo: '105', fraude: 'INTERVENÇÃO NO RAMAL PREDIAL E NO COLETOR PREDIAL', valor: '600.84' },
            { codigo: '143', fraude: 'INTERVENÇÃO DE QUALQUER MODO NAS INSTALAÇÕES DO SERVIÇO PÚBLICO DE ÁGUA OU DE ESGOTO SANITÁRIO', valor: '1976.34' },
            { codigo: '150', fraude: 'LIG. CLANDESTINA AGUA 3/4-RES', valor: '600.84' },
            { codigo: '164', fraude: 'VIOLACAO DE CORTE CAVALETE 3/4" ', valor: '400.57' },
            { codigo: '171', fraude: 'VIOLAÇÃO OU RETIRADA DE HIDROMETRO OU DE LIMITADOR DE CONSUMO', valor: '400.57' },
            { codigo: '179', fraude: 'VIOLACAO DE CORTE RAMAL 3/4"', valor: '583.69' },
            { codigo: '181', fraude: 'DERIV. P/SUPRIM. IMOVEL 3/4 -RES', valor: '150.2' },
            { codigo: '186', fraude: 'INTERC. ALIM. 3/4', valor: '400.54' },
            { codigo: '205', fraude: 'INTERVENÇÃO NO RAMAL PREDIAL E NO COLETOR PREDIAL', valor: '480.67' },
            { codigo: '243', fraude: 'INTERVENÇÃO DE QUALQUER MODO NAS INSTALAÇÕES DO SERVIÇO PÚBLICO DE ÁGUA OU DE ESGOTO SANITÁRIO ', valor: '1581.07' },
            { codigo: '250', fraude: 'LIG. CLANDESTINA AGUA 3/4-RES ', valor: '480.67' },
            { codigo: '264', fraude: 'VIOLACAO DE CORTE CAVALETE 3/4" ', valor: '320.46' },
            { codigo: '271', fraude: 'VIOLAÇÃO OU RETIRADA DE HIDROMETRO OU DE LIMITADOR DE CONSUMO ', valor: '320.46' },
            { codigo: '279', fraude: 'VIOLACAO DE CORTE RAMAL 3/4" ', valor: '466.95' },
            { codigo: '281', fraude: 'DERIV. P/SUPRIM. IMOVEL 3/4 -RES ', valor: '120.16' },
            { codigo: '286', fraude: 'INTERC. ALIM. 3/4 ', valor: '320.43' },
            { codigo: '405', fraude: 'INTERVENÇÃO NO RAMAL PREDIAL E NO COLETOR PREDIAL ', valor: '360.5' },
            { codigo: '443', fraude: 'INTERVENÇÃO DE QUALQUER MODO NAS INSTALAÇÕES DO SERVIÇO PÚBLICO DE ÁGUA OU DE ESGOTO SANITÁRIO ', valor: '1185.8' },
            { codigo: '450', fraude: 'LIG. CLANDESTINA AGUA 3/4-RES ', valor: '360.5' },
            { codigo: '464', fraude: 'VIOLACAO DE CORTE CAVALETE 3/4" ', valor: '240.34' },
            { codigo: '471', fraude: 'VIOLAÇÃO OU RETIRADA DE HIDROMETRO OU DE LIMITADOR DE CONSUMO ', valor: '240.34' },
            { codigo: '479', fraude: 'VIOLACAO DE CORTE RAMAL 3/4" ', valor: '350.21' },
            { codigo: '481', fraude: 'DERIV. P/SUPRIM. IMOVEL 3/4 -RES ', valor: '90.12' },
            { codigo: '486', fraude: 'INTERC. ALIM. 3/4 ', valor: '240.32' },
        ];
        this.limpar();
        // Realiza a busca da notificação
        this.service.notificacao(termo, this.item)
            .subscribe(delib => {
            try {
                delib => this.deliberacao = delib.data;
                this.irregularidadeId = delib[0].irregularidadeId;
                //console.log(delib[0])
                this.termo = delib[0].num_termo_ocorrencia;
                this.contrato = delib[0].contrato["contrato"];
                this.matricula = delib[0].contrato["matricula"];
                this.enderecoentrega(this.matricula);
                this.cpf = delib[0].contrato["num_doc_1"];
                this.hd = delib[0].contrato["num_medidor"];
                this.statusLigacao = delib[0].contrato["sit_lig"];
                this.statusContrato = delib[0].contrato["sit_contrato"];
                this.nome = delib[0].contrato["nom_cliente"];
                this.cliente = delib[0].contrato["nom_cliente"];
                this.rua = delib[0].contrato["nom_logradouro"] + " , " + delib[0].contrato["nro"]
                    + " " + delib[0].contrato["dsc_complemento"].trim();
                this.dataNotificacao = delib[0].dat_notificacao;
                this.ruaResumida = delib[0].contrato["nom_logradouro"] + " , " + delib[0].contrato["nro"];
                this.bairro = delib[0].contrato["nom_bairro"];
                this.cidade = delib[0].contrato["cidade"];
                //verificar como fazer a data notificaçao
                this.valCusto = delib[0].val_custos;
                this.valMulta = delib[0].val_multa;
                this.valTroca = delib[0].val_troca_hd;
                this.valRetro = delib[0].val_dif_consumo;
                this.valTotal = delib[0].val_total;
                this.valDesconto = (this.valCusto + this.valMulta + this.valTroca +
                    this.valRetro) - this.valTotal;
                this.fraudes = [];
                for (var i in this.irregs) {
                    if (delib[0].cod_ocorrencia_1.toString() === this.irregs[i].codigo.toString()) {
                        this.fraudes.push(this.irregs[i]);
                        this.irreg1 = this.irregs[i].fraude;
                    }
                    else if (delib[0].cod_ocorrencia_2.toString() === this.irregs[i].codigo.toString()) {
                        this.fraudes.push(this.irregs[i]);
                        this.irreg2 = this.irregs[i].fraude;
                    }
                    else if (delib[0].cod_ocorrencia_3.toString() === this.irregs[i].codigo.toString()) {
                        this.fraudes.push(this.irregs[i]);
                        this.irreg3 = this.irregs[i].fraude;
                    }
                }
                this.service.processo(this.irregularidadeId)
                    .subscribe(processo => {
                    try {
                        this.processo = processo[0].processo;
                        this.dataJulgado = new Date(processo[0].dataJulgado);
                        this.ndeliberacao = processo[0].deliberacao;
                        this.formatarProcesso();
                        this.checkCarta = processo[0].carta;
                        this.checkPresenca = processo[0].usuarioPresente;
                        this.checkProcedente = processo[0].cartaProcedente;
                        this.mesRetroativo = processo[0].mesRetroativo;
                        this.checkOcorrencia = processo[0].ro;
                        this.dataDefesa = new Date(processo[0].dataAviso3);
                        if (processo[0].dataAviso1 != null) {
                            this.dataAR = this.parseDate(processo[0].dataAviso1);
                        }
                        if (this.cliente === processo[0].titular) {
                            this.checkTitular = 1;
                        }
                        else {
                            if (processo[0].titular === undefined) {
                            }
                            else {
                                this.cliente = processo[0].titular;
                            }
                        }
                    }
                    catch (e) { }
                });
                if (this.dataAR == null) {
                    this.dataAR = this.parseDate(delib[0].dat_notificacao);
                }
            }
            catch (e) {
                this.messageService.add({ severity: 'error', summary: 'Notificação não encontrada!',
                    detail: "já existe o termo " + this.termo + " na base de dados!", life: 60000 });
            }
            //console.log("requisicao bem sucedida! ", this.fraudes);
        }, error => {
            console.log("Erro: ", error);
            this.messageService.add({ severity: 'error', summary: "Falha na Consulta!",
                detail: error.message, life: 5000 });
        });
    }
    formatarProcesso() {
        this.ano = this.processo.substring(0, 4);
        this.mes = this.processo.substring(4, 6);
        this.mat = this.processo.substring(6, 12);
        this.del = this.processo.substring(12, 18);
        this.processo = this.ano + '.' + this.mes + '-' + this.mat + '/' + this.del;
    }
    enviar() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            var n;
            var p;
            var c;
            var cp;
            if (this.checkPresenca == 1 && this.checkTitular != 1) {
                n = this.nome;
            }
            else {
                n = this.cliente;
            }
            if (this.checkPresenca == 1) {
                p = "1";
            }
            else {
                p = "0";
            }
            if (this.checkCarta == 1) {
                c = "1";
            }
            else {
                c = "0";
            }
            if (this.checkProcedente == 1) {
                cp = "1";
            }
            else {
                cp = "0";
            }
            function delay(ms) {
                return new Promise(resolve => setTimeout(resolve, ms));
            }
            //Pesquisa irreg na tabela de gestão
            this.service.processo(this.irregularidadeId)
                .subscribe(processo => {
                // try{
                //   this.processo = processo[0].processo;
                //   this.formatarProcesso()
                //   this.messageService.add({severity:'error', summary: 'Dados não Enviados!', 
                //   detail:"já existe o processo "+this.processo+" para essa irregularidade", life: 60000});
                //   console.log(processo);
                // }catch(e){
                this.service.InputDeliberacao(this.irregularidadeId, null, null, this.dataDefesa, this.mesRetroativo, n, p, this.contrato, this.matricula, c, cp, this.checkOcorrencia.toString(), this.termo, sessionStorage.getItem('nome'), this.protocolo, this.cartacedoc)
                    .subscribe(response => {
                    if (response.status === 201) {
                        this.messageService.add({ sticky: true, severity: 'success', summary: 'Dados Salvos!',
                            detail: 'Dados enviados com sucesso!' });
                        console.log('Dados enviados com sucesso!');
                        this.service.processo(this.irregularidadeId)
                            .subscribe(processo => {
                            this.processo = processo[0].processo;
                            this.dataJulgado = new Date(processo[0].dataJulgado);
                            this.ndeliberacao = processo[0].deliberacao;
                            this.formatarProcesso();
                            if (window.confirm("Você Deseja imprimir esse processo?")) {
                                this.imprimir();
                            }
                        });
                    }
                }, error => {
                    this.messageService.add({ severity: 'error', summary: "Dados não Enviados!",
                        detail: error.message, life: 5000 });
                    console.log(error);
                });
            }
            // },  
            // error  => {
            //   console.log("Erro: ", error);
            //   this.messageService.add({severity:'error', summary: "Falha na Consulta!", 
            //   detail:error.message, life: 5000});
            // }
            );
            // console.log(this.irregularidadeId)
            // this.service.processo(this.irregularidadeId)
            //   .subscribe(
            //     processo  => {
            //       console.log(processo)
            // this.processo = processo[0].processo;
            // this.dataJulgado = new Date(processo[0].dataJulgado);
            // this.ndeliberacao = processo[0].deliberacao;
            // this.formatarProcesso()
            // if (window.confirm("Você Deseja imprimir esse processo?")) { 
            //   this.imprimir();
            // } 
            //   },
            // );
        });
    }
    enderecoentrega(matricula) {
        this.service.endentrega(matricula)
            .subscribe(endentrega => {
            this.ruaEntrega = endentrega['rua'];
            this.numeroEntrega = endentrega['numero'];
            this.complementoEntrega = endentrega['complemento'];
            this.bairroEntrega = endentrega['bairro'];
            this.cidadeEntrega = endentrega['cidade'];
            ;
        }, error => {
            console.log(error);
        });
    }
    pesquisarProcesso(e) {
        this.service.idProcesso(e)
            .subscribe(processo => {
            var objeto;
            objeto = processo;
            this.processo = objeto['processo'];
            this.dataJulgado = new Date(objeto['dataJulgado']);
            this.ndeliberacao = objeto['deliberacao'];
            this.irregularidadeId = objeto['irregularidadeId'];
            this.termo = objeto['num_termo'];
            this.pesquisarNot(this.termo);
        }, error => { });
    }
    limpar() {
        this.fraudes = [];
        this.deliberacao = null;
        this.modelo = null;
        this.dataDefesa = null;
        this.dataAR = null;
        this.processo = null;
        this.irregularidadeId = null;
        this.dataNotificacao = null;
        this.matricula = null;
        this.contrato = null;
        this.cpf = null;
        this.hd = null;
        this.statusLigacao = null;
        this.statusContrato = null;
        this.nome = null;
        this.rua = null;
        this.ruaResumida = null,
            this.bairro = null;
        this.cidade = null;
        this.valCusto = null;
        this.valMulta = null;
        this.valTroca = null;
        this.valRetro = null;
        this.valTotal = null;
        this.valDesconto = null;
        this.ndeliberacao = null;
        this.irreg1 = null;
        this.irreg2 = undefined;
        this.irreg2vai = undefined;
        this.irreg3 = undefined;
        this.irreg3vai = undefined;
        this.textoMulta = null;
        this.mesRetroativo = null;
        this.checkTitular = [];
        this.checkPresenca = [];
        this.checkCarta = [];
        this.checkProcedente = [];
        this.checkOcorrencia = [];
        this.cliente = null;
        this.ano = null;
        this.mes = null;
        this.mat = null;
        this.del = null;
        this.ruaEntrega = null;
        this.numeroEntrega = null;
        this.complementoEntrega = null;
        this.bairroEntrega = null;
        this.cidadeEntrega = null;
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], PainelprocessoComponent.prototype, "deliberacao", void 0);
PainelprocessoComponent = tslib_1.__decorate([
    Component({
        selector: 'app-painelprocesso',
        templateUrl: './painelprocesso.component.html',
        styleUrls: ['./painelprocesso.component.css'],
        styles: [`
        :host ::ng-deep button {
            margin-right: .25em;
        }

        :host ::ng-deep .custom-toast .ui-toast-message {
            color: #ffffff;
            background: #FC466B;
            background: -webkit-linear-gradient(to right, #3F5EFB, #FC466B);
            background: linear-gradient(to right, #3F5EFB, #FC466B);
        }

        :host ::ng-deep .custom-toast .ui-toast-close-icon {
            color: #ffffff;
        }
    `],
        providers: [MessageService]
    }),
    tslib_1.__metadata("design:paramtypes", [GestaoDeliberacaoService,
        PrintdeliberacaoComponent,
        MessageService])
], PainelprocessoComponent);
export { PainelprocessoComponent };
//# sourceMappingURL=painelprocesso.component.js.map