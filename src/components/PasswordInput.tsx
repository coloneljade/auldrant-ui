import FormField from '@components/FormField';
import Icon, { IconName } from '@components/Icon';
import Tooltip from '@components/Tooltip';
import { useSignal } from '@preact/signals';
import type { IFieldProps } from '@scripts/types';
import styles from '@styles/PasswordInput.module.css';
import type { FunctionComponent } from 'preact';

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
	const visible = useSignal(false);

	return (
		<FormField label={label} required={required} error={error} class={className}>
			<div class={styles.passwordInputWrapper}>
				<input
					class={styles.input}
					type={visible.value ? 'text' : 'password'}
					name={name}
					value={value}
					placeholder={placeholder}
					autoComplete={autocompleteMap[purpose]}
					required={required}
					disabled={disabled}
					onInput={onInput && ((e) => onInput((e.target as HTMLInputElement).value))}
				/>
				<Tooltip content={visible.value ? 'Hide password' : 'Show password'}>
					<button
						type="button"
						class={styles.toggle}
						disabled={disabled}
						aria-label={visible.value ? 'Hide password' : 'Show password'}
						onClick={() => {
							visible.value = !visible.value;
						}}
					>
						<Icon name={visible.value ? IconName.hidePassword : IconName.showPassword} />
					</button>
				</Tooltip>
			</div>
		</FormField>
	);
};

export default PasswordInput;
