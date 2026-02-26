import { describe, expect, it, mock } from 'bun:test';
import Checkbox from '@components/Checkbox';
import { fireEvent, render } from '@testing-library/preact';

describe('Checkbox', () => {
	const label = 'Accept terms';
	const name = 'terms';

	it('calls onChange with the checked state', () => {
		const handleChange = mock(() => {});
		const { getByLabelText } = render(
			<Checkbox label={label} name={name} onChange={handleChange} />
		);
		fireEvent.click(getByLabelText(label));
		expect(handleChange).toHaveBeenCalledWith(true);
	});

	it('can be disabled', () => {
		const { container } = render(<Checkbox label={label} name={name} disabled />);
		const input = container.querySelector('input') as HTMLInputElement;
		expect(input.disabled).toBe(true);
	});
});
