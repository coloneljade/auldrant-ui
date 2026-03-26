import FormField from '@internal/FormField';
import type { IFieldProps } from '@internal/types';
import { describeBy } from '@internal/utils';
import styles from '@styles/Input.module.css';
import type { FunctionComponent } from 'preact';
import { useId } from 'preact/hooks';

/** Input types supported by the {@link Input} component. */
export type InputType = 'text' | 'email' | 'url' | 'tel' | 'date' | 'time' | 'datetime-local';

/** Types with unambiguous autocomplete mappings per WHATWG/WCAG. */
const autocompleteByType: { [key: string]: string } = {
	email: 'email',
	tel: 'tel',
	url: 'url',
};

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
		type = 'text',
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
			<input
				class={styles.input}
				id={id}
				type={type}
				name={name}
				value={value}
				placeholder={placeholder}
				maxLength={maxLength}
				autoComplete={autocomplete ?? autocompleteByType[type]}
				readOnly={readOnly}
				pattern={pattern}
				required={required}
				disabled={disabled}
				aria-invalid={!!error || undefined}
				aria-describedby={describeBy(error && errorId)}
				onInput={onInput && ((e) => onInput((e.target as HTMLInputElement).value))}
			/>
		</FormField>
	);
};

export default Input;
