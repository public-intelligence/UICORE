import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  PageShellComponent,
  AlertBannerComponent,
  NotificationBannerComponent,
  StatusPillComponent,
  ActionMenuComponent,
  DataTableComponent,
  ColumnDef,
  PagedData,
  ErrorSummaryComponent,
  ValidationResultsPanelComponent,
  ImmutableBannerComponent,
  TreeViewComponent,
  TreeNode,
  DropdownSearchComponent,
  DropdownMultiSelectComponent,
  ConfirmModalComponent,
  ConfirmationDialogComponent,
  CredentialsLoaderComponent,
  DetailPageShellComponent,
  FilterBarComponent,
  PaginatedTableComponent,
  PaginatedColumnDef,
  PaginatedResult,
  type ActionMenuItem,
  type ErrorSummaryItem,
  type DropdownOption,
} from '@public-intelligence/ui-core';

@Component({
  selector: 'app-demo-componentes',
  standalone: true,
  imports: [
    CommonModule,
    PageShellComponent,
    AlertBannerComponent,
    NotificationBannerComponent,
    StatusPillComponent,
    ActionMenuComponent,
    DataTableComponent,
    ErrorSummaryComponent,
    ValidationResultsPanelComponent,
    ImmutableBannerComponent,
    TreeViewComponent,
    DropdownSearchComponent,
    DropdownMultiSelectComponent,
    ConfirmModalComponent,
    ConfirmationDialogComponent,
    CredentialsLoaderComponent,
    DetailPageShellComponent,
    FilterBarComponent,
    PaginatedTableComponent,
  ],
  templateUrl: './demo-componentes.component.html',
  styleUrls: ['./demo-componentes.component.scss'],
})
export class DemoComponentesComponent {
  actionMenuItems: ActionMenuItem[] = [
    { label: 'Editar', action: 'edit' },
    { label: 'Duplicar', action: 'duplicate' },
    { label: 'Eliminar', action: 'delete', destructive: true },
  ];

  errorSummaryItems: ErrorSummaryItem[] = [
    { fieldId: 'campo1', message: 'El nombre es obligatorio.' },
    { fieldId: 'campo2', message: 'El correo no tiene un formato válido.' },
  ];

  validationViolations = [
    { group: 'Datos generales', message: 'Falta el campo "Nombre".' },
    { group: 'Dirección', message: 'El código postal no es válido.' },
  ];

  tableColumns: ColumnDef[] = [
    { header: 'ID', field: 'id', width: '80px' },
    { header: 'Nombre', field: 'name' },
    { header: 'Estado', field: 'status' },
    { header: 'Fecha', field: 'date' },
  ];

  tableData: PagedData = {
    items: [
      { id: 1, name: 'Elemento A', status: 'Activo', date: '2025-01-15' },
      { id: 2, name: 'Elemento B', status: 'Pendiente', date: '2025-02-20' },
      { id: 3, name: 'Elemento C', status: 'Activo', date: '2025-03-01' },
    ],
    totalItems: 3,
    page: 1,
    pageSize: 10,
  };

  treeNodes: TreeNode[] = [
    { id: '1', label: 'Raíz', expanded: true, children: [
      { id: '1.1', label: 'Sección A', children: [
        { id: '1.1.1', label: 'Item A1' },
        { id: '1.1.2', label: 'Item A2' },
      ]},
      { id: '1.2', label: 'Sección B', children: [
        { id: '1.2.1', label: 'Item B1' },
      ]},
    ]},
  ];

  selectedNodeId: string | null = '1.1.1';

  dropdownSearchOptions: DropdownOption[] = [
    { value: 'opt1', label: 'Configuración general del sistema y preferencias de usuario' },
    { value: 'opt2', label: 'Reportes y exportación de datos en formato PDF o Excel' },
    { value: 'opt3', label: 'Gestión de perfiles y permisos de acceso' },
    { value: 'opt4', label: 'Historial de cambios y auditoría' },
    { value: 'opt5', label: 'Cerrar sesión y cambiar de cuenta' },
  ];
  dropdownSearchValue: string | null = null;

  dropdownMultiOptions: DropdownOption[] = [
    { value: 'a', label: 'Documentos normativos y legislación aplicable' },
    { value: 'b', label: 'Plantillas de evaluación y checklists' },
    { value: 'c', label: 'Catálogos de incumplimiento y criterios' },
    { value: 'd', label: 'Tasas, tarifas y plazos de presentación' },
  ];
  dropdownMultiValue: string[] = [];

  confirmModalOpen = false;
  confirmDialogOpen = false;
  credentialsLoaderOpen = false;
  credentialsLoaderCustomOpen = false;
  filterSearchQuery = '';
  filterIncludeDeleted = false;
  paginatedData: PaginatedResult<{ id: number; name: string; status: string }> = {
    items: [
      { id: 1, name: 'Registro 1', status: 'Activo' },
      { id: 2, name: 'Registro 2', status: 'Pendiente' },
      { id: 3, name: 'Registro 3', status: 'Activo' },
    ],
    page: 1,
    pageSize: 10,
    totalItems: 3,
    totalPages: 1,
  };
  paginatedColumns: PaginatedColumnDef[] = [
    { header: 'ID', field: 'id', width: '80px' },
    { header: 'Nombre', field: 'name' },
    { header: 'Estado', field: 'status' },
  ];

  onAction(action: string) {
    console.log('ActionMenu:', action);
  }

  onClone() {
    console.log('Clone clicked');
  }

  onNodeSelected(node: TreeNode) {
    this.selectedNodeId = node.id;
  }

  onDropdownSearchChange(value: string | null) {
    this.dropdownSearchValue = value;
  }

  onDropdownMultiChange(value: string[]) {
    this.dropdownMultiValue = value;
  }

  openConfirmModal() {
    this.confirmModalOpen = true;
  }

  onConfirmModalConfirm() {
    this.confirmModalOpen = false;
  }

  onConfirmModalCancel() {
    this.confirmModalOpen = false;
  }

  openConfirmDialog() {
    this.confirmDialogOpen = true;
  }

  onConfirmDialogConfirm() {
    this.confirmDialogOpen = false;
  }

  onConfirmDialogCancel() {
    this.confirmDialogOpen = false;
  }

  openCredentialsLoader() {
    this.credentialsLoaderOpen = true;
    setTimeout(() => (this.credentialsLoaderOpen = false), 3000);
  }

  openCredentialsLoaderCustom() {
    this.credentialsLoaderCustomOpen = true;
    setTimeout(() => (this.credentialsLoaderCustomOpen = false), 3000);
  }

  onFilterSearch(q: string) {
    console.log('Filter search:', q);
  }

  onPaginatedPageChange(page: number) {
    this.paginatedData = { ...this.paginatedData, page };
  }
}
