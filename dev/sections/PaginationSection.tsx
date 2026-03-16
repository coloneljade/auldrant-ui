import Link from '@components/Link';
import Pagination from '@components/Pagination';
import { usePage } from '@hooks';
import type { FunctionComponent } from 'preact';

const TOTAL_PAGES = 20;
const PAGE_SIZE = 5;
const CATEGORIES = ['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon'] as const;

// Seeded by page so content is consistent on reload.
const PageTable: FunctionComponent = () => {
	const p = usePage() ?? 1;
	const rows = Array.from({ length: PAGE_SIZE }, (_, i) => {
		const n = (p - 1) * PAGE_SIZE + i + 1;
		return {
			id: n,
			code: `ITEM-${n.toString().padStart(3, '0')}`,
			category: CATEGORIES[n % CATEGORIES.length] ?? 'Alpha',
			value: (n * 137) % 1000,
		};
	});

	return (
		<table>
			<thead>
				<tr>
					<th scope="col">#</th>
					<th scope="col">Code</th>
					<th scope="col">Category</th>
					<th scope="col">Value</th>
				</tr>
			</thead>
			<tbody>
				{rows.map((row) => (
					<tr key={row.id}>
						<td>{row.id}</td>
						<td>{row.code}</td>
						<td>{row.category}</td>
						<td>{row.value}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export const PaginationSection: FunctionComponent = () => (
	<div class="dev-section">
		<h2>Pagination</h2>
		<Pagination totalPages={TOTAL_PAGES}>
			<PageTable />
		</Pagination>

		<h3>Edge cases — invalid page URLs (render NotFound)</h3>
		<div class="dev-row">
			<Link href="/tests/tab/navigation/page/21">Page 21 (beyond max of 20)</Link>
			<Link href="/tests/tab/navigation/page/0">Page 0</Link>
			<Link href="/tests/tab/navigation/page/5abc">Non-numeric (5abc)</Link>
			<Link href="/tests/tab/navigation/page/-1">Negative (-1)</Link>
		</div>
		<Link href="/tests/tab/navigation">← Back to page 1</Link>
	</div>
);
