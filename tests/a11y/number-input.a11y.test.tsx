import { describe, expect, it } from 'bun:test';
import NumberInput from '@components/NumberInput';
import { render } from '@testing-library/preact';
import { renderAndCheckA11y } from './setup';

describe('NumberInput a11y', () => {
	const label = 'Quantity';
	const name = 'quantity';

	it('has no axe violations', async () => {
		// Act & Assert
		await renderAndCheckA11y(<NumberInput label={label} name={name} />);
	});

	// https://www.w3.org/TR/WCAG22/#compatible
	describe('WCAG A', () => {
		it('is an accessible spinbutton with programmatic label (SC 4.1.2)', () => {
			// Act
			const { getByRole } = render(<NumberInput label={label} name={name} />);

			// Assert
			getByRole('spinbutton', { name: /Quantity/ });
		});

		it('exposes the disabled state (SC 4.1.2)', () => {
			// Act
			const { getByRole } = render(<NumberInput label={label} name={name} disabled />);
			const input = getByRole('spinbutton', { name: /Quantity/ });

			// Assert
			expect((input as HTMLInputElement).disabled).toBe(true);
		});

		it('exposes the required state (SC 4.1.2)', () => {
			// Act
			const { getByRole } = render(<NumberInput label={label} name={name} required />);
			const input = getByRole('spinbutton', { name: /Quantity/ });

			// Assert
			expect((input as HTMLInputElement).required).toBe(true);
		});

		it('exposes min, max, and step constraints (SC 4.1.2)', () => {
			// Act
			const { getByRole } = render(
				<NumberInput label={label} name={name} min={1} max={100} step={5} />
			);
			const input = getByRole('spinbutton', { name: /Quantity/ }) as HTMLInputElement;

			// Assert
			expect(input.min).toBe('1');
			expect(input.max).toBe('100');
			expect(input.step).toBe('5');
		});

		it('marks the input as invalid with error (SC 3.3.1)', () => {
			// Arrange
			const error = 'Quantity must be positive';

			// Act
			const { getByRole } = render(<NumberInput label={label} name={name} error={error} />);
			const input = getByRole('spinbutton', { name: /Quantity/ });

			// Assert
			expect(input.getAttribute('aria-invalid')).toBe('true');
		});

		it('describes the input with the error message (SC 3.3.1)', () => {
			// Arrange
			const error = 'Quantity must be positive';

			// Act
			const { getByRole, getByText } = render(
				<NumberInput label={label} name={name} error={error} />
			);
			const input = getByRole('spinbutton', { name: /Quantity/ });
			const errorElement = getByText(error);

			// Assert
			expect(input.getAttribute('aria-describedby')).toBe(errorElement.id);
		});

		it('announces the error message via role="alert" (SC 3.3.1)', () => {
			// Act
			const { getByRole } = render(
				<NumberInput label={label} name={name} error="Quantity must be positive" />
			);

			// Assert
			getByRole('alert');
		});
	});
});
