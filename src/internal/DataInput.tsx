import type { IBaseProps } from '@internal/types';
import styles from '@styles/DataInput.module.css';
import { cx } from '@utils';
import type { FunctionComponent } from 'preact';

/** Text-shaped input types supported by the {@link DataInput} primitive's text variant. */
export type DataInputTextType =
	| 'text'
	| 'email'
	| 'url'
	| 'tel'
	| 'date'
	| 'time'
	| 'datetime-local';

/** Input types supported by the {@link DataInput} primitive. */
export type DataInputType = DataInputTextType | 'number';

/** Types with unambiguous autocomplete mappings per WHATWG/WCAG. */
const autocompleteByType: { [key: string]: string } = {
	email: 'email',
	tel: 'tel',
	url: 'url',
};

/** Props common to both DataInput variants. */
interface IDataInputBaseProps extends IBaseProps {
	/** Element id. Use when an external `<label for>` references this input, or for `aria-describedby` targets. */
	id?: string;
	/** ID of an element (typically a column `<th>`) whose text labels this input. Use when no `<label for>` association is in scope. */
	ariaLabelledby?: string;
	/** ID(s) of element(s) that describe this input — typically a `FieldError` rendered nearby. */
	ariaDescribedby?: string;
	/** Form name attribute. Optional — tabular consumers often manage state externally. */
	name?: string;
	/** Placeholder text. */
	placeholder?: string;
	/** Whether the field is read-only (focusable, submitted, copyable — distinct from disabled). */
	readOnly?: boolean;
	/** Whether the field is required. */
	required?: boolean;
	/** Whether the field is disabled. */
	disabled?: boolean;
	/** Truthy sets `aria-invalid="true"`. The message is rendered separately (see `FieldError`). */
	error?: string;
	/** Called on focus. */
	onFocus?: (e: FocusEvent) => void;
	/** Called on blur. */
	onBlur?: (e: FocusEvent) => void;
}

/** Props for the text variant of {@link DataInput} (default — used for text/email/url/tel/date/time inputs). */
interface IDataInputTextProps extends IDataInputBaseProps {
	/** HTML input type. Defaults to `'text'`. */
	type?: DataInputTextType;
	/** Current input value. */
	value?: string;
	/** Maximum character length. */
	maxLength?: number;
	/** Validation pattern (regex string). */
	pattern?: string;
	/** Autocomplete hint. Defaults automatically for `email`, `tel`, and `url` types. */
	autocomplete?: string;
	/** `inputmode` hint for soft keyboards (e.g. `'decimal'` on currency-style inputs). */
	inputMode?: string;
	/** Called with the new value on input. */
	onInput?: (value: string) => void;
}

/** Props for the number variant of {@link DataInput} — used for numeric inputs with min/max/step. */
interface IDataInputNumberProps extends IDataInputBaseProps {
	/** Discriminator — selects the number variant. */
	type: 'number';
	/** Current numeric value. */
	value?: number;
	/** Minimum allowed value. */
	min?: number;
	/** Maximum allowed value. */
	max?: number;
	/** Step increment. */
	step?: number;
	/** Called with the new numeric value on input. Returns `NaN` for empty input. */
	onInput?: (value: number) => void;
}

/** Props for {@link DataInput}. Discriminated union on `type`. */
type IDataInputProps = IDataInputTextProps | IDataInputNumberProps;

/**
 * Internal styled-input primitive. Composed by the public form components
 * ({@link Input}, {@link NumberInput}, {@link CurrencyInput}) inside `FormField`,
 * and usable directly in tabular contexts where a column `<th>` provides the
 * accessible name via `ariaLabelledby`.
 *
 * Discriminated on `type`: text variant covers text/email/url/tel/date/time
 * inputs (string `value`, string `onInput`); number variant covers `'number'`
 * (numeric `value`, numeric `onInput` extracted via `valueAsNumber`).
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
		name,
		placeholder,
		readOnly,
		required,
		disabled,
		error,
		ariaLabelledby,
		ariaDescribedby,
		onFocus,
		onBlur,
		class: className,
	} = props;

	const commonAttrs = {
		class: cx(styles.input, className),
		id,
		name,
		placeholder,
		readOnly,
		required,
		disabled,
		'aria-invalid': !!error || undefined,
		'aria-labelledby': ariaLabelledby,
		'aria-describedby': ariaDescribedby,
		onFocus,
		onBlur,
	};

	if (props.type === 'number') {
		const { value, min, max, step, onInput } = props;
		return (
			<input
				{...commonAttrs}
				type="number"
				value={value}
				min={min}
				max={max}
				step={step}
				onInput={onInput && ((e) => onInput((e.target as HTMLInputElement).valueAsNumber))}
			/>
		);
	}

	const { type = 'text', value, maxLength, pattern, autocomplete, inputMode, onInput } = props;
	return (
		<input
			{...commonAttrs}
			type={type}
			value={value}
			maxLength={maxLength}
			pattern={pattern}
			autoComplete={autocomplete ?? autocompleteByType[type]}
			inputMode={inputMode}
			onInput={onInput && ((e) => onInput((e.target as HTMLInputElement).value))}
		/>
	);
};

export default DataInput;
