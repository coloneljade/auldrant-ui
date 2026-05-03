import FieldError from '@internal/FieldError';
import type { IBaseProps } from '@internal/types';
import styles from '@styles/FormField.module.css';
import { cx } from '@utils';
import type { ComponentChildren, FunctionComponent } from 'preact';

/** Props for {@link FormField}. */
interface IFormFieldProps extends IBaseProps {
	/** Visible label text. */
	label: string;
	/** ID of the associated input element for explicit `for`/`id` label association. */
	inputId: string;
	/** Whether the field shows a required indicator. Accepts `undefined` for prop forwarding. */
	required?: boolean | undefined;
	/** Error message to display below the input. Accepts `undefined` for prop forwarding. */
	error?: string | undefined;
	/** Field input element(s). */
	children: ComponentChildren;
}

/**
 * Internal layout component for form fields.
 * Renders a CSS Grid row with an explicit label (`htmlFor`/`inputId` association) and input.
 *
 * The `errorId` is derived as `${inputId}-error` — consumers should use the same
 * formula when wiring `aria-describedby` on their input element.
 */
const FormField: FunctionComponent<IFormFieldProps> = (props) => {
	const { label, inputId, required, error, children, class: className } = props;
	const errorId = `${inputId}-error`;

	return (
		<div class={cx(styles.field, className)}>
			<label for={inputId} class={styles.fieldLabel}>
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
				<FieldError id={errorId} class={styles.error}>
					{error}
				</FieldError>
			)}
		</div>
	);
};

export default FormField;
