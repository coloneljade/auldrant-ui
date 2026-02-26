import { describe, it } from 'bun:test';
import Table from '@components/Table';
import { render } from '@testing-library/preact';
import { renderAndCheckA11y } from './setup';

describe('Table a11y', () => {
	const caption = 'Team Members';
	const headers = ['Name', 'Age', 'Role'];
	const data = [
		['Alice', '30', 'Engineer'],
		['Bob', '25', 'Designer'],
	];

	it('has no axe violations', async () => {
		// Act & Assert
		await renderAndCheckA11y(<Table caption={caption} headers={headers} data={data} />);
	});

	// https://www.w3.org/TR/WCAG22/#adaptable
	describe('WCAG A', () => {
		it('has an accessible name from caption (SC 1.3.1)', () => {
			// Act
			const { getByRole } = render(<Table caption={caption} headers={headers} data={data} />);

			// Assert
			getByRole('table', { name: caption });
		});

		it('exposes column headers (SC 1.3.1)', () => {
			// Act
			const { getByRole } = render(<Table caption={caption} headers={headers} data={data} />);

			// Assert
			for (const header of headers) {
				getByRole('columnheader', { name: header });
			}
		});
	});
});
