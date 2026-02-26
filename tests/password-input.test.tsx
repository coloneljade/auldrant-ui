import { describe, expect, it, mock } from 'bun:test';
import PasswordInput from '@components/PasswordInput';
import { fireEvent, render } from '@testing-library/preact';

describe('PasswordInput', () => {
	const label = 'Password';
	const name = 'password';

	it('defaults to type="password"', () => {
		const { container } = render(<PasswordInput label={label} name={name} purpose="current" />);
		expect(container.querySelector('input')?.type).toBe('password');
	});

	it('toggles input type and button text on click', () => {
		const { container, getByText } = render(
			<PasswordInput label={label} name={name} purpose="current" />
		);
		const input = container.querySelector('input') as HTMLInputElement;

		fireEvent.click(getByText('Show password'));
		expect(input.type).toBe('text');
		getByText('Hide password');

		fireEvent.click(getByText('Hide password'));
		expect(input.type).toBe('password');
		getByText('Show password');
	});

	it('sets autocomplete="current-password" for current purpose', () => {
		const { container } = render(<PasswordInput label={label} name={name} purpose="current" />);
		expect(container.querySelector('input')?.getAttribute('autocomplete')).toBe('current-password');
	});

	it('sets autocomplete="new-password" for new purpose', () => {
		const { container } = render(<PasswordInput label={label} name={name} purpose="new" />);
		expect(container.querySelector('input')?.getAttribute('autocomplete')).toBe('new-password');
	});

	it('calls onInput with the value', () => {
		const handleInput = mock(() => {});
		const { container } = render(
			<PasswordInput label={label} name={name} purpose="current" onInput={handleInput} />
		);
		fireEvent.input(container.querySelector('input') as HTMLInputElement, {
			target: { value: 'secret' },
		});
		expect(handleInput).toHaveBeenCalledWith('secret');
	});

	it('disables both input and toggle button when disabled', () => {
		const { container } = render(
			<PasswordInput label={label} name={name} purpose="current" disabled />
		);
		expect(container.querySelector('input')?.disabled).toBe(true);
		expect(container.querySelector('button')?.disabled).toBe(true);
	});

	it('sets the name attribute', () => {
		const { container } = render(<PasswordInput label={label} name={name} purpose="current" />);
		expect(container.querySelector('input')?.name).toBe(name);
	});
});
