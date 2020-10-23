import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { TransporteService } from '../transporte.service';
let CadastroComponent = class CadastroComponent {
    constructor(transporteService, messageService) {
        this.transporteService = transporteService;
        this.messageService = messageService;
        this.atualizarListagem();
    }
    ngOnInit() {
        this.cadpool = false;
        this.caddevolvido = false;
        this.cadgps = false;
        this.cadoficina = false;
        this.items = [
            { label: 'Lista de veículos' },
            { label: 'Cadastrar Novo' }
        ];
        let today = new Date();
        let invalidDate = new Date();
        invalidDate.setDate(today.getDate() - 1);
        this.invalidDates = [today, invalidDate];
        this.Supervisoes = [
            { label: '' },
        ];
        this.transporteService.Condutores().subscribe(response => {
            for (var i = 0; i < response.length; i++) {
                var array = { label: response[i].nome, value: response[i].nome };
                this.condutores.push(array);
            }
        });
        this.tipoVeiculo = [
            { label: '' },
            { label: 'MOTO', value: 'MOTO' },
            { label: 'CARRO', value: 'CARRO' },
            { label: 'VEÍCULO PESADO', value: 'VEÍCULO PESADO' }
        ];
        this.GPS = [
            { label: '' },
            { label: 'Com GPS' },
            { label: 'Sem GPS' }
        ];
        this.modelos = [
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
            { label: 'CAMINHAO', value: 'CAMINHAO' },
            { label: 'AMAROK', value: 'AMAROK' }
        ];
        this.locadoras = [
            { label: '' },
            { label: 'LVE', value: 'LVE' },
            { label: 'OURO VERDE', value: 'OURO VERDE' }
        ];
        this.adicionais = [
            { label: '', value: '' },
            { label: 'MUNCK', value: 'MUNCK' },
            { label: 'PIPA 2m/³', value: 'PIPA 2m/³' },
            { label: 'PIPA 5m/³', value: 'PIPA 5m/³' },
            { label: 'PIPA 10m/³', value: 'PIPA 10m/³' },
            { label: 'PIPA 20m/³', value: 'PIPA 20m/³' },
            { label: 'PIPA 35m/³', value: 'PIPA 35m/³' }
        ];
        this.trocadeitemIndex(0);
    }
    Filter() {
        this.VALOR1 = this.VALOR1 == undefined ? null : this.VALOR1 == "" ? null : this.VALOR1;
        this.VALOR2 = this.VALOR2 == undefined ? null : this.VALOR2 == "" ? null : this.VALOR2;
        this.VALOR3 = this.VALOR3 == undefined ? null : this.VALOR3 == "" ? null : this.VALOR3;
        this.VALOR4 = this.VALOR4 == undefined ? null : this.VALOR4 == "" ? null : this.VALOR4;
        var agend = this.cars0;
        if (this.VALOR1 !== null) {
            console.log(this.VALOR1);
            agend = agend.filter(item => item.placa.toUpperCase().includes(this.VALOR1.toUpperCase()));
        }
        else if (this.VALOR2 !== null) {
            console.log(this.VALOR2);
            agend = agend.filter(item => item.gerencia.toUpperCase().includes(this.VALOR2.toUpperCase()));
        }
        else if (this.VALOR3 !== null) {
            console.log(this.VALOR3);
            agend = agend.filter(item => item.responsavel.toUpperCase().includes(this.VALOR3.toUpperCase()));
        }
        else if (this.VALOR4 !== null) {
            console.log(this.VALOR4);
            agend = agend.filter(item => item.modelo.toUpperCase().includes(this.VALOR4.toUpperCase()));
            // }else if(this.VALOR5=false){
            //   this.cars = agend
            // }else if(this.VALOR6=false){
            //   this.cars = agend
            // }else if(this.VALOR6=true){
            //     agend = agend.filter(item => item.oficina == this.VALOR6)
            // }else if(this.VALOR5=true){
            //   agend = agend.filter(item => item.pool == this.VALOR5)
        }
        this.cars = agend;
    }
    // filter(){
    //   console.log("============")
    //   this.cars = this.cars0
    //   if(this.sortKey == '0'){
    //     this.cars = this.cars0
    //   }else{
    //     for(var i = 0; i<this.cars0.length; i++ ){
    //       console.log("index = "+i+" de "+this.cars0.length)
    //       var modelo:string=this.cars0[i].brand ;
    //       var modelocomp:string=this.modelos[(this.sortKey-1)].label ;
    //       if(modelo == modelocomp){
    //         this.cars.push(
    //           {
    //             vin: this.cars0[i].vin,
    //             brand: this.cars0[i].brand,
    //             color: this.cars0[i].color,
    //             placa: this.cars0[i].placa,
    //             year: this.cars0[i].year,
    //           }
    //         )
    //       }
    //     }
    //   }
    // }
    trocadeitem(activeItem) {
        this.activeItem = activeItem['activeItem'];
        this.activeItemIndex = this.items.indexOf(this.activeItem);
    }
    trocadeitemIndex(index) {
        this.activeItem = this.items[index];
        this.activeItemIndex = index;
    }
    atualizarListagem() {
        this.cars0 = [];
        this.cars = [];
        this.transporteService.veiculos()
            .subscribe(Veiculos => {
            this.cars0 = Veiculos;
            this.cars = Veiculos;
            this.cars2 = Veiculos;
        });
        this.transporteService.Gerencias()
            .subscribe(Gerencias => {
            this.Gerencias = Gerencias;
        });
        this.limpar();
    }
    //==========================================================================================================================
    //SALVAR CADASTRO DE VEICULO================================================================================================
    selectCar(car) {
        this.selectedCar = car;
        this.displayDialog = true;
        event.preventDefault();
    }
    onDialogHide() {
        this.selectedCar = null;
    }
    SalvarVeiculo() {
        var placa = this.cadplaca;
        var chassi = this.cadchassi;
        var modelo = this.cadmodelo;
        var capac = this.cadcapacidadem3;
        var resp = this.cadresponsavel;
        var Tveic = this.cadtipoVeiculo;
        var ger = this.cadgerencia;
        var loca = this.cadlocadora;
        var supe = this.cadsupervisao;
        var pool = this.cadpool;
        var cgps = this.cadgps;
        var cofi = this.cadoficina;
        var cdev = this.caddevolvido;
        var veiculo = {
            veiculoId: null,
            datCad: null,
            placa: placa,
            chassi: chassi,
            modelo: modelo,
            capacidadem3: capac,
            responsavel: resp,
            tipoVeiculo: Tveic,
            gerencia: ger,
            locadora: loca,
            supervisao: supe,
            pool: pool,
            gps: cgps,
            oficina: cofi,
            devolvido: cdev,
        };
        console.log(veiculo);
        this.transporteService.InputVeiculo(veiculo).subscribe(response => {
            console.log(response);
        });
        this.limpar();
    }
    //==========================================================================================================================
    editCar(car) {
        this.editedCar = car;
        this.editveiculoId = car.veiculoId;
        this.editdatCad = car.datCad;
        this.editplaca = car.placa;
        this.editchassi = car.chassi;
        this.editmodelo = car.modelo;
        this.editcapacidadem3 = car.capacidadem3;
        this.editresponsavel = car.responsavel;
        this.edittipoVeiculo = car.tipoVeiculo;
        this.editgerencia = car.gerencia;
        this.editlocadora = car.locadora;
        this.editsupervisao = car.supervisao;
        this.editpool = car.pool;
        this.editgps = car.gps;
        this.editoficina = car.oficina;
        this.editdevolvido = car.devolvido;
        this.displayEdit = true;
        event.preventDefault();
    }
    onEditHide() {
        this.editedCar = null;
        this.limpar();
    }
    EditarVeiculo() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.editedCar = {
                veiculoId: this.editveiculoId,
                datCad: this.editdatCad,
                placa: this.editplaca,
                chassi: this.editchassi,
                modelo: this.editmodelo,
                capacidadem3: this.editcapacidadem3,
                responsavel: this.editresponsavel,
                tipoVeiculo: this.edittipoVeiculo,
                gerencia: this.editgerencia,
                gps: this.editgps,
                devolvido: this.editdevolvido,
                supervisao: this.editsupervisao,
                locadora: this.editlocadora,
                pool: this.editpool,
                oficina: this.editoficina
            };
            this.transporteService.UpdateVeiculo(this.editedCar).subscribe(response => {
                console.log(response);
            });
            yield new Promise(r => setTimeout(r, 500));
            this.atualizarListagem();
            this.displayDialog = false;
            this.displayEdit = false;
            this.cars0 = [];
            this.cars = [];
        });
    }
    find(Arrays, attribute) {
        for (var i = 0; i < Arrays.length; i++) {
            if (Arrays[i].label == attribute) {
                return i;
            }
        }
    }
    limpar() {
        this.cadplaca = null;
        this.cadchassi = null;
        this.cadmodelo = null;
        this.cadcapacidadem3 = null;
        this.cadresponsavel = null;
        this.cadtipoVeiculo = null;
        this.cadgerencia = null;
        this.cadlocadora = null;
        this.cadsupervisao = null;
        this.cadpool = null;
        this.cadgps = null;
        this.cadoficina = null;
        this.caddevolvido = null;
    }
    dataAtualFormatada(datareceb) {
        var data = datareceb, dia2 = data.getDate().toString().padStart(2, '0'), mes2 = (data.getMonth() + 1).toString().padStart(2, '0'), //+1 pois no getMonth Janeiro começa com zero.
        ano2 = data.getFullYear(), hora2 = data.getHours(), minuto2 = data.getMinutes();
        return ano2 + "-" + mes2 + "-" + dia2;
    }
};
CadastroComponent = tslib_1.__decorate([
    Component({
        selector: 'app-cadastro',
        templateUrl: './cadastro.component.html',
        styleUrls: ['./cadastro.component.css']
    }),
    tslib_1.__metadata("design:paramtypes", [TransporteService,
        MessageService])
], CadastroComponent);
export { CadastroComponent };
//# sourceMappingURL=cadastro.component.js.map