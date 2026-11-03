import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-detail-page-shell',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="space-y-6">
       <!-- Header -->
       <div class="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6 flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
         <div>
           <h2 class="text-2xl font-bold leading-7 text-gray-900">{{ title }}</h2>
           <div class="mt-1 space-y-1">
             <ng-content select="[subtitle]"></ng-content>
           </div>
         </div>
         <div class="flex flex-wrap items-center gap-3 w-full sm:w-auto mt-2 sm:mt-0">
            <ng-content select="[actions]"></ng-content>
         </div>
       </div>

       <!-- Alerts Container (empty if unused) -->
       <div class="empty:hidden">
            <ng-content select="[alerts]"></ng-content>
       </div>

       <!-- Main Content Area -->
       <div class="mt-6">
         <ng-content></ng-content>
       </div>
    </div>
  `
})
export class DetailPageShellComponent {
    @Input() title: string = '';
}
