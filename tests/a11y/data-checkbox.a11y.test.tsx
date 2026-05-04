import { describe, expect, it } from 'bun:test';
import DataCheckbox from '@internal/DataCheckbox';
import FieldError from '@internal/FieldError';
import { render } from '@testing-library/preact';
import { renderAndCheckA11y } from './setup';

describe('DataCheckbox a11y', () => {
	const headerId = 'col-active';

	function withinTable(cell: ReturnType<typeof DataCheckbox>) {
		return (
			<table>
				<thead>
					<tr>
						<th id={headerId}>Active</th>
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
		await renderAndCheckA11y(withinTable(<DataCheckbox ariaLabelledby={headerId} />));
	});

	// https://www.w3.org/TR/WCAG22/#compatible
	describe('WCAG A', () => {
		it('resolves accessible name from ariaLabelledby (SC 4.1.2)', () => {
			// Act
			const { getByRole } = render(withinTable(<DataCheckbox ariaLabelledby={headerId} />));

			// Assert: checkbox is queryable by the column header text
			getByRole('checkbox', { name: /Active/ });
		});

		it('exposes the disabled state (SC 4.1.2)', () => {
			// Act
			const { getByRole } = render(
				withinTable(<DataCheckbox ariaLabelledby={headerId} disabled />)
			);
			const input = getByRole('checkbox', { name: /Active/ }) as HTMLInputElement;

			// Assert
			expect(input.disabled).toBe(true);
		});

		it('exposes the required state (SC 4.1.2)', () => {
			// Act
			const { getByRole } = render(
				withinTable(<DataCheckbox ariaLabelledby={headerId} required />)
			);
			const input = getByRole('checkbox', { name: /Active/ }) as HTMLInputElement;

			// Assert
			expect(input.required).toBe(true);
		});

		it('marks the input invalid when error is set (SC 3.3.1)', () => {
			// Act
			const { getByRole } = render(
				withinTable(<DataCheckbox ariaLabelledby={headerId} error="required" />)
			);
			const input = getByRole('checkbox', { name: /Active/ });

			// Assert
			expect(input.getAttribute('aria-invalid')).toBe('true');
		});

		it('wires aria-describedby to a sibling FieldError (SC 3.3.1)', () => {
			// Arrange
			const errorId = 'row-1-error';

			// Act
			const { getByRole, getByText } = render(
				withinTable(
					<>
						<DataCheckbox ariaLabelledby={headerId} ariaDescribedby={errorId} error="required" />
						<FieldError id={errorId}>required</FieldError>
					</>
				)
			);
			const input = getByRole('checkbox', { name: /Active/ });
			const errorEl = getByText('required');

			// Assert
			expect(input.getAttribute('aria-describedby')).toBe(errorEl.id);
		});
	});
});
