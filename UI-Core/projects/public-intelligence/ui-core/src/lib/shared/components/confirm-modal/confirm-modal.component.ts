import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ConfirmType = 'danger' | 'primary' | 'warning';

@Component({
    selector: 'app-confirm-modal',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div *ngIf="isOpen" class="relative z-50 px-4" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <!-- Backdrop -->
        <div class="modal-backdrop" (click)="onCancel()"></div>

        <!-- Panel -->
        <div class="modal-panel flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0">
            <div class="modal-content sm:max-w-md sm:w-full">
                <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div class="sm:flex sm:items-start">
                        <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10 bg-gray-100"
                            [ngClass]="{
                                'bg-red-100': type === 'danger',
                                'bg-yellow-100': type === 'warning',
                                'bg-blue-100': type === 'primary'
                            }">
                            <!-- Danger Icon -->
                            <svg *ngIf="type === 'danger'" class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                            </svg>
                            <!-- Warning Icon -->
                            <svg *ngIf="type === 'warning'" class="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                            </svg>
                            <!-- Info Icon -->
                            <svg *ngIf="type === 'primary'" class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                            </svg>
                        </div>
                        <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                            <h3 class="text-base font-semibold leading-6 text-gray-900" id="modal-title">{{ title }}</h3>
                            <div class="mt-2">
                                <p class="text-sm text-gray-500">{{ message }}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button type="button" 
                        class="btn w-full sm:ml-3 sm:w-auto flex justify-center items-center"
                        [ngClass]="getButtonClass()"
                        [disabled]="isProcessing"
                        (click)="onConfirm()">
                        <svg *ngIf="isProcessing" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {{ isProcessing ? 'Procesando...' : confirmText }}
                    </button>
                    <button type="button" 
                        class="mt-3 btn btn-outline-black w-full sm:mt-0 sm:w-auto"
                        [disabled]="isProcessing"
                        (click)="onCancel()">
                        {{ cancelText }}
                    </button>
                </div>
            </div>
        </div>
    </div>
  `
})
export class ConfirmModalComponent {
    @Input() isOpen = false;
    @Input() title = 'Confirmar';
    @Input() message = '¿Está seguro de realizar esta acción?';
    @Input() confirmText = 'Confirmar';
    @Input() cancelText = 'Cancelar';
    @Input() type: ConfirmType = 'primary';
    @Input() isProcessing = false;

    @Output() confirm = new EventEmitter<void>();
    @Output() cancel = new EventEmitter<void>();

    onConfirm() {
        this.confirm.emit();
    }

    onCancel() {
        this.cancel.emit();
    }

    getButtonClass() {
        switch (this.type) {
            case 'danger': return 'btn-danger';
            case 'primary': return 'btn-blue';
            case 'warning': return 'bg-yellow-600 hover:bg-yellow-700 text-white focus:ring-yellow-500';
            default: return 'btn-blue';
        }
    }
}
