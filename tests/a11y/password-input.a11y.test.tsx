import { describe, expect, it } from 'bun:test';
import PasswordInput from '@components/PasswordInput';
import { fireEvent, render } from '@testing-library/preact';
import { renderAndCheckA11y } from './setup';

describe('PasswordInput a11y', () => {
	const label = 'Password';
	const name = 'password';

	it('has no axe violations', async () => {
		// Act & Assert
		await renderAndCheckA11y(<PasswordInput label={label} name={name} purpose="current" />);
	});

	// https://www.w3.org/TR/WCAG22/#compatible
	describe('WCAG A', () => {
		it('labels the password input programmatically (SC 4.1.2)', () => {
			// Act
			const { getByLabelText } = render(
				<PasswordInput label={label} name={name} purpose="current" />
			);

			// Assert
			getByLabelText(/Password/);
		});

		it('provides an accessible toggle button (SC 4.1.2)', () => {
			// Act
			const { getByRole } = render(<PasswordInput label={label} name={name} purpose="current" />);

			// Assert
			getByRole('button', { name: /password/i });
		});

		it('updates the toggle button name on state change (SC 4.1.2)', () => {
			// Arrange
			const { getByRole } = render(<PasswordInput label={label} name={name} purpose="current" />);
			const toggle = getByRole('button', { name: /Show password/ });

			// Act
			fireEvent.click(toggle);

			// Assert
			getByRole('button', { name: /Hide password/ });
		});

		it('exposes the disabled state on input and toggle (SC 4.1.2)', () => {
			// Act
			const { getByLabelText, getByRole } = render(
				<PasswordInput label={label} name={name} purpose="current" disabled />
			);
			const input = getByLabelText(/Password/);
			const toggle = getByRole('button', { name: /password/i });

			// Assert
			expect((input as HTMLInputElement).disabled).toBe(true);
			expect((toggle as HTMLButtonElement).disabled).toBe(true);
		});

		it('exposes the required state (SC 4.1.2)', () => {
			// Act
			const { getByLabelText } = render(
				<PasswordInput label={label} name={name} purpose="current" required />
			);
			const input = getByLabelText(/Password/);

			// Assert
			expect((input as HTMLInputElement).required).toBe(true);
		});

		it('marks the input as invalid with error (SC 3.3.1)', () => {
			// Arrange
			const error = 'Password is required';

			// Act
			const { getByLabelText } = render(
				<PasswordInput label={label} name={name} purpose="current" error={error} />
			);
			const input = getByLabelText(/Password/);

			// Assert
			expect(input.getAttribute('aria-invalid')).toBe('true');
		});

		it('describes the input with the error message (SC 3.3.1)', () => {
			// Arrange
			const error = 'Password is required';

			// Act
			const { getByLabelText, getByText } = render(
				<PasswordInput label={label} name={name} purpose="current" error={error} />
			);
			const input = getByLabelText(/Password/);
			const errorElement = getByText(error);

			// Assert
			expect(input.getAttribute('aria-describedby')).toBe(errorElement.id);
		});

		it('announces the error message via role="alert" (SC 3.3.1)', () => {
			// Act
			const { getByRole } = render(
				<PasswordInput label={label} name={name} purpose="current" error="Password is required" />
			);

			// Assert
			getByRole('alert');
		});
	});

	// https://www.w3.org/TR/WCAG22/#input-purposes
	describe('WCAG AA', () => {
		it('sets autocomplete for current password purpose (SC 1.3.5)', () => {
			// Act
			const { getByLabelText } = render(
				<PasswordInput label={label} name={name} purpose="current" />
			);
			const input = getByLabelText(/Password/);

			// Assert
			expect(input.getAttribute('autocomplete')).toBe('current-password');
		});

		it('sets autocomplete for new password purpose (SC 1.3.5)', () => {
			// Act
			const { getByLabelText } = render(<PasswordInput label={label} name={name} purpose="new" />);
			const input = getByLabelText(/Password/);

			// Assert
			expect(input.getAttribute('autocomplete')).toBe('new-password');
		});
	});
});
