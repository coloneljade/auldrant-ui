import { describe, expect, it } from 'bun:test';
import Table from '@components/Table';
import { render } from '@testing-library/preact';

describe('Table', () => {
	const caption = 'Team Members';
	const headers = ['Name', 'Age', 'Role'];
	const data = [
		['Alice', '30', 'Engineer'],
		['Bob', '25', 'Designer'],
	];

	it('renders one row per data entry', () => {
		// Act
		const { getAllByRole } = render(<Table caption={caption} headers={headers} data={data} />);
		const rows = getAllByRole('row');

		// Assert — header row + data rows
		expect(rows.length).toBe(data.length + 1);
	});

	it('renders cell content from data prop', () => {
		// Act
		const { getByText } = render(<Table caption={caption} headers={headers} data={data} />);

		// Assert
		getByText('Alice');
		getByText('Designer');
	});

	describe('rowHeader', () => {
		it('renders first column as row headers when enabled', () => {
			// Act
			const { getAllByRole } = render(
				<Table caption={caption} headers={headers} data={data} rowHeader />
			);

			// Assert
			const rowHeaders = getAllByRole('rowheader');
			expect(rowHeaders.length).toBe(data.length);
			expect(rowHeaders[0]?.textContent).toBe('Alice');
			expect(rowHeaders[1]?.textContent).toBe('Bob');
		});

		it('renders no row headers by default', () => {
			// Act
			const { queryByRole } = render(<Table caption={caption} headers={headers} data={data} />);

			// Assert
			expect(queryByRole('rowheader')).toBeNull();
		});
	});

	describe('captionHidden', () => {
		it('keeps table accessible name when caption is visually hidden', () => {
			// Act
			const { getByRole } = render(
				<Table caption={caption} headers={headers} data={data} captionHidden />
			);

			// Assert
			getByRole('table', { name: caption });
		});
	});
});
