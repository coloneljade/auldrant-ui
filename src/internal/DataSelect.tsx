import type { IBaseProps } from '@internal/types';
import styles from '@styles/DataSelect.module.css';
import { cx } from '@utils';
import type { FunctionComponent } from 'preact';

/** A single option in a {@link DataSelect}. */
export interface ISelectOption {
	/** Visible label text. */
	label: string;
	/** Form value when selected. */
	value: string;
}

/** A labeled group of options in a {@link DataSelect}. */
export interface ISelectGroup {
	/** Group label shown as the optgroup heading. */
	label: string;
	/** Options within this group. */
	options: ISelectOption[];
}

/** Type guard for grouped options. */
export const isSelectGroup = (option: ISelectOption | ISelectGroup): option is ISelectGroup =>
	'options' in option;

/** Props for {@link DataSelect}. */
interface IDataSelectProps extends IBaseProps {
	/** Element id. Use when an external `<label for>` references this select, or for `aria-describedby` targets. */
	id?: string;
	/** ID of an element (typically a column `<th>`) whose text labels this select. Use when no `<label for>` association is in scope. */
	ariaLabelledby?: string;
	/** ID(s) of element(s) that describe this select — typically a `FieldError` rendered nearby. */
	ariaDescribedby?: string;
	/** Form name attribute. Optional — tabular consumers often manage state externally. */
	name?: string;
	/** Current selected value. */
	value?: string;
	/** Placeholder text shown as a disabled first option. Omit to hide. */
	placeholder?: string;
	/** Available options — flat, grouped, or mixed. */
	options: (ISelectOption | ISelectGroup)[];
	/** Whether a selection is required. */
	required?: boolean;
	/** Whether the select is disabled. */
	disabled?: boolean;
	/** Truthy sets `aria-invalid="true"`. The message is rendered separately (see `FieldError`). */
	error?: string;
	/** Called with the new value on change. */
	onChange?: (value: string) => void;
}

/**
 * Internal styled-`<select>` primitive. Composed by {@link Select} (with
 * `FormField`) and usable directly in tabular contexts where a column `<th>`
 * provides the accessible name via `ariaLabelledby`.
 *
 * Sets `aria-invalid` from the truthiness of `error`. Does not render the
 * error message — the composer (or a sibling `FieldError`) handles that and
 * wires `ariaDescribedby` to its id.
 */
const DataSelect: FunctionComponent<IDataSelectProps> = (props) => {
	const {
		id,
		name,
		value,
		placeholder,
		options,
		required,
		disabled,
		error,
		onChange,
		ariaLabelledby,
		ariaDescribedby,
		class: className,
	} = props;

	return (
		<select
			class={cx(styles.select, className)}
			id={id}
			name={name}
			value={value}
			required={required}
			disabled={disabled}
			aria-invalid={!!error || undefined}
			aria-labelledby={ariaLabelledby}
			aria-describedby={ariaDescribedby}
			onChange={onChange && ((e) => onChange((e.target as HTMLSelectElement).value))}
		>
			{placeholder && (
				<option value="" disabled>
					{placeholder}
				</option>
			)}
			{options.map((entry) =>
				isSelectGroup(entry) ? (
					<optgroup key={entry.label} label={entry.label}>
						{entry.options.map((opt) => (
							<option key={opt.value} value={opt.value}>
								{opt.label}
							</option>
						))}
					</optgroup>
				) : (
					<option key={entry.value} value={entry.value}>
						{entry.label}
					</option>
				)
			)}
		</select>
	);
};

export default DataSelect;
