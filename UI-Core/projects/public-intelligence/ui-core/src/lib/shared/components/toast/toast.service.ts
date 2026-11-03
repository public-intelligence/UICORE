import { Injectable, signal } from '@angular/core';

export interface Toast {
    id: number;
    message: string;
    type: 'success' | 'error' | 'info';
}

@Injectable({
    providedIn: 'root'
})
export class ToastService {
    toasts = signal<Toast[]>([]);
    private counter = 0;

    showSuccess(message: string) {
        this.add(message, 'success');
    }

    showError(message: string) {
        this.add(message, 'error');
    }

    showInfo(message: string) {
        this.add(message, 'info');
    }

    remove(id: number) {
        this.toasts.update(current => current.filter(t => t.id !== id));
    }

    private add(message: string, type: 'success' | 'error' | 'info') {
        const id = ++this.counter;
        this.toasts.update(current => [...current, { id, message, type }]);
        setTimeout(() => this.remove(id), 3000);
    }
}
