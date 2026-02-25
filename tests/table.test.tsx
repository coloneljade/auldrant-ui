import { describe, expect, it } from 'bun:test';
import Table from '@components/Table';
import { render } from '@testing-library/preact';

describe('Table', () => {
	const headers = ['Name', 'Age', 'Role'];
	const data = [
		['Alice', '30', 'Engineer'],
		['Bob', '25', 'Designer'],
	];

	it('renders data rows', () => {
		const { container } = render(<Table headers={headers} data={data} />);
		const rows = container.querySelector('tbody')?.querySelectorAll('tr');
		expect(rows?.length).toBe(data.length);
	});

	it('renders cell content from data prop', () => {
		const { getByText } = render(<Table headers={headers} data={data} />);
		getByText('Alice');
		getByText('Designer');
	});
});
