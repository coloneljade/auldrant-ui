import { describe, expect, it } from 'bun:test';
import Checkbox from '@components/Checkbox';
import CheckboxGroup from '@components/CheckboxGroup';
import { render } from '@testing-library/preact';
import { renderAndCheckA11y } from './setup';

describe('CheckboxGroup a11y', () => {
	const legend = 'Toppings';

	it('has no axe violations', async () => {
		await renderAndCheckA11y(
			<CheckboxGroup legend={legend}>
				<Checkbox name="cheese" label="Cheese" />
				<Checkbox name="lettuce" label="Lettuce" />
				<Checkbox name="tomato" label="Tomato" />
			</CheckboxGroup>
		);
	});

	// https://www.w3.org/TR/WCAG22/#compatible
	describe('WCAG A', () => {
		it('exposes a named group (SC 4.1.2)', () => {
			const { getByRole } = render(
				<CheckboxGroup legend={legend}>
					<Checkbox name="cheese" label="Cheese" />
				</CheckboxGroup>
			);
			getByRole('group', { name: legend });
		});

		it('marks fieldset invalid on error (SC 3.3.1)', () => {
			const error = 'Select at least one';
			const { getByRole } = render(
				<CheckboxGroup legend={legend} error={error}>
					<Checkbox name="cheese" label="Cheese" />
				</CheckboxGroup>
			);
			expect(getByRole('group', { name: legend }).getAttribute('aria-invalid')).toBe('true');
		});

		it('describes fieldset with error (SC 3.3.1)', () => {
			const error = 'Select at least one';
			const { getByRole, getByText } = render(
				<CheckboxGroup legend={legend} error={error}>
					<Checkbox name="cheese" label="Cheese" />
				</CheckboxGroup>
			);
			const group = getByRole('group', { name: legend });
			const errorElement = getByText(error);
			expect(group.getAttribute('aria-describedby')).toBe(errorElement.id);
		});

		it('announces error via role="alert" (SC 3.3.1)', () => {
			const { getByRole } = render(
				<CheckboxGroup legend={legend} error="Select at least one">
					<Checkbox name="cheese" label="Cheese" />
				</CheckboxGroup>
			);
			getByRole('alert');
		});
	});
});
