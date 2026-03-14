import FormField from '@components/FormField';
import type { IFieldProps } from '@scripts/types';
import { describeBy } from '@scripts/utils';
import styles from '@styles/SearchInput.module.css';
import { Search, X } from 'lucide-preact';
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
			<FormField
				label={label}
				for={id}
				required={required}
				error={error}
				errorId={errorId}
				class={className}
			>
				<div class={styles.searchInputWrapper}>
					<Search size="1em" aria-hidden="true" />
					<input
						id={id}
						class={styles.input}
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
							<X size="1em" />
						</button>
					)}
				</div>
			</FormField>
		</search>
	);
};

export default SearchInput;
