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
  selector: 'app-dropdown-multi-select',
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
        [attr.aria-multiselectable]="true"
        style="min-width: 12rem; padding: 0.5rem 2rem 0.5rem 0.75rem; text-align: left; border: 1px solid #d1d5db; border-radius: 0.375rem; background: #fff; font-size: 0.875rem; color: #374151; position: relative;"
      >
        <span style="display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
          {{ triggerLabel() }}
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
          [attr.aria-multiselectable]="true"
          [style]="panelStyle"
        >
          @if (showSearch) {
            <div style="padding: 0.375rem; border-bottom: 1px solid #e5e7eb; flex-shrink: 0;">
              <input
                type="text"
                [(ngModel)]="searchQuery"
                (keydown)="onSearchKeydown($event)"
                placeholder="{{ searchPlaceholder }}"
                autocomplete="off"
                style="width: 100%; padding: 0.375rem 0.5rem; border: 1px solid #d1d5db; border-radius: 0.25rem; font-size: 0.875rem; box-sizing: border-box;"
              />
            </div>
          }
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
                  (click)="toggleOption(opt)"
                  style="display: flex; align-items: center; gap: 0.5rem; width: 100%; padding: 0.5rem 0.75rem; text-align: left; font-size: 0.875rem; border: none; background: transparent; cursor: pointer; color: #111827; white-space: normal; word-break: break-word; min-width: 0;"
                  [style.background]="isSelected(opt) ? '#eff6ff' : 'transparent'"
                  [style.color]="opt.disabled ? '#9ca3af' : '#111827'"
                  [style.cursor]="opt.disabled ? 'not-allowed' : 'pointer'"
                >
                  <span
                    style="width: 1rem; height: 1rem; border: 2px solid #d1d5db; border-radius: 0.25rem; flex-shrink: 0; display: inline-flex; align-items: center; justify-content: center;"
                    [style.background]="isSelected(opt) ? '#2563eb' : 'transparent'"
                    [style.border-color]="isSelected(opt) ? '#2563eb' : '#d1d5db'"
                  >
                    @if (isSelected(opt)) {
                      <svg style="width: 0.6rem; height: 0.6rem; color: #fff;" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                      </svg>
                    }
                  </span>
                  <span style="flex: 1; min-width: 0;">{{ opt.label }}</span>
                </button>
              }
            }
          </div>
        </div>
      }
    </div>
  `,
})
export class DropdownMultiSelectComponent {
  @Input() options: DropdownOption[] = [];
  @Input() value: string[] = [];
  @Input() placeholder = 'Seleccionar...';
  @Input() searchPlaceholder = 'Buscar...';
  @Input() noResultsText = 'Sin resultados';
  @Input() ariaLabel = 'Selección múltiple';
  /** Si es false, el dropdown no se cierra al elegir un ítem (estilo Select2 closeOnSelect: false). */
  @Input() closeOnSelect = false;
  @Input() showSearch = true;

  @Output() valueChange = new EventEmitter<string[]>();

  @ViewChild('containerRef') containerRef!: ElementRef<HTMLElement>;
  @ViewChild('triggerRef') triggerRef!: ElementRef<HTMLElement>;
  @ViewChild('panelRef') panelRef?: ElementRef<HTMLElement>;

  panelStyle = PANEL_STYLE;
  searchQuery = '';
  isOpen = signal(false);

  filteredOptions = computed(() => {
    const list = this.options;
    const q = this.searchQuery.trim().toLowerCase();
    if (!q) return list;
    return list.filter((o) => o.label.toLowerCase().includes(q));
  });

  triggerLabel = computed(() => {
    const sel = this.selectedOptions();
    if (sel.length === 0) return this.placeholder;
    if (sel.length === 1) return sel[0].label;
    return sel.length + ' seleccionados';
  });

  selectedOptions = computed(() =>
    this.options.filter((o) => this.value.includes(o.value))
  );

  isSelected(opt: DropdownOption): boolean {
    return this.value.includes(opt.value);
  }

  toggle(): void {
    this.isOpen.update((v) => !v);
  }

  toggleOption(opt: DropdownOption): void {
    if (opt.disabled) return;
    const set = new Set(this.value);
    if (set.has(opt.value)) {
      set.delete(opt.value);
    } else {
      set.add(opt.value);
    }
    this.valueChange.emit(Array.from(set));
    if (this.closeOnSelect) {
      this.close();
    }
  }

  onSearchKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.close();
    }
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
