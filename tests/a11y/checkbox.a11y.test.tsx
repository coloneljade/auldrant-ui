import { describe, expect, it } from 'bun:test';
import Checkbox from '@components/Checkbox';
import { render } from '@testing-library/preact';
import { renderAndCheckA11y } from './setup';

describe('Checkbox a11y', () => {
	const label = 'Accept terms';
	const name = 'terms';

	it('has no axe violations', async () => {
		// Act & Assert
		await renderAndCheckA11y(<Checkbox label={label} name={name} />);
	});

	// https://www.w3.org/TR/WCAG22/#compatible
	describe('WCAG A', () => {
		it('is an accessible checkbox with programmatic label (SC 4.1.2)', () => {
			// Act
			const { getByRole } = render(<Checkbox label={label} name={name} />);

			// Assert
			getByRole('checkbox', { name: label });
		});

		it('exposes the checked state (SC 4.1.2)', () => {
			// Act
			const { getByRole } = render(<Checkbox label={label} name={name} checked />);

			// Assert
			getByRole('checkbox', { name: label, checked: true });
		});

		it('exposes the unchecked state (SC 4.1.2)', () => {
			// Act
			const { getByRole } = render(<Checkbox label={label} name={name} />);

			// Assert
			getByRole('checkbox', { name: label, checked: false });
		});

		it('exposes the disabled state (SC 4.1.2)', () => {
			// Act
			const { getByRole } = render(<Checkbox label={label} name={name} disabled />);
			const checkbox = getByRole('checkbox', { name: label });

			// Assert
			expect((checkbox as HTMLInputElement).disabled).toBe(true);
		});

		it('exposes the required state (SC 4.1.2)', () => {
			// Act
			const { getByRole } = render(<Checkbox label={label} name={name} required />);
			const checkbox = getByRole('checkbox', { name: label });

			// Assert
			expect((checkbox as HTMLInputElement).required).toBe(true);
		});

		it('marks the checkbox as invalid with error (SC 3.3.1)', () => {
			// Arrange
			const error = 'You must accept the terms';

			// Act
			const { getByRole } = render(<Checkbox label={label} name={name} error={error} />);
			const checkbox = getByRole('checkbox', { name: label });

			// Assert
			expect(checkbox.getAttribute('aria-invalid')).toBe('true');
		});

		it('describes the checkbox with the error message (SC 3.3.1)', () => {
			// Arrange
			const error = 'You must accept the terms';

			// Act
			const { getByRole, getByText } = render(<Checkbox label={label} name={name} error={error} />);
			const checkbox = getByRole('checkbox', { name: label });
			const errorElement = getByText(error);

			// Assert
			expect(checkbox.getAttribute('aria-describedby')).toBe(errorElement.id);
		});

		it('announces the error message via role="alert" (SC 3.3.1)', () => {
			// Act
			const { getByRole } = render(
				<Checkbox label={label} name={name} error="You must accept the terms" />
			);

			// Assert
			getByRole('alert');
		});
	});
});
