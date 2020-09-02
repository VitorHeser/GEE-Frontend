import * as tslib_1 from "tslib";
import { Component, Injectable } from '@angular/core';
import { GestaoDeliberacaoService } from '../gestaodeliberacao.service';
let PrintdeliberacaoComponent = class PrintdeliberacaoComponent {
    constructor(service) {
        this.service = service;
        this.modelos = [
            { label: 'Defesa Procedente', value: 'DP' },
            { label: 'Defesa Improcedente', value: 'DI' },
            { label: 'Sem Defesa', value: 'SD' },
            { label: 'Ausente', value: 'A' }
        ];
    }
    ngOnInit() {
    }
    // numResid: string, compl: string, cep: string,
    criaPDF(modelo, delib, rua, bairro, cidade, datJulgado, processo, termo, datNotificacao, matricula, irreg1, irreg2, irreg3, nome, multa, meses, datDefesa, checkOcorrencia, hd, rua2, ruaEntrega, nroEntrega, complementoEntrega, bairroEntrega, cidadeEntrega, checkPresenca, dataAR) {
        this.modelo = modelo;
        console.log(datNotificacao);
        var blank = document.getElementById('branco').innerHTML;
        var img = document.getElementById('img').innerHTML;
        var img2 = document.getElementById('img2').innerHTML;
        var capa = document.getElementById('capa').innerHTML;
        var aviso = document.getElementById('aviso').innerHTML;
        function capitalizar(text) {
            var loweredText = text.toLowerCase();
            var words = loweredText.split(" ");
            for (var a = 0; a < words.length; a++) {
                var w = words[a];
                var firstLetter = w[0];
                if (w.length > 3) {
                    w = firstLetter.toUpperCase() + w.slice(1);
                }
                else if (w.length == 1 && firstLetter != 'e') {
                    w = firstLetter.toUpperCase();
                }
                else {
                    w = firstLetter + w.slice(1);
                }
                words[a] = w;
            }
            return words.join(" ");
        }
        var months = ["Janeiro", "Fevereiro", "Marco", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
        var singPlural;
        if (irreg2 === '') {
            singPlural = ' a seguinte irregularidade ';
        }
        else {
            singPlural = ' as seguintes irregularidades ';
        }
        var rdp1;
        switch (this.modelo) {
            case 'DP':
                rdp1 = ".rodape {text-align: left; margin: 122px 90px 0px 90px; font: 10px  Calibri; }";
                break;
            case 'DI':
                rdp1 = ".rodape {text-align: left; margin: 85px 90px 0px 90px; font: 10px  Calibri; }";
                break;
            case 'A':
                rdp1 = ".rodape {text-align: lef; margin: 36px 90px 0px 90px; font: 10px  Calibri; }";
                break;
            default:
                rdp1 = ".rodape {text-align: left; margin: 70px 90px 0px 90px; font: 10px  Calibri; }";
        }
        var style = "<style>";
        style = style + "#imagem {float:center;width: 100%; height: 1080px;}";
        style = style + "#assinatura {float:center;width: 100%;  margin-top: -250px; position: relative;}";
        style = style + "table {width: 100%;font: 20px Calibri; margin-top:60px;}";
        style = style + "table, th, td {border: solid 1px #DDD; border-collapse: collapse;}";
        style = style + "hr{display: inline-block; border-style: 0.5 px solid; margin-left: 50px; margin-bottom: -15px; width: 80%; border-width: 0; height: 1px; border-top-width: 1px; }";
        style = style + ".titulo {text-align: center; margin-top: -980px;font: 15.5px  Calibri; }";
        style = style + ".titcapa {text-align: center; margin-top: -740px;font: 26px  Calibri; }";
        style = style + ".cabecalho {text-align: left; margin: 30px 90px 0px 90px; font: 15.5px  Calibri; }";
        style = style + ".corpo {text-align: left; margin: 30px 90px 0px 90px; font: 15.5px  Calibri; }";
        style = style + ".infocapa {text-align: left; margin: 160px 90px 0px 120px; font: 18px  Calibri; padding-bottom: 15px;}";
        style = style + ".infoaviso {text-align: left; margin: 92.5px 85px 0px 110px; font: 13.5px  Calibri; line-height: 14px;}";
        style = style + ".infoaviso2 {text-align: left; margin: 284px 85px 0px 110px; font: 13.5px  Calibri; line-height: 14px;}";
        style = style + ".marcapa {text-align: left; margin: 134.5px 90px 0px 120px; font: 18px  Calibri; padding-bottom: 15px;}";
        style = style + ".direita {padding-left: 292px}";
        style = style + ".direitinha {padding-left: 18px}";
        style = style + ".dia {padding-left: 165px;}";
        style = style + ".mesano {padding-left: 14px;}";
        style = style + rdp1;
        style = style + ".rodape2 {text-align: left;margin: 52px 90px 0px 90px; font: 10px  Calibri; }";
        style = style + ".citacao {text-align: left;margin: 30px 95px 0px 95px; font: 15.5px  Calibri; }";
        style = style + "</style>";
        // CRIA UM OBJETO WINDOW
        var win = window.open('', '', 'height=950,width=1050');
        win.document.write('<html><head>');
        win.document.write('<title>PROCESSO ADMINISTRATIVO ' + processo + '</title>'); // <title> CABEÇALHO DO PDF
        //************************************Criando a Impressão***********************************************
        win.document.write(style); // INCLUI UM ESTILO NA TAB HEAD 
        win.document.write('</head>');
        win.document.write('<body>');
        //*********************************** Capa************************************************************
        win.document.write(capa);
        win.document.write('<div class="titcapa"><b>' + processo + '</b>');
        win.document.write('</div>');
        win.document.write('<div class="infocapa">' +
            '<p><b>Matrícula: </b>' + matricula + '</p>' +
            '<p><b>Termo de Ocorrência: </b>' + termo + '</p>' +
            '<p><b>Endereço: </b>' + capitalizar(rua2 + ' - ' + bairro + ' - ' + cidade) + ' - RJ' + '</p>' +
            '<p><b>Nome: </b>' + capitalizar(nome) + '</p>');
        win.document.write('</div>');
        if (modelo === 'DP' || modelo === 'DI') {
            win.document.write('<div class="marcapa">' +
                '<spam>X</spam>' +
                '<spam class="dia">' + ("00" + datNotificacao.getDate()).slice(-2) + '</spam>' +
                '<spam class="mesano">' + ("00" + (datNotificacao.getMonth().valueOf() + 1).toString()).slice(-2) + '</spam>' +
                '<spam class="mesano">' + datNotificacao.getFullYear() + '</spam>' +
                '<p>' +
                '<spam>X</spam>' +
                '<spam class="dia">' + ("00" + datDefesa.getDate()).slice(-2) + '</spam>' +
                '<spam class="mesano">' + ("00" + datDefesa.getMonth()).slice(-2) + '</spam>' +
                '<spam class="mesano">' + datDefesa.getFullYear() + '</spam>' +
                '<spam class="direitinha">X</spam>' +
                '<spam class="dia">' + ("00" + datJulgado.getDate()).slice(-2) + '</spam>' +
                '<spam class="mesano">' + ("00" + datJulgado.getMonth() + 1).slice(-2) + '</spam>' +
                '<spam class="mesano">' + datJulgado.getFullYear() + '</spam></p>');
        }
        else {
            win.document.write('<div class="marcapa">' +
                '<spam>X</spam>' +
                '<spam class="dia">' + ("00" + datNotificacao.getDate()).slice(-2) + '</spam>' +
                '<spam class="mesano">' + ("00" + (datNotificacao.getMonth().valueOf() + 1).toString()).slice(-2) + '</spam>' +
                '<spam class="mesano">' + datNotificacao.getFullYear() + '</spam>' +
                '<p><spam class="direita">X</spam>' +
                '<spam class="dia">' + ("00" + datJulgado.getDate()).slice(-2) + '</spam>' +
                '<spam class="mesano">' + ("00" + datJulgado.getMonth() + 1).slice(-2) + '</spam>' +
                '<spam class="mesano">' + datJulgado.getFullYear() + '</spam></p>');
        }
        win.document.write('</div>');
        console.log(datNotificacao.getMonth());
        //*********************************** Pg Branco************************************************************
        win.document.write(blank);
        win.document.write('<div class="titulo">');
        win.document.write('</div>');
        win.document.write('<div class="corpo">');
        win.document.write('</div>');
        //*********************************** Indice************************************************************
        win.document.write(img);
        var topicos = ['Capa', 'Índice', 'Aviso de deliberação', 'Deliberação', 'Aviso de recebimento de auto de infração', 'Auto de Infração'];
        if (this.modelo === 'SD' || this.modelo === 'A') {
            topicos.push('Carta Defesa não apresentada');
        }
        else {
            topicos.push('Carta Defesa');
        }
        if (meses > 0) {
            topicos.push('Memória de Cáculo Retroativo');
        }
        if (checkOcorrencia == 1) {
            topicos.push('Registro de Ocorrência');
        }
        topicos.push('Fotos/Evidências');
        win.document.write('<div class="titulo">');
        win.document.write('</div>');
        win.document.write('<div class="corpo">');
        win.document.write('<p align="center">' +
            '<b>ÍNDICE</b>' +
            '</p>');
        win.document.write('<p align="left">');
        for (var index = 1; (index - 1) < topicos.length; index++) {
            win.document.write(index + ' - ' + topicos[index - 1] + '</p>');
        }
        win.document.write('</div>');
        //*********************************** Pg Branco************************************************************
        win.document.write(blank);
        win.document.write('<div class="titulo">');
        win.document.write('</div>');
        win.document.write('<div class="corpo">');
        win.document.write('</div>');
        //*********************************** Aviso************************************************************
        win.document.write(aviso);
        win.document.write('<div class="titulo">');
        win.document.write('</div>');
        var und = /  /gi;
        var comp = complementoEntrega.replace(und, " ");
        win.document.write('<div class="infoaviso">' +
            capitalizar(nome) +
            '<br>' + capitalizar(ruaEntrega + ' nº ' + nroEntrega + ' ' + comp) +
            '<br>' + capitalizar(bairroEntrega) +
            '<br>' + capitalizar(cidadeEntrega) +
            '<br>' + processo +
            '<br>' + hd);
        win.document.write('</div>');
        win.document.write('<div class="infoaviso2">' +
            capitalizar(nome) +
            '<br>' + capitalizar(ruaEntrega + ' nº ' + nroEntrega + ' ' + comp) +
            '<br>' + capitalizar(bairroEntrega) +
            '<br>' + capitalizar(cidadeEntrega) +
            '<br>' + processo +
            '<br>' + hd);
        win.document.write('</div>');
        //*********************************** Pg Branco************************************************************
        win.document.write(blank);
        win.document.write('<div class="titulo">');
        win.document.write('</div>');
        win.document.write('<div class="corpo">');
        win.document.write('</div>');
        var i = 0;
        while (i <= 1) { // 2 vias da deliberação
            //********************************** Primeira Página****************************************************
            if (this.modelo === 'DP') {
                win.document.write(img2);
            }
            else {
                win.document.write(img);
            }
            //Título
            win.document.write('<div class="titulo">');
            win.document.write('<b>DELIBERAÇÃO ' + delib + '</b>'); // VAriável deliberação             
            win.document.write('</div>');
            //Cabeçalho
            win.document.write('<div class="cabecalho"><p align="justify">');
            win.document.write('<b>Ao Morador</b><br>');
            var und = /  /gi;
            var ruau = rua.replace(und, " ");
            win.document.write('End.: ' + capitalizar(ruau + ' - ' + bairro + ' - ' + cidade) + ' - RJ<br>'); //Aqui entra a variavel endereço de entrega
            win.document.write('São Pedro da Aldeia/RJ, ' + ("00" + datJulgado.getDate()).slice(-2) + ' de ' + months[datJulgado.getMonth()] + ' de ' + datJulgado.getFullYear() + '</p><br>'); // Aqui entra a variável de data Julgado     <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
            win.document.write('<p><b>Ref.: Processo Administrativo n° ' + processo + '</b></p>'); // variavel processo
            if (this.modelo === 'SD') {
                win.document.write('<p><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Termo de Ocorrência n° ' + termo + '</b></p>'); // variável termo de Ocorrencia
            }
            win.document.write('</div>');
            win.document.write('<div class="corpo">');
            //Primeiro Parágrafo  ****************************************************************************************************************************/
            win.document.write('<p align="justify">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
                '<b>PROLAGOS S.A. – CONCESSIONÁRIA DE SERVIÇOS PÚBLICOS DE ÁGUA E ESGOTO</b>, ' +
                'neste ato, representada por sua <b>COMISSÃO DE RECUPERAÇÃO DE PERDAS</b>, <b>INFORMA A V.S.(ª)</b>');
            if (this.modelo === 'SD' || this.modelo === 'A') {
                win.document.write(' no dia ' + ("00" + datNotificacao.getDate()).slice(-2) + ' de ' + months[datNotificacao.getMonth()] + ' de ' + datNotificacao.getFullYear() + ',' + // Aqui entra a variável de data Notificação
                    'os fiscais desta Concessionária, ao comparecerem no imóvel ');
                if (this.modelo === 'A') {
                    win.document.write('sob a Matrícula nº ' + matricula + ', constataram' + singPlural + 'na ligação: <b>' + // Variável Matrícula
                        irreg1 + irreg2 + irreg3 + '</b>'); //Variáveis irregularidades 
                }
                else {
                    win.document.write('localizado no(a) Rua ' + capitalizar(rua) + ', Bairro, ' + capitalizar(bairro) + ', no Município de ' + capitalizar(cidade) + '/RJ' + //Aqui entram a variáveis de endereço da residência
                        ' tendo constatado irregularidade na ligação de água,');
                }
                win.document.write(' o que resultou na formalização do Termo de Ocorrência sob nº ' + termo + ' ' + // Variável termo de ocorrencia
                    'e instauração do Processo Administrativo ' + processo + ', ambos epigrafados, nos termos do Decreto Lei 22.872/1996 que regulamenta os Serviços Públicos de' + //Variável processo
                    ' Abastecimento de Água e Esgoto no Estado do Rio de Janeiro.' +
                    '</p>');
            }
            else {
                win.document.write(' que nos termos da <b><u>DELIBERAÇÃO nº ' +
                    delib + //Aqui entra a variável de n° de deliberação e ano
                    '</u></b> foi dado ciência sobre a possibilidade de apresentação de defesa, no prazo ' +
                    'de 15 (quinze) dias, a contar do recebimento da notificação, nos termos do Decreto Estadual nº 22.872/96. ' +
                    '</p>');
            }
            //Segundo Parágrafo**********************************************************************************************************************************/
            win.document.write('<p align="justify">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');
            if (this.modelo === 'SD') {
                win.document.write('Considerando que <u>não fora apresentado recurso no prazo estabelecido pelo Decreto nº. 22.872/1996</u>, não restou ' +
                    'outra alternativa à Concessionária senão a de aplicar a multa estabelecida pelo Regulamento dos Serviços e o respectivo Contrato de Concessão n° 04/96.');
            }
            else if (this.modelo === 'A') {
                win.document.write('Deve-se consignar que no momento da constatação da irregularidade, o usuário dos serviços, responsável pela ' +
                    'Matrícula nº ' + matricula + ' estava ausente ou recusou-se a assinar/receber cópia do Termo de Ocorrência n° ' + termo + ', ' + //Variáveis Matricula e termo
                    'motivo pelo qual não assinou o respectivo documento de ocorrência lavrado pelos fiscais desta Concessionária. Foi entregue o  Aviso de Recebimento' +
                    ' oportunidade na qual tomou ciência da possibilidade de apresentar defesa, no prazo de até 15 (Quinze) dias¹ , a contar do recebimento da notificação.' +
                    ' Considerando a ausência de recurso no prazo estabelecido pela legislação, não restou outra alternativa senão a aplicação de multa.');
            }
            else { //
                win.document.write('No dia ' + ("00" + datDefesa.getDate()).slice(-2) + ' de ' + months[datDefesa.getMonth()] + ' de ' + datDefesa.getFullYear() + ',' + // Aqui entra as variáveis de data da defesa
                    ' V.S.(ª) compareceu em uma das unidades da Prolagos S.A. e' +
                    ' protocolizou defesa administrativa a respeito da irregularidade detectada no imóvel sob análise de ' +
                    '<b><u>Matrícula nº ' + matricula + '.</u></b>' + // Aqui entra a Variável n° da matrícula
                    ' Deve-se consignar que, no momento da constatação,');
                if (checkPresenca == 1) {
                    win.document.write(' encontrava-se presente no local o(a) ' +
                        'Sr.º(ª) ' + capitalizar(nome) + '' + //Aqui entra a variável nome do cliente
                        ', que assinou o respectivo Auto de Infração e cientificando-se da possibilidade de apresentar defesa no ' +
                        'prazo de 15 (quinze) dias¹ a contar do recebimento da notificação constante no Auto de infração, conforme ' +
                        'determina o Decreto Estadual nº 22.872/96.' +
                        '</p>');
                }
                else {
                    win.document.write(' encontrava-se ausente no local o Morador,' +
                        ' o respectivo Auto de Infração foi enviado por correspondência com Aviso de Recebimento, pelos Correios, ' +
                        'tendo sido recebida no dia ' + ("00" + dataAR.getDate()).slice(-2) + ' de ' + months[dataAR.getMonth()] + ' de ' + dataAR.getFullYear() +
                        ', oportunidade na qual tomou ciência da possibilidade de apresentar defesa,' +
                        ' no prazo de até 15 (Quinze) dias[4], a contar do recebimento da notificação, conforme determina o Decreto Estadual nº 22.872/96.');
                }
            }
            //Terceiro Parágrafo
            win.document.write('<p align="justify">&nbsp;&nbsp;&nbsp;&nbsp;');
            if (this.modelo === 'DP' || this.modelo === 'DI') {
                win.document.write('Considerando as informações constantes nos autos do processo em curso,');
                if (this.modelo === 'DP') {
                    win.document.write(' a Concessionária, por mera liberalidade, resolve acolher o(s) pedido(s) do usuário(a), confirmando que realizará o ' +
                        '<b><u>CANCELAMENTO</u></b> dos valores referentes à(s) ocorrência(s) apontada(s). ' +
                        '</p>');
                }
                else {
                    win.document.write(' concluímos que a defesa, ora apresentada, é <b><u>IMPROCEDENTE</u></b>, pois, carece de fundamentos e ' +
                        'documentos comprobatórios que possibilitem o cancelamento da aplicação da multa.' +
                        '</p>');
                }
            }
            else if (this.modelo === 'SD') {
                win.document.write('Ressalte-se, ainda, que é obrigação do usuário contribuir para a permanência das boas condições dos bens públicos,' +
                    ' através dos quais lhes são prestados os serviços, devendo zelar pelo uso adequado dos mesmos tais como cavalete, hidrômetros, ' +
                    'ligações de água, etc., responsabilizando-se por sua utilização e guarda, nos termos do artigo 41, § único do Decreto 22.872/1996¹.' +
                    '</p>');
            }
            else {
                win.document.write('Cumpre, também, esclarecer que compete ao usuário comunicar à Concessionária qualquer irregularidade no funcionamento' +
                    ' do hidrômetro e ligação para que esta realize o que for cabível, o que não ocorreu no presente caso, ficando o usuário, portanto, sujeito aos ' +
                    'procedimentos administrativos definidos pelo Decreto Estadual nº 22.872/96¹ e Contrato de Concessão.' +
                    '</p>');
            }
            //Quarto Parágrafo
            win.document.write('<p align="justify">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');
            if (this.modelo === 'DP') {
                win.document.write('Sem mais para o momento, colocamo-nos à disposição para quaisquer esclarecimentos e negociação dos valores referentes a notificação em condições flexíveis.' +
                    '</p>');
            }
            else if (this.modelo === 'A') {
                win.document.write('Ressalte-se, ainda, que é obrigação do usuário contribuir para a permanência das boas condições dos bens públicos,' +
                    ' através dos quais lhes são prestados os serviços, devendo zelar pelo uso adequado dos mesmos tais como cavalete, hidrômetros, ligações de água,' +
                    ' etc., responsabilizando-se por sua utilização e guarda, nos termos do artigo 41, § único do Decreto 22.872/1996².' +
                    '</p>');
            }
            else if (this.modelo === 'SD') {
                win.document.write('Sendo assim, na forma do exposto, compete ao usuário residente no imóvel cadastrado na <b>Matrícula nº ' + matricula + ', ' + //Variável Matricula
                    'ressarcir a Concessionária Prolagos S.A Concessionária de Serviços Públicos de Água e Esgoto</b>, pelo danos causados ao sistema público de água,' +
                    ' motivo pelo qual comunicamos que será encaminhada fatura específica referente a multa por irregularidade, ' +
                    multa + // Variaveis Valor da fraude
                    ' conforme estabelece o Regulamento dos Serviços e o respectivo Contrato de Concessão n° 04/96' +
                    '</p>');
            }
            else {
                win.document.write('Assim, nos termos do artigo 123, do Decreto lei 22.872/1996, tal irregularidade é caracterizada como <b><u>INFRAÇÃO</u></b> sujeita as cominações legais,' +
                    ' conforme discorre: ');
            }
            //Citação
            if (this.modelo === 'DI') {
                win.document.write('<div class="citacao"><p align="justify"><b><i>' +
                    'INFRAÇÕES:<br>' +
                    'I-	Intervenção de qualquer modo nas instalações do serviço público de água ou de esgoto sanitário; <br>' +
                    'II-	Ligação de qualquer canalização às redes públicas de água ou esgoto sanitário; <br>' +
                    'III-	Violação ou retirada de hidrômetro ou de limitador de consumo; <br>' +
                    '</i></b></p></div>');
            }
            if (this.modelo === 'DP') {
                //Atenciosamente
                win.document.write('<p align="justify">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
                    'Atenciosamente,' +
                    '</p>');
            }
            if (this.modelo === 'DP') {
                //espaço para a assinatura
                win.document.write('<p align="justify">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
                    '<br><br><br><br>' +
                    '</p>');
            }
            win.document.write('</div>');
            // Rodapé pimeira página
            win.document.write('<div class="rodape">');
            switch (this.modelo) {
                case 'SD':
                    win.document.write('<hr><p align="justify">' +
                        '²Artigo 41 – Os hidrômetros e os limitadores de consumo, de que trata este Capítulo, são de propriedade da CONCESSIONÁRIA OU PERMISSIONÁRIA.<br>' +
                        'Parágrafo único – O usuário responderá pelas despesas decorrentes da falta de proteção e guarda dos hidrômetros e limitadores de consumo.' +
                        '</p>');
                    break;
                case 'A':
                    win.document.write('<hr><p align="justify">' +
                        '<b>¹Decreto nº 22.872 de 28 de dezembro de 1996</b><br>' +
                        'Artigo 128 – É assegurado ao autuado o recurso às CONCESSIONÁRIAS ou PERMISSIONÁRIAS, com recurso superior ao' +
                        'PODER CONCEDENTE, tendo cada um dos recursos o prazo de 15 (quinze) dias, a contar do recebimento do auto de ' +
                        'infração ou da ciência da decisão, respectivamente.' +
                        '</p>' +
                        '²Artigo 41 – Os hidrômetros e os limitadores de consumo, de que trata este Capítulo, são de propriedade da CONCESSIONÁRIA OU PERMISSIONÁRIA.<br>' +
                        'Parágrafo único – O usuário responderá pelas despesas decorrentes da falta de proteção e guarda dos hidrômetros e limitadores de consumo.' +
                        '</p>');
                    break;
                default:
                    win.document.write('<hr><p align="justify">' +
                        '<b>¹Decreto nº 22.872 de 28 de dezembro de 1996</b><br>' +
                        'Artigo 128 – É assegurado ao autuado o recurso às CONCESSIONÁRIAS ou PERMISSIONÁRIAS, com recurso superior ao' +
                        'PODER CONCEDENTE, tendo cada um dos recursos o prazo de 15 (quinze) dias, a contar do recebimento do auto de ' +
                        'infração ou da ciência da decisão, respectivamente.' +
                        '</p>');
            }
            win.document.write('</div>');
            /*************************************************************************************************************************************************/
            /**********************************************Segunda Página****************************************************************/
            if (this.modelo != 'DP') {
                win.document.write(img2);
                win.document.write('<div class="titulo">');
                win.document.write('</div>');
                win.document.write('<div class="corpo">');
                if (this.modelo === 'DI') {
                    win.document.write('<div class="citacao"><p align="justify"><b><i>' +
                        'IV-	Derivação de uma instalação predial para suprimento de outro imóvel ou economia;<br> ' +
                        'V-	Intercalação de dispositivo no alimentador predial que, de qualquer modo, prejudique o abastecimento público de água; <br>' +
                        'VI-	Intervenção no ramal predial e no coletor predial; <br>' +
                        'VII-	Violação do selo nos casos de interrupção do fornecimento de água; <br>' +
                        'VIII-	Início de obra e de serviços de instalações de água ou de esgoto sanitário em loteamento ou grupamento de edificação, sem autorização da CONCESSIONÁRIA ou PERMISSIONÁRIA; <br>' +
                        'IX-	Início de obra e de serviços de instalação predial de água e de esgoto sanitário, sem autorização da CONCESSIONÁRIA ou PERMISSIONÁRIA' +
                        '</i></b></p></div>');
                }
                //Exclusivo no DI
                if (this.modelo === 'DI') {
                    win.document.write('<p align="justify">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
                        'Ressalta-se que compete ao usuário comunicar a concessionária sobre quaisquer irregularidades na prestação de serviço,' +
                        ' inclusive sobre o bom funcionamento no hidrômetro instalado em sua residência, para que a mesma realize a vistoria.' +
                        '</p>');
                }
                //primeiro Parágrafo
                win.document.write('<p align="justify">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');
                if (this.modelo === 'A' || this.modelo === 'DI') {
                    win.document.write('Sendo assim, na forma do exposto, compete ao usuário residente no imóvel cadastrado na <b>Matrícula nº ' + matricula + ', ' + //Variável Matricula
                        'ressarcir a Concessionária Prolagos S.A Concessionária de Serviços Públicos de Água e Esgoto</b>, pelo danos causados ao sistema público de água,' +
                        ' motivo pelo qual comunicamos que será encaminhada fatura específica referente a multa por irregularidade, ' +
                        multa + // Variaveis Valor da fraude
                        ' conforme estabelece o Regulamento dos Serviços e o respectivo Contrato de Concessão n° 04/96' +
                        '</p>');
                }
                //Segundo Parágrafo
                win.document.write('<p align="justify">&nbsp;&nbsp;&nbsp;&nbsp;' +
                    'Para conhecimento, informamos que o Decreto supramencionado encontra-se' +
                    ' disponível no site da empresa <u>http://www.prolagos.com.br/a-concessao/.</u> Sem mais para o momento, colocamo-nos à disposição' +
                    ' para quaisquer esclarecimentos e negociação dos valores referentes a notificação em condições flexíveis.' +
                    '</p>');
                //Atenciosamente
                win.document.write('<p align="justify">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
                    'Atenciosamente,' +
                    '</p>');
                win.document.write('</div>');
            }
            else {
                //*********************************** Pg Branco************************************************************
                win.document.write(blank);
                win.document.write('<div class="titulo">');
                win.document.write('</div>');
                win.document.write('<div class="corpo">');
                win.document.write('</div>');
            }
            i++;
        } // fechamento do while
        //*********************************** Apresentação Carta Defesa************************************************************
        win.document.write(img2);
        win.document.write('<div class="titulo">');
        win.document.write('</div>');
        win.document.write('<div class="corpo">');
        win.document.write('<p align="center">' +
            '<b>Carta Defesa Não Apresentada</b>' +
            '</p>');
        win.document.write('<p align="justify">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
            'A partir da data do recebimento do termo de ocorrência, cliente possui um prazo de quinze dias para apresentar recurso para defesa, ' +
            'através de carta, conforme determina o Decreto Estadual nº 22.872/96 Art. 128.' +
            '</p>');
        win.document.write('<p align="justify">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
            '<b>Art. 128 – É assegurado ao autuado o recurso às CONCESSIONÁRIAS ou PERMISSIONÁRIAS, com recurso superior ao PODER CONCEDENTE, tendo ' +
            'cada um dos recursos o prazo de 15 (quinze) dias, a contar do recebimento do auto de infração ou da ciência da decisão, respectivamente.</b>' +
            '</p>');
        win.document.write('<p align="justify">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
            'Foram aguardados os 15 dias para apresentação da carta defesa, a mesma não foi apresentada, processo julgado sem a manifestação do cliente.' +
            '</p>');
        win.document.write('</div>');
        win.document.write('</body></html>');
        //****************************************************************************************************
        win.document.close(); // FECHA A JANELA
        win.print(); // IMPRIME O CONTEUDO
        /*************************************************************************************************************************************************/
    }
};
PrintdeliberacaoComponent = tslib_1.__decorate([
    Component({
        selector: 'app-printdeliberacao',
        templateUrl: './printdeliberacao.component.html',
        styleUrls: ['./printdeliberacao.component.css']
    }),
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [GestaoDeliberacaoService])
], PrintdeliberacaoComponent);
export { PrintdeliberacaoComponent };
//# sourceMappingURL=printdeliberacao.component.js.map