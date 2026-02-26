import { describe, expect, it } from 'bun:test';
import FormField from '@components/FormField';
import { render } from '@testing-library/preact';
import { renderAndCheckA11y } from './setup';

describe('FormField a11y', () => {
	it('has no axe violations', async () => {
		// Act & Assert
		await renderAndCheckA11y(
			<FormField label="Name" for="name-input">
				<input id="name-input" />
			</FormField>
		);
	});

	// https://www.w3.org/TR/WCAG22/#adaptable
	describe('WCAG A', () => {
		it('labels the child input programmatically (SC 1.3.1)', () => {
			// Act
			const { getByLabelText } = render(
				<FormField label="Name" for="name-input">
					<input id="name-input" />
				</FormField>
			);

			// Assert
			getByLabelText(/Name/);
		});

		it('hides the required indicator from assistive technology (SC 3.3.2)', () => {
			// Act
			const { container } = render(
				<FormField label="Name" for="name" required>
					<input id="name" />
				</FormField>
			);
			const asterisk = container.querySelector('[aria-hidden="true"]');

			// Assert
			expect(asterisk).not.toBeNull();
			expect(asterisk?.textContent).toContain('*');
		});
	});
});
