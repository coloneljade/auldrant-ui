import FormField from '@components/FormField';
import { useSignal } from '@preact/signals';
import type { IFieldProps } from '@scripts/types';
import styles from '@styles/Textarea.module.css';
import type { FunctionComponent } from 'preact';
import { useId } from 'preact/hooks';

/** Props for {@link Textarea}. */
interface ITextareaProps extends IFieldProps {
	/** Maximum character limit. Sets `maxLength` on the textarea. */
	maxChars: number;
	/** Current textarea value. */
	value?: string;
	/** Placeholder text. */
	placeholder?: string;
	/** Called with the new value on input. */
	onInput?: (value: string) => void;
}

/** Textarea with label and character counter, wrapped in FormField for layout. */
const Textarea: FunctionComponent<ITextareaProps> = (props) => {
	const {
		label,
		name,
		maxChars,
		value,
		placeholder,
		required,
		disabled,
		onInput,
		class: className,
	} = props;
	const id = useId();
	const counterId = `${id}-counter`;
	const used = useSignal(value?.length ?? 0);

	return (
		<FormField label={label} for={id} required={required} class={className}>
			<div class={styles.wrapper}>
				<textarea
					id={id}
					class={styles.textarea}
					name={name}
					maxLength={maxChars}
					placeholder={placeholder}
					required={required}
					disabled={disabled}
					aria-describedby={counterId}
					onInput={(e) => {
						const val = (e.target as HTMLTextAreaElement).value;
						used.value = val.length;
						onInput?.(val);
					}}
				>
					{value}
				</textarea>
				<span id={counterId} class={styles.counter}>
					{used} / {maxChars}
				</span>
			</div>
		</FormField>
	);
};

export default Textarea;
