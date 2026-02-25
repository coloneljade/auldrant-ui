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

	it('renders with a label', () => {
		const { getByText } = render(<Select label={label} name={name} options={options} />);
		getByText(new RegExp(`${label}:`));
	});

	it('renders flat options', () => {
		const { getByText } = render(<Select label={label} name={name} options={options} />);
		getByText('Red');
		getByText('Blue');
	});

	it('renders placeholder as disabled first option', () => {
		const placeholder = 'Pick one';
		const { container } = render(
			<Select label={label} name={name} options={options} placeholder={placeholder} />
		);
		const firstOption = container.querySelector('option') as HTMLOptionElement;
		expect(firstOption.textContent).toBe(placeholder);
		expect(firstOption.disabled).toBe(true);
	});

	it('calls onChange with selected value', () => {
		const handleChange = mock(() => {});
		const { container } = render(
			<Select label={label} name={name} options={options} onChange={handleChange} />
		);
		fireEvent.change(container.querySelector('select') as HTMLSelectElement, {
			target: { value: 'blue' },
		});
		expect(handleChange).toHaveBeenCalledWith('blue');
	});

	it('associates label with select via generated id', () => {
		const { container } = render(<Select label={label} name={name} options={options} />);
		const labelEl = container.querySelector('label');
		const select = container.querySelector('select');
		expect(labelEl?.getAttribute('for')).toBe(select?.id);
	});

	it('renders grouped options with optgroup', () => {
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
		const { container, getByText } = render(<Select label={label} name={name} options={grouped} />);
		const optgroups = container.querySelectorAll('optgroup');
		expect(optgroups).toHaveLength(2);
		expect(optgroups[0]?.getAttribute('label')).toBe('Warm');
		expect(optgroups[1]?.getAttribute('label')).toBe('Cool');
		getByText('Red');
		getByText('Orange');
		getByText('Blue');
	});

	it('renders mixed flat and grouped options', () => {
		const mixed = [
			{ label: 'None', value: '' },
			{
				label: 'Warm',
				options: [{ label: 'Red', value: 'red' }],
			},
		];
		const { container, getByText } = render(<Select label={label} name={name} options={mixed} />);
		getByText('None');
		getByText('Red');
		expect(container.querySelectorAll('optgroup')).toHaveLength(1);
	});
});
