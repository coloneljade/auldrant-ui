import type { Signal } from '@preact/signals';
import { useSignal } from '@preact/signals';
import { location } from '@signals/routing';
import type { ComponentChildren, FunctionComponent } from 'preact';
import { createContext } from 'preact';

/**
 * Context for exclusive route claiming. When a Router is present, it provides a
 * `Signal<string | null>` that Routes use to coordinate — the first matching Route
 * claims the signal, and all subsequent Routes see the claim and return null.
 *
 * `null` context (default) means no Router is present — Routes render independently.
 */
export const RouterContext = createContext<Signal<string | null> | null>(null);

/** Props for {@link Router}. */
interface IRouterProps {
	/** Route and/or Page components. Router renders only the first matching child. */
	children: ComponentChildren;
}

/**
 * Exclusive route matching wrapper. Provides a claim context so that only the first
 * matching Route or Page renders — all others return null. Children can be direct
 * Route/Page elements or custom components that render Route/Page internally.
 *
 * ```tsx
 * // Direct children
 * <Router>
 *   <Page path="/" title="Home">...</Page>
 *   <Page path="/about/*" title="About">...</Page>
 *   <Page path="/*" title="Not Found"><NotFound /></Page>
 * </Router>
 *
 * // Wrapped in custom components — works the same way
 * const Home = () => <Page path="/" title="Home"><HomeContent /></Page>;
 * <Router>
 *   <Home />
 *   <AboutPage />
 *   <NotFoundPage />
 * </Router>
 * ```
 *
 * Routes and Pages outside a Router still work independently — they render based
 * on location without exclusive matching.
 */
const Router: FunctionComponent<IRouterProps> = (props) => {
	const { children } = props;

	// Read location to establish reactivity — Preact signals track this read
	// and re-render when location changes
	location.value;

	// Claim signal for exclusive matching. Reset to null on each render so
	// Routes re-evaluate from scratch when location changes.
	const claimed = useSignal<string | null>(null);
	claimed.value = null;

	return <RouterContext.Provider value={claimed}>{children}</RouterContext.Provider>;
};

export default Router;
