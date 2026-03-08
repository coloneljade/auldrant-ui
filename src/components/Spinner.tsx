import VisuallyHidden from '@components/VisuallyHidden';
import type { IBaseProps } from '@scripts/types';
import { cx } from '@scripts/utils';
import styles from '@styles/Spinner.module.css';
import type { FunctionComponent } from 'preact';

/** Props for {@link Spinner}. */
interface ISpinnerProps extends IBaseProps {
	/** Visually-hidden label announced by screen readers. Defaults to `'Loading…'`. */
	label?: string;
	/** Size variant. Defaults to `'md'`. */
	size?: 'sm' | 'md' | 'lg';
}

/** Animated loading indicator with an accessible live region. */
const Spinner: FunctionComponent<ISpinnerProps> = (props) => {
	const { label = 'Loading\u2026', size = 'md', class: className } = props;
	return (
		<output
			class={cx(styles.spinner, size === 'sm' && styles.sm, size === 'lg' && styles.lg, className)}
		>
			<VisuallyHidden>{label}</VisuallyHidden>
		</output>
	);
};

export default Spinner;
