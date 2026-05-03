import { describe, expect, it, mock } from 'bun:test';
import DataInput from '@internal/DataInput';
import { fireEvent, render } from '@testing-library/preact';

describe('DataInput', () => {
	const headerId = 'col-name';

	function renderWithHeader(node: ReturnType<typeof DataInput>) {
		return render(
			<>
				<span id={headerId}>Name</span>
				{node}
			</>
		);
	}

	it('defaults to type="text"', () => {
		// Act
		const { getByRole } = renderWithHeader(<DataInput ariaLabelledby={headerId} />);
		const input = getByRole('textbox', { name: /Name/ }) as HTMLInputElement;

		// Assert
		expect(input.type).toBe('text');
	});

	it('accepts a custom type', () => {
		// Act
		const { getByRole } = renderWithHeader(<DataInput ariaLabelledby={headerId} type="email" />);
		const input = getByRole('textbox', { name: /Name/ }) as HTMLInputElement;

		// Assert
		expect(input.type).toBe('email');
	});

	it('calls onInput with the value', () => {
		// Arrange
		const handleInput = mock(() => {});
		const { getByRole } = renderWithHeader(
			<DataInput ariaLabelledby={headerId} onInput={handleInput} />
		);

		// Act
		fireEvent.input(getByRole('textbox', { name: /Name/ }), {
			target: { value: 'gh' },
		});

		// Assert
		expect(handleInput).toHaveBeenCalledWith('gh');
	});

	it('sets the name attribute', () => {
		// Act
		const { getByRole } = renderWithHeader(
			<DataInput ariaLabelledby={headerId} name="row-1-name" />
		);
		const input = getByRole('textbox', { name: /Name/ }) as HTMLInputElement;

		// Assert
		expect(input.name).toBe('row-1-name');
	});

	it('omits the name attribute when not provided', () => {
		// Act
		const { getByRole } = renderWithHeader(<DataInput ariaLabelledby={headerId} />);
		const input = getByRole('textbox', { name: /Name/ }) as HTMLInputElement;

		// Assert
		expect(input.hasAttribute('name')).toBe(false);
	});

	it('sets maxLength on the input', () => {
		// Act
		const { getByRole } = renderWithHeader(<DataInput ariaLabelledby={headerId} maxLength={50} />);
		const input = getByRole('textbox', { name: /Name/ }) as HTMLInputElement;

		// Assert
		expect(input.maxLength).toBe(50);
	});

	it('sets pattern on the input', () => {
		// Arrange
		const pattern = '[A-Za-z]+';

		// Act
		const { getByRole } = renderWithHeader(
			<DataInput ariaLabelledby={headerId} pattern={pattern} />
		);
		const input = getByRole('textbox', { name: /Name/ }) as HTMLInputElement;

		// Assert
		expect(input.pattern).toBe(pattern);
	});

	it('derives autocomplete for email/tel/url types', () => {
		// Arrange
		const types = [
			{ type: 'email' as const, expected: 'email' },
			{ type: 'tel' as const, expected: 'tel' },
			{ type: 'url' as const, expected: 'url' },
		];

		for (const { type, expected } of types) {
			// Act
			const { getByRole, unmount } = renderWithHeader(
				<DataInput ariaLabelledby={headerId} type={type} />
			);
			const input = getByRole('textbox', { name: /Name/ });

			// Assert
			expect(input.getAttribute('autocomplete')).toBe(expected);
			unmount();
		}
	});

	it('allows autocomplete override for derived types', () => {
		// Act
		const { getByRole } = renderWithHeader(
			<DataInput ariaLabelledby={headerId} type="email" autocomplete="work email" />
		);
		const input = getByRole('textbox', { name: /Name/ });

		// Assert
		expect(input.getAttribute('autocomplete')).toBe('work email');
	});

	it('forwards the class prop onto the input', () => {
		// Act
		const { getByRole } = renderWithHeader(<DataInput ariaLabelledby={headerId} class="extra" />);
		const input = getByRole('textbox', { name: /Name/ });

		// Assert
		expect(input.className.split(' ')).toContain('extra');
	});
});
