import { effect, signal } from '@preact/signals';

/** Document title signal. Changes are synced to `document.title`. */
export const title = signal(document.title);

export interface MetaEntry {
	name: string;
	content: string;
}

/** Document meta tags signal. Changes sync `<meta>` tags in `<head>`. */
export const meta = signal<MetaEntry[]>([]);

/** Sync title signal to document.title. */
effect(() => {
	document.title = title.value;
});

/** Sync meta signal to `<meta>` tags in `<head>`. */
effect(() => {
	const managed = document.querySelectorAll('meta[data-aui]');
	for (const el of managed) {
		el.remove();
	}

	for (const entry of meta.value) {
		const el = document.createElement('meta');
		el.setAttribute('name', entry.name);
		el.setAttribute('content', entry.content);
		el.setAttribute('data-aui', '');
		document.head.appendChild(el);
	}
});
