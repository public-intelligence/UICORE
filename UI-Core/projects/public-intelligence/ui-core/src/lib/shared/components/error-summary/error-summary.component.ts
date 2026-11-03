import { Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

export interface ErrorSummaryItem {
    fieldId: string;
    message: string;
}

@Component({
    selector: 'app-error-summary',
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: `
    <div *ngIf="errors.length > 0" 
         class="border-l-4 border-red-600 bg-red-50 p-4 mb-6" 
         role="alert" 
         aria-labelledby="error-summary-title" 
         tabindex="-1"
         #summaryContainer>
      <h2 class="text-lg font-bold text-gray-900" id="error-summary-title">
        Hay un problema
      </h2>
      <ul class="mt-3 list-disc list-inside text-red-700">
        <li *ngFor="let error of errors">
          <a [href]="'#' + error.fieldId" 
             (click)="focusField($event, error.fieldId)"
             class="font-bold hover:underline focus:outline-none focus:ring-2 focus:ring-red-600">
            {{ error.message }}
          </a>
        </li>
      </ul>
    </div>
  `
})
export class ErrorSummaryComponent implements OnChanges {
    @Input() errors: ErrorSummaryItem[] = [];
    @ViewChild('summaryContainer') summaryContainer!: ElementRef;

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['errors'] && this.errors.length > 0) {
            // Move focus to summary when errors appear
            setTimeout(() => {
                this.summaryContainer?.nativeElement?.focus();
            }, 0);
        }
    }

    focusField(event: Event, fieldId: string) {
        event.preventDefault();
        const element = document.getElementById(fieldId);
        if (element) {
            element.focus();
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
}
