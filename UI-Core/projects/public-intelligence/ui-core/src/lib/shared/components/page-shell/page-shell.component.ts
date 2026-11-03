import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-page-shell',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-6 py-6 px-4 sm:px-6 md:px-8 w-full max-w-screen-2xl mx-auto">
      <header class="flex flex-col gap-4" *ngIf="title || description || hasStatus">
        <!-- Breadcrumbs -->
        <div class="empty:hidden">
            <ng-content select="[breadcrumbs]"></ng-content>
        </div>
        
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
                <div *ngIf="title || hasStatus" class="text-xl font-bold text-gray-900 flex items-center gap-3">
                    <span *ngIf="title">{{ title }}</span>
                    <ng-content select="[status]"></ng-content>
                </div>
                <p *ngIf="description" class="mt-1 text-sm text-gray-500">{{ description }}</p>
                <ng-content select="[subtitle]"></ng-content>
            </div>
            <div class="flex flex-wrap items-center gap-2 empty:hidden">
                <ng-content select="[actions]"></ng-content>
            </div>
        </div>
      </header>
      
      <!-- Fallback header for actions if no title provided -->
      <div *ngIf="!title && !description && !hasStatus" class="flex flex-wrap items-center justify-end gap-2 empty:hidden">
         <ng-content select="[actions]"></ng-content>
      </div>

      <div class="empty:hidden">
        <ng-content select="[filters]"></ng-content>
      </div>

      <main class="w-full">
        <ng-content></ng-content>
      </main>
    </div>
  `
})
export class PageShellComponent {
  @Input() title: string = '';
  @Input() description?: string;

  // In Angular 18, we can't easily check ng-content presence without ViewChild, but we can assume parent passes [status] rarely. Let's just render the container empty if needed.
  // We'll trust the empty:hidden on slots instead of trying to be too clever with hasStatus.
  get hasStatus() { return true; } // simplified
}
