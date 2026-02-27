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
});
