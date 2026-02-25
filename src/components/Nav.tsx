import type { IBaseProps } from '@scripts/types';
import { cx } from '@scripts/utils';
import styles from '@styles/Nav.module.css';
import type { ComponentChildren, FunctionComponent } from 'preact';
import { useId } from 'preact/hooks';

/** Props for {@link Nav}. */
interface INavProps extends IBaseProps {
	/** Optional title shown as a heading above the nav. */
	title?: string;
	/** Navigation links. */
	children: ComponentChildren;
}

/**
 * Semantic `<nav>` wrapper with optional title heading.
 * When a title is provided, `aria-labelledby` links the landmark to the heading.
 */
const Nav: FunctionComponent<INavProps> = (props) => {
	const { title, children, class: className } = props;
	const headingId = useId();
	return (
		<nav class={cx(styles.nav, className)} aria-labelledby={title ? headingId : undefined}>
			{title && (
				<h2 id={headingId} class={styles.title}>
					{title}
				</h2>
			)}
			{children}
		</nav>
	);
};

export default Nav;
