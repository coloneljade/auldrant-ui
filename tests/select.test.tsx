import { describe, expect, it, mock } from 'bun:test';
import Select from '@components/Select';
import { fireEvent, render } from '@testing-library/preact';

describe('Select', () => {
	const label = 'Color';
	const name = 'color';
	const options = [
		{ label: 'Red', value: 'red' },
		{ label: 'Blue', value: 'blue' },
	];

	it('renders placeholder as disabled first option', () => {
		// Arrange
		const placeholder = 'Pick one';

		// Act
		const { container } = render(
			<Select label={label} name={name} options={options} placeholder={placeholder} />
		);
		const firstOption = container.querySelector('option') as HTMLOptionElement;

		// Assert
		expect(firstOption.textContent).toBe(placeholder);
		expect(firstOption.disabled).toBe(true);
	});

	it('calls onChange with selected value', () => {
		// Arrange
		const handleChange = mock(() => {});
		const { getByLabelText } = render(
			<Select label={label} name={name} options={options} onChange={handleChange} />
		);

		// Act
		fireEvent.change(getByLabelText(new RegExp(label)), {
			target: { value: 'blue' },
		});

		// Assert
		expect(handleChange).toHaveBeenCalledWith('blue');
	});

	it('renders grouped options as accessible groups', () => {
		// Arrange
		const grouped = [
			{
				label: 'Warm',
				options: [
					{ label: 'Red', value: 'red' },
					{ label: 'Orange', value: 'orange' },
				],
			},
			{
				label: 'Cool',
				options: [{ label: 'Blue', value: 'blue' }],
			},
		];

		// Act
		const { getByRole, getByText } = render(<Select label={label} name={name} options={grouped} />);

		// Assert
		getByRole('group', { name: 'Warm' });
		getByRole('group', { name: 'Cool' });
		getByText('Red');
		getByText('Orange');
		getByText('Blue');
	});

	it('renders mixed flat and grouped options', () => {
		// Arrange
		const mixed = [
			{ label: 'None', value: '' },
			{
				label: 'Warm',
				options: [{ label: 'Red', value: 'red' }],
			},
		];

		// Act
		const { getByRole, getByText } = render(<Select label={label} name={name} options={mixed} />);

		// Assert
		getByText('None');
		getByText('Red');
		getByRole('group', { name: 'Warm' });
	});
});
