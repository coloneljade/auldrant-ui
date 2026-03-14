import type { IFieldProps } from '@scripts/types';
import { cx, describeBy } from '@scripts/utils';
import styles from '@styles/Checkbox.module.css';
import type { FunctionComponent } from 'preact';
import { useId } from 'preact/hooks';

/** Visual variant for {@link Checkbox}. */
export enum CheckboxVariant {
	default = 'default',
	highlight = 'highlight',
}

/** Props for {@link Checkbox}. */
interface ICheckboxProps extends IFieldProps {
	/** Visual variant. `highlight` renders a bordered tile. */
	variant?: CheckboxVariant;
	/** Whether the checkbox is checked. */
	checked?: boolean;
	/** Called with the new checked state on change. */
	onChange?: (checked: boolean) => void;
}

/** Checkbox with label. Layout: input before label, no colon suffix. */
const Checkbox: FunctionComponent<ICheckboxProps> = (props) => {
	const {
		label,
		name,
		variant,
		checked,
		required,
		disabled,
		error,
		onChange,
		class: className,
	} = props;
	const isHighlight = variant === CheckboxVariant.highlight;
	const id = useId();
	const errorId = `${id}-error`;

	if (isHighlight) {
		return (
			<label class={cx(styles.field, styles.fieldHighlight, className)}>
				<input
					class={styles.input}
					type="checkbox"
					name={name}
					checked={checked}
					required={required}
					disabled={disabled}
					aria-invalid={!!error || undefined}
					aria-describedby={describeBy(error && errorId)}
					onChange={onChange && ((e) => onChange((e.target as HTMLInputElement).checked))}
				/>
				{label}
				{error && (
					<p id={errorId} class={styles.error} role="alert">
						{error}
					</p>
				)}
			</label>
		);
	}

	return (
		<div class={cx(styles.field, className)}>
			<input
				id={id}
				class={styles.input}
				type="checkbox"
				name={name}
				checked={checked}
				required={required}
				disabled={disabled}
				aria-invalid={!!error || undefined}
				aria-describedby={describeBy(error && errorId)}
				onChange={onChange && ((e) => onChange((e.target as HTMLInputElement).checked))}
			/>
			<label for={id}>{label}</label>
			{error && (
				<p id={errorId} class={styles.error} role="alert">
					{error}
				</p>
			)}
		</div>
	);
};

export default Checkbox;
