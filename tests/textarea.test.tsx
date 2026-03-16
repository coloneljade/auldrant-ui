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

	it('updates counter when typing beyond maxChars', () => {
		// Arrange
		const limit = 10;
		const { getByRole, getByText } = render(
			<Textarea label={label} name={name} maxChars={limit} />
		);

		// Act — type beyond the limit
		fireEvent.input(getByRole('textbox', { name: /Bio/ }), {
			target: { value: 'a'.repeat(15) },
		});

		// Assert — counter shows 15 / 10
		getByText('15 / 10');
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
