import type { IBaseProps } from '@scripts/types';
import { cx } from '@scripts/utils';
import styles from '@styles/FormField.module.css';
import type { ComponentChildren, FunctionComponent } from 'preact';

/** Props for {@link FormField}. */
interface IFormFieldProps extends IBaseProps {
	/** Visible label text. */
	label: string;
	/** ID of the input element this label is for. */
	for: string;
	/** Whether the field shows a required indicator. Accepts `undefined` for prop forwarding. */
	required?: boolean | undefined;
	/** Error message to display below the input. Accepts `undefined` for prop forwarding. */
	error?: string | undefined;
	/** ID for the error message element (used for aria-describedby on the input). Accepts `undefined` for prop forwarding. */
	errorId?: string | undefined;
	/** Field input element(s). */
	children: ComponentChildren;
}

/**
 * Internal layout component for form fields.
 * Renders a CSS Grid row with label (colon suffix) and input.
 */
const FormField: FunctionComponent<IFormFieldProps> = (props) => {
	const { for: htmlFor, label, required, error, errorId, children, class: className } = props;
	return (
		<div class={cx(styles.field, className)}>
			<label class={styles.label} for={htmlFor}>
				{label}:
				{required && (
					<span class={styles.required} aria-hidden="true">
						{' '}
						*
					</span>
				)}
			</label>
			{children}
			{error && (
				<p id={errorId} class={styles.error} role="alert">
					{error}
				</p>
			)}
		</div>
	);
};

export default FormField;
