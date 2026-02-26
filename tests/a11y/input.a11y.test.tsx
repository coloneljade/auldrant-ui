import { describe, expect, it } from 'bun:test';
import Input from '@components/Input';
import { render } from '@testing-library/preact';
import { renderAndCheckA11y } from './setup';

describe('Input a11y', () => {
	const label = 'Username';
	const name = 'username';

	it('has no axe violations', async () => {
		// Act & Assert
		await renderAndCheckA11y(<Input label={label} name={name} />);
	});

	// https://www.w3.org/TR/WCAG22/#compatible
	describe('WCAG A', () => {
		it('is an accessible textbox with programmatic label (SC 4.1.2)', () => {
			// Act
			const { getByRole } = render(<Input label={label} name={name} />);

			// Assert
			getByRole('textbox', { name: /Username/ });
		});

		it('exposes the disabled state (SC 4.1.2)', () => {
			// Act
			const { getByRole } = render(<Input label={label} name={name} disabled />);
			const input = getByRole('textbox', { name: /Username/ });

			// Assert
			expect((input as HTMLInputElement).disabled).toBe(true);
		});

		it('exposes the required state (SC 4.1.2)', () => {
			// Act
			const { getByRole } = render(<Input label={label} name={name} required />);
			const input = getByRole('textbox', { name: /Username/ });

			// Assert
			expect((input as HTMLInputElement).required).toBe(true);
		});

		it('exposes the readOnly state (SC 4.1.2)', () => {
			// Act
			const { getByRole } = render(<Input label={label} name={name} readOnly />);
			const input = getByRole('textbox', { name: /Username/ });

			// Assert
			expect((input as HTMLInputElement).readOnly).toBe(true);
		});

		it('marks the input as invalid with error (SC 3.3.1)', () => {
			// Arrange
			const error = 'Username is required';

			// Act
			const { getByRole } = render(<Input label={label} name={name} error={error} />);
			const input = getByRole('textbox', { name: /Username/ });

			// Assert
			expect(input.getAttribute('aria-invalid')).toBe('true');
		});

		it('describes the input with the error message (SC 3.3.1)', () => {
			// Arrange
			const error = 'Username is required';

			// Act
			const { getByRole, getByText } = render(<Input label={label} name={name} error={error} />);
			const input = getByRole('textbox', { name: /Username/ });
			const errorElement = getByText(error);

			// Assert
			expect(input.getAttribute('aria-describedby')).toBe(errorElement.id);
		});

		it('announces the error message via role="alert" (SC 3.3.1)', () => {
			// Act
			const { getByRole } = render(
				<Input label={label} name={name} error="Username is required" />
			);

			// Assert
			getByRole('alert');
		});
	});

	// https://www.w3.org/TR/WCAG22/#input-purposes
	describe('WCAG AA', () => {
		it('derives autocomplete from input type (SC 1.3.5)', () => {
			// Arrange
			const types = [
				{ type: 'email' as const, expected: 'email' },
				{ type: 'tel' as const, expected: 'tel' },
				{ type: 'url' as const, expected: 'url' },
			];

			for (const { type, expected } of types) {
				// Act
				const { getByRole, unmount } = render(<Input label={label} name={name} type={type} />);
				const input = getByRole('textbox', { name: /Username/ });

				// Assert
				expect(input.getAttribute('autocomplete')).toBe(expected);
				unmount();
			}
		});
	});
});
