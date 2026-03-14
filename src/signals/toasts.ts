import type { ToastVariant } from '@components/Toast';
import { signal } from '@preact/signals';

/** A single toast item in the queue. */
export interface IToastItem {
	id: string;
	message: string;
	variant?: ToastVariant;
	title?: string;
	duration?: number;
	dismissLabel?: string;
}

/** Internal signal — not exported publicly. Consumed only by Toaster. */
const toasts = signal<IToastItem[]>([]);

export { toasts };

/**
 * Enqueue a toast notification. Call from anywhere in the app.
 *
 * @example
 * toast('File saved.');
 * toast('Insufficient funds.', { variant: ToastVariant.error, title: 'Payment failed' });
 */
export function toast(message: string, options?: Omit<IToastItem, 'id' | 'message'>): void {
	toasts.value = [...toasts.value, { id: crypto.randomUUID(), message, ...options }];
}

/** Remove a toast by id. File-private — called only by Toaster. */
export function remove(id: string): void {
	toasts.value = toasts.value.filter((t) => t.id !== id);
}
