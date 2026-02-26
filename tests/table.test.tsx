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

	it('renders data rows', () => {
		// Act
		const { container } = render(<Table caption={caption} headers={headers} data={data} />);
		const rows = container.querySelector('tbody')?.querySelectorAll('tr');

		// Assert
		expect(rows?.length).toBe(data.length);
	});

	it('renders cell content from data prop', () => {
		// Act
		const { getByText } = render(<Table caption={caption} headers={headers} data={data} />);

		// Assert
		getByText('Alice');
		getByText('Designer');
	});
});
