import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Tarefa } from './tarefa.model';
let TarefaService = class TarefaService {
    constructor() { }
    buscar() {
        return this.buscarDados();
    }
    cadastrar(tarefa) {
        tarefa.setId((new Date()).getTime());
        tarefa.setConcluida(false);
        let tarefas = this.buscar();
        tarefas.push(tarefa);
        this.atualizarDados(tarefas);
    }
    buscarPorId(id) {
        let tarefas = this.buscar();
        return tarefas.find(tarefa => tarefa.getId() === id);
    }
    editar(tarefaAtulizada) {
        let tarefas = this.buscar();
        tarefas.forEach((tarefa, index, array) => {
            if (tarefa.getId() == tarefaAtulizada.getId()) {
                array[index] = tarefaAtulizada;
            }
        });
        this.atualizarDados(tarefas);
    }
    remover(tarefaRemovida) {
        let tarefas = this.buscar();
        tarefas = tarefas.filter(tarefa => tarefa.getId() != tarefaRemovida.getId());
        this.atualizarDados(tarefas);
    }
    alterarStatus(tarefa) {
        tarefa.setConcluida(!tarefa.estaConcluida());
        this.editar(tarefa);
    }
    buscarDados() {
        let dados = localStorage.getItem('tarefas');
        //console.log(dados)
        let tarefas = [];
        if (dados) {
            tarefas = JSON.parse(dados);
            tarefas.forEach((tarefa, index, array) => {
                //console.log(tarefa)
                //console.log(index)
                //console.log(array)
                //if(index===0){
                array[index] = new Tarefa(tarefa.id, tarefa.nome, tarefa.inicioPrevisto, tarefa.dataInicio, tarefa.conclusaoPrevista, tarefa.dataConclusao, tarefa.responsavel, tarefa.concluida);
                //}
            });
        }
        console.log(tarefas);
        return tarefas;
    }
    atualizarDados(tarefas) {
        let dados = JSON.stringify(tarefas);
        localStorage.setItem('tarefas', dados);
    }
};
TarefaService = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [])
], TarefaService);
export { TarefaService };
//# sourceMappingURL=tarefa.service.js.map