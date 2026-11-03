import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-filter-bar',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
    <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-6">
      <div class="flex flex-wrap gap-4 items-end justify-between">
          <div class="flex-1 min-w-[300px]">
            <label *ngIf="searchLabel" class="block text-xs font-medium text-gray-500 mb-1">{{ searchLabel }}</label>
            <div class="relative">
               <input type="text" [placeholder]="searchPlaceholder" class="filter-bar__search-input input w-full text-sm" 
                      [ngModel]="searchQuery" (ngModelChange)="onSearchChange($event)"
                      (keyup.enter)="onSearchEnter()">
               <svg class="filter-bar__search-icon h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
               </svg>
            </div>
          </div>
          
          <ng-content select="[advanced-filters]"></ng-content>

          <div *ngIf="showDeletedToggle" class="flex items-center pb-2">
              <label class="inline-flex items-center gap-3 cursor-pointer group select-none">
                 <span class="text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors">Mostrar Eliminados</span>
                 <div class="relative">
                     <input type="checkbox" [ngModel]="includeDeleted" (ngModelChange)="onToggleDeleted($event)" class="sr-only peer">
                     <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                 </div>
              </label>
          </div>
      </div>
    </div>
  `,
    styles: [`
      :host .filter-bar__search-input {
        padding-left: 2.75rem;
      }
    `]
})
export class FilterBarComponent {
    @Input() searchLabel: string = 'Buscar';
    @Input() searchPlaceholder: string = 'Escriba para buscar...';
    @Input() searchQuery: string = '';
    @Input() showDeletedToggle: boolean = true;
    @Input() includeDeleted: boolean = false;

    @Output() searchQueryChange = new EventEmitter<string>();
    @Output() search = new EventEmitter<string>(); // Emitted on Enter
    @Output() includeDeletedChange = new EventEmitter<boolean>();

    onSearchChange(value: string) {
        this.searchQuery = value;
        this.searchQueryChange.emit(value);
    }

    onSearchEnter() {
        this.search.emit(this.searchQuery);
    }

    onToggleDeleted(value: boolean) {
        this.includeDeleted = value;
        this.includeDeletedChange.emit(value);
    }
}
