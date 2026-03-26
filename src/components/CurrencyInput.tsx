import FormField from '@internal/FormField';
import type { IFieldProps } from '@internal/types';
import { describeBy } from '@internal/utils';
import { useSignal } from '@preact/signals';
import styles from '@styles/CurrencyInput.module.css';
import type { FunctionComponent } from 'preact';
import { useId } from 'preact/hooks';

/** Props for {@link CurrencyInput}. */
interface ICurrencyInputProps extends IFieldProps {
	/** Current numeric value. */
	value?: number;
	/** ISO 4217 currency code (e.g. `'USD'`). Optional; omitting shows plain number formatting. */
	currency?: string;
	/** BCP 47 locale (e.g. `'en-US'`). Optional; falls back to browser default. */
	locale?: string;
	/** Called with the parsed numeric value on input. Returns `NaN` for empty/unparseable input. */
	onInput?: (value: number) => void;
}

function formatCurrency(value: number | undefined, currency?: string, locale?: string): string {
	if (value === undefined || Number.isNaN(value)) {
		return '';
	}
	if (currency) {
		return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(value);
	}
	return new Intl.NumberFormat(locale, {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	}).format(value);
}

function parseCurrency(text: string, locale?: string): number {
	const parts = new Intl.NumberFormat(locale).formatToParts(1.1);
	const decimalPart = parts.find((p) => p.type === 'decimal');
	const decimalSep = decimalPart ? decimalPart.value : '.';
	const escapedSep = decimalSep.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
	const stripped = text.replace(new RegExp(`[^0-9${escapedSep}]`, 'g'), '');
	const normalized = stripped.replace(decimalSep, '.');
	return parseFloat(normalized);
}

/** Currency or plain-decimal input with locale-aware formatting, wrapped in FormField for layout. */
const CurrencyInput: FunctionComponent<ICurrencyInputProps> = (props) => {
	const {
		label,
		name,
		value,
		currency,
		locale,
		required,
		disabled,
		error,
		onInput,
		class: className,
	} = props;
	const id = useId();
	const errorId = `${id}-error`;
	const rawText = useSignal<string | null>(null);

	const displayValue =
		rawText.value === null ? formatCurrency(value, currency, locale) : rawText.value;

	return (
		<FormField label={label} required={required} error={error} inputId={id} class={className}>
			<input
				class={styles.input}
				id={id}
				type="text"
				inputMode="decimal"
				name={name}
				value={displayValue}
				required={required}
				disabled={disabled}
				aria-invalid={!!error || undefined}
				aria-describedby={describeBy(error && errorId)}
				onFocus={() => {
					rawText.value = value !== undefined && !Number.isNaN(value) ? String(value) : '';
				}}
				onInput={(e) => {
					const text = (e.target as HTMLInputElement).value;
					rawText.value = text;
					onInput?.(parseCurrency(text, locale));
				}}
				onBlur={(e) => {
					const text = (e.target as HTMLInputElement).value;
					rawText.value = null;
					onInput?.(parseCurrency(text, locale));
				}}
			/>
		</FormField>
	);
};

export default CurrencyInput;
