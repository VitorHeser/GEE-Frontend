import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { TransporteService } from '../../transporte.service';
let AgendarVeiculoComponent = class AgendarVeiculoComponent {
    constructor(transporteService, messageService) {
        this.transporteService = transporteService;
        this.messageService = messageService;
        this.ArrCondutores = [];
        this.OpcEmergencial = false;
    }
    ngOnInit() {
        this.IdSolicitante = sessionStorage.getItem('id');
        this.OpcSolicitante = sessionStorage.getItem('nome');
        this.EmailSolicitante = sessionStorage.getItem('email');
        this.ArrCondutores = [];
        this.ArrTipoVeiculo = [];
        this.ArrDestinos = [];
        this.transporteService.Condutores().subscribe(response => {
            for (var i = 0; i < response.length; i++) {
                var array = { label: response[i].nome, value: response[i].nome };
                this.ArrCondutores.push(array);
            }
        });
        this.ArrTipoVeiculo = [
            { label: '', value: '' },
            { label: 'AMAROK', value: 'AMAROK' },
            { label: 'VW EXPRESS DRC 4X2', value: 'VW EXPRESS DRC 4X2' },
            { label: 'STRADA', value: 'STRADA' },
            { label: 'S-10 LS - MT', value: 'S-10 LS - MT' },
            { label: 'RETRO CATERPILLAR', value: 'RETRO CATERPILLAR' },
            { label: 'PRISMA LT - AT', value: 'PRISMA LT - AT' },
            { label: 'ONIX LT - AT', value: 'ONIX LT - AT' },
            { label: 'ONIX 1.0 LS - MT', value: 'ONIX 1.0 LS - MT' },
            { label: 'MONTANA LS - MT', value: 'MONTANA LS - MT' },
            { label: 'HONDA 150', value: 'HONDA 150' },
            { label: 'HONDA 125', value: 'HONDA 125' },
            { label: 'COROLLA', value: 'COROLLA' },
            { label: 'COROLLA GLI', value: 'COROLLA GLI' },
            { label: 'CAMINHAO', value: 'CAMINHAO' }
        ];
        this.ArrDestinos = [
            { label: '', value: '' },
            { label: 'ARARUAMA', value: 'ARARUAMA' },
            { label: 'ARMAÇÃO DOS BÚZIOS', value: 'ARMAÇÃO DOS BÚZIOS' },
            { label: 'ARRAIAL DO CABO', value: 'ARRAIAL DO CABO' },
            { label: 'CABO FRIO', value: 'CABO FRIO' },
            { label: 'CABO FRIO TAMOIOS', value: 'CABO FRIO TAMOIOS' },
            { label: 'SÃO PEDRO DA ALDEIA', value: 'SÃO PEDRO DA ALDEIA' },
            { label: 'SÃO VICENTE DE PAULO', value: 'SÃO VICENTE DE PAULO' },
            { label: 'NITERÓI', value: 'NITERÓI' },
            { label: 'RIO DE JANEIRO', value: 'RIO DE JANEIRO' },
            { label: 'RIO DAS OSTRAS', value: 'RIO DAS OSTRAS' },
            { label: 'IGUABA GRANDE', value: 'IGUABA GRANDE' }
        ];
        this.menorData();
    }
    checagem() {
        var campos = "Favor preencher os campos pendentes: ";
        if (this.OpcCondutores == null) {
            campos = campos + "Condutor | ";
        }
        if (this.OpcData == null) {
            campos = campos + "Data | ";
        }
        if (this.OpcDe == null) {
            campos = campos + "De | ";
        }
        if (this.OpcAte == null) {
            campos = campos + "Até | ";
        }
        if (this.OpcQtd == null) {
            campos = campos + "Qtd. Pessoas | ";
        }
        if (this.OpcJustificativa == null) {
            campos = campos + "Justificativa | ";
        }
        if (this.OpcDestinos == null) {
            campos = campos + "Destino | ";
        }
        if (this.OpcCondutores == null) {
            campos = campos + "Condutor | ";
        }
        if (campos.length > 38) {
            this.messageService.add({ sticky: true, severity: 'info', summary: 'Incompleto!',
                detail: campos });
        }
        else {
            if (this.OpcDe < this.OpcAte) {
                this.SalvarAgendamento();
                this.messageService.add({ sticky: true, severity: 'info', summary: 'Solicitação Enviada!',
                    detail: "Soliciação enviada com sucesso." });
            }
            else {
                this.messageService.add({ sticky: true, severity: 'info', summary: 'Erro de Lógica',
                    detail: "O campo \'De\' não pode ser maior do que o campo \'Até\'!" });
            }
        }
        ;
    }
    SalvarAgendamento() {
        var agendamento;
        var data1 = this.OpcData;
        var hora1 = this.OpcDe;
        var hora2 = this.OpcAte;
        agendamento = {
            agendamentoId: null,
            fksolicitante: null,
            emailsolicitante: this.EmailSolicitante,
            justificativasolicitacao: this.OpcJustificativa,
            agendadode: this.dataAtualFormatada(data1, hora1),
            agendadoate: this.dataAtualFormatada(data1, hora2),
            condutor: this.OpcCondutores,
            justificativa: null,
            destino: this.OpcDestinos,
            emergencial: this.OpcEmergencial,
            placa: null,
            aprovacao: null,
            qtdPessoas: this.OpcQtd,
            solicitante: this.OpcSolicitante,
            aprovador: null,
            emailaprovador: null,
            dataAgendamento: null,
            tipoVeiculoSolicitado: this.OpcTipoVeiculo,
            tipoVeiculoDisponibilizado: null,
        };
        console.log(agendamento);
        this.transporteService.InputAgendamento(agendamento).subscribe(response => {
            if (response.status === 201) {
                this.messageService.add({ sticky: true, severity: 'success', summary: 'Dados Salvos!',
                    detail: 'Dados enviados com sucesso!' });
                console.log('Dados enviados com sucesso!');
            }
        }, error => {
            this.messageService.add({ severity: 'error', summary: "Dados não Enviados!", detail: error.message, life: 500 });
            console.log(error);
        });
        this.OpcCondutores = null;
        this.OpcQtd = null;
        this.OpcTipoVeiculo = null;
        this.OpcAte = null;
        this.OpcDe = null;
        this.OpcData = null;
        this.OpcDestinos = null;
        this.OpcCondutores = null;
        this.OpcJustificativa = null;
    }
    menorData() {
        let today = new Date();
        let day = today.getDate();
        let month = today.getMonth();
        let year = today.getFullYear();
        this.minDate = new Date();
        this.minDate.setDate(day);
        this.minDate.setMonth(month);
        this.minDate.setFullYear(year);
    }
    verificarEmergencial() {
        let today = String(Number(new Date())).substring(0, 6);
        let data = String(Number(this.OpcData)).substring(0, 6);
        if (today == data) {
            this.OpcEmergencial = true;
        }
        else {
            this.OpcEmergencial = false;
        }
    }
    dataAtualFormatada(datareceb, horareceb) {
        var hora = horareceb, dia1 = hora.getDate().toString().padStart(2, '0'), mes1 = (hora.getMonth() + 1).toString().padStart(2, '0'), //+1 pois no getMonth Janeiro começa com zero.
        ano1 = hora.getFullYear(), hora1 = hora.getHours(), minuto1 = hora.getMinutes();
        var data = datareceb, dia2 = data.getDate().toString().padStart(2, '0'), mes2 = (data.getMonth() + 1).toString().padStart(2, '0'), //+1 pois no getMonth Janeiro começa com zero.
        ano2 = data.getFullYear(), hora2 = data.getHours(), minuto2 = data.getMinutes();
        return ano2 + "-" + mes2 + "-" + dia2 + " " + hora1 + ":" + minuto1 + ":00";
    }
};
AgendarVeiculoComponent = tslib_1.__decorate([
    Component({
        selector: 'app-agendar-veiculo',
        templateUrl: './agendar-veiculo.component.html',
        styleUrls: ['./agendar-veiculo.component.css']
    }),
    tslib_1.__metadata("design:paramtypes", [TransporteService,
        MessageService])
], AgendarVeiculoComponent);
export { AgendarVeiculoComponent };
//# sourceMappingURL=agendar-veiculo.component.js.map