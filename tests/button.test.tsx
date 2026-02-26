import { describe, expect, it, mock } from 'bun:test';
import Button from '@components/Button';
import { fireEvent, render } from '@testing-library/preact';

describe('Button', () => {
	it('defaults to type="button"', () => {
		// Arrange
		const label = 'Test';

		// Act
		const { getByText } = render(<Button label={label} />);

		// Assert
		expect((getByText(label) as HTMLButtonElement).type).toBe('button');
	});

	it('accepts a custom type', () => {
		// Arrange
		const label = 'Submit';

		// Act
		const { getByText } = render(<Button label={label} type="submit" />);

		// Assert
		expect((getByText(label) as HTMLButtonElement).type).toBe('submit');
	});

	it('calls onClick when clicked', () => {
		// Arrange
		const label = 'Go';
		const handleClick = mock(() => {});
		const { getByText } = render(<Button label={label} onClick={handleClick} />);

		// Act
		fireEvent.click(getByText(label));

		// Assert
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it('does not call onClick when disabled', () => {
		// Arrange
		const label = 'Nope';
		const handleClick = mock(() => {});
		const { getByText } = render(<Button label={label} onClick={handleClick} disabled />);
		const button = getByText(label) as HTMLButtonElement;
		expect(button.disabled).toBe(true);

		// Act
		fireEvent.click(button);

		// Assert
		expect(handleClick).not.toHaveBeenCalled();
	});
});
