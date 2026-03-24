import Link from '@components/Link';
import type { IBaseProps } from '@scripts/types';
import { cx } from '@scripts/utils';
import styles from '@styles/NotFound.module.css';
import type { FunctionComponent } from 'preact';

/** Props for {@link NotFound}. */
interface INotFoundProps extends IBaseProps {
	/** Optional explanatory message shown below the page heading. */
	message?: string;
	/** CTA link destination. Defaults to `'/'`. */
	href?: string;
	/** CTA link text. Defaults to `'Go home'`. */
	linkLabel?: string;
}

/**
 * Content-only 404 / not-found component.
 * Renders a message and link, but no heading or document title.
 *
 * Typically wrapped in a Page for the catch-all route:
 *
 * ```tsx
 * <Page path="/*" title="Page not found">
 *   <NotFound message="The page you were looking for doesn't exist." />
 * </Page>
 * ```
 */
const NotFound: FunctionComponent<INotFoundProps> = (props) => {
	const { message, href = '/', linkLabel = 'Go home', class: className } = props;
	return (
		<div class={cx(styles.notFound, className)}>
			{message && <p class={styles.notFoundMessage}>{message}</p>}
			<Link href={href} class={styles.notFoundLink}>
				{linkLabel}
			</Link>
		</div>
	);
};

export default NotFound;
