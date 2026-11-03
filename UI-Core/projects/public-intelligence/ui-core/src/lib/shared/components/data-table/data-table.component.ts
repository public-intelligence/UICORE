import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ColumnDef {
  header: string;
  field?: string;
  template?: TemplateRef<any>;
  width?: string;
  align?: 'left' | 'center' | 'right';
}

export interface PagedData {
  items: any[];
  totalItems: number;
  page: number;
  pageSize: number;
  totalPages?: number;
}

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white shadow overflow-hidden sm:rounded-lg border border-gray-200">
      <!-- Loading Overlay/Skeleton -->
      <div *ngIf="loading" class="absolute inset-0 bg-white bg-opacity-50 z-10 flex items-center justify-center pointer-events-none">
         <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>

      <div class="overflow-x-auto relative">
        <table class="min-w-full divide-y divide-gray-200">
          <caption class="sr-only">{{ tableCaption }}</caption>
          <thead class="bg-gray-50">
            <tr>
              <th *ngFor="let col of columns" 
                  scope="col" 
                  class="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                  [class.text-center]="col.align === 'center'"
                  [class.text-right]="col.align === 'right'"
                  [style.width]="col.width">
                {{ col.header }}
              </th>
            </tr>
          </thead>
          
          <tbody class="bg-white divide-y divide-gray-200 relative">
            <ng-container *ngIf="!loading || (data?.items && data!.items.length > 0)">
                <tr *ngFor="let item of data?.items || []" 
                    class="transition-colors hover:bg-gray-50"
                    [ngClass]="item.isDeleted ? 'bg-gray-50/80 text-gray-500' : 'text-gray-900'">
                  <td *ngFor="let col of columns" 
                      class="px-6 py-4 whitespace-normal break-words sm:whitespace-nowrap text-sm text-inherit"
                      [class.text-center]="col.align === 'center'"
                      [class.text-right]="col.align === 'right'">
                    
                    <!-- Custom Template or Default Field -->
                    <ng-container *ngIf="col.template; else defaultField">
                      <ng-container *ngTemplateOutlet="col.template; context: { $implicit: item, row: item }"></ng-container>
                    </ng-container>
                    <ng-template #defaultField>
                        {{ getFieldValue(item, col.field) }}
                    </ng-template>
                  </td>
                </tr>
            </ng-container>
            
            <!-- Skeleton items if loading and no data -->
            <ng-container *ngIf="loading && (!data?.items || data!.items.length === 0)">
               <tr *ngFor="let i of [1,2,3,4,5]">
                  <td *ngFor="let col of columns" class="px-6 py-4">
                     <div class="h-4 bg-gray-200 rounded animate-pulse" [ngClass]="{'w-3/4': !col.width, 'w-full': col.width}"></div>
                  </td>
               </tr>
            </ng-container>

            <!-- Empty State -->
            <tr *ngIf="!loading && (!data?.items || data?.items?.length === 0)">
               <td [attr.colspan]="columns.length" class="px-6 py-12 text-center text-gray-500">
                  <div class="flex flex-col items-center justify-center">
                     <svg class="h-10 w-10 text-gray-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                     </svg>
                     <p>No se encontraron resultados.</p>
                  </div>
               </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination Footer -->
      <div class="bg-gray-50 px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6" *ngIf="data && data.totalItems > 0">
        <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p class="text-xs text-gray-700">
              Mostrando <span class="font-medium">{{ getStartItem() }}</span> a <span class="font-medium">{{ getEndItem() }}</span> de <span class="font-medium">{{ data.totalItems }}</span> resultados
            </p>
          </div>
          <div>
            <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button 
                [disabled]="data.page <= 1 || loading"
                (click)="onPageChange(data.page - 1)"
                class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed">
                <span class="sr-only">Anterior</span>
                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
              </button>
              
              <!-- Simple Page Array -->
              <ng-container *ngFor="let p of getPagesArray()">
                  <button 
                      (click)="onPageChange(p)"
                      [disabled]="loading"
                      [class.bg-blue-50]="p === data.page"
                      [class.text-blue-600]="p === data.page"
                      [class.border-blue-500]="p === data.page"
                      [class.bg-white]="p !== data.page"
                      [class.text-gray-700]="p !== data.page"
                      [class.border-gray-300]="p !== data.page"
                      class="relative inline-flex items-center px-4 py-2 border text-sm font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                      {{ p }}
                  </button>
              </ng-container>

              <button 
                [disabled]="data.page >= getTotalPages() || loading"
                (click)="onPageChange(data.page + 1)"
                class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed">
                <span class="sr-only">Siguiente</span>
                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  `
})
export class DataTableComponent {
  @Input() data: PagedData | null | undefined;
  @Input() columns: ColumnDef[] = [];
  @Input() loading = false;
  @Input() tableCaption: string = 'Tabla de datos';

  @Output() pageChange = new EventEmitter<number>();

  getFieldValue(item: any, field?: string) {
    if (!field) return '';
    return field.split('.').reduce((obj, key) => obj?.[key], item);
  }

  getStartItem() {
    if (!this.data || this.data.totalItems === 0) return 0;
    return (this.data.page - 1) * this.data.pageSize + 1;
  }

  getEndItem() {
    if (!this.data || this.data.totalItems === 0) return 0;
    return Math.min(this.data.page * this.data.pageSize, this.data.totalItems);
  }

  getTotalPages() {
    if (!this.data) return 1;
    return this.data.totalPages || Math.ceil(this.data.totalItems / this.data.pageSize) || 1;
  }

  getPagesArray(): number[] {
    if (!this.data) return [];
    const total = this.getTotalPages();
    const current = this.data.page;
    const maxPagesToShow = 5;
    let startPage = Math.max(1, current - 2);
    let endPage = Math.min(total, startPage + maxPagesToShow - 1);

    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  }

  onPageChange(page: number) {
    if (this.data && page >= 1 && page <= this.getTotalPages() && page !== this.data.page) {
      this.pageChange.emit(page);
    }
  }
}
