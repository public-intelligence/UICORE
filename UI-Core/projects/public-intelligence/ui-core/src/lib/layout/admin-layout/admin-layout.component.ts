import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';
import { LayoutService } from '../services/layout.service';
import { AppBranding, SidebarMenuItem, UserProfile, ProfileMenuItem } from '../models/layout.models';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, HeaderComponent, CommonModule],
  template: `
    <div class="flex flex-col h-screen overflow-hidden bg-gray-50 font-sans">
      <!-- Mobile Warning Banner -->
      <div class="w-full bg-yellow-400 text-yellow-900 px-4 py-3 text-center text-sm font-medium block lg:hidden shrink-0">
          ⚠️ Experiencia optimizada para computadora.
      </div>
      
      <div class="flex flex-1 overflow-hidden relative">
          <!-- Sidebar -->
          <app-sidebar></app-sidebar>

          <!-- Main Content Wrapper -->
          <div class="flex-1 flex flex-col transition-all duration-300 overflow-hidden w-full relative">
            <!-- Sticky Header -->
            <app-header></app-header>

            <!-- Page Content -->
            <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4 sm:p-6">
               <div class="container mx-auto">
                  <router-outlet></router-outlet>
               </div>
            </main>
          </div>
      </div>
    </div>
  `
})
export class AdminLayoutComponent implements OnInit {
  @Input() branding!: AppBranding;
  @Input() menuItems: SidebarMenuItem[] = [];
  @Input() userProfile?: UserProfile | null;
  @Input() profileMenuItems: ProfileMenuItem[] = [];
  @Input() showNotifications = true;

  layoutService = inject(LayoutService);
  isSidebarCollapsed = this.layoutService.isSidebarCollapsed;

  ngOnInit() {
    if (this.branding) {
      this.layoutService.branding.set(this.branding);
    }

    if (this.menuItems) {
      this.layoutService.menuItems.set(this.menuItems);
    }

    if (this.userProfile !== undefined) {
      this.layoutService.userProfile.set(this.userProfile);
    }

    if (this.profileMenuItems?.length) {
      this.layoutService.profileMenuItems.set(this.profileMenuItems);
    }

    this.layoutService.showNotifications.set(this.showNotifications);
  }
}
