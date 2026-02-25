import { location } from '@signals/routing';
import type { ComponentChildren, FunctionComponent } from 'preact';

/** Props for {@link Route}. */
interface IRouteProps {
	/** URL path pattern. Supports trailing wildcard (`/users/*`). */
	path: string;
	/** Content to render when the route matches. */
	children: ComponentChildren;
}

/**
 * Renders children when the current location matches the path pattern.
 * Supports exact matches and trailing wildcard (`/users/*`).
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
	} else if (current !== path) {
		return null;
	}

	return <>{children}</>;
};

export default Route;
