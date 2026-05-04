import DataCheckbox from '@internal/DataCheckbox';
import FieldError from '@internal/FieldError';
import type { IFieldProps } from '@internal/types';
import type { FunctionComponent } from 'preact';
import { useId } from 'preact/hooks';

/** Props for {@link Checkbox}. */
interface ICheckboxProps extends IFieldProps {
	/** Whether the checkbox is checked. */
	checked?: boolean;
	/** Called with the new checked state on change. */
	onChange?: (checked: boolean) => void;
}

/** Checkbox rendered as a bordered tile. Shows a check icon when checked. */
const Checkbox: FunctionComponent<ICheckboxProps> = (props) => {
	const { label, name, checked, required, disabled, error, onChange, class: className } = props;
	const errorId = useId();

	return (
		<>
			<DataCheckbox
				class={className}
				name={name}
				checked={checked}
				required={required}
				disabled={disabled}
				error={error}
				ariaDescribedby={error ? errorId : undefined}
				onChange={onChange}
			>
				{label}
			</DataCheckbox>
			{error && <FieldError id={errorId}>{error}</FieldError>}
		</>
	);
};

export default Checkbox;
