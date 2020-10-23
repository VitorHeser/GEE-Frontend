import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class EventService {

    constructor(private http: HttpClient) {}

    getEvents() {
        return this.http.get<any>('assets/demo/data/scheduleevents.json')
                    .toPromise()
                    .then(res => res.data as any[])
                    .then(data => data);
    }
    UpdateEvent(obj) {
        return this.http.put<any>('assets/demo/data/scheduleevents.json',obj)
                    .toPromise()
                    .then(res => res.data as any[])
                    .then(data => data);
    }
}
