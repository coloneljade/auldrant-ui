import { describe, expect, it, mock } from 'bun:test';
import RadioGroup from '@components/RadioGroup';
import { fireEvent, render } from '@testing-library/preact';

const options = [
	{ label: 'Small', value: 'sm' },
	{ label: 'Medium', value: 'md' },
	{ label: 'Large', value: 'lg' },
];

describe('RadioGroup', () => {
	const legend = 'Size';
	const name = 'size';

	it('renders all options as radio inputs', () => {
		const { container } = render(<RadioGroup legend={legend} name={name} options={options} />);
		expect(container.querySelectorAll('input[type="radio"]').length).toBe(options.length);
	});

	it('checks only the radio matching the current value', () => {
		const { container } = render(
			<RadioGroup legend={legend} name={name} options={options} value="md" />
		);
		const radios = container.querySelectorAll('input[type="radio"]');
		expect((radios[0] as HTMLInputElement).checked).toBe(false);
		expect((radios[1] as HTMLInputElement).checked).toBe(true);
		expect((radios[2] as HTMLInputElement).checked).toBe(false);
	});

	it('calls onChange with the selected value', () => {
		const handleChange = mock(() => {});
		const { getByLabelText } = render(
			<RadioGroup legend={legend} name={name} options={options} onChange={handleChange} />
		);
		fireEvent.click(getByLabelText('Large'));
		expect(handleChange).toHaveBeenCalledWith('lg');
	});
});
