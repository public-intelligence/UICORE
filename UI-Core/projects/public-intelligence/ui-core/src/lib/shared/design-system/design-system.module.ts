import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [],
    imports: [
        CommonModule
    ],
    exports: []
})
export class DesignSystemModule {
    constructor() {
        // Ensure SDD CSS is loaded via angular.json or imports
        // This module mainly serves as a placeholder for shared UI components if needed later
        // The requirement says: "ensures SDD CSS is globally loaded".
        // Since we can't easily inject a <link> here without logic, we rely on angular.json styles array.
        // But we can verify or log.
    }
}
