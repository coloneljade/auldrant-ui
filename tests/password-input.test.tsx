import { describe, expect, it, mock } from 'bun:test';
import PasswordInput from '@components/PasswordInput';
import { fireEvent, render } from '@testing-library/preact';

describe('PasswordInput', () => {
	const label = 'Password';
	const name = 'password';

	it('toggles input type and button text on click', () => {
		// Arrange
		const { getByLabelText, getByText } = render(
			<PasswordInput label={label} name={name} purpose="current" />
		);
		const input = getByLabelText(/Password/) as HTMLInputElement;

		// Act & Assert
		fireEvent.click(getByText('Show password'));
		expect(input.type).toBe('text');
		getByText('Hide password');

		fireEvent.click(getByText('Hide password'));
		expect(input.type).toBe('password');
		getByText('Show password');
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
