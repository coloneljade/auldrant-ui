import { describe, expect, it } from 'bun:test';
import DataSelect, { type ISelectOption } from '@internal/DataSelect';
import FieldError from '@internal/FieldError';
import { render } from '@testing-library/preact';
import { renderAndCheckA11y } from './setup';

describe('DataSelect a11y', () => {
	const headerId = 'col-status';
	const options: ISelectOption[] = [
		{ value: 'open', label: 'Open' },
		{ value: 'closed', label: 'Closed' },
	];

	function withinTable(cell: ReturnType<typeof DataSelect>) {
		return (
			<table>
				<thead>
					<tr>
						<th id={headerId}>Status</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>{cell}</td>
					</tr>
				</tbody>
			</table>
		);
	}

	it('has no axe violations in a tabular layout', async () => {
		// Act & Assert
		await renderAndCheckA11y(
			withinTable(<DataSelect ariaLabelledby={headerId} options={options} />)
		);
	});

	// https://www.w3.org/TR/WCAG22/#compatible
	describe('WCAG A', () => {
		it('resolves accessible name from ariaLabelledby (SC 4.1.2)', () => {
			// Act
			const { getByRole } = render(
				withinTable(<DataSelect ariaLabelledby={headerId} options={options} />)
			);

			// Assert: select is queryable by the column header text
			getByRole('combobox', { name: /Status/ });
		});

		it('exposes the disabled state (SC 4.1.2)', () => {
			// Act
			const { getByRole } = render(
				withinTable(<DataSelect ariaLabelledby={headerId} options={options} disabled />)
			);
			const select = getByRole('combobox', { name: /Status/ }) as HTMLSelectElement;

			// Assert
			expect(select.disabled).toBe(true);
		});

		it('exposes the required state (SC 4.1.2)', () => {
			// Act
			const { getByRole } = render(
				withinTable(<DataSelect ariaLabelledby={headerId} options={options} required />)
			);
			const select = getByRole('combobox', { name: /Status/ }) as HTMLSelectElement;

			// Assert
			expect(select.required).toBe(true);
		});

		it('marks the select invalid when error is set (SC 3.3.1)', () => {
			// Act
			const { getByRole } = render(
				withinTable(<DataSelect ariaLabelledby={headerId} options={options} error="required" />)
			);
			const select = getByRole('combobox', { name: /Status/ });

			// Assert
			expect(select.getAttribute('aria-invalid')).toBe('true');
		});

		it('wires aria-describedby to a sibling FieldError (SC 3.3.1)', () => {
			// Arrange
			const errorId = 'row-1-error';

			// Act
			const { getByRole, getByText } = render(
				withinTable(
					<>
						<DataSelect
							ariaLabelledby={headerId}
							ariaDescribedby={errorId}
							options={options}
							error="required"
						/>
						<FieldError id={errorId}>required</FieldError>
					</>
				)
			);
			const select = getByRole('combobox', { name: /Status/ });
			const errorEl = getByText('required');

			// Assert
			expect(select.getAttribute('aria-describedby')).toBe(errorEl.id);
		});
	});
});
