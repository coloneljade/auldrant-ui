import FormField from '@components/FormField';
import type { IFieldProps } from '@scripts/types';
import { describeBy } from '@scripts/utils';
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
		error,
		onInput,
		class: className,
	} = props;
	const id = useId();
	const errorId = `${id}-error`;

	return (
		<FormField
			label={label}
			for={id}
			required={required}
			error={error}
			errorId={errorId}
			class={className}
		>
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
				aria-invalid={!!error || undefined}
				aria-describedby={describeBy(error && errorId)}
				onInput={onInput && ((e) => onInput((e.target as HTMLInputElement).valueAsNumber))}
			/>
		</FormField>
	);
};

export default NumberInput;
