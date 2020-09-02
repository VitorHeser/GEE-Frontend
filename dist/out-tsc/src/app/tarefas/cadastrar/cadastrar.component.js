import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Tarefa } from '../shared';
import { TarefaService } from './../shared/tarefa.service';
let CadastrarComponent = class CadastrarComponent {
    constructor(tarefaService, router) {
        this.tarefaService = tarefaService;
        this.router = router;
    }
    ngOnInit() {
        this.tarefa = new Tarefa();
    }
    cadastrar() {
        if (this.validarFormulario()) {
            this.tarefaService.cadastrar(this.tarefa);
            this.router.navigate(['tarefas']);
        }
    }
    validarFormulario() {
        return this.formTarefa.form.valid;
    }
};
tslib_1.__decorate([
    ViewChild('formTarefa', { static: false }),
    tslib_1.__metadata("design:type", NgForm)
], CadastrarComponent.prototype, "formTarefa", void 0);
CadastrarComponent = tslib_1.__decorate([
    Component({
        selector: 'app-cadastrar',
        templateUrl: './cadastrar.component.html',
        styleUrls: ['./cadastrar.component.css']
    }),
    tslib_1.__metadata("design:paramtypes", [TarefaService,
        Router])
], CadastrarComponent);
export { CadastrarComponent };
//# sourceMappingURL=cadastrar.component.js.map