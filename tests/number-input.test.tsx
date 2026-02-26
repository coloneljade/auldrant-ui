import { describe, expect, it, mock } from 'bun:test';
import NumberInput from '@components/NumberInput';
import { fireEvent, render } from '@testing-library/preact';

describe('NumberInput', () => {
	const label = 'Quantity';
	const name = 'quantity';

	it('always renders type="number"', () => {
		// Act
		const { getByRole } = render(<NumberInput label={label} name={name} />);
		const input = getByRole('spinbutton', { name: /Quantity/ }) as HTMLInputElement;

		// Assert
		expect(input.type).toBe('number');
	});

	it('calls onInput with a numeric value', () => {
		// Arrange
		const handleInput = mock(() => {});
		const { getByRole } = render(<NumberInput label={label} name={name} onInput={handleInput} />);

		// Act
		fireEvent.input(getByRole('spinbutton', { name: /Quantity/ }), {
			target: { value: '42', valueAsNumber: 42 },
		});

		// Assert
		expect(handleInput).toHaveBeenCalledWith(42);
	});
});
