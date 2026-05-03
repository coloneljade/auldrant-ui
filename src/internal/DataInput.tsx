import type { IBaseProps } from '@internal/types';
import styles from '@styles/DataInput.module.css';
import { cx } from '@utils';
import type { FunctionComponent } from 'preact';

/** Input types supported by the {@link DataInput} primitive. */
export type DataInputType = 'text' | 'email' | 'url' | 'tel' | 'date' | 'time' | 'datetime-local';

/** Types with unambiguous autocomplete mappings per WHATWG/WCAG. */
const autocompleteByType: { [key: string]: string } = {
	email: 'email',
	tel: 'tel',
	url: 'url',
};

/** Props for {@link DataInput}. */
interface IDataInputProps extends IBaseProps {
	/** Element id. Use when an external `<label for>` references this input, or for `aria-describedby` targets. */
	id?: string;
	/** ID of an element (typically a column `<th>`) whose text labels this input. Use when no `<label for>` association is in scope. */
	ariaLabelledby?: string;
	/** HTML input type. Defaults to `'text'`. */
	type?: DataInputType;
	/** Form name attribute. Optional — tabular consumers often manage state externally. */
	name?: string;
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
	/** Whether the field is required. */
	required?: boolean;
	/** Whether the field is disabled. */
	disabled?: boolean;
	/** Truthy sets `aria-invalid="true"`. The message is rendered separately (see `FieldError`). */
	error?: string;
	/** Called with the new value on input. */
	onInput?: (value: string) => void;
	/** ID(s) of element(s) that describe this input — typically a `FieldError` rendered nearby. */
	ariaDescribedby?: string;
}

/**
 * Internal styled-input primitive composed by {@link Input} (with `FormField`)
 * and by tabular contexts (where a column `<th>` provides the accessible name
 * via `ariaLabelledby`).
 *
 * The composer is responsible for wiring an accessible name — either an
 * external `<label for={id}>` association, or `ariaLabelledby` referencing
 * existing label text. `DataInput` does not enforce labelling at the type
 * level because all callers are internal and verified.
 *
 * Sets `aria-invalid` from the truthiness of `error`. Does not render the
 * error message — the composer (or a sibling `FieldError`) handles that and
 * wires `ariaDescribedby` to its id.
 */
const DataInput: FunctionComponent<IDataInputProps> = (props) => {
	const {
		id,
		type = 'text',
		name,
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
		ariaLabelledby,
		ariaDescribedby,
		class: className,
	} = props;

	return (
		<input
			class={cx(styles.input, className)}
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
			aria-labelledby={ariaLabelledby}
			aria-describedby={ariaDescribedby}
			onInput={onInput && ((e) => onInput((e.target as HTMLInputElement).value))}
		/>
	);
};

export default DataInput;
