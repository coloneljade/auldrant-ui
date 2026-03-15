import type { IBaseProps } from '@scripts/types';
import { cx } from '@scripts/utils';
import styles from '@styles/Progress.module.css';
import type { FunctionComponent } from 'preact';

interface IDeterminateProgressProps extends IBaseProps {
	/** Accessible label announced by screen readers. */
	label: string;
	/** Current progress (0–100). Required when not indeterminate. */
	value: number;
	indeterminate?: false;
}

interface IIndeterminateProgressProps extends IBaseProps {
	/** Accessible label announced by screen readers. */
	label: string;
	value?: never;
	indeterminate: true;
}

type IProgressProps = IDeterminateProgressProps | IIndeterminateProgressProps;

/**
 * Determinate or indeterminate progress bar.
 * Uses the native `<progress>` element — no inline styles, CSP-safe.
 * CSS `:indeterminate` drives the animation for the indeterminate variant.
 */
const Progress: FunctionComponent<IProgressProps> = (props) => {
	const { label, class: className } = props;
	const isIndeterminate = props.indeterminate === true;
	const value = isIndeterminate ? undefined : props.value;

	return (
		<progress
			class={cx(styles.progress, className)}
			value={value}
			max={100}
			aria-label={label}
			aria-valuenow={isIndeterminate ? undefined : value}
			aria-valuemin={isIndeterminate ? undefined : 0}
			aria-valuemax={isIndeterminate ? undefined : 100}
		/>
	);
};

export default Progress;
