import { describe, expect, it } from 'bun:test';
import RadioGroup from '@components/RadioGroup';
import { render } from '@testing-library/preact';
import { renderAndCheckA11y } from './setup';

const options = [
	{ label: 'Small', value: 'sm' },
	{ label: 'Medium', value: 'md' },
	{ label: 'Large', value: 'lg' },
];

describe('RadioGroup a11y', () => {
	const legend = 'Size';
	const name = 'size';

	it('has no axe violations', async () => {
		// Act & Assert
		await renderAndCheckA11y(<RadioGroup legend={legend} name={name} options={options} />);
	});

	// https://www.w3.org/TR/WCAG22/#compatible
	describe('WCAG A', () => {
		it('exposes a named group (SC 4.1.2)', () => {
			// Act
			const { getByRole } = render(<RadioGroup legend={legend} name={name} options={options} />);

			// Assert
			getByRole('group', { name: legend });
		});

		it('shares the same name across all radios (SC 4.1.2)', () => {
			// Act
			const { getAllByRole } = render(<RadioGroup legend={legend} name={name} options={options} />);
			const radios = getAllByRole('radio');

			// Assert
			expect(radios).toHaveLength(options.length);
			for (const radio of radios) {
				expect((radio as HTMLInputElement).name).toBe(name);
			}
		});

		it('labels each radio option (SC 4.1.2)', () => {
			// Act
			const { getByRole } = render(<RadioGroup legend={legend} name={name} options={options} />);

			// Assert
			for (const option of options) {
				getByRole('radio', { name: option.label });
			}
		});

		it('exposes the selected radio as checked (SC 4.1.2)', () => {
			// Act
			const { getByRole } = render(
				<RadioGroup legend={legend} name={name} options={options} value="md" />
			);

			// Assert
			getByRole('radio', { name: 'Medium', checked: true });
		});

		it('exposes the disabled state on all radios (SC 4.1.2)', () => {
			// Act
			const { getAllByRole } = render(
				<RadioGroup legend={legend} name={name} options={options} disabled />
			);
			const radios = getAllByRole('radio');

			// Assert
			for (const radio of radios) {
				expect((radio as HTMLInputElement).disabled).toBe(true);
			}
		});

		it('exposes the required state (SC 4.1.2)', () => {
			// Act
			const { getAllByRole } = render(
				<RadioGroup legend={legend} name={name} options={options} required />
			);
			const radios = getAllByRole('radio');

			// Assert
			for (const radio of radios) {
				expect((radio as HTMLInputElement).required).toBe(true);
			}
		});

		it('marks the fieldset as invalid with error (SC 3.3.1)', () => {
			// Arrange
			const error = 'Please select a size';

			// Act
			const { getByRole } = render(
				<RadioGroup legend={legend} name={name} options={options} error={error} />
			);
			const group = getByRole('group', { name: legend });

			// Assert
			expect(group.getAttribute('aria-invalid')).toBe('true');
		});

		it('describes the fieldset with the error message (SC 3.3.1)', () => {
			// Arrange
			const error = 'Please select a size';

			// Act
			const { getByRole, getByText } = render(
				<RadioGroup legend={legend} name={name} options={options} error={error} />
			);
			const group = getByRole('group', { name: legend });
			const errorElement = getByText(error);

			// Assert
			expect(group.getAttribute('aria-describedby')).toBe(errorElement.id);
		});

		it('announces the error message via role="alert" (SC 3.3.1)', () => {
			// Act
			const { getByRole } = render(
				<RadioGroup legend={legend} name={name} options={options} error="Please select a size" />
			);

			// Assert
			getByRole('alert');
		});
	});
});
