import { describe, expect, it } from 'bun:test';
import FormField from '@components/FormField';
import { render } from '@testing-library/preact';

describe('FormField', () => {
	const label = 'Email';

	it('label associates with input via wrapping label', () => {
		// Act
		const { getByLabelText } = render(
			<FormField label={label}>
				<input type="email" />
			</FormField>
		);

		// Assert — getByLabelText confirms wrapping label association
		getByLabelText(new RegExp(label));
	});

	it('shows error message when error prop is set', () => {
		// Arrange
		const error = 'Email is required';

		// Act
		const { getByRole } = render(
			<FormField label={label} error={error}>
				<input type="email" />
			</FormField>
		);

		// Assert
		getByRole('alert');
	});

	it('renders required marker when required prop is true', () => {
		// Act
		const { container } = render(
			<FormField label={label} required>
				<input type="email" />
			</FormField>
		);

		// Assert — the required asterisk span is rendered
		const required = container.querySelector('[aria-hidden="true"]');
		expect(required?.textContent?.trim()).toBe('*');
	});

	it('does not render required marker when required is omitted', () => {
		// Act
		const { container } = render(
			<FormField label={label}>
				<input type="email" />
			</FormField>
		);

		// Assert
		expect(container.querySelector('[aria-hidden="true"]')).toBeNull();
	});

	it('sets aria-invalid and aria-describedby on child input when error is present', () => {
		// Arrange
		const error = 'Bad input';

		// Act
		const { container, getByRole } = render(
			<FormField label={label} error={error}>
				<input type="email" />
			</FormField>
		);
		const input = container.querySelector('input')!;
		const errorEl = getByRole('alert');

		// Assert — FormField imperatively wires the error attributes
		expect(input.getAttribute('aria-invalid')).toBe('true');
		expect(input.getAttribute('aria-describedby')).toBe(errorEl.id);
	});

	it('does not set aria-invalid when no error', () => {
		// Act
		const { container } = render(
			<FormField label={label}>
				<input type="email" />
			</FormField>
		);
		const input = container.querySelector('input')!;

		// Assert
		expect(input.getAttribute('aria-invalid')).toBeNull();
		expect(input.getAttribute('aria-describedby')).toBeNull();
	});

	it('composes aria-describedby with data-extra-describedby', () => {
		// Arrange
		const error = 'Bad input';

		// Act
		const { container, getByRole } = render(
			<FormField label={label} error={error}>
				<textarea data-extra-describedby="counter-id" />
			</FormField>
		);
		const textarea = container.querySelector('textarea')!;
		const errorEl = getByRole('alert');

		// Assert — both error ID and extra ID are composed
		expect(textarea.getAttribute('aria-describedby')).toBe(`${errorEl.id} counter-id`);
	});

	it('preserves data-extra-describedby without error', () => {
		// Act
		const { container } = render(
			<FormField label={label}>
				<textarea data-extra-describedby="counter-id" />
			</FormField>
		);
		const textarea = container.querySelector('textarea')!;

		// Assert — extra ID is set as aria-describedby even without error
		expect(textarea.getAttribute('aria-describedby')).toBe('counter-id');
	});
});
