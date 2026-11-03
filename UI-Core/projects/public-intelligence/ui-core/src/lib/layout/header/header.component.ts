import { Component, inject, signal, ViewChild, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LayoutService } from '../services/layout.service';

@Component({
   selector: 'app-header',
   standalone: true,
   imports: [CommonModule, RouterLink],
   template: `
    <header class="relative bg-white z-10 sticky top-0 shadow-sm font-sans">
      
      <!-- Top Row: Toggle & Profile -->
      <div class="h-14 border-b border-gray-100 flex items-center justify-between px-6">
         
         <!-- Left: Hamburger Toggle -->
         <button (click)="toggleSidebar()" class="text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50 focus:outline-none transition-colors">
           <svg class="w-10 transition-transform duration-300" [ngClass]="{'rotate-180': isCollapsed()}" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
             <path d="M29 13H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
             <path d="M29 20H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
             <path d="M29 27H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
             <path d="M15 16L11 20L15 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
           </svg>
         </button>

         <!-- Right: Notifications & Profile block -->
         <div class="flex items-center">
            
            <ng-container *ngIf="showNotifications()">
            <!-- Notification Bell -->
            <button class="text-[#373634] hover:text-gray-900 focus:outline-none transition-colors">
               <svg class="w-10" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.2656 29C18.4412 29.304 18.6936 29.5565 18.9977 29.732C19.3017 29.9075 19.6466 29.9999 19.9976 29.9999C20.3487 29.9999 20.6936 29.9075 20.9976 29.732C21.3016 29.5565 21.5541 29.304 21.7296 29" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M11.2613 23.326C11.1306 23.4692 11.0444 23.6472 11.0131 23.8385C10.9818 24.0298 11.0068 24.226 11.085 24.4034C11.1632 24.5807 11.2912 24.7316 11.4535 24.8375C11.6158 24.9434 11.8054 24.9999 11.9993 25H27.9993C28.1931 25.0001 28.3827 24.9438 28.5451 24.8381C28.7076 24.7324 28.8358 24.5817 28.9142 24.4045C28.9926 24.2273 29.0178 24.0311 28.9867 23.8398C28.9557 23.6485 28.8697 23.4703 28.7393 23.327C27.4093 21.956 25.9993 20.499 25.9993 16C25.9993 14.4087 25.3671 12.8826 24.2419 11.7574C23.1167 10.6321 21.5906 10 19.9993 10C18.408 10 16.8818 10.6321 15.7566 11.7574C14.6314 12.8826 13.9993 14.4087 13.9993 16C13.9993 20.499 12.5883 21.956 11.2613 23.326Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
               </svg>
            </button>

            <!-- Vertical divider -->
            <div class="h-[46px] w-px bg-gray-200 mx-5"></div>
            </ng-container>

            <!-- Profile dropdown trigger & panel -->
            <div #profileTriggerRef class="relative flex items-center" *ngIf="userProfile()">
              <button
                type="button"
                (click)="toggleProfileDropdown()"
                [attr.aria-expanded]="dropdownOpen()"
                aria-haspopup="true"
                class="flex items-center gap-[14px] rounded-lg focus:outline-none transition-colors group"
              >
                <!-- Avatar -->
                <div class="h-[44px] w-[44px] rounded-full bg-[#DDE1E6] flex items-center justify-center text-gray-500 overflow-hidden shrink-0">
                   <img *ngIf="userProfile()?.avatarUrl" [src]="userProfile()?.avatarUrl" alt="" class="h-full w-full object-cover">
                </div>
                <!-- User Info -->
                <div class="hidden lg:flex items-center gap-4">
                   <div class="text-left leading-[1.2]">
                      <div class="text-[16px] font-bold text-[#373634]">{{ userProfile()?.name }}</div>
                      <div class="text-[14px] text-gray-500 mt-[2px]">{{ userProfile()?.role }}</div>
                   </div>
                   <svg class="h-[24px] w-[24px] text-[#373634] shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                   </svg>
                </div>
              </button>

           <!-- Dropdown panel: just below the profile block, right-aligned to it (inline style so it works without Tailwind) -->
           @if (dropdownOpen()) {
             <div
               #profilePanelRef
               role="menu"
               style="position: absolute; top: 100%; right: 0; margin-top: 0.25rem; min-width: 10rem; z-index: 100; padding: 0.25rem 0; background: white; border: 1px solid #e5e7eb; border-radius: 0.5rem; box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);"
             >
               @if (profileMenuItems().length > 0) {
                 @for (item of profileMenuItems(); track item.action) {
                   <button
                     type="button"
                     role="menuitem"
                     (click)="onProfileMenuItemClick(item.action)"
                     class="w-full text-left px-4 py-2 text-sm transition-colors focus:outline-none focus:bg-gray-50"
                     [class.text-red-600]="item.destructive"
                     [class.hover:bg-red-50]="item.destructive"
                     [class.text-gray-700]="!item.destructive"
                     [class.hover:bg-gray-50]="!item.destructive"
                   >
                     {{ item.label }}
                   </button>
                 }
               } @else {
                 <ng-content select="[profileMenu]"></ng-content>
               }
             </div>
           }
         </div>
         </div>
      </div>

      <!-- Bottom Row: Title & Breadcrumbs -->
      <div class="h-14 bg-gray-50/50 flex items-center justify-between px-6 border-b border-gray-100" *ngIf="breadcrumbs().length > 0">
         
         <!-- Page Title -->
         <h1 class="text-xl font-bold text-[#003876] tracking-tight">
            {{ pageTitle() }}
         </h1>

         <!-- Breadcrumbs -->
         <div class="text-xs flex items-center">
            <span class="font-bold text-gray-900 mr-1">Está aquí:</span> 
            
            <ng-container *ngFor="let crumb of breadcrumbs(); let first = first; let last = last">
               <span *ngIf="!first" class="mx-1 text-[#696A6E]">/</span>
               <a *ngIf="!last" [routerLink]="crumb.url" class="text-[#696A6E] hover:text-[#003876] transition-colors">{{ crumb.label }}</a>
               <span *ngIf="last" class="font-semibold text-[#003876]">{{ crumb.label }}</span>
            </ng-container>
         </div>
      </div>
    </header>
  `
})
export class HeaderComponent {
   @ViewChild('profileTriggerRef') profileTriggerRef!: ElementRef<HTMLElement>;
   @ViewChild('profilePanelRef') profilePanelRef?: ElementRef<HTMLElement>;

   layoutService = inject(LayoutService);
   isCollapsed = this.layoutService.isSidebarCollapsed;

   pageTitle = this.layoutService.pageTitle;
   breadcrumbs = this.layoutService.breadcrumbs;
   userProfile = this.layoutService.userProfile;
   profileMenuItems = this.layoutService.profileMenuItems;
   showNotifications = this.layoutService.showNotifications;

   dropdownOpen = signal(false);

   @HostListener('document:click', ['$event'])
   onDocumentClick(event: MouseEvent) {
      if (!this.dropdownOpen()) return;
      const target = event.target as Node;
      const inTrigger = this.profileTriggerRef?.nativeElement?.contains(target);
      const inPanel = this.profilePanelRef?.nativeElement?.contains(target);
      if (!inTrigger && !inPanel) {
         this.dropdownOpen.set(false);
      }
   }

   toggleProfileDropdown() {
      this.dropdownOpen.update(v => !v);
   }

   onProfileMenuItemClick(action: string) {
      this.layoutService.emitProfileMenuAction(action);
      this.dropdownOpen.set(false);
   }

   toggleSidebar() {
      this.layoutService.toggleSidebar();
   }
}
