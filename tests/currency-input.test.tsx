import { describe, expect, it, mock } from 'bun:test';
import CurrencyInput from '@components/CurrencyInput';
import { fireEvent, render } from '@testing-library/preact';

describe('CurrencyInput', () => {
	const label = 'Amount';
	const name = 'amount';

	it('renders type="text" and inputMode="decimal"', () => {
		// Act
		const { getByRole } = render(<CurrencyInput label={label} name={name} />);
		const input = getByRole('textbox', { name: /Amount/ }) as HTMLInputElement;

		// Assert
		expect(input.type).toBe('text');
		expect(input.getAttribute('inputmode')).toBe('decimal');
	});

	it('formats the display value on render', () => {
		// Act
		const { getByRole } = render(
			<CurrencyInput label={label} name={name} value={1234.56} currency="USD" locale="en-US" />
		);
		const input = getByRole('textbox', { name: /Amount/ }) as HTMLInputElement;

		// Assert
		expect(input.value).toBe('$1,234.56');
	});

	it('strips formatting on focus', () => {
		// Arrange
		const { getByRole } = render(
			<CurrencyInput label={label} name={name} value={1234.56} currency="USD" locale="en-US" />
		);
		const input = getByRole('textbox', { name: /Amount/ }) as HTMLInputElement;

		// Act
		fireEvent.focus(input);

		// Assert
		expect(input.value).toBe('1234.56');
	});

	it('calls onInput with numeric value during typing', () => {
		// Arrange
		const handleInput = mock(() => {});
		const { getByRole } = render(
			<CurrencyInput label={label} name={name} locale="en-US" onInput={handleInput} />
		);
		const input = getByRole('textbox', { name: /Amount/ });

		// Act
		fireEvent.focus(input);
		fireEvent.input(input, { target: { value: '1234.56' } });

		// Assert
		expect(handleInput).toHaveBeenCalledWith(1234.56);
	});

	it('calls onInput with NaN for empty input', () => {
		// Arrange
		const handleInput = mock(() => {});
		const { getByRole } = render(<CurrencyInput label={label} name={name} onInput={handleInput} />);
		const input = getByRole('textbox', { name: /Amount/ });

		// Act
		fireEvent.focus(input);
		fireEvent.input(input, { target: { value: '' } });

		// Assert
		expect(handleInput).toHaveBeenCalledWith(NaN);
	});

	it('re-formats on blur', () => {
		// Arrange
		const { getByRole } = render(
			<CurrencyInput label={label} name={name} value={1234.56} currency="USD" locale="en-US" />
		);
		const input = getByRole('textbox', { name: /Amount/ }) as HTMLInputElement;
		fireEvent.focus(input);
		expect(input.value).toBe('1234.56');

		// Act
		fireEvent.blur(input, { target: { value: '1234.56' } });

		// Assert
		expect(input.value).toBe('$1,234.56');
	});

	it('formats as a plain number when currency prop is omitted', () => {
		// Act
		const { getByRole } = render(
			<CurrencyInput label={label} name={name} value={1234.56} locale="en-US" />
		);
		const input = getByRole('textbox', { name: /Amount/ }) as HTMLInputElement;

		// Assert
		expect(input.value).toBe('1,234.56');
	});
});
