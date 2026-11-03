import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'templates/1' },
  {
    path: 'account',
    loadComponent: () => import('./pages/placeholder/placeholder.component').then(m => m.PlaceholderComponent),
    data: { title: 'Mi cuenta' },
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/placeholder/placeholder.component').then(m => m.PlaceholderComponent),
    data: { title: 'Iniciar sesión' },
  },
  {
    path: 'norms/create',
    loadComponent: () => import('./pages/placeholder/placeholder.component').then(m => m.PlaceholderComponent),
    data: { title: 'Nuevo Instrumento' },
  },
  {
    path: 'norms/:id',
    loadComponent: () => import('./pages/placeholder/placeholder.component').then(m => m.PlaceholderComponent),
    data: { title: 'Detalle Instrumento' },
  },
  {
    path: 'norms',
    loadComponent: () => import('./pages/instrument-list/instrument-list.component').then(m => m.InstrumentListComponent),
    data: { title: 'Instrumentos' },
  },
  {
    path: 'templates',
    data: { title: 'Plantillas de Evaluación' },
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/templates-list/templates-list.component').then(m => m.TemplatesListComponent),
      },
      {
        path: '1',
        loadComponent: () => import('./pages/template-detail/template-detail.component').then(m => m.TemplateDetailComponent),
        data: { title: 'Detalle' },
        children: [
          {
            path: 'versions/1',
            loadComponent: () => import('./pages/placeholder/placeholder.component').then(m => m.PlaceholderComponent),
            data: { title: 'Versión 1' },
          },
        ],
      },
    ],
  },
  {
    path: 'portal',
    loadComponent: () => import('./pages/placeholder/placeholder.component').then(m => m.PlaceholderComponent),
    data: { title: 'Portal Público' },
  },
  {
    path: 'templates/document-types',
    loadComponent: () => import('./pages/placeholder/placeholder.component').then(m => m.PlaceholderComponent),
    data: { title: 'Tipos de Doc.' },
  },
  {
    path: 'catalogs',
    loadComponent: () => import('./pages/placeholder/placeholder.component').then(m => m.PlaceholderComponent),
    data: { title: 'Catálogos de Incumplimiento' },
  },
  {
    path: 'profiles',
    loadComponent: () => import('./pages/placeholder/placeholder.component').then(m => m.PlaceholderComponent),
    data: { title: 'Perfiles' },
  },
  {
    path: 'fees/schedules',
    loadComponent: () => import('./pages/placeholder/placeholder.component').then(m => m.PlaceholderComponent),
    data: { title: 'Tasas y Tarifas' },
  },
  {
    path: 'catalogos',
    loadComponent: () => import('./pages/demo-componentes/demo-componentes.component').then(m => m.DemoComponentesComponent),
    data: { title: 'Catálogo de componentes' },
  },
];
