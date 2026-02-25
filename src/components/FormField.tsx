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
	/** Field input element(s). */
	children: ComponentChildren;
}

/**
 * Internal layout component for form fields.
 * Renders a CSS Grid row with label (colon suffix) and input.
 */
const FormField: FunctionComponent<IFormFieldProps> = (props) => {
	const { for: htmlFor, label, required, children, class: className } = props;
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
		</div>
	);
};

export default FormField;
