import FormField from '@components/FormField';
import VisuallyHidden from '@components/VisuallyHidden';
import { useSignal } from '@preact/signals';
import type { IFieldProps } from '@scripts/types';
import { describeBy } from '@scripts/utils';
import styles from '@styles/Textarea.module.css';
import type { FunctionComponent } from 'preact';
import { useId } from 'preact/hooks';

/** Thresholds (percentage of maxChars used) at which to announce remaining characters. */
const PERCENT_THRESHOLDS = [75, 90, 100];

/** Absolute remaining character count that triggers an additional announcement. */
const ABSOLUTE_THRESHOLD = 10;

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

/** Find the highest percent threshold that `percentUsed` has reached. Returns 0 if below all. */
function currentPercentThreshold(percentUsed: number): number {
	for (let i = PERCENT_THRESHOLDS.length - 1; i >= 0; i--) {
		const threshold = PERCENT_THRESHOLDS[i];
		if (threshold !== undefined && percentUsed >= threshold) {
			return threshold;
		}
	}
	return 0;
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
		error,
		onInput,
		class: className,
	} = props;
	const id = useId();
	const errorId = `${id}-error`;
	const counterId = `${id}-counter`;
	const used = useSignal(value?.length ?? 0);
	const announcement = useSignal('');
	const lastPercentThreshold = useSignal(0);
	const absoluteAnnounced = useSignal(false);

	return (
		<FormField
			label={label}
			for={id}
			required={required}
			error={error}
			errorId={errorId}
			class={className}
		>
			<div class={styles.textareaWrapper}>
				<textarea
					id={id}
					class={styles.textarea}
					name={name}
					maxLength={maxChars}
					placeholder={placeholder}
					required={required}
					disabled={disabled}
					aria-invalid={!!error || undefined}
					aria-describedby={describeBy(error && errorId, counterId)}
					onInput={(e) => {
						const val = (e.target as HTMLTextAreaElement).value;
						used.value = val.length;

						const remaining = maxChars - val.length;
						const percentUsed = (val.length / maxChars) * 100;
						const threshold = currentPercentThreshold(percentUsed);
						const hitAbsolute =
							!absoluteAnnounced.value && remaining <= ABSOLUTE_THRESHOLD && remaining > 0;

						if (threshold > lastPercentThreshold.value || hitAbsolute) {
							announcement.value = `${remaining} character${remaining === 1 ? '' : 's'} remaining`;
							lastPercentThreshold.value = threshold;
							if (hitAbsolute) {
								absoluteAnnounced.value = true;
							}
						}

						onInput?.(val);
					}}
				>
					{value}
				</textarea>
				<span id={counterId} class={styles.counter}>
					{used} / {maxChars}
				</span>
				<VisuallyHidden>
					<span aria-live="polite">{announcement}</span>
				</VisuallyHidden>
			</div>
		</FormField>
	);
};

export default Textarea;
