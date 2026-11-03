import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type NotificationType = 'success' | 'error' | 'info';

@Component({
  selector: 'app-notification-banner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="visible" 
         class="border-l-4 p-4 mb-6"
         [ngClass]="{
           'bg-green-100 border-green-600': type === 'success',
           'bg-red-100 border-red-600': type === 'error',
           'bg-blue-100 border-blue-600': type === 'info'
         }"
         [attr.role]="type === 'error' ? 'alert' : 'status'"
         [attr.aria-live]="type === 'error' ? 'assertive' : 'polite'"
         [attr.aria-labelledby]="'notify-title-' + uniqueId">
      
      <h2 class="text-lg font-bold" 
          [id]="'notify-title-' + uniqueId"
          [ngClass]="{
            'text-green-800': type === 'success',
            'text-red-800': type === 'error',
            'text-blue-800': type === 'info'
          }">
        {{ title }}
      </h2>
      
      <div class="mt-2" 
           [ngClass]="{
             'text-green-700': type === 'success',
             'text-red-700': type === 'error',
             'text-blue-700': type === 'info'
           }">
        <ng-content></ng-content>
        <p *ngIf="message">{{ message }}</p>
      </div>
    </div>
  `
})
export class NotificationBannerComponent {
  @Input() type: NotificationType = 'success';
  @Input() title: string = '';
  @Input() message: string = '';
  @Input() visible = false;

  uniqueId = Math.random().toString(36).substring(2, 9);
}
