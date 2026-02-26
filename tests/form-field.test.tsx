import { describe, expect, it } from 'bun:test';
import FormField from '@components/FormField';
import { render } from '@testing-library/preact';

describe('FormField', () => {
	it('renders a label with colon suffix', () => {
		// Arrange
		const label = 'Name';

		// Act
		const { getByText } = render(
			<FormField label={label} for="name-input">
				<input id="name-input" />
			</FormField>
		);

		// Assert
		getByText(new RegExp(`${label}:`));
	});

	it('does not show required indicator when not required', () => {
		// Act
		const { container } = render(
			<FormField label="Name" for="name">
				<input id="name" />
			</FormField>
		);

		// Assert
		expect(container.textContent).not.toContain('*');
	});
});
