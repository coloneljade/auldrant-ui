import { signal } from '@preact/signals';

/** Current URL pathname. */
export const location = signal(window.location.pathname);

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
	hash.value = hashPart;
}

/** Sync signals on browser back/forward navigation. */
window.addEventListener('popstate', () => {
	location.value = window.location.pathname;
	hash.value = window.location.hash.slice(1);
});

/**
 * Match a parameterised path pattern against a pathname.
 * Returns a params object on match (empty `{}` if pattern has no params), or `null` on mismatch.
 * Segments prefixed with `:` are captured; all other segments must match literally.
 *
 * @example
 * matchParams('/users/:id', '/users/42')       // { id: '42' }
 * matchParams('/users/:id', '/users/42/extra') // null (length mismatch)
 * matchParams('/a/:b/:c', '/a/x/y')            // { b: 'x', c: 'y' }
 */
export function matchParams(pattern: string, pathname: string): { [key: string]: string } | null {
	const patParts = pattern.split('/').filter(Boolean);
	const pathParts = pathname.split('/').filter(Boolean);
	if (patParts.length !== pathParts.length) {
		return null;
	}
	const params: { [key: string]: string } = {};
	for (const [i, seg] of patParts.entries()) {
		const val = pathParts[i] ?? '';
		if (seg.startsWith(':')) {
			params[seg.slice(1)] = val;
		} else if (seg !== val) {
			return null;
		}
	}
	return params;
}
