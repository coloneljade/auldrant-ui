import { describe, expect, it, mock } from 'bun:test';
import RadioGroup, { RadioItem } from '@components/RadioGroup';
import { fireEvent, render } from '@testing-library/preact';

describe('RadioGroup', () => {
	const legend = 'Size';
	const name = 'size';

	describe('rendering', () => {
		it('renders a fieldset with a legend', () => {
			const { getByRole } = render(
				<RadioGroup legend={legend} name={name}>
					<RadioItem label="Small" value="sm" />
				</RadioGroup>
			);
			getByRole('group', { name: legend });
		});

		it('renders one radio per RadioItem', () => {
			const { getAllByRole } = render(
				<RadioGroup legend={legend} name={name}>
					<RadioItem label="Small" value="sm" />
					<RadioItem label="Medium" value="md" />
					<RadioItem label="Large" value="lg" />
				</RadioGroup>
			);
			expect(getAllByRole('radio')).toHaveLength(3);
		});

		it('renders fragment-wrapped items', () => {
			const { getAllByRole } = render(
				<RadioGroup legend={legend} name={name}>
					{/* biome-ignore lint/complexity/noUselessFragments: Fragment wrapping is the feature under test */}
					<>
						<RadioItem label="Small" value="sm" />
						<RadioItem label="Medium" value="md" />
					</>
				</RadioGroup>
			);
			expect(getAllByRole('radio')).toHaveLength(2);
		});
	});

	describe('controlled value', () => {
		it('checks the radio matching the value prop', () => {
			const { getByRole } = render(
				<RadioGroup legend={legend} name={name} value="md">
					<RadioItem label="Small" value="sm" />
					<RadioItem label="Medium" value="md" />
					<RadioItem label="Large" value="lg" />
				</RadioGroup>
			);
			getByRole('radio', { name: 'Medium', checked: true });
		});

		it('leaves all radios unchecked when no value is provided', () => {
			const { getAllByRole } = render(
				<RadioGroup legend={legend} name={name}>
					<RadioItem label="Small" value="sm" />
					<RadioItem label="Medium" value="md" />
				</RadioGroup>
			);
			for (const radio of getAllByRole('radio')) {
				expect((radio as HTMLInputElement).checked).toBe(false);
			}
		});
	});

	describe('callbacks', () => {
		it('calls onChange with the selected value', () => {
			const handleChange = mock(() => {});
			const { getByLabelText } = render(
				<RadioGroup legend={legend} name={name} onChange={handleChange}>
					<RadioItem label="Small" value="sm" />
					<RadioItem label="Medium" value="md" />
					<RadioItem label="Large" value="lg" />
				</RadioGroup>
			);

			fireEvent.click(getByLabelText('Large'));

			expect(handleChange).toHaveBeenCalledWith('lg');
		});
	});

	describe('disabled', () => {
		it('disables all radios when disabled is set', () => {
			const { getAllByRole } = render(
				<RadioGroup legend={legend} name={name} disabled>
					<RadioItem label="Small" value="sm" />
					<RadioItem label="Medium" value="md" />
				</RadioGroup>
			);
			for (const radio of getAllByRole('radio')) {
				expect((radio as HTMLInputElement).disabled).toBe(true);
			}
		});
	});

	describe('required', () => {
		it('marks all radios as required when required is set', () => {
			const { getAllByRole } = render(
				<RadioGroup legend={legend} name={name} required>
					<RadioItem label="Small" value="sm" />
					<RadioItem label="Medium" value="md" />
				</RadioGroup>
			);
			for (const radio of getAllByRole('radio')) {
				expect((radio as HTMLInputElement).required).toBe(true);
			}
		});
	});

	describe('error', () => {
		it('marks the fieldset as invalid when error is set', () => {
			const { getByRole } = render(
				<RadioGroup legend={legend} name={name} error="Please select a size">
					<RadioItem label="Small" value="sm" />
				</RadioGroup>
			);
			expect(getByRole('group').getAttribute('aria-invalid')).toBe('true');
		});

		it('renders an alert with the error message', () => {
			const { getByRole } = render(
				<RadioGroup legend={legend} name={name} error="Please select a size">
					<RadioItem label="Small" value="sm" />
				</RadioGroup>
			);
			getByRole('alert');
		});
	});

	describe('validation', () => {
		it('throws when a non-RadioItem child is passed', () => {
			expect(() =>
				render(
					<RadioGroup legend={legend} name={name}>
						<div>not a RadioItem</div>
					</RadioGroup>
				)
			).toThrow('[RadioGroup] All children must be <RadioItem>.');
		});
	});
});
