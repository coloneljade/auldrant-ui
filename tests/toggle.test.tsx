import { describe, expect, it, mock } from 'bun:test';
import Toggle from '@components/Toggle';
import { fireEvent, render } from '@testing-library/preact';

describe('Toggle', () => {
	const label = 'Enable notifications';

	it('renders with label text', () => {
		// Act
		const { getByRole } = render(<Toggle label={label} checked={false} />);

		// Assert
		getByRole('switch', { name: label });
	});

	it('shows off state with aria-checked="false"', () => {
		// Act
		const { getByRole } = render(<Toggle label={label} checked={false} />);

		// Assert
		expect(getByRole('switch', { name: label }).getAttribute('aria-checked')).toBe('false');
	});

	it('shows on state with aria-checked="true" when checked={true}', () => {
		// Act
		const { getByRole } = render(<Toggle label={label} checked={true} />);

		// Assert
		expect(getByRole('switch', { name: label }).getAttribute('aria-checked')).toBe('true');
	});

	it('calls onChange with toggled value on click', () => {
		// Arrange
		const handleChange = mock(() => {});
		const { getByRole } = render(<Toggle label={label} checked={false} onChange={handleChange} />);

		// Act
		fireEvent.click(getByRole('switch', { name: label }));

		// Assert
		expect(handleChange).toHaveBeenCalledWith(true);
	});

	it('calls onChange with false when currently checked', () => {
		// Arrange
		const handleChange = mock(() => {});
		const { getByRole } = render(<Toggle label={label} checked={true} onChange={handleChange} />);

		// Act
		fireEvent.click(getByRole('switch', { name: label }));

		// Assert
		expect(handleChange).toHaveBeenCalledWith(false);
	});

	it('does not throw when clicked with no onChange', () => {
		// Act
		const { getByRole } = render(<Toggle label={label} checked={false} />);

		// Assert — no throw
		expect(() => fireEvent.click(getByRole('switch', { name: label }))).not.toThrow();
	});

	it('disabled prevents onChange from firing', () => {
		// Arrange
		const handleChange = mock(() => {});
		const { getByRole } = render(
			<Toggle label={label} checked={false} disabled onChange={handleChange} />
		);

		// Act
		fireEvent.click(getByRole('switch', { name: label }));

		// Assert
		expect(handleChange).not.toHaveBeenCalled();
	});

	it('sets the disabled attribute when disabled prop is set', () => {
		// Act
		const { getByRole } = render(<Toggle label={label} checked={false} disabled />);
		const toggle = getByRole('switch', { name: label }) as HTMLButtonElement;

		// Assert
		expect(toggle.disabled).toBe(true);
	});
});
