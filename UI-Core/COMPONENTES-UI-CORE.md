# Componentes y API de @public-intelligence/ui-core

Listado de todo lo que exporta la librería del artifact.

---

## Layout

| Export | Tipo | Descripción |
|--------|------|-------------|
| `AdminLayoutComponent` | Componente | Layout principal: sidebar + header + área de contenido. Inputs: `branding`, `menuItems`, `userProfile`, `profileMenuItems`. |
| `HeaderComponent` | Componente | Cabecera con toggle del sidebar, perfil de usuario y dropdown de menú (avatar, nombre, rol). Breadcrumbs y título de página. |
| `SidebarComponent` | Componente | Menú lateral colapsable. Ítems y branding vía `LayoutService`. |
| `LayoutService` | Servicio | Estado del layout: `pageTitle`, `breadcrumbs`, `userProfile`, `menuItems`, `profileMenuItems`, `profileMenuAction$`, `isSidebarCollapsed`, `branding`, etc. |
| `layout.models` | Modelos | `AppBranding`, `UserProfile`, `SidebarMenuItem`, `ProfileMenuItem`, `Breadcrumb` (vía LayoutService). |

---

## Componentes compartidos

| Export | Selector | Descripción |
|--------|----------|-------------|
| `ActionMenuComponent` | `app-action-menu` | Menú de acciones (ícono de tres puntos). Input: `items` (`ActionMenuItem[]`). Output: `action`. |
| `DropdownSearchComponent` | `app-dropdown-search` | Dropdown con búsqueda y selección única. Inputs: `options` (`DropdownOption[]`), `value`, `placeholder`, `searchPlaceholder`, `noResultsText`. Output: `valueChange`. |
| `DropdownMultiSelectComponent` | `app-dropdown-multi-select` | Dropdown con selección múltiple. Inputs: `options`, `value` (string[]), `closeOnSelect`, `showSearch`, etc. Output: `valueChange`. |
| `AlertBannerComponent` | `app-alert-banner` | Banner de alerta. Inputs: `type` (success | info | warning | error), `title`, `message`. |
| `ConfirmModalComponent` | `app-confirm-modal` | Modal de confirmación. Inputs: `isOpen`, `title`, `message`, `type` (primary | danger | warning), `confirmText`, `cancelText`, `isProcessing`. Outputs: `confirm`, `cancel`. |
| `ConfirmationDialogComponent` | `app-confirmation-dialog` | Diálogo de confirmación (danger | info). Inputs: `isOpen`, `title`, `message`, `confirmText`, `cancelText`, `type`, `error`, `isProcessing`. Outputs: `onConfirm`, `onCancel`. |
| `CredentialsLoaderComponent` | `app-credentials-loader` | Overlay a pantalla completa con spinner centrado para esperas de OAuth u otras verificaciones. Inputs: `message` (default `'Verificando credenciales...'`), `subtitle`, `spinnerColor` (default `#0056b3`). |
| `DataTableComponent` | `app-data-table` | Tabla de datos. Inputs: `data` (`PagedData`), `columns` (`ColumnDef[]`), `loading`, `tableCaption`. |
| `DetailPageShellComponent` | `app-detail-page-shell` | Contenedor de página de detalle. Input: `title`. Slots: `subtitle`, `actions`, `alerts`, contenido por defecto. |
| `ErrorSummaryComponent` | `app-error-summary` | Resumen de errores de formulario. Input: `errors` (`ErrorSummaryItem[]`). |
| `FilterBarComponent` | `app-filter-bar` | Barra de búsqueda y filtros. Inputs: `searchLabel`, `searchPlaceholder`, `searchQuery`, `showDeletedToggle`, `includeDeleted`. Outputs: `searchQueryChange`, `search`, `includeDeletedChange`. |
| `ImmutableBannerComponent` | `app-immutable-banner` | Banner para contenido inmutable (ej. publicado). Input: `status`. Output: `cloneClicked`. |
| `NotificationBannerComponent` | `app-notification-banner` | Banner de notificación desplegable. Inputs: `type`, `title`, `message`, `visible`. |
| `PageShellComponent` | `app-page-shell` | Envuelve una página con título, descripción y zona de acciones. Inputs: `title`, `description`, etc. |
| `PaginatedTableComponent` | `app-paginated-table` | Tabla con paginación. Inputs: `data` (`PaginatedResult`), `columns` (`PaginatedColumnDef[]`), `loading`. Output: `pageChange`. |
| `StatusPillComponent` | `app-status-pill` | Píldora de estado. Inputs: `status`, `type` (publication | access | validity). |
| `TreeViewComponent` | `app-tree-view` | Vista en árbol. Inputs: `nodes` (`TreeNode[]`), `selectedId`. Output: `nodeSelected`. |
| `ValidationResultsPanelComponent` | `app-validation-results-panel` | Panel de resultados de validación. Inputs: `violations`, `passed`. |

---

## Servicios

| Export | Descripción |
|--------|-------------|
| `ToastService` | Servicio de toasts/notificaciones (desde `@public-intelligence/ui-core`). |

---

## Modelos e interfaces

| Export | Descripción |
|--------|-------------|
| `DropdownOption` | `{ value: string; label: string; disabled?: boolean }` para dropdowns. |
| `PaginatedResult<T>` | `{ items, page, pageSize, totalItems, totalPages }`. |
| `PaginationAdapter` | Utilidad de paginación (desde `utils/pagination-adapter`). |
| `ActionMenuItem` | `{ label, action, destructive?, disabled?, icon? }`. |
| `ErrorSummaryItem` | `{ fieldId, message }`. |
| `TreeNode` | Nodo para TreeView. |
| `ColumnDef`, `PagedData` | Para DataTable. |
| `PaginatedColumnDef` | Para PaginatedTable. |

---

## Otros

| Export | Descripción |
|--------|-------------|
| `DesignSystemModule` | Módulo del sistema de diseño (NgModule). |

---

Para ver los componentes en uso: ejecutar la demo del repo y abrir **Catálogo de componentes** (ruta `/catalogos`).
