import { describe, expect, it, mock } from 'bun:test';
import Textarea from '@components/Textarea';
import { fireEvent, render } from '@testing-library/preact';

describe('Textarea', () => {
	const label = 'Bio';
	const name = 'bio';
	const maxChars = 200;

	it('shows character counter', () => {
		const { getByText } = render(<Textarea label={label} name={name} maxChars={maxChars} />);
		getByText(new RegExp(`/ ${maxChars}`));
	});

	it('sets maxLength on the textarea element', () => {
		const limit = 150;
		const { container } = render(<Textarea label={label} name={name} maxChars={limit} />);
		expect(container.querySelector('textarea')?.maxLength).toBe(limit);
	});

	it('calls onInput with the value', () => {
		const handleInput = mock(() => {});
		const { container } = render(
			<Textarea label={label} name={name} maxChars={maxChars} onInput={handleInput} />
		);
		const inputValue = 'Hello';
		fireEvent.input(container.querySelector('textarea') as HTMLTextAreaElement, {
			target: { value: inputValue },
		});
		expect(handleInput).toHaveBeenCalledWith(inputValue);
	});

	it('associates label with textarea via generated id', () => {
		const { container } = render(<Textarea label={label} name={name} maxChars={maxChars} />);
		const labelEl = container.querySelector('label');
		const textarea = container.querySelector('textarea');
		expect(labelEl?.getAttribute('for')).toBe(textarea?.id);
	});

	it('associates textarea with character counter via aria-describedby', () => {
		const { container } = render(<Textarea label={label} name={name} maxChars={maxChars} />);
		const textarea = container.querySelector('textarea');
		const describedBy = textarea?.getAttribute('aria-describedby') ?? '';
		expect(describedBy).not.toBe('');
		expect(container.querySelector(`#${CSS.escape(describedBy)}`)).not.toBeNull();
	});
});
