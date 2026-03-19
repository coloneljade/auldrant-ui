import FormField from '@components/FormField';
import type { IFieldProps } from '@scripts/types';
import { describeBy } from '@scripts/utils';
import styles from '@styles/Select.module.css';
import type { FunctionComponent } from 'preact';
import { useId } from 'preact/hooks';

/** A single option in a {@link Select}. */
export interface ISelectOption {
	/** Visible label text. */
	label: string;
	/** Form value when selected. */
	value: string;
}

/** A labeled group of options in a {@link Select}. */
export interface ISelectGroup {
	/** Group label shown as the optgroup heading. */
	label: string;
	/** Options within this group. */
	options: ISelectOption[];
}

/** Props for {@link Select}. */
interface ISelectProps extends IFieldProps {
	/** Current selected value. */
	value?: string;
	/** Placeholder text shown as a disabled first option. Omit to hide. */
	placeholder?: string;
	/** Available options — flat, grouped, or mixed. */
	options: (ISelectOption | ISelectGroup)[];
	/** Called with the new value on change. */
	onChange?: (value: string) => void;
}

/** Type guard for grouped options. */
const isGroup = (option: ISelectOption | ISelectGroup): option is ISelectGroup =>
	'options' in option;

/** Select dropdown with label, wrapped in FormField for layout. */
const Select: FunctionComponent<ISelectProps> = (props) => {
	const {
		label,
		name,
		value,
		placeholder,
		options,
		required,
		disabled,
		error,
		onChange,
		class: className,
	} = props;
	const id = useId();
	const errorId = `${id}-error`;

	return (
		<FormField label={label} required={required} error={error} inputId={id} class={className}>
			<select
				class={styles.select}
				id={id}
				name={name}
				value={value}
				required={required}
				disabled={disabled}
				aria-invalid={!!error || undefined}
				aria-describedby={describeBy(error && errorId)}
				onChange={onChange && ((e) => onChange((e.target as HTMLSelectElement).value))}
			>
				{placeholder && (
					<option value="" disabled>
						{placeholder}
					</option>
				)}
				{options.map((entry) =>
					isGroup(entry) ? (
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
		</FormField>
	);
};

export default Select;
