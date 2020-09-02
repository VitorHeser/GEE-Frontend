import { EventEmitter } from '@angular/core';
export class EventEmitterService {
    static get(nomeEvento) {
        if (!this.emitters[nomeEvento])
            this.emitters[nomeEvento] = new EventEmitter();
        return this.emitters[nomeEvento];
    }
}
EventEmitterService.emitters = {};
//# sourceMappingURL=EventEmitterService.js.map