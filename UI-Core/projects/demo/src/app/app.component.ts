import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent, SidebarComponent, LayoutService } from '@public-intelligence/ui-core';
import type { ProfileMenuItem } from '@public-intelligence/ui-core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'demo';
  protected layout = inject(LayoutService);
  private router = inject(Router);

  /** Opciones del menú de perfil del header. */
  profileMenuOptions: ProfileMenuItem[] = [
    { label: 'Mi cuenta', action: 'account' },
    { label: 'Cerrar sesión', action: 'logout', destructive: true },
  ];

  ngOnInit() {
    this.layout.branding.set({
      appName: 'NORM',
      moduleName: 'Módulo',
      logoUrl: 'https://presidencia.gob.do/sites/default/files/statics/logos/cupula-blue.svg',
    });
    this.layout.menuItems.set([
      { label: 'Instrumentos', route: '/norms', iconPath: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
      { label: 'Plantillas o Checklists', route: '/templates', iconPath: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z' },
      {
        label: 'Catálogos de Incumplimiento',
        iconPath: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
        children: [
          { label: 'Catálogos', route: '/catalogs' },
          { label: 'Reglas', route: '/catalogs/rules' },
          { label: 'Sanciones', route: '/catalogs/sanctions' },
          { label: 'Configuración', route: '/catalogs/settings' },
        ]
      },
      {
        label: 'Perfiles',
        iconPath: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
        children: [
          { label: 'Usuarios', route: '/profiles/users' },
          { label: 'Roles', route: '/profiles/roles' },
          { label: 'Permisos', route: '/profiles/permissions' },
        ]
      },
      { label: 'Tipos de Doc.', route: '/templates/document-types', iconPath: 'M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z' },
      { label: 'Tasas y Tarifas', route: '/fees/schedules', iconPath: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
      { label: 'Portal Público', url: '/portal', target: '_blank', iconPath: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9' },
      { label: 'Catálogo de componentes', route: '/catalogos', iconPath: 'M4 6a2 2 0 012-2h2V4a2 2 0 012 2v2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2v2a2 2 0 01-2 2H8a2 2 0 01-2-2v-2H4a2 2 0 01-2-2V6zm12 0a2 2 0 012-2h2V4a2 2 0 012 2v2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2h-2a2 2 0 01-2-2V6z' },
    ]);
    this.layout.userProfile.set({
      name: 'Nombre',
      role: 'Demo',
    });

    this.layout.profileMenuItems.set(this.profileMenuOptions);

    this.layout.profileMenuAction$.subscribe((action) => {
      if (action === 'account') this.router.navigate(['/account']);
      if (action === 'logout') this.router.navigate(['/login']);
    });
  }
}
