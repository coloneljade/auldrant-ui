import { describe, expect, it } from 'bun:test';
import CurrencyInput from '@components/CurrencyInput';
import { render } from '@testing-library/preact';
import { renderAndCheckA11y } from './setup';

describe('CurrencyInput a11y', () => {
	const label = 'Amount';
	const name = 'amount';

	it('has no axe violations', async () => {
		// Act & Assert
		await renderAndCheckA11y(<CurrencyInput label={label} name={name} />);
	});

	// https://www.w3.org/TR/WCAG22/#compatible
	describe('WCAG A', () => {
		it('is an accessible textbox with programmatic label (SC 4.1.2)', () => {
			// Act
			const { getByRole } = render(<CurrencyInput label={label} name={name} />);

			// Assert
			getByRole('textbox', { name: /Amount/ });
		});

		it('exposes the disabled state (SC 4.1.2)', () => {
			// Act
			const { getByRole } = render(<CurrencyInput label={label} name={name} disabled />);
			const input = getByRole('textbox', { name: /Amount/ });

			// Assert
			expect((input as HTMLInputElement).disabled).toBe(true);
		});

		it('exposes the required state (SC 4.1.2)', () => {
			// Act
			const { getByRole } = render(<CurrencyInput label={label} name={name} required />);
			const input = getByRole('textbox', { name: /Amount/ });

			// Assert
			expect((input as HTMLInputElement).required).toBe(true);
		});

		it('marks the input as invalid with error (SC 3.3.1)', () => {
			// Arrange
			const error = 'Amount must be a valid number';

			// Act
			const { getByRole } = render(<CurrencyInput label={label} name={name} error={error} />);
			const input = getByRole('textbox', { name: /Amount/ });

			// Assert
			expect(input.getAttribute('aria-invalid')).toBe('true');
		});

		it('describes the input with the error message (SC 3.3.1)', () => {
			// Arrange
			const error = 'Amount must be a valid number';

			// Act
			const { getByRole, getByText } = render(
				<CurrencyInput label={label} name={name} error={error} />
			);
			const input = getByRole('textbox', { name: /Amount/ });
			const errorElement = getByText(error);

			// Assert
			expect(input.getAttribute('aria-describedby')).toBe(errorElement.id);
		});

		it('announces the error message via role="alert" (SC 3.3.1)', () => {
			// Act
			const { getByRole } = render(
				<CurrencyInput label={label} name={name} error="Amount must be a valid number" />
			);

			// Assert
			getByRole('alert');
		});
	});
});
