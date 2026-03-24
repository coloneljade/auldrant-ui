import Head from '@components/Head';
import Route from '@components/Route';
import { pageTitle } from '@signals/head';
import type { ComponentChildren, FunctionComponent } from 'preact';

/** Props for {@link Page}. */
interface IPageProps {
	/**
	 * URL path pattern. Three forms supported:
	 * - Exact: `"/about"` — matches only `/about`
	 * - Wildcard: `"/users/*"` — matches `/users`, `/users/123`, etc.
	 * - Param: `"/users/:id"` — matches `/users/abc` (exact segment count)
	 */
	path: string;
	/** Page title. Synced to the document title and `pageTitle` signal. */
	title: string;
	/** Optional meta description. */
	description?: string;
	/** Page content. */
	children: ComponentChildren;
}

/**
 * Render-less page orchestrator that handles routing, document title, and page heading signal.
 * Wraps Route internally — only renders children when the path matches.
 * Use Router to coordinate multiple Pages and ensure exclusive matching.
 */
const Page: FunctionComponent<IPageProps> = (props) => {
	const { path, title, description, children } = props;
	return (
		<Route path={path}>
			<PageContent title={title} description={description}>
				{children}
			</PageContent>
		</Route>
	);
};

/** Inner component that syncs signals. Only renders when Route matches. */
interface IPageContentProps {
	title: string;
	description?: string;
	children: ComponentChildren;
}

const PageContent: FunctionComponent<IPageContentProps> = (props) => {
	const { title, description, children } = props;
	pageTitle.value = title;
	return (
		<>
			<Head title={title} description={description} />
			{children}
		</>
	);
};

export default Page;
