import { describe, expect, it } from 'bun:test';
import Button from '@components/Button';
import { render } from '@testing-library/preact';
import { renderAndCheckA11y } from './setup';

describe('Button a11y', () => {
	const label = 'Save';

	it('has no axe violations', async () => {
		// Act & Assert
		await renderAndCheckA11y(<Button label={label} />);
	});

	// https://www.w3.org/TR/WCAG22/#compatible
	describe('WCAG A', () => {
		it('renders as an accessible button (SC 4.1.2)', () => {
			// Act
			const { getByRole } = render(<Button label={label} />);

			// Assert
			getByRole('button', { name: label });
		});

		it('exposes the disabled state (SC 4.1.2)', () => {
			// Act
			const { getByRole } = render(<Button label={label} disabled />);
			const button = getByRole('button', { name: label });

			// Assert
			expect((button as HTMLButtonElement).disabled).toBe(true);
		});
	});
});
