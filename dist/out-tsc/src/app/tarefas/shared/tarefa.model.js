export class Tarefa {
    constructor(id, nome, inicioPrevisto, dataInicio, conclusaoPrevista, dataConclusao, responsavel, concluida) {
        this.id = id;
        this.nome = nome;
        this.inicioPrevisto = inicioPrevisto;
        this.dataInicio = dataInicio;
        this.conclusaoPrevista = conclusaoPrevista;
        this.dataConclusao = dataConclusao;
        this.responsavel = responsavel;
        this.concluida = concluida;
    }
    getId() {
        return this.id;
    }
    setId(id) {
        this.id = id;
    }
    getNome() {
        return this.nome;
    }
    setNome(nome) {
        this.nome = nome;
    }
    getInicioPrevisto() {
        return this.inicioPrevisto;
    }
    setInicioPrevisto(inicioPrevisto) {
        this.inicioPrevisto = inicioPrevisto;
    }
    getConclusaoPrevista() {
        return this.conclusaoPrevista;
    }
    setConclusaoPrevista(conclusaoPrevista) {
        this.conclusaoPrevista = conclusaoPrevista;
    }
    getDataInicio() {
        return this.dataInicio;
    }
    setDataInicio(dataInicio) {
        this.dataInicio = dataInicio;
    }
    getDataConclusao() {
        return this.dataConclusao;
    }
    setDataConclusao(dataConclusao) {
        this.dataConclusao = dataConclusao;
    }
    setResponsavel(responsavel) {
        this.responsavel = responsavel;
    }
    getResponsavel() {
        return this.responsavel;
    }
    estaConcluida() {
        return this.concluida;
    }
    setConcluida(concluida) {
        this.concluida = concluida;
    }
    getConcluida() {
        return this.concluida;
    }
}
//# sourceMappingURL=tarefa.model.js.map