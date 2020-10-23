import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { TarefaService } from './../shared/tarefa.service';
let EditarComponent = class EditarComponent {
    constructor(tarefaService, route, router) {
        this.tarefaService = tarefaService;
        this.route = route;
        this.router = router;
    }
    ngOnInit() {
        let id = +this.route.snapshot.params.id;
        if (!Number.isInteger(id)) {
            this.router.navigate(['tarefas']);
        }
        this.tarefa = this.tarefaService.buscarPorId(id);
    }
    editar() {
        if (this.validarFormulario()) {
            this.tarefaService.editar(this.tarefa);
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
], EditarComponent.prototype, "formTarefa", void 0);
EditarComponent = tslib_1.__decorate([
    Component({
        selector: 'app-editar',
        templateUrl: './editar.component.html',
        styleUrls: ['./editar.component.css']
    }),
    tslib_1.__metadata("design:paramtypes", [TarefaService,
        ActivatedRoute,
        Router])
], EditarComponent);
export { EditarComponent };
//# sourceMappingURL=editar.component.js.map