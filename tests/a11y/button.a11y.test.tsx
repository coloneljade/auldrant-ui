import { describe, expect, it } from 'bun:test';
import Button from '@components/Button';
import { IconName } from '@components/Icon';
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

describe('Button (icon-only) a11y', () => {
	it('has no axe violations', async () => {
		// Act & Assert
		await renderAndCheckA11y(<Button icon={IconName.dismiss} aria-label="Close" />);
	});

	// https://www.w3.org/TR/WCAG22/#compatible
	describe('WCAG A', () => {
		it('has an accessible name from aria-label (SC 4.1.2)', () => {
			// Act
			const { getByRole } = render(<Button icon={IconName.dismiss} aria-label="Close" />);

			// Assert
			getByRole('button', { name: 'Close' });
		});
	});
});
