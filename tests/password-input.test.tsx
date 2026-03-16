import { describe, expect, it, mock } from 'bun:test';
import PasswordInput from '@components/PasswordInput';
import { fireEvent, render } from '@testing-library/preact';

describe('PasswordInput', () => {
	const label = 'Password';
	const name = 'password';

	/** Get the password input element (the only <input> — the toggle is a <button>). */
	function getInput(container: HTMLElement) {
		return container.querySelector('input') as HTMLInputElement;
	}

	it('toggles input type on click', () => {
		// Arrange
		const { container, getByRole } = render(
			<PasswordInput label={label} name={name} purpose="current" />
		);
		const input = getInput(container);
		const toggle = getByRole('button');

		// Act & Assert
		fireEvent.click(toggle);
		expect(input.type).toBe('text');

		fireEvent.click(toggle);
		expect(input.type).toBe('password');
	});

	it('calls onInput with the value', () => {
		// Arrange
		const handleInput = mock(() => {});
		const { container } = render(
			<PasswordInput label={label} name={name} purpose="current" onInput={handleInput} />
		);

		// Act
		fireEvent.input(getInput(container), {
			target: { value: 'secret' },
		});

		// Assert
		expect(handleInput).toHaveBeenCalledWith('secret');
	});

	it('sets the name attribute', () => {
		// Act
		const { container } = render(<PasswordInput label={label} name={name} purpose="current" />);

		// Assert
		expect(getInput(container).name).toBe(name);
	});
});
