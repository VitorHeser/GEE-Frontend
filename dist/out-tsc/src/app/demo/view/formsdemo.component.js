import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { CountryService } from '../service/countryservice';
let FormsDemoComponent = class FormsDemoComponent {
    constructor(countryService) {
        this.countryService = countryService;
        this.brands = ['Audi', 'BMW', 'Fiat', 'Ford', 'Honda', 'Jaguar', 'Mercedes', 'Renault', 'Volvo', 'VW'];
        this.yesterday = new Date();
        this.selectedMultiSelectCars = [];
        this.checkboxValues = [];
        this.rangeValues = [20, 80];
    }
    ngOnInit() {
        this.carOptions = [];
        this.carOptions.push({ label: 'Audi', value: 'Audi' });
        this.carOptions.push({ label: 'BMW', value: 'BMW' });
        this.carOptions.push({ label: 'Fiat', value: 'Fiat' });
        this.carOptions.push({ label: 'Ford', value: 'Ford' });
        this.carOptions.push({ label: 'Honda', value: 'Honda' });
        this.carOptions.push({ label: 'Jaguar', value: 'Jaguar' });
        this.carOptions.push({ label: 'Mercedes', value: 'Mercedes' });
        this.carOptions.push({ label: 'Renault', value: 'Renault' });
        this.carOptions.push({ label: 'VW', value: 'VW' });
        this.carOptions.push({ label: 'Volvo', value: 'Volvo' });
        this.cities = [];
        this.cities.push({ label: 'Select City', value: 0 });
        this.cities.push({ label: 'New York', value: { id: 1, name: 'New York', code: 'NY' } });
        this.cities.push({ label: 'Rome', value: { id: 2, name: 'Rome', code: 'RM' } });
        this.cities.push({ label: 'London', value: { id: 3, name: 'London', code: 'LDN' } });
        this.cities.push({ label: 'Istanbul', value: { id: 4, name: 'Istanbul', code: 'IST' } });
        this.cities.push({ label: 'Paris', value: { id: 5, name: 'Paris', code: 'PRS' } });
        this.citiesListbox = this.cities.slice(1);
        this.types = [];
        this.types.push({ label: 'Apartment', value: 'Apartment' });
        this.types.push({ label: 'House', value: 'House' });
        this.types.push({ label: 'Studio', value: 'Studio' });
        this.splitButtonItems = [
            { label: 'Update', icon: 'ui-icon-update' },
            { label: 'Delete', icon: 'ui-icon-close' },
            { label: 'Home', icon: 'ui-icon-home', url: 'http://www.primefaces.org/primeng' }
        ];
    }
    filterCountry(event) {
        const query = event.query;
        this.countryService.getCountries().then(countries => {
            this.filteredCountries = this.searchCountry(query, countries);
        });
    }
    searchCountry(query, countries) {
        // in a real application, make a request to a remote url with the query and return filtered results,
        // for demo we filter at client side
        const filtered = [];
        for (const item of countries) {
            const country = item;
            if (country.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
                filtered.push(country);
            }
        }
        return filtered;
    }
    filterBrands(event) {
        this.filteredBrands = [];
        for (const item of this.brands) {
            const brand = item;
            if (brand.toLowerCase().indexOf(event.query.toLowerCase()) === 0) {
                this.filteredBrands.push(brand);
            }
        }
    }
    handleACDropdownClick(event) {
        this.filteredBrands = [];
        // mimic remote call
        setTimeout(() => {
            this.filteredBrands = this.brands;
        }, 100);
    }
};
FormsDemoComponent = tslib_1.__decorate([
    Component({
        templateUrl: './formsdemo.component.html'
    }),
    tslib_1.__metadata("design:paramtypes", [CountryService])
], FormsDemoComponent);
export { FormsDemoComponent };
//# sourceMappingURL=formsdemo.component.js.map