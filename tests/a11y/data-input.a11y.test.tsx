import { describe, expect, it } from 'bun:test';
import DataInput from '@internal/DataInput';
import FieldError from '@internal/FieldError';
import { render } from '@testing-library/preact';
import { renderAndCheckA11y } from './setup';

describe('DataInput a11y', () => {
	const headerId = 'col-name';

	function withinTable(cell: ReturnType<typeof DataInput>) {
		return (
			<table>
				<thead>
					<tr>
						<th id={headerId}>Name</th>
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
		await renderAndCheckA11y(withinTable(<DataInput ariaLabelledby={headerId} />));
	});

	// https://www.w3.org/TR/WCAG22/#compatible
	describe('WCAG A', () => {
		it('resolves accessible name from ariaLabelledby (SC 4.1.2)', () => {
			// Act
			const { getByRole } = render(withinTable(<DataInput ariaLabelledby={headerId} />));

			// Assert: input is queryable by the column header text
			getByRole('textbox', { name: /Name/ });
		});

		it('exposes the disabled state (SC 4.1.2)', () => {
			// Act
			const { getByRole } = render(withinTable(<DataInput ariaLabelledby={headerId} disabled />));
			const input = getByRole('textbox', { name: /Name/ }) as HTMLInputElement;

			// Assert
			expect(input.disabled).toBe(true);
		});

		it('exposes the required state (SC 4.1.2)', () => {
			// Act
			const { getByRole } = render(withinTable(<DataInput ariaLabelledby={headerId} required />));
			const input = getByRole('textbox', { name: /Name/ }) as HTMLInputElement;

			// Assert
			expect(input.required).toBe(true);
		});

		it('exposes the readOnly state (SC 4.1.2)', () => {
			// Act
			const { getByRole } = render(withinTable(<DataInput ariaLabelledby={headerId} readOnly />));
			const input = getByRole('textbox', { name: /Name/ }) as HTMLInputElement;

			// Assert
			expect(input.readOnly).toBe(true);
		});

		it('marks the input invalid when error is set (SC 3.3.1)', () => {
			// Act
			const { getByRole } = render(
				withinTable(<DataInput ariaLabelledby={headerId} error="bad value" />)
			);
			const input = getByRole('textbox', { name: /Name/ });

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
						<DataInput ariaLabelledby={headerId} ariaDescribedby={errorId} error="bad value" />
						<FieldError id={errorId}>bad value</FieldError>
					</>
				)
			);
			const input = getByRole('textbox', { name: /Name/ });
			const errorEl = getByText('bad value');

			// Assert
			expect(input.getAttribute('aria-describedby')).toBe(errorEl.id);
		});
	});

	// https://www.w3.org/TR/WCAG22/#input-purposes
	describe('WCAG AA', () => {
		it('derives autocomplete from input type (SC 1.3.5)', () => {
			// Arrange
			const types = [
				{ type: 'email' as const, expected: 'email' },
				{ type: 'tel' as const, expected: 'tel' },
				{ type: 'url' as const, expected: 'url' },
			];

			for (const { type, expected } of types) {
				// Act
				const { getByRole, unmount } = render(
					withinTable(<DataInput ariaLabelledby={headerId} type={type} />)
				);
				const input = getByRole('textbox', { name: /Name/ });

				// Assert
				expect(input.getAttribute('autocomplete')).toBe(expected);
				unmount();
			}
		});
	});
});
