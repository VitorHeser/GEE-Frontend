import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let DocumentationComponent = class DocumentationComponent {
};
DocumentationComponent = tslib_1.__decorate([
    Component({
        templateUrl: './documentation.component.html',
        styles: [`
        .docs h1 {
            margin-top: 30px;
        }

        .docs pre {
            font-family: monospace;
            background-color: #0C2238;
            color: #dddddd;
            padding: 1em;
            font-size: 14px;
            border-radius: 3px;
            overflow: auto;
        }

        .video-container {
            position: relative;
            width: 100%;
            height: 0;
            padding-bottom: 56.25%;
        }
        .video-container iframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }`
        ]
    })
], DocumentationComponent);
export { DocumentationComponent };
//# sourceMappingURL=documentation.component.js.map