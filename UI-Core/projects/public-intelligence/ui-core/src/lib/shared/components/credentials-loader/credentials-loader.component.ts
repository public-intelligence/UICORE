import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-credentials-loader',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      role="status"
      aria-live="polite"
      [attr.aria-label]="message()"
      class="credentials-loader fixed inset-0 z-9999 flex flex-col items-center justify-center bg-white font-sans"
      [style.--cl-spinner-color]="spinnerColor()"
    >
      <svg
        class="credentials-loader__spinner"
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="25" cy="25" r="20" stroke="#E5ECF7" stroke-width="3" />
        <circle
          class="credentials-loader__spinner-arc"
          cx="25"
          cy="25"
          r="20"
          stroke-width="3"
          stroke-linecap="round"
          pathLength="100"
        />
      </svg>

      <p class="mt-4 text-[15px] font-medium tracking-wide text-[#003876]">
        {{ message() }}
      </p>

      <p *ngIf="subtitle()" class="mt-1.5 text-sm tracking-wide text-gray-500">
        {{ subtitle() }}
      </p>
    </div>
  `,
  styles: [
    `
      :host {
        display: contents;
      }

      .credentials-loader {
        animation: cl-fade-in 240ms ease-out both;
      }

      .credentials-loader__spinner {
        width: 56px;
        height: 56px;
        animation: cl-spin 900ms linear infinite;
        transform-origin: center;
        will-change: transform;
      }

      .credentials-loader__spinner-arc {
        stroke: var(--cl-spinner-color, #0056b3);
        stroke-dasharray: 25 75;
        stroke-dashoffset: 0;
      }

      @keyframes cl-spin {
        to {
          transform: rotate(360deg);
        }
      }

      @keyframes cl-fade-in {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .credentials-loader {
          animation: none;
        }
        .credentials-loader__spinner {
          animation: none;
        }
        .credentials-loader__spinner-arc {
          stroke-dasharray: 100 0;
          opacity: 0.85;
        }
      }
    `,
  ],
})
export class CredentialsLoaderComponent {
  message = input<string>('Verificando credenciales...');
  subtitle = input<string | null>('Esto solo tomará un momento');
  spinnerColor = input<string>('#0056b3');
}
