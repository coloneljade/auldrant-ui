import type { IBaseProps } from '@scripts/types';
import { cx, describeBy } from '@scripts/utils';
import styles from '@styles/RadioGroup.module.css';
import type { FunctionComponent } from 'preact';
import { useId } from 'preact/hooks';

/** A single option in a {@link RadioGroup}. */
export interface IRadioOption {
	/** Visible label text. */
	label: string;
	/** Form value when selected. */
	value: string;
}

/** Props for {@link RadioGroup}. */
interface IRadioGroupProps extends IBaseProps {
	/** Fieldset legend text. */
	legend: string;
	/** Field name attribute for form submission. */
	name: string;
	/** Available radio options. */
	options: IRadioOption[];
	/** Currently selected value. */
	value?: string;
	/** Whether a selection is required. */
	required?: boolean;
	/** Whether the group is disabled. */
	disabled?: boolean;
	/** Error message. When set, renders an error message and marks the fieldset as invalid. */
	error?: string;
	/** Called with the selected value on change. */
	onChange?: (value: string) => void;
}

/** Radio button group inside a fieldset with legend. */
const RadioGroup: FunctionComponent<IRadioGroupProps> = (props) => {
	const {
		legend,
		name,
		options,
		value,
		required,
		disabled,
		error,
		onChange,
		class: className,
	} = props;
	const groupId = useId();
	const errorId = `${groupId}-error`;

	return (
		<fieldset
			class={cx(styles.fieldset, className)}
			aria-invalid={!!error || undefined}
			aria-describedby={describeBy(error && errorId)}
		>
			<legend class={styles.legend}>{legend}</legend>
			{options.map((option) => {
				const optionId = `${groupId}-${option.value}`;
				return (
					<div key={option.value} class={styles.option}>
						<input
							id={optionId}
							class={styles.input}
							type="radio"
							name={name}
							value={option.value}
							checked={value === option.value}
							required={required}
							disabled={disabled}
							onChange={onChange && (() => onChange(option.value))}
						/>
						<label for={optionId}>{option.label}</label>
					</div>
				);
			})}
			{error && (
				<p id={errorId} class={styles.error} role="alert">
					{error}
				</p>
			)}
		</fieldset>
	);
};

export default RadioGroup;
