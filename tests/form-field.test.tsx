import { describe, expect, it } from 'bun:test';
import FormField from '@components/FormField';
import { render } from '@testing-library/preact';

describe('FormField', () => {
	it('renders a label with colon suffix', () => {
		const label = 'Name';
		const { getByText } = render(
			<FormField label={label} for="name-input">
				<input id="name-input" />
			</FormField>
		);
		getByText(new RegExp(`${label}:`));
	});

	it('does not show required indicator when not required', () => {
		const { container } = render(
			<FormField label="Name" for="name">
				<input id="name" />
			</FormField>
		);
		expect(container.textContent).not.toContain('*');
	});
});
