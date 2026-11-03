import { Component, EventEmitter, Input, Output, ContentChild, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatedResult } from '../../models/paginated-result';

export interface PaginatedColumnDef {
  header: string;
  field?: string;
  template?: TemplateRef<any>;
  width?: string;
  align?: 'left' | 'center' | 'right';
}

@Component({
  selector: 'app-paginated-table',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white shadow overflow-hidden sm:rounded-lg border border-gray-200">
      <!-- Loading Overlay -->
      <div *ngIf="loading" class="absolute inset-0 bg-white bg-opacity-50 z-10 flex items-center justify-center">
         <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th *ngFor="let col of columns" 
                  scope="col" 
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  [class.text-center]="col.align === 'center'"
                  [class.text-right]="col.align === 'right'"
                  [style.width]="col.width">
                {{ col.header }}
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200 relative">
            <tr *ngFor="let item of data?.items || []" class="hover:bg-gray-50 transition-colors">
              <td *ngFor="let col of columns" 
                  class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                  [class.text-center]="col.align === 'center'"
                  [class.text-right]="col.align === 'right'">
                
                <!-- Custom Template or Default Field -->
                <ng-container *ngIf="col.template; else defaultField">
                  <ng-container *ngTemplateOutlet="col.template; context: { $implicit: item }"></ng-container>
                </ng-container>
                <ng-template #defaultField>
                    {{ getFieldValue(item, col.field) }}
                </ng-template>

              </td>
            </tr>
            <!-- Empty State -->
            <tr *ngIf="!loading && (!data?.items || data?.items?.length === 0)">
               <td [attr.colspan]="columns.length" class="px-6 py-12 text-center text-gray-500">
                  No se encontraron resultados.
               </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination Footer -->
      <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6" *ngIf="data && data.totalItems > 0">
        <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p class="text-sm text-gray-700">
              Mostrando <span class="font-medium">{{ getStartItem() }}</span> a <span class="font-medium">{{ getEndItem() }}</span> de <span class="font-medium">{{ data.totalItems }}</span> resultados
            </p>
          </div>
          <div>
            <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button 
                [disabled]="data.page <= 1 || loading"
                (click)="onPageChange(data.page - 1)"
                class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed">
                <span class="sr-only">Anterior</span>
                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
              </button>
              
              <!-- Simple Page Counter for now -->
              <span class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                 Página {{ data.page }}
              </span>

              <button 
                [disabled]="data.page >= data.totalPages || loading"
                (click)="onPageChange(data.page + 1)"
                class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed">
                <span class="sr-only">Siguiente</span>
                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  `
})
export class PaginatedTableComponent {
  @Input() data: PaginatedResult<any> | null | undefined;
  @Input() columns: PaginatedColumnDef[] = [];
  @Input() loading = false;

  @Output() pageChange = new EventEmitter<number>();

  getFieldValue(item: any, field?: string) {
    if (!field) return '';
    return field.split('.').reduce((obj, key) => obj?.[key], item);
  }

  getStartItem() {
    if (!this.data) return 0;
    return (this.data.page - 1) * this.data.pageSize + 1;
  }

  getEndItem() {
    if (!this.data) return 0;
    return Math.min(this.data.page * this.data.pageSize, this.data.totalItems);
  }

  onPageChange(page: number) {
    this.pageChange.emit(page);
  }
}
