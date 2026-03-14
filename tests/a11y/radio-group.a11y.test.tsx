import { describe, expect, it } from 'bun:test';
import RadioGroup, { RadioItem } from '@components/RadioGroup';
import { render } from '@testing-library/preact';
import { renderAndCheckA11y } from './setup';

describe('RadioGroup a11y', () => {
	const legend = 'Size';
	const name = 'size';

	it('has no axe violations', async () => {
		await renderAndCheckA11y(
			<RadioGroup legend={legend} name={name}>
				<RadioItem label="Small" value="sm" />
				<RadioItem label="Medium" value="md" />
				<RadioItem label="Large" value="lg" />
			</RadioGroup>
		);
	});

	// https://www.w3.org/TR/WCAG22/#compatible
	describe('WCAG A', () => {
		it('exposes a named group (SC 4.1.2)', () => {
			const { getByRole } = render(
				<RadioGroup legend={legend} name={name}>
					<RadioItem label="Small" value="sm" />
					<RadioItem label="Medium" value="md" />
					<RadioItem label="Large" value="lg" />
				</RadioGroup>
			);
			getByRole('group', { name: legend });
		});

		it('shares the same name across all radios (SC 4.1.2)', () => {
			const { getAllByRole } = render(
				<RadioGroup legend={legend} name={name}>
					<RadioItem label="Small" value="sm" />
					<RadioItem label="Medium" value="md" />
					<RadioItem label="Large" value="lg" />
				</RadioGroup>
			);
			const radios = getAllByRole('radio');
			expect(radios).toHaveLength(3);
			for (const radio of radios) {
				expect((radio as HTMLInputElement).name).toBe(name);
			}
		});

		it('labels each radio option (SC 4.1.2)', () => {
			const { getByRole } = render(
				<RadioGroup legend={legend} name={name}>
					<RadioItem label="Small" value="sm" />
					<RadioItem label="Medium" value="md" />
					<RadioItem label="Large" value="lg" />
				</RadioGroup>
			);
			getByRole('radio', { name: 'Small' });
			getByRole('radio', { name: 'Medium' });
			getByRole('radio', { name: 'Large' });
		});

		it('exposes the selected radio as checked (SC 4.1.2)', () => {
			const { getByRole } = render(
				<RadioGroup legend={legend} name={name} value="md">
					<RadioItem label="Small" value="sm" />
					<RadioItem label="Medium" value="md" />
					<RadioItem label="Large" value="lg" />
				</RadioGroup>
			);
			getByRole('radio', { name: 'Medium', checked: true });
		});

		it('exposes the disabled state on all radios (SC 4.1.2)', () => {
			const { getAllByRole } = render(
				<RadioGroup legend={legend} name={name} disabled>
					<RadioItem label="Small" value="sm" />
					<RadioItem label="Medium" value="md" />
					<RadioItem label="Large" value="lg" />
				</RadioGroup>
			);
			for (const radio of getAllByRole('radio')) {
				expect((radio as HTMLInputElement).disabled).toBe(true);
			}
		});

		it('exposes the required state (SC 4.1.2)', () => {
			const { getAllByRole } = render(
				<RadioGroup legend={legend} name={name} required>
					<RadioItem label="Small" value="sm" />
					<RadioItem label="Medium" value="md" />
					<RadioItem label="Large" value="lg" />
				</RadioGroup>
			);
			for (const radio of getAllByRole('radio')) {
				expect((radio as HTMLInputElement).required).toBe(true);
			}
		});

		it('marks the fieldset as invalid with error (SC 3.3.1)', () => {
			const error = 'Please select a size';
			const { getByRole } = render(
				<RadioGroup legend={legend} name={name} error={error}>
					<RadioItem label="Small" value="sm" />
				</RadioGroup>
			);
			expect(getByRole('group', { name: legend }).getAttribute('aria-invalid')).toBe('true');
		});

		it('describes the fieldset with the error message (SC 3.3.1)', () => {
			const error = 'Please select a size';
			const { getByRole, getByText } = render(
				<RadioGroup legend={legend} name={name} error={error}>
					<RadioItem label="Small" value="sm" />
				</RadioGroup>
			);
			const group = getByRole('group', { name: legend });
			const errorElement = getByText(error);
			expect(group.getAttribute('aria-describedby')).toBe(errorElement.id);
		});

		it('announces the error message via role="alert" (SC 3.3.1)', () => {
			const { getByRole } = render(
				<RadioGroup legend={legend} name={name} error="Please select a size">
					<RadioItem label="Small" value="sm" />
				</RadioGroup>
			);
			getByRole('alert');
		});
	});
});
