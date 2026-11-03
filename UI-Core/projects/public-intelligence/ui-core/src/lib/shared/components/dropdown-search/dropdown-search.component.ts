import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostListener,
  ViewChild,
  ElementRef,
  signal,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import type { DropdownOption } from '../../models/dropdown-option';

const PANEL_STYLE =
  'position: absolute; top: 100%; left: 0; margin-top: 4px; min-width: 100%; min-height: 8rem; max-height: 16rem; ' +
  'z-index: 100; background: #fff; border: 1px solid #e5e7eb; border-radius: 0.5rem; box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1); ' +
  'display: flex; flex-direction: column; overflow: hidden;';

@Component({
  selector: 'app-dropdown-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div #containerRef class="relative" style="display: inline-block;">
      <button
        #triggerRef
        type="button"
        (click)="toggle()"
        [attr.aria-expanded]="isOpen()"
        aria-haspopup="listbox"
        [attr.aria-label]="ariaLabel"
        [title]="selectedOption()?.label ?? placeholder"
        style="min-width: 12rem; padding: 0.5rem 2rem 0.5rem 0.75rem; text-align: left; border: 1px solid #d1d5db; border-radius: 0.375rem; background: #fff; font-size: 0.875rem; color: #374151; position: relative;"
      >
        <span style="display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
          {{ selectedOption()?.label ?? placeholder }}
        </span>
        <svg
          style="position: absolute; right: 0.5rem; top: 50%; transform: translateY(-50%); height: 1rem; width: 1rem; color: #6b7280; pointer-events: none;"
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </button>

      @if (isOpen()) {
        <div
          #panelRef
          role="listbox"
          [attr.aria-label]="ariaLabel"
          [style]="panelStyle"
        >
          <div style="padding: 0.375rem; border-bottom: 1px solid #e5e7eb; flex-shrink: 0;">
            <input
              type="text"
              [(ngModel)]="searchQuery"
              (ngModelChange)="onSearchChange()"
              (keydown)="onSearchKeydown($event)"
              placeholder="{{ searchPlaceholder }}"
              autocomplete="off"
              style="width: 100%; padding: 0.375rem 0.5rem; border: 1px solid #d1d5db; border-radius: 0.25rem; font-size: 0.875rem; box-sizing: border-box;"
            />
          </div>
          <div style="overflow-y: auto; flex: 1; padding: 0.25rem 0;">
            @if (filteredOptions().length === 0) {
              <div style="padding: 0.5rem 0.75rem; font-size: 0.875rem; color: #6b7280;">
                {{ noResultsText }}
              </div>
            } @else {
              @for (opt of filteredOptions(); track opt.value) {
                <button
                  type="button"
                  role="option"
                  [attr.aria-selected]="isSelected(opt)"
                  [disabled]="opt.disabled"
                  (click)="select(opt)"
                  style="display: block; width: 100%; padding: 0.5rem 0.75rem; text-align: left; font-size: 0.875rem; border: none; background: transparent; cursor: pointer; color: #111827; white-space: normal; word-break: break-word; min-width: 0;"
                  [style.background]="isSelected(opt) ? '#eff6ff' : 'transparent'"
                  [style.color]="opt.disabled ? '#9ca3af' : '#111827'"
                  [style.cursor]="opt.disabled ? 'not-allowed' : 'pointer'"
                >
                  {{ opt.label }}
                </button>
              }
            }
          </div>
        </div>
      }
    </div>
  `,
})
export class DropdownSearchComponent {
  @Input() options: DropdownOption[] = [];
  @Input() value: string | null = null;
  @Input() placeholder = 'Seleccionar...';
  @Input() searchPlaceholder = 'Buscar...';
  @Input() noResultsText = 'Sin resultados';
  @Input() ariaLabel = 'Lista con búsqueda';

  @Output() valueChange = new EventEmitter<string | null>();

  @ViewChild('containerRef') containerRef!: ElementRef<HTMLElement>;
  @ViewChild('triggerRef') triggerRef!: ElementRef<HTMLElement>;
  @ViewChild('panelRef') panelRef?: ElementRef<HTMLElement>;

  panelStyle = PANEL_STYLE;
  searchQuery = '';
  isOpen = signal(false);

  filteredOptions = computed(() => {
    const list = this.options.filter((o) => !o.disabled);
    const q = this.searchQuery.trim().toLowerCase();
    if (!q) return list;
    return list.filter((o) => o.label.toLowerCase().includes(q));
  });

  selectedOption = computed(() => {
    if (this.value == null) return null;
    return this.options.find((o) => o.value === this.value) ?? null;
  });

  isSelected(opt: DropdownOption): boolean {
    return this.value === opt.value;
  }

  toggle(): void {
    this.isOpen.update((v) => !v);
    if (this.isOpen()) {
      this.searchQuery = '';
      setTimeout(() => this.focusSearch(), 0);
    }
  }

  private focusSearch(): void {
    const input = this.panelRef?.nativeElement?.querySelector('input');
    input?.focus();
  }

  onSearchChange(): void {}

  onSearchKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  select(opt: DropdownOption): void {
    if (opt.disabled) return;
    this.valueChange.emit(opt.value);
    this.close();
  }

  close(): void {
    this.isOpen.set(false);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.isOpen()) return;
    const el = this.containerRef?.nativeElement;
    if (el && !el.contains(event.target as Node)) {
      this.close();
    }
  }
}
