import { signal } from '@preact/signals';

/** Current URL pathname. */
export const location = signal(window.location.pathname);

/** Current URL search parameters. */
export const searchParams = signal(new URLSearchParams(window.location.search));

/** Current URL hash (without the `#` prefix). */
export const hash = signal(window.location.hash.slice(1));

/** Parse a path string into its pathname, search, and hash parts. */
function parsePath(path: string): { pathname: string; search: string; hash: string } {
	const hashIndex = path.indexOf('#');
	let hashPart = '';
	let rest = path;

	if (hashIndex >= 0) {
		hashPart = path.slice(hashIndex + 1);
		rest = path.slice(0, hashIndex);
	}

	const searchIndex = rest.indexOf('?');
	let searchPart = '';
	let pathname = rest;

	if (searchIndex >= 0) {
		searchPart = rest.slice(searchIndex);
		pathname = rest.slice(0, searchIndex);
	}

	return { pathname: pathname || '/', search: searchPart, hash: hashPart };
}

/**
 * Navigate to a new URL path using the History API.
 * Updates all routing signals accordingly.
 */
export function navigate(path: string, options?: { replace?: boolean }): void {
	const { pathname, search, hash: hashPart } = parsePath(path);
	const full = pathname + search + (hashPart ? `#${hashPart}` : '');

	if (options?.replace) {
		history.replaceState(null, '', full);
	} else {
		history.pushState(null, '', full);
	}

	location.value = pathname;
	searchParams.value = new URLSearchParams(search);
	hash.value = hashPart;
}

/** Sync signals on browser back/forward navigation. */
window.addEventListener('popstate', () => {
	location.value = window.location.pathname;
	searchParams.value = new URLSearchParams(window.location.search);
	hash.value = window.location.hash.slice(1);
});
