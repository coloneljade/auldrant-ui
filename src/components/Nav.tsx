import VisuallyHidden from '@components/VisuallyHidden';
import type { IBaseProps } from '@scripts/types';
import { cx } from '@scripts/utils';
import styles from '@styles/Nav.module.css';
import type { ComponentChildren, FunctionComponent } from 'preact';
import { useId } from 'preact/hooks';

/** Props for {@link Nav}. */
interface INavProps extends IBaseProps {
	/** Accessible name for the navigation landmark (visually hidden). */
	title: string;
	/** Navigation links. */
	children: ComponentChildren;
}

/**
 * Semantic `<nav>` wrapper with a visually hidden heading.
 * The heading labels the landmark via `aria-labelledby` for screen readers
 * without adding visual clutter.
 */
const Nav: FunctionComponent<INavProps> = (props) => {
	const { title, children, class: className } = props;
	const headingId = useId();
	return (
		<nav class={cx(styles.nav, className)} aria-labelledby={headingId}>
			<VisuallyHidden>
				<h2 id={headingId}>{title}</h2>
			</VisuallyHidden>
			{children}
		</nav>
	);
};

export default Nav;
