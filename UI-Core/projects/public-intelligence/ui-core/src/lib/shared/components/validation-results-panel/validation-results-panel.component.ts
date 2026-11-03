import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-validation-results-panel',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="bg-white shadow sm:rounded-lg overflow-hidden border border-gray-200" *ngIf="violations.length > 0 || passed">
        <div class="px-4 py-5 sm:px-6" 
             [ngClass]="passed ? 'bg-green-50 border-b border-green-200' : 'bg-red-50 border-b border-red-200'">
            <h3 class="text-lg leading-6 font-medium" [class.text-green-800]="passed" [class.text-red-800]="!passed">
                {{ passed ? 'Validación Exitosa' : 'Errores de Validación' }}
            </h3>
            <p class="mt-1 max-w-2xl text-sm" [class.text-green-600]="passed" [class.text-red-600]="!passed">
                {{ passed 
                    ? 'La versión cumple con todos los requisitos para uso interno.' 
                    : 'Se encontraron ' + violations.length + ' problemas que deben resolverse.' 
                }}
            </p>
        </div>
        
        <div class="border-t border-gray-200" *ngIf="!passed">
            <dl>
                <div *ngFor="let v of violations; let i = index" 
                     class="bg-white px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 hover:bg-gray-50 cursor-pointer"
                     (click)="jumpTo(v)">
                    <dt class="text-sm font-medium text-gray-500">
                        {{ v.group }}
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex justify-between items-center">
                        <span>{{ v.message }}</span>
                        <!-- Arrow icon -->
                        <svg class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </dd>
                </div>
            </dl>
        </div>
    </div>
  `
})
export class ValidationResultsPanelComponent {
    @Input() violations: { group: string, message: string, targetId?: any }[] = [];
    @Input() passed = false;

    @Output() jump = new EventEmitter<any>();

    jumpTo(v: any) {
        if (v.targetId) {
            this.jump.emit(v.targetId);
        }
    }
}
