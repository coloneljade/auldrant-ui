import { describe, expect, it, mock } from 'bun:test';
import Input from '@components/Input';
import { fireEvent, render } from '@testing-library/preact';

describe('Input', () => {
	const label = 'Username';
	const name = 'username';

	it('defaults to type="text"', () => {
		// Act
		const { getByRole } = render(<Input label={label} name={name} />);
		const input = getByRole('textbox', { name: /Username/ }) as HTMLInputElement;

		// Assert
		expect(input.type).toBe('text');
	});

	it('accepts a custom type', () => {
		// Act
		const { getByRole } = render(<Input label="Email" name="email" type="email" />);
		const input = getByRole('textbox', { name: /Email/ }) as HTMLInputElement;

		// Assert
		expect(input.type).toBe('email');
	});

	it('calls onInput with the value', () => {
		// Arrange
		const handleInput = mock(() => {});
		const { getByRole } = render(<Input label={label} name={name} onInput={handleInput} />);

		// Act
		fireEvent.input(getByRole('textbox', { name: /Username/ }), {
			target: { value: 'hello' },
		});

		// Assert
		expect(handleInput).toHaveBeenCalledWith('hello');
	});

	it('sets the name attribute', () => {
		// Arrange
		const fieldName = 'full_name';

		// Act
		const { getByRole } = render(<Input label="Name" name={fieldName} />);
		const input = getByRole('textbox', { name: /Name/ }) as HTMLInputElement;

		// Assert
		expect(input.name).toBe(fieldName);
	});

	it('sets maxLength on the input', () => {
		// Act
		const { getByRole } = render(<Input label={label} name={name} maxLength={50} />);
		const input = getByRole('textbox', { name: /Username/ }) as HTMLInputElement;

		// Assert
		expect(input.maxLength).toBe(50);
	});

	it('sets autocomplete on the input', () => {
		// Act
		const { getByRole } = render(<Input label={label} name={name} autocomplete="given-name" />);
		const input = getByRole('textbox', { name: /Username/ });

		// Assert
		expect(input.getAttribute('autocomplete')).toBe('given-name');
	});

	it('allows autocomplete override for derived types', () => {
		// Act
		const { getByRole } = render(
			<Input label="Work Email" name="work_email" type="email" autocomplete="work email" />
		);
		const input = getByRole('textbox', { name: /Work Email/ });

		// Assert
		expect(input.getAttribute('autocomplete')).toBe('work email');
	});

	it('sets pattern on the input', () => {
		// Arrange
		const pattern = '[A-Za-z]+';

		// Act
		const { getByRole } = render(<Input label={label} name={name} pattern={pattern} />);
		const input = getByRole('textbox', { name: /Username/ }) as HTMLInputElement;

		// Assert
		expect(input.pattern).toBe(pattern);
	});
});
