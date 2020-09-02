import { Observable } from 'rxjs';
export class ErrorHandler {
    static handleError(error) {
        let errorMessage;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.toString || JSON.stringify(body);
            errorMessage = `${error.url}: ${error.status} - ${error.statusText || ''} ${err}`;
        }
        else {
            errorMessage = error.message ? error.message : error.toString();
        }
        console.log(errorMessage);
        return Observable.throw(errorMessage);
    }
}
//# sourceMappingURL=app.error-handler.js.map