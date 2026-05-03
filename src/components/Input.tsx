import DataInput, { type DataInputType } from '@internal/DataInput';
import FormField from '@internal/FormField';
import type { IFieldProps } from '@internal/types';
import type { FunctionComponent } from 'preact';
import { useId } from 'preact/hooks';

/** Input types supported by the {@link Input} component. */
export type InputType = DataInputType;

/** Props for {@link Input}. */
interface IInputProps extends IFieldProps {
	/** HTML input type. Defaults to `'text'`. */
	type?: InputType;
	/** Current input value. */
	value?: string;
	/** Placeholder text. */
	placeholder?: string;
	/** Maximum character length. */
	maxLength?: number;
	/** Autocomplete hint. Defaults automatically for `email`, `tel`, and `url` types. */
	autocomplete?: string;
	/** Whether the field is read-only (focusable, submitted, copyable — distinct from disabled). */
	readOnly?: boolean;
	/** Validation pattern (regex string). */
	pattern?: string;
	/** Called with the new value on input. */
	onInput?: (value: string) => void;
}

/** Text input with label, wrapped in FormField for layout. */
const Input: FunctionComponent<IInputProps> = (props) => {
	const {
		label,
		name,
		type,
		value,
		placeholder,
		maxLength,
		autocomplete,
		readOnly,
		pattern,
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
				type={type}
				name={name}
				value={value}
				placeholder={placeholder}
				maxLength={maxLength}
				autocomplete={autocomplete}
				readOnly={readOnly}
				pattern={pattern}
				required={required}
				disabled={disabled}
				error={error}
				ariaDescribedby={error ? errorId : undefined}
				onInput={onInput}
			/>
		</FormField>
	);
};

export default Input;
