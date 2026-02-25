import { describe, expect, it, mock } from 'bun:test';
import Input from '@components/Input';
import { fireEvent, render } from '@testing-library/preact';

describe('Input', () => {
	const label = 'Username';
	const name = 'username';

	it('renders with a labeled input', () => {
		const { getByText } = render(<Input label={label} name={name} />);
		getByText(new RegExp(`${label}:`));
	});

	it('associates label with input via generated id', () => {
		const { container } = render(<Input label={label} name={name} />);
		const labelEl = container.querySelector('label');
		const input = container.querySelector('input');
		expect(labelEl?.getAttribute('for')).toBe(input?.id);
	});

	it('defaults to type="text"', () => {
		const { container } = render(<Input label={label} name={name} />);
		expect(container.querySelector('input')?.type).toBe('text');
	});

	it('accepts a custom type', () => {
		const { container } = render(<Input label="Email" name="email" type="email" />);
		expect(container.querySelector('input')?.type).toBe('email');
	});

	it('calls onInput with the value', () => {
		const handleInput = mock(() => {});
		const { container } = render(<Input label={label} name={name} onInput={handleInput} />);
		fireEvent.input(container.querySelector('input') as HTMLInputElement, {
			target: { value: 'hello' },
		});
		expect(handleInput).toHaveBeenCalledWith('hello');
	});

	it('sets the name attribute', () => {
		const fieldName = 'full_name';
		const { container } = render(<Input label="Name" name={fieldName} />);
		expect(container.querySelector('input')?.name).toBe(fieldName);
	});

	it('sets maxLength on the input', () => {
		const { container } = render(<Input label={label} name={name} maxLength={50} />);
		expect(container.querySelector('input')?.maxLength).toBe(50);
	});

	it('sets autocomplete on the input', () => {
		const { container } = render(<Input label={label} name={name} autocomplete="given-name" />);
		expect(container.querySelector('input')?.getAttribute('autocomplete')).toBe('given-name');
	});

	it('derives autocomplete from type for email', () => {
		const { container } = render(<Input label="Email" name="email" type="email" />);
		expect(container.querySelector('input')?.getAttribute('autocomplete')).toBe('email');
	});

	it('derives autocomplete from type for tel', () => {
		const { container } = render(<Input label="Phone" name="phone" type="tel" />);
		expect(container.querySelector('input')?.getAttribute('autocomplete')).toBe('tel');
	});

	it('derives autocomplete from type for url', () => {
		const { container } = render(<Input label="Website" name="website" type="url" />);
		expect(container.querySelector('input')?.getAttribute('autocomplete')).toBe('url');
	});

	it('allows autocomplete override for derived types', () => {
		const { container } = render(
			<Input label="Work Email" name="work_email" type="email" autocomplete="work email" />
		);
		expect(container.querySelector('input')?.getAttribute('autocomplete')).toBe('work email');
	});

	it('sets readOnly on the input', () => {
		const { container } = render(<Input label={label} name={name} readOnly />);
		expect(container.querySelector('input')?.readOnly).toBe(true);
	});

	it('sets pattern on the input', () => {
		const pattern = '[A-Za-z]+';
		const { container } = render(<Input label={label} name={name} pattern={pattern} />);
		expect(container.querySelector('input')?.pattern).toBe(pattern);
	});
});
