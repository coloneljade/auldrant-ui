import Icon, { IconName } from '@components/Icon';
import Tooltip from '@components/Tooltip';
import FormField from '@internal/FormField';
import type { IFieldProps } from '@internal/types';
import { describeBy } from '@internal/utils';
import styles from '@styles/SearchInput.module.css';
import type { FunctionComponent } from 'preact';
import { useId } from 'preact/hooks';

/** Props for {@link SearchInput}. */
interface ISearchInputProps extends IFieldProps {
	/** Current input value. */
	value?: string;
	/** Placeholder text. */
	placeholder?: string;
	/** Called with the new value on every keystroke and on clear. */
	onInput?: (value: string) => void;
	/** Called additionally when the clear button is clicked. */
	onClear?: () => void;
	/** Called when Enter is pressed and the value is non-empty. */
	onSubmit?: (value: string) => void;
}

/** Search input with icon, clear button, and Enter-to-submit, wrapped in FormField. */
const SearchInput: FunctionComponent<ISearchInputProps> = (props) => {
	const {
		label,
		name,
		value,
		placeholder,
		required,
		disabled,
		error,
		onInput,
		onClear,
		onSubmit,
		class: className,
	} = props;
	const id = useId();
	const errorId = `${id}-error`;

	return (
		<search>
			<FormField label={label} required={required} error={error} inputId={id} class={className}>
				<div class={styles.searchInputWrapper}>
					<Icon name={IconName.search} />
					<input
						class={styles.input}
						id={id}
						type="search"
						name={name}
						value={value}
						placeholder={placeholder}
						required={required}
						disabled={disabled}
						aria-invalid={!!error || undefined}
						aria-describedby={describeBy(error && errorId)}
						onInput={onInput && ((e) => onInput((e.target as HTMLInputElement).value))}
						onKeyDown={(e) => {
							if (e.key === 'Enter' && value?.trim()) {
								onSubmit?.(value);
							}
						}}
					/>
					{value && (
						<Tooltip content="Clear search">
							<button
								type="button"
								class={styles.clearButton}
								disabled={disabled}
								aria-label="Clear search"
								onClick={() => {
									onInput?.('');
									onClear?.();
								}}
							>
								<Icon name={IconName.dismiss} />
							</button>
						</Tooltip>
					)}
				</div>
			</FormField>
		</search>
	);
};

export default SearchInput;
