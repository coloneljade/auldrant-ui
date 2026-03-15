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

	it('renders checked state', () => {
		// Act
		const { getByRole } = render(<Checkbox label={label} name={name} checked />);

		// Assert
		expect((getByRole('checkbox', { name: label }) as HTMLInputElement).checked).toBe(true);
	});

	it('renders unchecked state by default', () => {
		// Act
		const { getByRole } = render(<Checkbox label={label} name={name} />);

		// Assert
		expect((getByRole('checkbox', { name: label }) as HTMLInputElement).checked).toBe(false);
	});

	it('shows error message when error prop is set', () => {
		// Arrange
		const error = 'This field is required';

		// Act
		const { getByRole } = render(<Checkbox label={label} name={name} error={error} />);

		// Assert
		getByRole('alert');
	});

	it('sets aria-invalid when error prop is set', () => {
		// Arrange
		const error = 'Required';

		// Act
		const { getByRole } = render(<Checkbox label={label} name={name} error={error} />);

		// Assert
		expect(getByRole('checkbox', { name: label }).getAttribute('aria-invalid')).toBe('true');
	});

	it('forwards required attribute to input', () => {
		// Act
		const { getByRole } = render(<Checkbox label={label} name={name} required />);

		// Assert
		expect((getByRole('checkbox', { name: label }) as HTMLInputElement).required).toBe(true);
	});

	it('disabled prevents onChange from firing', () => {
		// Arrange
		const handleChange = mock(() => {});

		// Act
		const { getByLabelText } = render(
			<Checkbox label={label} name={name} disabled onChange={handleChange} />
		);
		fireEvent.click(getByLabelText(label));

		// Assert
		expect(handleChange).not.toHaveBeenCalled();
	});
});
