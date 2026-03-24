import { effect, signal } from '@preact/signals';

/** Document title signal. Changes are synced to `document.title`. */
export const title = signal(document.title);

/** Page title signal. Used by Page components to sync document title and update the page heading. */
export const pageTitle = signal('');

/** Meta description signal. Empty string removes the tag. */
export const description = signal('');

/** Canonical URL signal. Empty string removes the link tag. */
export const canonical = signal('');

/** Open Graph title signal. Empty string removes the tag. */
export const ogTitle = signal('');

/** Open Graph description signal. Empty string removes the tag. */
export const ogDescription = signal('');

/** Open Graph image URL signal. Empty string removes the tag. */
export const ogImage = signal('');

/** Sync title signal to document.title. */
effect(() => {
	document.title = title.value;
});

function syncMeta(
	selector: string,
	attribute: 'name' | 'property',
	name: string,
	value: string
): void {
	let el = document.querySelector<HTMLMetaElement>(selector);
	if (value) {
		if (!el) {
			el = document.createElement('meta');
			el.setAttribute(attribute, name);
			document.head.appendChild(el);
		}
		el.content = value;
	} else if (el) {
		el.remove();
	}
}

function syncCanonical(value: string): void {
	let el = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
	if (value) {
		if (!el) {
			el = document.createElement('link');
			el.rel = 'canonical';
			document.head.appendChild(el);
		}
		el.href = value;
	} else if (el) {
		el.remove();
	}
}

effect(() => syncMeta('meta[name="description"]', 'name', 'description', description.value));
effect(() => syncCanonical(canonical.value));
effect(() => syncMeta('meta[property="og:title"]', 'property', 'og:title', ogTitle.value));
effect(() =>
	syncMeta('meta[property="og:description"]', 'property', 'og:description', ogDescription.value)
);
effect(() => syncMeta('meta[property="og:image"]', 'property', 'og:image', ogImage.value));
