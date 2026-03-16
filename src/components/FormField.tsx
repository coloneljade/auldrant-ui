import type { IBaseProps } from '@scripts/types';
import { cx, describeBy } from '@scripts/utils';
import styles from '@styles/FormField.module.css';
import type { ComponentChildren, FunctionComponent } from 'preact';
import { useEffect, useId, useRef } from 'preact/hooks';

/** Props for {@link FormField}. */
interface IFormFieldProps extends IBaseProps {
	/** Visible label text. */
	label: string;
	/** Whether the field shows a required indicator. Accepts `undefined` for prop forwarding. */
	required?: boolean | undefined;
	/** Error message to display below the input. Accepts `undefined` for prop forwarding. */
	error?: string | undefined;
	/** Field input element(s). */
	children: ComponentChildren;
}

/**
 * Internal layout component for form fields.
 * Renders a CSS Grid row with a wrapping label (implicit association) and input.
 *
 * Automatically wires `aria-invalid` and `aria-describedby` on the first
 * input/select/textarea descendant. For extra describedby IDs (e.g. a character
 * counter), set `data-extra-describedby` on the input element — FormField will
 * include it in the composed `aria-describedby`.
 */
const FormField: FunctionComponent<IFormFieldProps> = (props) => {
	const { label, required, error, children, class: className } = props;
	const id = useId();
	const errorId = `${id}-error`;
	const fieldRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const el = fieldRef.current?.querySelector('input, select, textarea');
		if (!el) {
			return;
		}
		const extra = el.getAttribute('data-extra-describedby') || undefined;
		if (error) {
			el.setAttribute('aria-invalid', 'true');
			const composed = describeBy(errorId, extra);
			if (composed) {
				el.setAttribute('aria-describedby', composed);
			}
		} else {
			el.removeAttribute('aria-invalid');
			if (extra) {
				el.setAttribute('aria-describedby', extra);
			} else {
				el.removeAttribute('aria-describedby');
			}
		}
	});

	return (
		<div ref={fieldRef} class={cx(styles.field, className)}>
			{/* biome-ignore lint/a11y/noLabelWithoutControl: wrapping label — children contain the input */}
			<label class={styles.fieldLabel}>
				<span class={styles.label}>
					{label}:
					{required && (
						<span class={styles.required} aria-hidden="true">
							{' '}
							*
						</span>
					)}
				</span>
				{children}
			</label>
			{error && (
				<p id={errorId} class={styles.error} role="alert">
					{error}
				</p>
			)}
		</div>
	);
};

export default FormField;
