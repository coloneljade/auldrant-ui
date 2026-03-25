import { RouterContext } from '@components/Router';
import { location, matchParams } from '@signals/routing';
import type { ComponentChildren, FunctionComponent } from 'preact';
import { useContext } from 'preact/hooks';

/** Props for {@link Route}. */
interface IRouteProps {
	/**
	 * URL path pattern. Three forms supported:
	 * - Exact: `"/about"` — matches only `/about`
	 * - Wildcard: `"/users/*"` — matches `/users`, `/users/123`, etc.
	 * - Param: `"/users/:id"` — matches `/users/abc` (exact segment count)
	 */
	path: string;
	/** Content to render when the route matches. */
	children: ComponentChildren;
}

/**
 * Renders children when the current location matches the path pattern.
 * Supports exact matches, trailing wildcard (`/users/*`), and named param
 * segments (`/users/:id`, `/org/:orgId/items/:itemId`).
 *
 * **Inside a Router**: participates in exclusive matching. The first Route that
 * matches claims the Router's context signal — all subsequent Routes see the
 * claim and return null. This works regardless of nesting depth (Route can be
 * inside a custom wrapper component).
 *
 * **Outside a Router (standalone)**: renders based on location alone, with no
 * exclusivity. Useful for conditional sections that should appear/disappear
 * based on the URL without participating in full page routing.
 */
const Route: FunctionComponent<IRouteProps> = (props) => {
	const { path, children } = props;
	const current = location.value;
	const claimed = useContext(RouterContext);

	// If inside a Router and another Route already claimed, skip
	if (claimed?.peek()) {
		return null;
	}

	// Match against current location
	let matches = false;

	if (path.endsWith('/*')) {
		// '/users/*' matches '/users/123' and '/users' but not '/usersettings'
		const prefix = path.slice(0, -1);
		matches = current.startsWith(prefix) || current === prefix.slice(0, -1);
	} else if (path.includes('/:')) {
		matches = matchParams(path, current) !== null;
	} else {
		matches = current === path;
	}

	if (!matches) {
		return null;
	}

	// Claim the route if inside a Router
	if (claimed) {
		claimed.value = path;
	}

	return <>{children}</>;
};

export default Route;
