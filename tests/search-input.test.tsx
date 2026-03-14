import { describe, expect, it, mock } from 'bun:test';
import SearchInput from '@components/SearchInput';
import { fireEvent, render } from '@testing-library/preact';

describe('SearchInput', () => {
	const label = 'Search';
	const name = 'search';

	it('renders with label', () => {
		// Act
		const { getByLabelText } = render(<SearchInput label={label} name={name} />);

		// Assert
		getByLabelText(/Search/);
	});

	it('calls onInput with the value on keystroke', () => {
		// Arrange
		const handleInput = mock(() => {});
		const { getByLabelText } = render(
			<SearchInput label={label} name={name} onInput={handleInput} />
		);

		// Act
		fireEvent.input(getByLabelText(/Search/), { target: { value: 'hello' } });

		// Assert
		expect(handleInput).toHaveBeenCalledWith('hello');
	});

	it('shows clear button when value is present', () => {
		// Act
		const { getByRole } = render(<SearchInput label={label} name={name} value="hello" />);

		// Assert
		getByRole('button', { name: /clear search/i });
	});

	it('does not show clear button when value is absent', () => {
		// Act
		const { queryByRole } = render(<SearchInput label={label} name={name} />);

		// Assert
		expect(queryByRole('button', { name: /clear search/i })).toBeNull();
	});

	it('calls onInput with empty string and onClear when clear is clicked', () => {
		// Arrange
		const handleInput = mock(() => {});
		const handleClear = mock(() => {});
		const { getByRole } = render(
			<SearchInput
				label={label}
				name={name}
				value="hello"
				onInput={handleInput}
				onClear={handleClear}
			/>
		);

		// Act
		fireEvent.click(getByRole('button', { name: /clear search/i }));

		// Assert
		expect(handleInput).toHaveBeenCalledWith('');
		expect(handleClear).toHaveBeenCalled();
	});

	it('calls onSubmit when Enter is pressed with a non-empty value', () => {
		// Arrange
		const handleSubmit = mock(() => {});
		const { getByLabelText } = render(
			<SearchInput label={label} name={name} value="hello" onSubmit={handleSubmit} />
		);

		// Act
		fireEvent.keyDown(getByLabelText(/Search/), { key: 'Enter' });

		// Assert
		expect(handleSubmit).toHaveBeenCalledWith('hello');
	});

	it('does not call onSubmit when Enter is pressed with empty value', () => {
		// Arrange
		const handleSubmit = mock(() => {});
		const { getByLabelText } = render(
			<SearchInput label={label} name={name} value="" onSubmit={handleSubmit} />
		);

		// Act
		fireEvent.keyDown(getByLabelText(/Search/), { key: 'Enter' });

		// Assert
		expect(handleSubmit).not.toHaveBeenCalled();
	});

	it('disables input and clear button when disabled', () => {
		// Act
		const { getByLabelText, getByRole } = render(
			<SearchInput label={label} name={name} value="hello" disabled />
		);
		const input = getByLabelText(/Search/) as HTMLInputElement;
		const clearBtn = getByRole('button', { name: /clear search/i }) as HTMLButtonElement;

		// Assert
		expect(input.disabled).toBe(true);
		expect(clearBtn.disabled).toBe(true);
	});
});
