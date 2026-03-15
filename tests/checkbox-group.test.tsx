import { describe, expect, it } from 'bun:test';
import Checkbox from '@components/Checkbox';
import CheckboxGroup from '@components/CheckboxGroup';
import { render } from '@testing-library/preact';

describe('CheckboxGroup', () => {
	const legend = 'Toppings';

	describe('rendering', () => {
		it('renders a fieldset with a legend', () => {
			const { getByRole } = render(
				<CheckboxGroup legend={legend}>
					<Checkbox name="cheese" label="Cheese" />
				</CheckboxGroup>
			);
			getByRole('group', { name: legend });
		});

		it('renders children inside the fieldset', () => {
			const { getByRole } = render(
				<CheckboxGroup legend={legend}>
					<Checkbox name="cheese" label="Cheese" />
					<Checkbox name="lettuce" label="Lettuce" />
				</CheckboxGroup>
			);
			getByRole('checkbox', { name: 'Cheese' });
			getByRole('checkbox', { name: 'Lettuce' });
		});
	});

	describe('error', () => {
		const error = 'Select at least one';

		it('sets aria-invalid on the fieldset', () => {
			const { getByRole } = render(
				<CheckboxGroup legend={legend} error={error}>
					<Checkbox name="cheese" label="Cheese" />
				</CheckboxGroup>
			);
			expect(getByRole('group', { name: legend }).getAttribute('aria-invalid')).toBe('true');
		});

		it('renders role="alert" with the error message', () => {
			const { getByRole } = render(
				<CheckboxGroup legend={legend} error={error}>
					<Checkbox name="cheese" label="Cheese" />
				</CheckboxGroup>
			);
			expect(getByRole('alert').textContent).toBe(error);
		});

		it('links fieldset to error via aria-describedby', () => {
			const { getByRole, getByText } = render(
				<CheckboxGroup legend={legend} error={error}>
					<Checkbox name="cheese" label="Cheese" />
				</CheckboxGroup>
			);
			const group = getByRole('group', { name: legend });
			const errorElement = getByText(error);
			expect(group.getAttribute('aria-describedby')).toBe(errorElement.id);
		});
	});
});
