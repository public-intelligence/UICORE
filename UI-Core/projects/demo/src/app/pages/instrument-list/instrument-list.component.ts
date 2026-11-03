import { Component, TemplateRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  PageShellComponent,
  FilterBarComponent,
  DataTableComponent,
  ActionMenuComponent,
  ColumnDef,
  PagedData,
  ActionMenuItem,
} from '@public-intelligence/ui-core';

@Component({
  selector: 'app-instrument-list',
  standalone: true,
  imports: [CommonModule, RouterLink, PageShellComponent, FilterBarComponent, DataTableComponent, ActionMenuComponent],
  templateUrl: './instrument-list.component.html',
  styleUrls: ['./instrument-list.component.scss'],
})
export class InstrumentListComponent implements AfterViewInit {
  @ViewChild('titleCell') titleCellRef!: TemplateRef<unknown>;
  @ViewChild('actionsCell') actionsCellRef!: TemplateRef<unknown>;

  searchQuery = '';
  includeDeleted = false;
  columns: ColumnDef[] = [];

  actionMenuItems: ActionMenuItem[] = [
    { label: 'Ver', action: 'view' },
    { label: 'Editar', action: 'edit' },
    { label: 'Eliminar', action: 'delete', destructive: true },
  ];

  tableData: PagedData = {
    items: [
      { id: 1, title: 'Reglamento para el Análisis y Diseño Sísmico de Estructuras.', number: 'R-001', issuer: 'Presidente de la Republica Dominicana' },
      { id: 2, title: 'Reglamento para Estacionamiento Vehicular en Edificaciones', number: 'R-002', issuer: 'Presidente de la Republica Dominicana' },
    ],
    totalItems: 2,
    page: 1,
    pageSize: 10,
  };

  ngAfterViewInit() {
    // Defer to avoid ExpressionChangedAfterItHasBeenCheckedError (columns set after first check)
    setTimeout(() => {
      this.columns = [
        { header: 'Título', template: this.titleCellRef },
        { header: 'Emisor', field: 'issuer' },
        { header: 'Acciones', template: this.actionsCellRef, align: 'right', width: '80px' },
      ];
    });
  }

  onAction(action: string, item: { id: number; title: string }) {
    console.log('Action', action, item);
  }
}
