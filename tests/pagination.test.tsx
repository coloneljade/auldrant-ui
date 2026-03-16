import { beforeEach, describe, expect, it } from 'bun:test';
import Pagination from '@components/Pagination';
import { location } from '@signals/routing';
import { render } from '@testing-library/preact';

describe('Pagination', () => {
	beforeEach(() => {
		location.value = '/results';
	});

	it('renders children followed by nav landmark', () => {
		// Act
		const { getByText, getByRole } = render(
			<Pagination totalPages={5}>
				<p>Page content</p>
			</Pagination>
		);

		// Assert
		getByText('Page content');
		getByRole('navigation');
	});

	it('nav landmark has aria-label "Pagination"', () => {
		// Act
		const { getByRole } = render(<Pagination totalPages={5}>content</Pagination>);

		// Assert
		expect(getByRole('navigation').getAttribute('aria-label')).toBe('Pagination');
	});

	it('current page is rendered as span with aria-current="page", not a link', () => {
		// Arrange — page 1 (base URL)

		// Act
		const { container } = render(<Pagination totalPages={5}>content</Pagination>);

		// Assert
		const current = container.querySelector('[aria-current="page"]');
		expect(current).not.toBeNull();
		expect(current?.tagName.toLowerCase()).toBe('span');
		expect(current?.textContent).toBe('1');
	});

	it('renders all pages for small total with no ellipsis', () => {
		// Arrange — page 1 of 5

		// Act
		const { getByRole } = render(<Pagination totalPages={5}>content</Pagination>);

		// Assert
		const nav = getByRole('navigation');
		expect(nav.textContent).not.toContain('…');
		// Pages 1-5 all present
		for (let i = 1; i <= 5; i++) {
			expect(nav.textContent).toContain(String(i));
		}
	});

	it('renders ellipsis in correct positions for large page count (middle page)', () => {
		// Arrange — page 10 of 20
		location.value = '/results/page/10';

		// Act
		const { getByRole } = render(<Pagination totalPages={20}>content</Pagination>);

		// Assert — expect "1 … 8 9 10 11 12 … 20"
		const nav = getByRole('navigation');
		expect(nav.textContent).toContain('…');
		expect(nav.textContent).toContain('1');
		expect(nav.textContent).toContain('20');
		expect(nav.textContent).toContain('8');
		expect(nav.textContent).toContain('12');
	});

	it('fills gap of exactly 1 instead of showing ellipsis', () => {
		// Arrange — page 3 of 7: window is 1-5 which is 1..5, page 7 → gap of 1 between 5 and 7
		location.value = '/results/page/3';

		// Act
		const { getByRole } = render(<Pagination totalPages={7}>content</Pagination>);

		// Assert — 1 2 3 4 5 6 7 (no ellipsis since gap is 1)
		const nav = getByRole('navigation');
		expect(nav.textContent).not.toContain('…');
		for (let i = 1; i <= 7; i++) {
			expect(nav.textContent).toContain(String(i));
		}
	});

	it('prev link is disabled at page 1', () => {
		// Arrange — page 1 (base URL)

		// Act
		const { getByRole } = render(<Pagination totalPages={10}>content</Pagination>);

		// Assert
		const prev = getByRole('link', { name: 'Previous page' });
		expect(prev.getAttribute('aria-disabled')).toBe('true');
		expect(prev.getAttribute('tabindex')).toBe('-1');
	});

	it('prev link href is clamped to page 1 when disabled', () => {
		// Act
		const { getByRole } = render(<Pagination totalPages={10}>content</Pagination>);

		// Assert — href stays at base (page 1)
		expect(getByRole('link', { name: 'Previous page' }).getAttribute('href')).toBe('/results');
	});

	it('next link is disabled at last page', () => {
		// Arrange — last page
		location.value = '/results/page/10';

		// Act
		const { getByRole } = render(<Pagination totalPages={10}>content</Pagination>);

		// Assert
		const next = getByRole('link', { name: 'Next page' });
		expect(next.getAttribute('aria-disabled')).toBe('true');
		expect(next.getAttribute('tabindex')).toBe('-1');
	});

	it('page 1 href is base URL', () => {
		// Arrange — page 2
		location.value = '/results/page/2';

		// Act
		const { getByRole } = render(<Pagination totalPages={10}>content</Pagination>);

		// Assert
		expect(getByRole('link', { name: 'Go to page 1' }).getAttribute('href')).toBe('/results');
	});

	it('page N href is base/page/N', () => {
		// Arrange — page 1 of 10

		// Act
		const { getByRole } = render(<Pagination totalPages={10}>content</Pagination>);

		// Assert
		expect(getByRole('link', { name: 'Go to page 2' }).getAttribute('href')).toBe(
			'/results/page/2'
		);
	});

	it('supports custom prevLabel and nextLabel', () => {
		// Act
		const { getByRole } = render(
			<Pagination totalPages={5} prevLabel="← Back" nextLabel="Forward →">
				content
			</Pagination>
		);

		// Assert
		expect(getByRole('link', { name: 'Previous page' }).textContent).toBe('← Back');
		expect(getByRole('link', { name: 'Next page' }).textContent).toBe('Forward →');
	});

	it('totalPages=1 disables both prev and next', () => {
		// Act
		const { getByRole } = render(<Pagination totalPages={1}>content</Pagination>);

		// Assert
		expect(getByRole('link', { name: 'Previous page' }).getAttribute('aria-disabled')).toBe('true');
		expect(getByRole('link', { name: 'Next page' }).getAttribute('aria-disabled')).toBe('true');
	});

	it('page 1 of 10 renders first 3 pages and last page with ellipsis', () => {
		// Arrange — page 1 of 10

		// Act
		const { getByRole } = render(<Pagination totalPages={10}>content</Pagination>);

		// Assert — "1 2 3 … 10"
		const nav = getByRole('navigation');
		expect(nav.textContent).toContain('…');
		expect(nav.textContent).toContain('1');
		expect(nav.textContent).toContain('3');
		expect(nav.textContent).toContain('10');
		// page 4 should not appear (it's beyond the window)
		const allText = Array.from(nav.querySelectorAll('li')).map((li) => li.textContent?.trim());
		expect(allText.indexOf('4')).toBe(-1);
	});

	it('last page of 10 renders first page and last 3 with ellipsis', () => {
		// Arrange
		location.value = '/results/page/10';

		// Act
		const { getByRole } = render(<Pagination totalPages={10}>content</Pagination>);

		// Assert — "1 … 8 9 10"
		const nav = getByRole('navigation');
		expect(nav.textContent).toContain('…');
		expect(nav.textContent).toContain('1');
		expect(nav.textContent).toContain('8');
		expect(nav.textContent).toContain('10');
	});

	// --- Edge cases: invalid/out-of-range pages render NotFound ---

	it('renders NotFound for page beyond totalPages', () => {
		// Arrange
		location.value = '/results/page/50';

		// Act
		const { getByRole } = render(<Pagination totalPages={10}>content</Pagination>);

		// Assert — NotFound renders a main landmark, not a nav
		getByRole('main');
		expect(() => getByRole('navigation')).toThrow();
	});

	it('renders NotFound for non-numeric page suffix', () => {
		// Arrange
		location.value = '/results/page/abc';

		// Act
		const { getByRole } = render(<Pagination totalPages={10}>content</Pagination>);

		// Assert
		getByRole('main');
		expect(() => getByRole('navigation')).toThrow();
	});

	it('renders NotFound for partially-numeric page suffix', () => {
		// Arrange — parseInt would parse '5abc' as 5; strict digit check should reject
		location.value = '/results/page/5abc';

		// Act
		const { getByRole } = render(<Pagination totalPages={10}>content</Pagination>);

		// Assert
		getByRole('main');
	});

	it('renders NotFound for /page/0', () => {
		// Arrange
		location.value = '/results/page/0';

		// Act
		const { getByRole } = render(<Pagination totalPages={10}>content</Pagination>);

		// Assert
		getByRole('main');
	});

	it('children are not rendered when NotFound is shown', () => {
		// Arrange
		location.value = '/results/page/999';

		// Act
		const { queryByText } = render(
			<Pagination totalPages={10}>
				<p>Page content</p>
			</Pagination>
		);

		// Assert
		expect(queryByText('Page content')).toBeNull();
	});

	it('throws when totalPages < 1', () => {
		// Assert
		expect(() => render(<Pagination totalPages={0}>content</Pagination>)).toThrow(
			'Pagination: totalPages must be >= 1'
		);
	});
});
