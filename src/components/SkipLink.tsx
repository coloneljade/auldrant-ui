import type { IBaseProps } from '@internal/types';
import styles from '@styles/SkipLink.module.css';
import { cx } from '@utils';
import type { FunctionComponent } from 'preact';

/** Props for {@link SkipLink}. */
interface ISkipLinkProps extends IBaseProps {
	/** Target element ID (must start with `#`). */
	target: `#${string}`;
	/** Visible link text. Defaults to `'Skip to main content'`. */
	label?: string;
}

/**
 * Skip navigation link. Hidden until focused via keyboard Tab.
 */
const SkipLink: FunctionComponent<ISkipLinkProps> = (props) => {
	const { target, label = 'Skip to main content', class: className } = props;
	return (
		<a href={target} class={cx(styles.skip, className)}>
			{label}
		</a>
	);
};

export default SkipLink;
