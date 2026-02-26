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

	it('calls onChange with the selected value', () => {
		// Arrange
		const handleChange = mock(() => {});
		const { getByLabelText } = render(
			<RadioGroup legend={legend} name={name} options={options} onChange={handleChange} />
		);

		// Act
		fireEvent.click(getByLabelText('Large'));

		// Assert
		expect(handleChange).toHaveBeenCalledWith('lg');
	});
});
