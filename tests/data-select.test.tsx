import { describe, expect, it, mock } from 'bun:test';
import DataSelect, { type ISelectGroup, type ISelectOption } from '@internal/DataSelect';
import { fireEvent, render } from '@testing-library/preact';

describe('DataSelect', () => {
	const headerId = 'col-status';

	function renderWithHeader(node: ReturnType<typeof DataSelect>) {
		return render(
			<>
				<span id={headerId}>Status</span>
				{node}
			</>
		);
	}

	const flatOptions: ISelectOption[] = [
		{ value: 'open', label: 'Open' },
		{ value: 'closed', label: 'Closed' },
	];

	it('renders a flat list of options', () => {
		// Act
		const { getByRole } = renderWithHeader(
			<DataSelect ariaLabelledby={headerId} options={flatOptions} />
		);
		const select = getByRole('combobox', { name: /Status/ }) as HTMLSelectElement;

		// Assert
		expect(select.options).toHaveLength(2);
		expect(select.options[0]?.value).toBe('open');
		expect(select.options[1]?.value).toBe('closed');
	});

	it('renders grouped options', () => {
		// Arrange
		const grouped: ISelectGroup[] = [
			{ label: 'Active', options: [{ value: 'open', label: 'Open' }] },
			{ label: 'Done', options: [{ value: 'closed', label: 'Closed' }] },
		];

		// Act
		const { container, getByRole } = renderWithHeader(
			<DataSelect ariaLabelledby={headerId} options={grouped} />
		);
		const groups = container.querySelectorAll('optgroup');
		const select = getByRole('combobox', { name: /Status/ }) as HTMLSelectElement;

		// Assert
		expect(groups).toHaveLength(2);
		expect(groups[0]?.label).toBe('Active');
		expect(select.options).toHaveLength(2);
	});

	it('renders a placeholder as a disabled first option', () => {
		// Act
		const { getByRole } = renderWithHeader(
			<DataSelect ariaLabelledby={headerId} options={flatOptions} placeholder="Choose a status" />
		);
		const select = getByRole('combobox', { name: /Status/ }) as HTMLSelectElement;

		// Assert
		expect(select.options[0]?.value).toBe('');
		expect(select.options[0]?.text).toBe('Choose a status');
		expect(select.options[0]?.disabled).toBe(true);
	});

	it('calls onChange with the selected value', () => {
		// Arrange
		const handleChange = mock((_: string) => {});

		// Act
		const { getByRole } = renderWithHeader(
			<DataSelect ariaLabelledby={headerId} options={flatOptions} onChange={handleChange} />
		);
		fireEvent.change(getByRole('combobox', { name: /Status/ }), {
			target: { value: 'closed' },
		});

		// Assert
		expect(handleChange).toHaveBeenCalledWith('closed');
	});

	it('sets the name attribute', () => {
		// Act
		const { getByRole } = renderWithHeader(
			<DataSelect ariaLabelledby={headerId} options={flatOptions} name="row-1-status" />
		);
		const select = getByRole('combobox', { name: /Status/ }) as HTMLSelectElement;

		// Assert
		expect(select.name).toBe('row-1-status');
	});

	it('forwards the class prop onto the select', () => {
		// Act
		const { getByRole } = renderWithHeader(
			<DataSelect ariaLabelledby={headerId} options={flatOptions} class="extra" />
		);
		const select = getByRole('combobox', { name: /Status/ });

		// Assert
		expect(select.className.split(' ')).toContain('extra');
	});

	it('marks the select aria-invalid when error is set', () => {
		// Act
		const { getByRole } = renderWithHeader(
			<DataSelect ariaLabelledby={headerId} options={flatOptions} error="required" />
		);
		const select = getByRole('combobox', { name: /Status/ });

		// Assert
		expect(select.getAttribute('aria-invalid')).toBe('true');
	});
});
