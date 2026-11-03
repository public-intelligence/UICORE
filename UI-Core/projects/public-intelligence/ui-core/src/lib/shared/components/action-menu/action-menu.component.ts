import { Component, Input, Output, EventEmitter, HostListener, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ActionMenuItem {
    label: string;
    action: string;
    destructive?: boolean;
    disabled?: boolean;
    icon?: string;
}

const MENU_OFFSET_PX = 8;
const MENU_WIDTH_PX = 192; // w-48

@Component({
    selector: 'app-action-menu',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="relative inline-block text-left" (click)="$event.stopPropagation()">
      <button 
        #triggerButton
        type="button" 
        class="flex items-center text-gray-400 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full p-1 transition-colors"
        id="menu-button" 
        [attr.aria-expanded]="isOpen" 
        aria-haspopup="true"
        [attr.aria-label]="ariaLabel"
        (click)="toggleMenu()">
        <!-- Kebab icon -->
        <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
        </svg>
      </button>

      @if (isOpen) {
        <div 
           #menuPanel
           class="fixed w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden z-[100]"
           [style.left.px]="menuLeft"
           [style.top.px]="menuTop"
           role="menu" 
           aria-orientation="vertical" 
           aria-labelledby="menu-button" 
           tabindex="-1">
          <div class="py-1" role="none">
            <button 
              *ngFor="let item of items"
              (click)="onActionClick(item)"
              [disabled]="item.disabled"
              [class.text-red-700]="item.destructive"
              [class.hover:bg-red-50]="item.destructive"
              [class.text-gray-700]="!item.destructive"
              [class.hover:bg-gray-100]="!item.destructive"
              [class.opacity-50]="item.disabled"
              [class.cursor-not-allowed]="item.disabled"
              class="group flex items-center w-full px-4 py-2 text-sm text-left transition-colors" 
              role="menuitem">
              {{ item.label }}
            </button>
          </div>
        </div>
      }
    </div>
  `
})
export class ActionMenuComponent {
    @Input() items: ActionMenuItem[] = [];
    @Input() ariaLabel: string = 'Opciones';
    @Output() action = new EventEmitter<string>();

    @ViewChild('triggerButton') triggerButton?: ElementRef<HTMLButtonElement>;

    isOpen = false;
    menuTop = 0;
    menuLeft = 0;

    constructor(
        private eRef: ElementRef,
        private cdr: ChangeDetectorRef
    ) { }

    toggleMenu() {
        this.isOpen = !this.isOpen;
        if (this.isOpen) {
            this.menuTop = 0;
            this.menuLeft = 0;
            setTimeout(() => {
                this.updateMenuPosition();
                this.cdr.markForCheck();
            }, 0);
        }
    }

    private updateMenuPosition() {
        const btn = this.triggerButton?.nativeElement;
        if (!btn) return;
        const rect = btn.getBoundingClientRect();
        this.menuTop = rect.bottom + MENU_OFFSET_PX;
        this.menuLeft = Math.max(4, rect.right - MENU_WIDTH_PX);
    }

    onActionClick(item: ActionMenuItem) {
        if (item.disabled) return;
        this.action.emit(item.action);
        this.isOpen = false;
    }

    @HostListener('document:click', ['$event'])
    clickout(event: Event) {
        if (!this.eRef.nativeElement.contains(event.target)) {
            this.isOpen = false;
        }
    }

    @HostListener('window:scroll', ['$event'])
    onScroll() {
        if (this.isOpen) {
            this.updateMenuPosition();
            this.cdr.markForCheck();
        }
    }
}
