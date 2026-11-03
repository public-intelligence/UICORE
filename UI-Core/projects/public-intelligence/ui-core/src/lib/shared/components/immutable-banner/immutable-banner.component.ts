import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationBannerComponent } from '../notification-banner/notification-banner.component';

@Component({
  selector: 'app-immutable-banner',
  standalone: true,
  imports: [CommonModule, NotificationBannerComponent],
  template: `
    <app-notification-banner 
      [type]="'info'" 
      [visible]="true"
      [title]="title">
      <div class="flex flex-col gap-4">
        <p class="text-base text-gray-800">
          {{ message }}
        </p>
        <div>
          <button 
            type="button"
            (click)="cloneClicked.emit()"
            class="inline-flex items-center px-4 py-2 bg-blue-700 border border-transparent rounded-md font-semibold text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Crear nuevo borrador
          </button>
        </div>
      </div>
    </app-notification-banner>
  `
})
export class ImmutableBannerComponent {
  @Input() status: string = '';
  @Output() cloneClicked = new EventEmitter<void>();

  get title(): string {
    const s = (this.status || '').toUpperCase();
    return s === 'PUBLISHED'
      ? 'Esta versión está publicada'
      : 'Esta versión está archivada';
  }

  get message(): string {
    const s = (this.status || '').toUpperCase();
    return s === 'PUBLISHED'
      ? 'No es posible editar una versión que ya ha sido publicada. Si necesita realizar cambios, debe crear un nuevo borrador a partir de esta versión.'
      : 'Esta versión ha sido archivada y no admite modificaciones. Puede crear un nuevo borrador basado en esta versión si necesita recuperar el contenido.';
  }
}
