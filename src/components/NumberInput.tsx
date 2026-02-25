import FormField from '@components/FormField';
import type { IFieldProps } from '@scripts/types';
import styles from '@styles/NumberInput.module.css';
import type { FunctionComponent } from 'preact';
import { useId } from 'preact/hooks';

/** Props for {@link NumberInput}. */
interface INumberInputProps extends IFieldProps {
	/** Minimum allowed value. */
	min?: number;
	/** Maximum allowed value. */
	max?: number;
	/** Step increment. */
	step?: number;
	/** Current numeric value. */
	value?: number;
	/** Placeholder text. */
	placeholder?: string;
	/** Called with the new numeric value on input. Returns `NaN` for empty input. */
	onInput?: (value: number) => void;
}

/** Numeric input with label, wrapped in FormField for layout. */
const NumberInput: FunctionComponent<INumberInputProps> = (props) => {
	const {
		label,
		name,
		min,
		max,
		step,
		value,
		placeholder,
		required,
		disabled,
		onInput,
		class: className,
	} = props;
	const id = useId();

	return (
		<FormField label={label} for={id} required={required} class={className}>
			<input
				id={id}
				class={styles.input}
				type="number"
				name={name}
				min={min}
				max={max}
				step={step}
				value={value}
				placeholder={placeholder}
				required={required}
				disabled={disabled}
				onInput={onInput && ((e) => onInput((e.target as HTMLInputElement).valueAsNumber))}
			/>
		</FormField>
	);
};

export default NumberInput;
