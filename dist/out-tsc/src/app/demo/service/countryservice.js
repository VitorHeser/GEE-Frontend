import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
let CountryService = class CountryService {
    constructor(http) {
        this.http = http;
    }
    getCountries() {
        return this.http.get('assets/demo/data/countries.json')
            .toPromise()
            .then(res => res.data)
            .then(data => data);
    }
};
CountryService = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [HttpClient])
], CountryService);
export { CountryService };
//# sourceMappingURL=countryservice.js.map