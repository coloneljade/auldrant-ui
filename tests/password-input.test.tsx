import { describe, expect, it, mock } from 'bun:test';
import PasswordInput from '@components/PasswordInput';
import { fireEvent, render } from '@testing-library/preact';

describe('PasswordInput', () => {
	const label = 'Password';
	const name = 'password';

	it('toggles input type on click', () => {
		// Arrange
		const { getByLabelText, getByRole } = render(
			<PasswordInput label={label} name={name} purpose="current" />
		);
		const input = getByLabelText(/Password/) as HTMLInputElement;
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
		const { getByLabelText } = render(
			<PasswordInput label={label} name={name} purpose="current" onInput={handleInput} />
		);

		// Act
		fireEvent.input(getByLabelText(/Password/), {
			target: { value: 'secret' },
		});

		// Assert
		expect(handleInput).toHaveBeenCalledWith('secret');
	});

	it('sets the name attribute', () => {
		// Act
		const { getByLabelText } = render(
			<PasswordInput label={label} name={name} purpose="current" />
		);
		const input = getByLabelText(/Password/) as HTMLInputElement;

		// Assert
		expect(input.name).toBe(name);
	});
});
