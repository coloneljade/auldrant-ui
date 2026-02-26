import { describe, expect, it, mock } from 'bun:test';
import Checkbox from '@components/Checkbox';
import { fireEvent, render } from '@testing-library/preact';

describe('Checkbox', () => {
	const label = 'Accept terms';
	const name = 'terms';

	it('calls onChange with the checked state', () => {
		// Arrange
		const handleChange = mock(() => {});
		const { getByLabelText } = render(
			<Checkbox label={label} name={name} onChange={handleChange} />
		);

		// Act
		fireEvent.click(getByLabelText(label));

		// Assert
		expect(handleChange).toHaveBeenCalledWith(true);
	});

	it('can be disabled', () => {
		// Act
		const { getByRole } = render(<Checkbox label={label} name={name} disabled />);
		const checkbox = getByRole('checkbox', { name: label }) as HTMLInputElement;

		// Assert
		expect(checkbox.disabled).toBe(true);
	});
});
