import type { IFieldProps } from '@scripts/types';
import { cx, describeBy } from '@scripts/utils';
import styles from '@styles/Checkbox.module.css';
import type { FunctionComponent } from 'preact';
import { useId } from 'preact/hooks';

/** Props for {@link Checkbox}. */
interface ICheckboxProps extends IFieldProps {
	/** Whether the checkbox is checked. */
	checked?: boolean;
	/** Called with the new checked state on change. */
	onChange?: (checked: boolean) => void;
}

/** Checkbox with label. Layout: input before label, no colon suffix. */
const Checkbox: FunctionComponent<ICheckboxProps> = (props) => {
	const { label, name, checked, required, disabled, error, onChange, class: className } = props;
	const id = useId();
	const errorId = `${id}-error`;

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
