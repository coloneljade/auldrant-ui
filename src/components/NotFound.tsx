import Link from '@components/Link';
import type { IBaseProps } from '@scripts/types';
import { cx } from '@scripts/utils';
import styles from '@styles/NotFound.module.css';
import type { FunctionComponent } from 'preact';

/** Props for {@link NotFound}. */
interface INotFoundProps extends IBaseProps {
	/** Page heading. Defaults to `'Page not found'`. */
	heading?: string;
	/** Optional explanatory message shown below the heading. */
	message?: string;
	/** CTA link destination. Defaults to `'/'`. */
	href?: string;
	/** CTA link text. Defaults to `'Go home'`. */
	linkLabel?: string;
}

/**
 * Full-page 404 / not-found screen.
 *
 * Typically used as the catch-all route:
 *
 * ```tsx
 * <Route path="/*">
 *   <NotFound />
 * </Route>
 * ```
 */
const NotFound: FunctionComponent<INotFoundProps> = (props) => {
	const {
		heading = 'Page not found',
		message,
		href = '/',
		linkLabel = 'Go home',
		class: className,
	} = props;
	return (
		<main class={cx(styles.notFound, className)}>
			<h1 class={styles.notFoundHeading}>{heading}</h1>
			{message && <p class={styles.notFoundMessage}>{message}</p>}
			<Link href={href} class={styles.notFoundLink}>
				{linkLabel}
			</Link>
		</main>
	);
};

export default NotFound;
