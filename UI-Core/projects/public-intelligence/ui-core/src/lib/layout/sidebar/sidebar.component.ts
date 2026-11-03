import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LayoutService } from '../services/layout.service';
import { SidebarMenuItem } from '../models/layout.models';

@Component({
   selector: 'app-sidebar',
   standalone: true,
   imports: [CommonModule, RouterLink, RouterLinkActive],
   template: `
    <div [ngClass]="{'w-64': !isCollapsed(), 'w-20': isCollapsed()}" 
         class="h-full bg-white border-r border-gray-100 flex flex-col z-20 font-sans transition-all duration-300 shadow-[4px_0_24px_rgba(0,0,0,0.02)] shadow-gray-200/50 shrink-0">
      
      <!-- Header / Logo Area -->
      <div class="h-24 flex items-center mb-4 transition-all duration-300"
           [ngClass]="{'px-6': !isCollapsed(), 'px-0 justify-center': isCollapsed()}">
         
         <div class="flex items-center w-full" [ngClass]="{'justify-center': isCollapsed()}">
            <!-- Official Logo -->
            <img [src]="branding().logoUrl" 
                 alt="Logo" 
                 class="object-contain transition-all duration-300"
                 [ngClass]="{'h-12 w-auto': !isCollapsed(), 'h-10 w-10': isCollapsed()}">
            
            <!-- Text Content (Hidden when collapsed) -->
            <div class="flex items-center overflow-hidden transition-all duration-300"
                 [ngClass]="{'w-full opacity-100 ml-4': !isCollapsed(), 'w-0 opacity-0 ml-0': isCollapsed()}">
                <!-- Vertical Separator -->
                <div class="h-10 w-px bg-gray-200 mr-4 shrink-0" *ngIf="branding().moduleName"></div>
                
                <!-- Brand / App Name -->
                <div class="flex flex-col justify-center whitespace-nowrap">
                   <span class="text-gray-400 text-xs font-medium uppercase tracking-wider" *ngIf="branding().moduleName">{{ branding().moduleName }}</span>
                   <span class="text-gray-600 font-bold text-lg leading-none">{{ branding().appName }}</span>
                </div>
            </div>
         </div>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 overflow-y-auto px-4 space-y-1">
        <ng-container *ngFor="let item of menuItems(); let i = index">

            <!-- ═══════════════════════════════════════════════════ -->
            <!-- PARENT WITH CHILDREN (expandable container)        -->
            <!-- ═══════════════════════════════════════════════════ -->
            <ng-container *ngIf="item.children && item.children.length > 0">
              <!-- Parent toggle button -->
              <button
                type="button"
                (click)="toggleGroup(i)"
                [title]="isCollapsed() ? item.label : ''"
                [attr.aria-expanded]="isGroupExpanded(i)"
                class="w-full group flex items-center py-3 text-sm font-medium text-gray-600 rounded-xl hover:bg-gray-50 hover:text-blue-600 transition-all duration-200 cursor-pointer"
                [ngClass]="{'px-4': !isCollapsed(), 'justify-center px-0': isCollapsed()}">

                <svg class="h-6 w-6 text-blue-500 shrink-0 group-hover:scale-110 transition-transform duration-200" 
                     [ngClass]="{'mr-4': !isCollapsed()}"
                     fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path *ngIf="item.iconPath" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" [attr.d]="item.iconPath"/>
                </svg>

                <span class="tracking-wide whitespace-normal overflow-hidden transition-all duration-200 leading-tight text-left"
                      [ngClass]="{'w-auto opacity-100': !isCollapsed(), 'w-0 opacity-0': isCollapsed()}">
                      {{ item.label }}
                </span>

                <!-- Expand / Collapse chevron -->
                <svg class="ml-auto h-4 w-4 text-gray-300 transition-transform duration-200 shrink-0"
                     [ngClass]="{
                       'rotate-90': isGroupExpanded(i),
                       'rotate-0': !isGroupExpanded(i),
                       'block': !isCollapsed(),
                       'hidden': isCollapsed()
                     }"
                     fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <!-- Children list (only visible when expanded AND not collapsed) -->
              <div class="overflow-hidden transition-all duration-200"
                   [ngClass]="{'max-h-96 opacity-100': isGroupExpanded(i) && !isCollapsed(), 'max-h-0 opacity-0': !isGroupExpanded(i) || isCollapsed()}">
                <ng-container *ngFor="let child of item.children">
                  <!-- Child internal route -->
                  <a *ngIf="child.route"
                     [routerLink]="child.route"
                     routerLinkActive="bg-blue-50 text-blue-600"
                     [routerLinkActiveOptions]="child.exactMatch ? {exact: true} : {exact: false}"
                     class="flex items-center py-2.5 pl-14 pr-4 text-sm text-gray-500 rounded-xl hover:bg-gray-50 hover:text-blue-600 transition-all duration-200">
                     {{ child.label }}
                  </a>
                  <!-- Child external URL -->
                  <a *ngIf="child.url"
                     [href]="child.url"
                     [target]="child.target || '_self'"
                     class="flex items-center py-2.5 pl-14 pr-4 text-sm text-gray-500 rounded-xl hover:bg-gray-50 hover:text-blue-600 transition-all duration-200">
                     {{ child.label }}
                     <svg *ngIf="child.target === '_blank'" class="ml-auto h-3.5 w-3.5 text-gray-300"
                          fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                     </svg>
                  </a>
                </ng-container>
              </div>
            </ng-container>

            <!-- ═══════════════════════════════════════════════════ -->
            <!-- SIMPLE LINK (no children) – Internal Route         -->
            <!-- ═══════════════════════════════════════════════════ -->
            <a *ngIf="!item.children?.length && item.route" 
               [routerLink]="item.route" 
               routerLinkActive="bg-blue-50 text-blue-600"
               [routerLinkActiveOptions]="item.exactMatch ? {exact: true} : {exact: false}"
               [title]="isCollapsed() ? item.label : ''"
               class="group flex items-center py-3 text-sm font-medium text-gray-600 rounded-xl hover:bg-gray-50 hover:text-blue-600 transition-all duration-200"
               [ngClass]="{'px-4': !isCollapsed(), 'justify-center px-0': isCollapsed()}">
               
               <svg class="h-6 w-6 text-blue-500 shrink-0 group-hover:scale-110 transition-transform duration-200" 
                    [ngClass]="{'mr-4': !isCollapsed()}"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path *ngIf="item.iconPath" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" [attr.d]="item.iconPath"/>
               </svg>
               
               <span class="tracking-wide whitespace-normal overflow-hidden transition-all duration-200 leading-tight"
                     [ngClass]="{'w-auto opacity-100': !isCollapsed(), 'w-0 opacity-0': isCollapsed()}">
                     {{ item.label }}
               </span>
            </a>

            <!-- ═══════════════════════════════════════════════════ -->
            <!-- SIMPLE LINK (no children) – External URL           -->
            <!-- ═══════════════════════════════════════════════════ -->
            <a *ngIf="!item.children?.length && item.url" 
               [href]="item.url" 
               [target]="item.target || '_self'"
               [title]="isCollapsed() ? item.label : ''"
               class="group flex items-center py-3 text-sm font-medium text-gray-600 rounded-xl hover:bg-gray-50 hover:text-blue-600 transition-all duration-200"
               [ngClass]="{'px-4': !isCollapsed(), 'justify-center px-0': isCollapsed()}">
               
               <svg class="h-6 w-6 text-blue-500 shrink-0 group-hover:scale-110 transition-transform duration-200" 
                    [ngClass]="{'mr-4': !isCollapsed()}"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path *ngIf="item.iconPath" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" [attr.d]="item.iconPath"/>
               </svg>
               <span class="tracking-wide whitespace-normal overflow-hidden transition-all duration-200 leading-tight"
                     [ngClass]="{'w-auto opacity-100': !isCollapsed(), 'w-0 opacity-0': isCollapsed()}">
                     {{ item.label }}
               </span>

                <!-- External Icon (Hidden when collapsed) -->
                 <svg class="ml-auto h-4 w-4 text-gray-300 group-hover:text-blue-400 shrink-0" 
                      *ngIf="item.target === '_blank'"
                      [ngClass]="{'block': !isCollapsed(), 'hidden': isCollapsed()}"
                      fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
            </a>

        </ng-container>
      </nav>
    </div>
  `
})
export class SidebarComponent {
   layoutService = inject(LayoutService);
   isCollapsed = this.layoutService.isSidebarCollapsed;
   branding = this.layoutService.branding;
   menuItems = this.layoutService.menuItems;

   /** Tracks which parent groups are expanded by their index. */
   private expandedGroups = signal<Set<number>>(new Set());

   /** Check if a group at index i is expanded. */
   isGroupExpanded(index: number): boolean {
     return this.expandedGroups().has(index);
   }

   /** Toggle a parent group. If sidebar is collapsed, uncollapse it first. */
   toggleGroup(index: number): void {
     // If collapsed, uncollapse sidebar and expand this group
     if (this.isCollapsed()) {
       this.layoutService.isSidebarCollapsed.set(false);
       this.expandedGroups.update(set => {
         const next = new Set(set);
         next.add(index);
         return next;
       });
       return;
     }

     // Normal toggle
     this.expandedGroups.update(set => {
       const next = new Set(set);
       if (next.has(index)) {
         next.delete(index);
       } else {
         next.add(index);
       }
       return next;
     });
   }
}
