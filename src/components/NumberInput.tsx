import DataInput from '@internal/DataInput';
import FormField from '@internal/FormField';
import type { IFieldProps } from '@internal/types';
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
		<FormField label={label} required={required} error={error} inputId={id} class={className}>
			<DataInput
				id={id}
				type="number"
				name={name}
				value={value}
				min={min}
				max={max}
				step={step}
				placeholder={placeholder}
				required={required}
				disabled={disabled}
				error={error}
				ariaDescribedby={error ? errorId : undefined}
				onInput={onInput}
			/>
		</FormField>
	);
};

export default NumberInput;
