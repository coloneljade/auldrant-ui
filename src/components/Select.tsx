import DataSelect, { type ISelectGroup, type ISelectOption } from '@internal/DataSelect';
import FormField from '@internal/FormField';
import type { IFieldProps } from '@internal/types';
import type { FunctionComponent } from 'preact';
import { useId } from 'preact/hooks';

export type { ISelectGroup, ISelectOption };

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
			<DataSelect
				id={id}
				name={name}
				value={value}
				placeholder={placeholder}
				options={options}
				required={required}
				disabled={disabled}
				error={error}
				ariaDescribedby={error ? errorId : undefined}
				onChange={onChange}
			/>
		</FormField>
	);
};

export default Select;
