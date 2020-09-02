import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
let CalendarioAgendamentosComponent = class CalendarioAgendamentosComponent {
    constructor() { }
    ngOnInit() {
        this.events = [
            {
                "title": "Placa: HFK6736 - Vitor Heser - Cabo Frio",
                "start": "2020-01-23T15:00:00",
                "end": "2020-01-24T17:00:00"
            },
            {
                "title": "Placa: HFG6731 - Juliano Simas - São Pedro da Aldeia",
                "start": "2020-01-23T08:00:00",
                "end": "2020-01-23T12:00:00"
            },
            {
                "title": "Placa: HFG6731 - Loucura bicho - São Pedro da Aldeia",
                "start": "2020-01-23T08:00:00",
                "end": "2020-01-23T12:00:00"
            },
            {
                "title": "Placa: TPTG6739 - Alexandre Andrade - Arraial do Cabo",
                "start": "2020-01-23T10:00:00",
                "end": "2020-01-23T12:00:00"
            },
            {
                "title": "Placa: TPTG6739 - Pessoa - Arraial do Cabo",
                "start": "2020-01-23T10:00:00",
                "end": "2020-01-23T12:00:00"
            },
            {
                "title": "Placa: TPTG6779 - Tom Jobim - Arraial do Cabo",
                "start": "2020-01-24T10:00:00",
                "end": "2020-01-25T12:00:00"
            },
            {
                "title": "Placa: TPTG6779 - Vinicius de Moraes - Arraial do Cabo",
                "start": "2020-01-25T10:00:00",
                "end": "2020-01-25T12:00:00"
            },
            {
                "title": "Placa: TPTG6779 - Toquinho - Arraial do Cabo",
                "start": "2020-01-26T10:00:00",
                "end": "2020-01-26T12:00:00"
            },
            {
                "title": "Placa: TPTG6779 - Garota de Ipanema - Arraial do Cabo",
                "start": "2020-01-27T10:00:00",
                "end": "2020-01-28T12:00:00"
            },
            {
                "title": "Placa: TPTG6779 - Marcos Antonio - Arraial do Cabo",
                "start": "2020-01-24T10:00:00",
                "end": "2020-01-25T12:00:00"
            }
        ];
        this.options = {
            plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
            defaultDate: '2020-01-01',
            header: {
                left: 'prev,next',
                center: 'title',
                right: 'month,agendaWeek,agendaDay'
            },
            editable: true
        };
    }
};
CalendarioAgendamentosComponent = tslib_1.__decorate([
    Component({
        selector: 'app-calendario-agendamentos',
        templateUrl: './calendario-agendamentos.component.html',
        styleUrls: ['./calendario-agendamentos.component.css']
    }),
    tslib_1.__metadata("design:paramtypes", [])
], CalendarioAgendamentosComponent);
export { CalendarioAgendamentosComponent };
//# sourceMappingURL=calendario-agendamentos.component.js.map