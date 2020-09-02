import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let FileDemoComponent = class FileDemoComponent {
    constructor() {
        this.uploadedFiles = [];
    }
    onUpload(event) {
        for (const file of event.files) {
            this.uploadedFiles.push(file);
        }
        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: 'File Uploaded', detail: '' });
    }
};
FileDemoComponent = tslib_1.__decorate([
    Component({
        templateUrl: './filedemo.component.html'
    })
], FileDemoComponent);
export { FileDemoComponent };
//# sourceMappingURL=filedemo.component.js.map