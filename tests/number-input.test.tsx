import { describe, expect, it, mock } from 'bun:test';
import NumberInput from '@components/NumberInput';
import { fireEvent, render } from '@testing-library/preact';

describe('NumberInput', () => {
	const label = 'Quantity';
	const name = 'quantity';

	it('always renders type="number"', () => {
		const { container } = render(<NumberInput label={label} name={name} />);
		expect(container.querySelector('input')?.type).toBe('number');
	});

	it('sets min attribute', () => {
		const { container } = render(<NumberInput label={label} name={name} min={0} />);
		expect(container.querySelector('input')?.getAttribute('min')).toBe('0');
	});

	it('sets max attribute', () => {
		const { container } = render(<NumberInput label={label} name={name} max={100} />);
		expect(container.querySelector('input')?.getAttribute('max')).toBe('100');
	});

	it('sets step attribute', () => {
		const { container } = render(<NumberInput label={label} name={name} step={5} />);
		expect(container.querySelector('input')?.getAttribute('step')).toBe('5');
	});

	it('calls onInput with a numeric value', () => {
		const handleInput = mock(() => {});
		const { container } = render(<NumberInput label={label} name={name} onInput={handleInput} />);
		fireEvent.input(container.querySelector('input') as HTMLInputElement, {
			target: { value: '42', valueAsNumber: 42 },
		});
		expect(handleInput).toHaveBeenCalledWith(42);
	});
});
