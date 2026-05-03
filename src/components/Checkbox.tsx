import Icon, { IconName } from '@components/Icon';
import FieldError from '@internal/FieldError';
import type { IFieldProps } from '@internal/types';
import { describeBy } from '@internal/utils';
import styles from '@styles/Checkbox.module.css';
import { cx } from '@utils';
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
			<label class={cx(styles.field, className)}>
				<input
					class={styles.input}
					type="checkbox"
					name={name}
					checked={checked}
					required={required}
					disabled={disabled}
					aria-invalid={!!error || undefined}
					aria-describedby={describeBy(error && errorId)}
					onChange={onChange && ((e) => onChange((e.target as HTMLInputElement).checked))}
				/>
				<Icon name={IconName.check} class={styles.checkIcon} />
				{label}
			</label>
			{error && <FieldError id={errorId}>{error}</FieldError>}
		</>
	);
};

export default Checkbox;
