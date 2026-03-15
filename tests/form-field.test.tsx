import { describe, expect, it } from 'bun:test';
import FormField from '@components/FormField';
import { render } from '@testing-library/preact';

describe('FormField', () => {
	const label = 'Email';
	const inputId = 'email-input';

	it('label associates with input via htmlFor/id', () => {
		// Act
		const { getByLabelText } = render(
			<FormField label={label} for={inputId}>
				<input id={inputId} type="email" />
			</FormField>
		);

		// Assert — getByLabelText confirms the label's `for` matches the input's `id`
		getByLabelText(new RegExp(label));
	});

	it('shows error message when error prop is set', () => {
		// Arrange
		const error = 'Email is required';

		// Act
		const { getByRole } = render(
			<FormField label={label} for={inputId} error={error} errorId="email-error">
				<input id={inputId} type="email" />
			</FormField>
		);

		// Assert
		getByRole('alert');
	});

	it('renders required marker when required prop is true', () => {
		// Act
		const { container } = render(
			<FormField label={label} for={inputId} required>
				<input id={inputId} type="email" />
			</FormField>
		);

		// Assert — the required asterisk span is rendered
		const required = container.querySelector('[aria-hidden="true"]');
		expect(required?.textContent?.trim()).toBe('*');
	});

	it('does not render required marker when required is omitted', () => {
		// Act
		const { container } = render(
			<FormField label={label} for={inputId}>
				<input id={inputId} type="email" />
			</FormField>
		);

		// Assert
		expect(container.querySelector('[aria-hidden="true"]')).toBeNull();
	});
});
