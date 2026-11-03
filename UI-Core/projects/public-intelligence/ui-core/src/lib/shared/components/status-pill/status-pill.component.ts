import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-status-pill',
    standalone: true,
    imports: [CommonModule],
    template: `
    <span 
      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize"
      [ngClass]="getClasses()">
      {{ status }}
    </span>
  `
})
export class StatusPillComponent {
    @Input() status: string | undefined | null = '';
    @Input() type: 'publication' | 'access' | 'validity' = 'publication';

    getClasses() {
        if (!this.status) return 'bg-gray-100 text-gray-800';

        const s = this.status.toLowerCase();

        // Mapping based on common statuses
        switch (s) {
            // Publication
            case 'published':
            case 'publicado':
                return 'bg-green-100 text-green-800';
            case 'draft':
            case 'borrador':
                return 'bg-yellow-100 text-yellow-800';
            case 'archived':
            case 'archivado':
                return 'bg-gray-100 text-gray-800';

            // Access
            case 'public':
            case 'público':
                return 'bg-green-100 text-green-800';
            case 'internal':
            case 'interno':
                return 'bg-blue-100 text-blue-800';

            // General/Validity
            case 'valid':
            case 'vigente':
                return 'bg-green-100 text-green-800';
            case 'repealed':
            case 'derogada':
            case 'deleted':
            case 'eliminado':
                return 'bg-red-100 text-red-800';

            case 'deprecated':
                return 'bg-orange-100 text-orange-800';

            default:
                return 'bg-gray-100 text-gray-800';
        }
    }
}
