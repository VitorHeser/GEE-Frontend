import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { EnergiaService } from '../energia.service';
import { CsvDataService } from '../../csv-data.service';
import { MessageService } from 'primeng/api';
let EquipamentosComponent = class EquipamentosComponent {
    constructor(medServ, messageService) {
        this.medServ = medServ;
        this.messageService = messageService;
        this.displayMedidor = false;
        this.classificacoes = [
            { label: "", value: null },
            { label: "Água", value: 1 },
            { label: "Esgoto", value: 2 }
        ];
        this.displayRegistros = false;
        this.nome = sessionStorage.getItem('nome');
        //===============================================================
        //Indicadores reprovados
        this.listaReprovados = [];
        this.displayReprovados = false;
    }
    ngOnInit() {
        this.PopularArray();
    }
    PopularArray() {
        // this.bot=[];
        this.cadastro = [];
        this.status = [];
        this.medServ.cadastroMedidores().subscribe(cadastro => {
            this.cadastro = cadastro;
        });
    }
    salvarCSV() {
        var objeto = [];
        for (var i = 0; i < this.registros.length; i++) {
            console.log(this.registros[i].ativoFornecido);
            console.log(this.registros[i].ativoConsumido);
            console.log(this.registros[i].reativo);
            objeto.push({
                data_de_coleta: this.registros[i].timestamp,
                data_do_indicador: this.registros[i].dataIndicador,
                unidade: this.registros[i].unidade.nomeDoEquipamento,
                id_do_equipamento: this.registros[i].unidade.baseDeDados,
                ativo_fornecido: this.registros[i].ativoFornecido.toString().replace("\.", "\,"),
                ativo_consumido: this.registros[i].ativoConsumido.toString().replace("\.", "\,"),
                reativo: this.registros[i].reativo.toString().replace("\.", "\,"),
            });
        }
        CsvDataService.exportToCsv('dados.csv', objeto);
    }
    onDialogHide() {
        this.displayMedidor = false;
        this.selectMedidor = null;
    }
    AbrirMedidor(medidor) {
        this.selectMedidor = medidor;
        this.classificacaoselect = this.classificacoes[medidor.classificacao];
        console.log(this.classificacaoselect);
        this.displayMedidor = true;
    }
    SalvarMedidor(medidor) {
        medidor.classificacao = this.classificacaoselect.value;
        console.log(medidor);
        this.medServ.cadastroMedidoresAtualizar(medidor, this.tarifa).subscribe(result => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Salvo com sucesso' });
            this.PopularArray();
            this.displayMedidor = false;
        }, error => {
            this.messageService.add({ severity: 'warn', summary: 'Erro', detail: 'Erro' });
        });
    }
    //=======================================================================
    NovoMedidor() {
        this.selectMedidor = {
            idEquipamento: 0,
            baseDeDados: "",
            nomeDoEquipamento: "",
            indicadorkwm3: null,
            indicadorKw: null,
            indicadorrsm3: null,
            indicadorRs: null
        };
        this.displayMedidor = true;
    }
    onRegistrosHide() {
        this.displayRegistros = false;
        this.registros = null;
    }
    abrirParaAprovar(medidor) {
        this.displayRegistros = true;
        this.registros = [];
        this.medServ.statusMedidores(medidor.idEquipamento).subscribe(registros => {
            this.registros = registros;
        });
    }
    aprovaLinha(linha) {
        linha.aprovacao = 1;
        console.log(linha);
        console.log(this.registros);
    }
    nuloLinha(linha) {
        linha.aprovacao = null;
        console.log(linha);
        console.log(this.registros);
    }
    reprovaLinha(linha) {
        linha.aprovacao = 2;
        console.log(linha);
        console.log(this.registros);
    }
    finaliza() {
        if (this.tarifa !== null && this.tarifa !== undefined && this.tarifa !== 0) {
            for (var i = 0; i < this.registros.length; i++) {
                var obj = this.converterealizado(this.registros[i]);
                obj.aprovador = this.nome;
                if (obj.aprovacao === 1) {
                    this.medServ.statusMedidoresAtualizar(obj).subscribe(result => {
                        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Salvo com sucesso' });
                    }, error => {
                        this.messageService.add({ severity: 'warn', summary: 'Erro', detail: 'Erro' });
                    });
                }
                else if (obj.aprovacao === 2) {
                    this.listaReprovados.push(obj);
                }
            }
            if (this.listaReprovados.length > 0) {
                this.displayReprovados = true;
            }
            this.displayRegistros = false;
            this.displayMedidor = false;
            this.registros = [];
        }
        else {
            this.messageService.add({ severity: 'info', summary: 'info', detail: 'Preencha com a Tarifa' });
        }
    }
    finalizaReprovados() {
        if (this.tarifa !== null && this.tarifa !== undefined && this.tarifa !== 0) {
            for (var i = 0; i < this.listaReprovados.length; i++) {
                var obj = this.converterealizado(this.listaReprovados[i]);
                if (obj.aprovacao > 0) {
                    this.medServ.statusMedidoresAtualizar(obj).subscribe(result => {
                        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Salvo com sucesso' });
                    }, error => {
                        this.messageService.add({ severity: 'warn', summary: 'Erro', detail: 'Erro' });
                    });
                }
            }
            this.displayReprovados = false;
            this.listaReprovados = [];
        }
        else {
            this.messageService.add({ severity: 'info', summary: 'info', detail: 'Preencha com a Tarifa' });
        }
    }
    converterealizado(dado) {
        dado.ativoConsumido = dado.ativoConsumido;
        dado.ativoConsumidoRS = dado.ativoConsumido * this.tarifa;
        dado.ativoConsumidoRS = dado.ativoConsumidoRS;
        return dado;
    }
};
EquipamentosComponent = tslib_1.__decorate([
    Component({
        selector: 'app-equipamentos',
        templateUrl: './equipamentos.component.html',
        styles: [`
        .aprov-id {
            background-color: #1CA979 !important;
            color: #ffffff !important;
        }

        .reprov-id {
            background-color: #eb4034 !important;
            color: #ffffff !important;
        }
    `
        ]
    }),
    tslib_1.__metadata("design:paramtypes", [EnergiaService, MessageService])
], EquipamentosComponent);
export { EquipamentosComponent };
//# sourceMappingURL=equipamentos.component.js.map