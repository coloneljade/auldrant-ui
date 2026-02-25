import type { IBaseProps } from '@scripts/types';
import { cx } from '@scripts/utils';
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
	/** Called with the selected value on change. */
	onChange?: (value: string) => void;
}

/** Radio button group inside a fieldset with legend. */
const RadioGroup: FunctionComponent<IRadioGroupProps> = (props) => {
	const { legend, name, options, value, required, disabled, onChange, class: className } = props;
	const groupId = useId();

	return (
		<fieldset class={cx(styles.fieldset, className)}>
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
		</fieldset>
	);
};

export default RadioGroup;
