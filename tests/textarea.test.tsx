import { describe, expect, it, mock } from 'bun:test';
import Textarea from '@components/Textarea';
import { fireEvent, render } from '@testing-library/preact';

describe('Textarea', () => {
	const label = 'Bio';
	const name = 'bio';
	const maxChars = 200;

	it('shows character counter', () => {
		// Act
		const { getByText } = render(<Textarea label={label} name={name} maxChars={maxChars} />);

		// Assert
		getByText(new RegExp(`/ ${maxChars}`));
	});

	it('sets maxLength on the textarea element', () => {
		// Arrange
		const limit = 150;

		// Act
		const { getByRole } = render(<Textarea label={label} name={name} maxChars={limit} />);
		const textarea = getByRole('textbox', { name: /Bio/ }) as HTMLTextAreaElement;

		// Assert
		expect(textarea.maxLength).toBe(limit);
	});

	it('calls onInput with the value', () => {
		// Arrange
		const handleInput = mock(() => {});
		const { getByRole } = render(
			<Textarea label={label} name={name} maxChars={maxChars} onInput={handleInput} />
		);
		const inputValue = 'Hello';

		// Act
		fireEvent.input(getByRole('textbox', { name: /Bio/ }), {
			target: { value: inputValue },
		});

		// Assert
		expect(handleInput).toHaveBeenCalledWith(inputValue);
	});
});
