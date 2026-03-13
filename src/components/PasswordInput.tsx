import FormField from '@components/FormField';
import { useSignal } from '@preact/signals';
import type { IFieldProps } from '@scripts/types';
import { describeBy } from '@scripts/utils';
import styles from '@styles/PasswordInput.module.css';
import { Eye, EyeOff } from 'lucide-preact';
import type { FunctionComponent } from 'preact';
import { useId } from 'preact/hooks';

/** Whether the password field is for the current or a new password. */
export enum PasswordPurpose {
	current = 'current',
	new = 'new',
}

/** Props for {@link PasswordInput}. */
interface IPasswordInputProps extends IFieldProps {
	/** Whether this is for the current password or a new one. Drives `autocomplete` automatically. */
	purpose: PasswordPurpose;
	/** Current input value. */
	value?: string;
	/** Placeholder text. */
	placeholder?: string;
	/** Called with the new value on input. */
	onInput?: (value: string) => void;
}

/** Autocomplete values for each purpose. */
const autocompleteMap: { [key in PasswordPurpose]: string } = {
	[PasswordPurpose.current]: 'current-password',
	[PasswordPurpose.new]: 'new-password',
};

/** Password input with show/hide toggle, wrapped in FormField for layout. */
const PasswordInput: FunctionComponent<IPasswordInputProps> = (props) => {
	const {
		label,
		name,
		purpose,
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
	const visible = useSignal(false);

	return (
		<FormField
			label={label}
			for={id}
			required={required}
			error={error}
			errorId={errorId}
			class={className}
		>
			<div class={styles.passwordInputWrapper}>
				<input
					id={id}
					class={styles.input}
					type={visible.value ? 'text' : 'password'}
					name={name}
					value={value}
					placeholder={placeholder}
					autoComplete={autocompleteMap[purpose]}
					required={required}
					disabled={disabled}
					aria-invalid={!!error || undefined}
					aria-describedby={describeBy(error && errorId)}
					onInput={onInput && ((e) => onInput((e.target as HTMLInputElement).value))}
				/>
				<button
					type="button"
					class={styles.toggle}
					disabled={disabled}
					aria-label={visible.value ? 'Hide password' : 'Show password'}
					onClick={() => {
						visible.value = !visible.value;
					}}
				>
					{visible.value ? <EyeOff size="1em" /> : <Eye size="1em" />}
				</button>
			</div>
		</FormField>
	);
};

export default PasswordInput;
