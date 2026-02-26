import { describe, expect, it } from 'bun:test';
import Select from '@components/Select';
import { render } from '@testing-library/preact';
import { renderAndCheckA11y } from './setup';

describe('Select a11y', () => {
	const label = 'Color';
	const name = 'color';
	const options = [
		{ label: 'Red', value: 'red' },
		{ label: 'Blue', value: 'blue' },
	];

	it('has no axe violations', async () => {
		// Act & Assert
		await renderAndCheckA11y(<Select label={label} name={name} options={options} />);
	});

	// https://www.w3.org/TR/WCAG22/#compatible
	describe('WCAG A', () => {
		it('is an accessible select with programmatic label (SC 4.1.2)', () => {
			// Act
			const { getByLabelText } = render(<Select label={label} name={name} options={options} />);

			// Assert
			getByLabelText(/Color/);
		});

		it('exposes the disabled state (SC 4.1.2)', () => {
			// Act
			const { getByLabelText } = render(
				<Select label={label} name={name} options={options} disabled />
			);
			const select = getByLabelText(/Color/);

			// Assert
			expect((select as HTMLSelectElement).disabled).toBe(true);
		});

		it('exposes the required state (SC 4.1.2)', () => {
			// Act
			const { getByLabelText } = render(
				<Select label={label} name={name} options={options} required />
			);
			const select = getByLabelText(/Color/);

			// Assert
			expect((select as HTMLSelectElement).required).toBe(true);
		});
	});
});
