import { describe, expect, it, mock } from 'bun:test';
import Button from '@components/Button';
import { IconName } from '@components/Icon';
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

describe('Button (icon-only)', () => {
	it('renders with the accessible label', () => {
		// Act
		const { getByRole } = render(<Button icon={IconName.dismiss} aria-label="Close" />);

		// Assert
		getByRole('button', { name: 'Close' });
	});

	it('defaults to type="button"', () => {
		// Act
		const { getByRole } = render(<Button icon={IconName.dismiss} aria-label="Close" />);

		// Assert
		expect((getByRole('button') as HTMLButtonElement).type).toBe('button');
	});

	it('calls onClick when clicked', () => {
		// Arrange
		const handleClick = mock(() => {});
		const { getByRole } = render(
			<Button icon={IconName.dismiss} aria-label="Close" onClick={handleClick} />
		);

		// Act
		fireEvent.click(getByRole('button'));

		// Assert
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it('is disabled when disabled prop is set', () => {
		// Act
		const { getByRole } = render(<Button icon={IconName.dismiss} aria-label="Close" disabled />);

		// Assert
		expect((getByRole('button') as HTMLButtonElement).disabled).toBe(true);
	});
});
