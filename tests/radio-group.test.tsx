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

	it('renders a fieldset with legend', () => {
		const { container, getByText } = render(
			<RadioGroup legend={legend} name={name} options={options} />
		);
		expect(container.querySelector('fieldset')).not.toBeNull();
		getByText(legend);
	});

	it('renders all options as radio inputs', () => {
		const { container } = render(<RadioGroup legend={legend} name={name} options={options} />);
		expect(container.querySelectorAll('input[type="radio"]').length).toBe(options.length);
	});

	it('shares the same name across all radios', () => {
		const { container } = render(<RadioGroup legend={legend} name={name} options={options} />);
		const radios = container.querySelectorAll('input[type="radio"]');
		for (const radio of radios) {
			expect((radio as HTMLInputElement).name).toBe(name);
		}
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

	it('associates each label with its radio via id', () => {
		const { container } = render(<RadioGroup legend={legend} name={name} options={options} />);
		const labels = container.querySelectorAll('label');
		for (const label of labels) {
			const forId = label.getAttribute('for') ?? '';
			expect(forId).not.toBe('');
			expect(container.querySelector(`#${CSS.escape(forId)}`)).not.toBeNull();
		}
	});
});
