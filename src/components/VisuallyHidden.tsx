import styles from '@styles/VisuallyHidden.module.css';
import type { ComponentChildren, FunctionComponent } from 'preact';

/** Props for {@link VisuallyHidden}. */
interface IVisuallyHiddenProps {
	/** Content visible to assistive technology only. */
	children: ComponentChildren;
}

/**
 * CSS-only screen-reader utility. Content is hidden visually
 * but remains accessible to assistive technology.
 */
const VisuallyHidden: FunctionComponent<IVisuallyHiddenProps> = (props) => {
	const { children } = props;
	return <span class={styles.hidden}>{children}</span>;
};

export default VisuallyHidden;
