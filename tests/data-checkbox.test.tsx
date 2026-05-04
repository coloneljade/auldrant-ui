import { describe, expect, it, mock } from 'bun:test';
import DataCheckbox from '@internal/DataCheckbox';
import { fireEvent, render } from '@testing-library/preact';

describe('DataCheckbox', () => {
	const headerId = 'col-active';

	function renderWithHeader(node: ReturnType<typeof DataCheckbox>) {
		return render(
			<>
				<span id={headerId}>Active</span>
				{node}
			</>
		);
	}

	it('defaults to unchecked', () => {
		// Act
		const { getByRole } = renderWithHeader(<DataCheckbox ariaLabelledby={headerId} />);
		const input = getByRole('checkbox', { name: /Active/ }) as HTMLInputElement;

		// Assert
		expect(input.checked).toBe(false);
	});

	it('reflects the checked prop', () => {
		// Act
		const { getByRole } = renderWithHeader(<DataCheckbox ariaLabelledby={headerId} checked />);
		const input = getByRole('checkbox', { name: /Active/ }) as HTMLInputElement;

		// Assert
		expect(input.checked).toBe(true);
	});

	it('calls onChange with the new checked state', () => {
		// Arrange
		const handleChange = mock((_: boolean) => {});

		// Act
		const { getByRole } = renderWithHeader(
			<DataCheckbox ariaLabelledby={headerId} onChange={handleChange} />
		);
		fireEvent.click(getByRole('checkbox', { name: /Active/ }));

		// Assert
		expect(handleChange).toHaveBeenCalledWith(true);
	});

	it('renders inline children inside the tile', () => {
		// Act
		const { getByText } = renderWithHeader(
			<DataCheckbox ariaLabelledby={headerId}>I agree</DataCheckbox>
		);

		// Assert
		expect(getByText('I agree')).toBeDefined();
	});

	it('marks the input aria-invalid when error is set', () => {
		// Act
		const { getByRole } = renderWithHeader(
			<DataCheckbox ariaLabelledby={headerId} error="required" />
		);
		const input = getByRole('checkbox', { name: /Active/ });

		// Assert
		expect(input.getAttribute('aria-invalid')).toBe('true');
	});

	it('sets the name attribute', () => {
		// Act
		const { getByRole } = renderWithHeader(
			<DataCheckbox ariaLabelledby={headerId} name="row-1-active" />
		);
		const input = getByRole('checkbox', { name: /Active/ }) as HTMLInputElement;

		// Assert
		expect(input.name).toBe('row-1-active');
	});

	it('reflects the disabled prop', () => {
		// Act
		const { getByRole } = renderWithHeader(<DataCheckbox ariaLabelledby={headerId} disabled />);
		const input = getByRole('checkbox', { name: /Active/ }) as HTMLInputElement;

		// Assert
		expect(input.disabled).toBe(true);
	});

	it('forwards the class prop onto the wrapping label', () => {
		// Act
		const { container } = renderWithHeader(
			<DataCheckbox ariaLabelledby={headerId} class="extra" />
		);
		const label = container.querySelector('label');

		// Assert
		expect(label?.className.split(' ')).toContain('extra');
	});
});
