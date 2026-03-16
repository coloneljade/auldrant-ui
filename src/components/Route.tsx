import { location, matchParams } from '@signals/routing';
import type { ComponentChildren, FunctionComponent } from 'preact';

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
 */
const Route: FunctionComponent<IRouteProps> = (props) => {
	const { path, children } = props;
	const current = location.value;

	if (path.endsWith('/*')) {
		// '/users/*' matches '/users/123' and '/users' but not '/usersettings'
		const prefix = path.slice(0, -1);
		if (!current.startsWith(prefix) && current !== prefix.slice(0, -1)) {
			return null;
		}
	} else if (path.includes('/:')) {
		if (matchParams(path, current) === null) {
			return null;
		}
	} else if (current !== path) {
		return null;
	}

	return <>{children}</>;
};

export default Route;
