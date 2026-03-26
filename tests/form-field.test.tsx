import { describe, expect, it } from 'bun:test';
import FormField from '@internal/FormField';
import { render } from '@testing-library/preact';

describe('FormField', () => {
	const label = 'Email';

	it('label associates with input via explicit for/id', () => {
		// Act
		const { getByLabelText } = render(
			<FormField label={label} inputId="email-input">
				<input id="email-input" type="email" />
			</FormField>
		);

		// Assert — getByLabelText confirms for/id association
		getByLabelText(new RegExp(label));
	});

	it('shows error message when error prop is set', () => {
		// Arrange
		const error = 'Email is required';

		// Act
		const { getByRole } = render(
			<FormField label={label} inputId="email-input" error={error}>
				<input id="email-input" type="email" />
			</FormField>
		);

		// Assert
		getByRole('alert');
	});

	it('renders required marker when required prop is true', () => {
		// Act
		const { container } = render(
			<FormField label={label} inputId="email-input" required>
				<input id="email-input" type="email" />
			</FormField>
		);

		// Assert — the required asterisk span is rendered
		const required = container.querySelector('[aria-hidden="true"]');
		expect(required?.textContent?.trim()).toBe('*');
	});

	it('does not render required marker when required is omitted', () => {
		// Act
		const { container } = render(
			<FormField label={label} inputId="email-input">
				<input id="email-input" type="email" />
			</FormField>
		);

		// Assert
		expect(container.querySelector('[aria-hidden="true"]')).toBeNull();
	});

	it('error paragraph id matches inputId-error convention', () => {
		// Arrange
		const error = 'Bad input';

		// Act
		const { getByRole } = render(
			<FormField label={label} inputId="test-input" error={error}>
				<input id="test-input" type="email" />
			</FormField>
		);
		const errorEl = getByRole('alert');

		// Assert — error element ID follows the inputId-error convention
		expect(errorEl.id).toBe('test-input-error');
	});
});
