import { describe, expect, it, mock } from 'bun:test';
import Button from '@components/Button';
import { fireEvent, render } from '@testing-library/preact';
import type { VNode } from 'preact';

// Intentionally no aria-hidden — the Button component is responsible for injecting it.
const icon: VNode = <svg width="16" height="16" />;

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
		const { getByRole } = render(<Button icon={icon} aria-label="Close" />);

		// Assert
		getByRole('button', { name: 'Close' });
	});

	it('defaults to type="button"', () => {
		// Act
		const { getByRole } = render(<Button icon={icon} aria-label="Close" />);

		// Assert
		expect((getByRole('button') as HTMLButtonElement).type).toBe('button');
	});

	it('calls onClick when clicked', () => {
		// Arrange
		const handleClick = mock(() => {});
		const { getByRole } = render(<Button icon={icon} aria-label="Close" onClick={handleClick} />);

		// Act
		fireEvent.click(getByRole('button'));

		// Assert
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it('is disabled when disabled prop is set', () => {
		// Act
		const { getByRole } = render(<Button icon={icon} aria-label="Close" disabled />);

		// Assert
		expect((getByRole('button') as HTMLButtonElement).disabled).toBe(true);
	});

	it('enforces aria-hidden on the icon so AT reads only the aria-label', () => {
		// Act
		const { container } = render(<Button icon={icon} aria-label="Close" />);

		// Assert — icon is hidden from AT regardless of what the consumer passed
		expect(container.querySelector('svg')?.getAttribute('aria-hidden')).toBe('true');
	});
});
