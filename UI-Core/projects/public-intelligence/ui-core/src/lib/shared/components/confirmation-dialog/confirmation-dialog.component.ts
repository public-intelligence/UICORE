import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertBannerComponent } from '../alert-banner/alert-banner.component';

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [CommonModule, AlertBannerComponent],
  template: `
    <div *ngIf="isOpen" 
         class="fixed inset-0 z-50 overflow-y-auto" 
         aria-labelledby="modal-title" 
         role="dialog" 
         aria-modal="true">
      
      <!-- Backdrop -->
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
           aria-hidden="true"
           (click)="onBackdropClick()"></div>

      <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <!-- Modal Panel -->
        <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
             (keydown.escape)="cancel()">
          
          <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              
              <!-- Icon -->
              <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10"
                   [ngClass]="type === 'danger' ? 'bg-red-100' : 'bg-blue-100'">
                <svg *ngIf="type === 'danger'" class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
                <svg *ngIf="type === 'info'" class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                   <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                </svg>
              </div>

              <!-- Content -->
              <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                <h3 class="text-base font-semibold leading-6 text-gray-900" id="modal-title">
                  {{ title }}
                </h3>
                
                <!-- Error Banner INSIDE Modal -->
                <div *ngIf="error" class="mt-2 text-left">
                  <app-alert-banner type="error" [message]="error"></app-alert-banner>
                </div>

                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    {{ message }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Buttons -->
          <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button type="button" 
                    #confirmButton
                    class="inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto"
                    [ngClass]="type === 'danger' ? 'bg-red-600 hover:bg-red-500' : 'bg-blue-600 hover:bg-blue-500'"
                    [disabled]="isProcessing"
                    (click)="confirm()">
              <span *ngIf="isProcessing" class="mr-2">...</span>
              {{ confirmText }}
            </button>
            <button type="button" 
                    class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    (click)="cancel()">
              {{ cancelText }}
            </button>
          </div>

        </div>
      </div>
    </div>
  `
})
export class ConfirmationDialogComponent implements AfterViewInit, OnDestroy {
  @Input() title = 'Confirmar Acción';
  @Input() message = '¿Está seguro?';
  @Input() confirmText = 'Confirmar';
  @Input() cancelText = 'Cancelar';
  @Input() type: 'danger' | 'info' = 'danger';
  @Input() isOpen = false;
  @Input() error: string | null = null;
  @Input() isProcessing = false;

  @Output() onConfirm = new EventEmitter<void>();
  @Output() onCancel = new EventEmitter<void>();

  @ViewChild('confirmButton') confirmButton!: ElementRef<HTMLButtonElement>;

  private previousActiveElement: HTMLElement | null = null;
  private focusCheckInterval: any;

  ngAfterViewInit() {
    // Focus management logic could go here if isOpen starts true
  }

  ngOnDestroy() {
    this.stopFocusTrap();
  }

  // Called when parent sets isOpen = true
  open() {
    this.isOpen = true;
    this.previousActiveElement = document.activeElement as HTMLElement;

    // Move focus to confirm button after a slight tick for rendering
    setTimeout(() => {
      this.confirmButton?.nativeElement?.focus();
      this.startFocusTrap();
    }, 100);
  }

  close() {
    this.isOpen = false;
    this.stopFocusTrap();
    // Return focus
    if (this.previousActiveElement) {
      this.previousActiveElement.focus();
    }
  }

  confirm() {
    this.onConfirm.emit();
    // Do not close automatically. Parent controls visibility via isOpen.
  }

  cancel() {
    this.onCancel.emit();
    this.close();
  }

  onBackdropClick() {
    // Optional: Only close if desired. Often modals are blocking.
    // Making it blocking for better safety on deletions.
    // Users can use Cancel or Escape.
  }

  private startFocusTrap() {
    // Basic focus trap
    const focusableElementsString = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';
    const focusableElements = this.confirmButton.nativeElement.parentElement?.parentElement?.querySelectorAll(focusableElementsString);

    if (focusableElements && focusableElements.length > 0) {
      const first = focusableElements[0] as HTMLElement;
      const last = focusableElements[focusableElements.length - 1] as HTMLElement;

      const trap = (e: KeyboardEvent) => {
        if (e.key === 'Tab') {
          if (e.shiftKey) { // Shift + Tab
            if (document.activeElement === first) {
              last.focus();
              e.preventDefault();
            }
          } else { // Tab
            if (document.activeElement === last) {
              first.focus();
              e.preventDefault();
            }
          }
        }
      };

      this.focusCheckInterval = trap; // Storing function reference to remove listener
      document.addEventListener('keydown', this.focusCheckInterval);
    }
  }

  private stopFocusTrap() {
    if (this.focusCheckInterval) {
      document.removeEventListener('keydown', this.focusCheckInterval);
    }
  }
}
