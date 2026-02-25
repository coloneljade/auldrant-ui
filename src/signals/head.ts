import { effect, signal } from '@preact/signals';

/** Document title signal. Changes are synced to `document.title`. */
export const title = signal(document.title);

/** Sync title signal to document.title. */
effect(() => {
	document.title = title.value;
});
