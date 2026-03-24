import { location, matchParams } from '@signals/routing';
import type { ComponentChildren, FunctionComponent } from 'preact';

/** Props for {@link Router}. */
interface IRouterProps {
	/** Route and/or Page components. Router renders only the first matching child. */
	children: ComponentChildren;
}

/**
 * Exclusive route matching wrapper. Iterates children and renders only the first
 * Route or Page that matches the current location. All non-matching children return null.
 *
 * Typically used as the root coordinator for all routes:
 *
 * ```tsx
 * <Router>
 *   <Page path="/" title="Home">...</Page>
 *   <Page path="/about/*" title="About">...</Page>
 *   <Page path="/*" title="Not Found"><NotFound /></Page>
 * </Router>
 * ```
 *
 * Routes/Pages outside a Router still work independently. Use Router to enforce
 * that only one route renders at a time.
 */
const Router: FunctionComponent<IRouterProps> = (props) => {
	const { children } = props;

	// Read location to establish reactivity — Preact signals track this read
	// and re-render when location changes
	location.value;

	// Convert children to array and find the first matching child
	const childArray = Array.isArray(children) ? children : [children];
	for (const child of childArray) {
		if (child && matchesRoute(child)) {
			return child;
		}
	}

	return null;
};

/**
 * Check if a child component is a Route or Page and would match the current location.
 * This is a simple type check + patch method that calls the component's internal match logic.
 */
function matchesRoute(child: unknown): boolean {
	// Type guard: must be a VNode-like object with type property
	if (typeof child !== 'object' || child === null) {
		return false;
	}

	const node = child as Record<string, unknown>;

	// Check if this is a Route or Page component
	const type = node.type;
	if (typeof type !== 'function') {
		return false;
	}

	// Get the path prop from the component
	const props = node.props as Record<string, unknown> | undefined;
	if (!props || typeof props.path !== 'string') {
		return false;
	}

	const path = props.path;
	const current = location.value;

	// Copy Route's matching logic
	if (path.endsWith('/*')) {
		const prefix = path.slice(0, -1);
		return current.startsWith(prefix) || current === prefix.slice(0, -1);
	}

	if (path.includes('/:')) {
		return matchParams(path, current) !== null;
	}

	return current === path;
}

export default Router;
