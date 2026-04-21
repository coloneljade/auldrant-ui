import { beforeEach, describe, expect, it } from 'bun:test';
import Pagination from '@components/Pagination';
import { location } from '@signals/routing';
import { render } from '@testing-library/preact';
import { renderAndCheckA11y } from './setup';

describe('Pagination a11y', () => {
	beforeEach(() => {
		location.value = '/results';
	});

	it('has no axe violations at middle page', async () => {
		location.value = '/results/page/10';
		await renderAndCheckA11y(
			<Pagination totalPages={20}>
				<p>Page 10 content</p>
			</Pagination>
		);
	});

	it('has no axe violations at first page (prev disabled)', async () => {
		await renderAndCheckA11y(
			<Pagination totalPages={10}>
				<p>Page 1 content</p>
			</Pagination>
		);
	});

	it('has no axe violations at last page (next disabled)', async () => {
		location.value = '/results/page/10';
		await renderAndCheckA11y(
			<Pagination totalPages={10}>
				<p>Page 10 content</p>
			</Pagination>
		);
	});

	// WCAG SC 1.3.1: ellipsis decorative content must be hidden from AT
	it('ellipsis items are aria-hidden', () => {
		location.value = '/results/page/10';
		const { container } = render(
			<Pagination totalPages={20}>
				<p>content</p>
			</Pagination>
		);

		const ellipsisItems = container.querySelectorAll('li[aria-hidden="true"]');
		expect(ellipsisItems.length).toBeGreaterThan(0);
	});

	// WCAG SC 4.1.2: current page non-interactive and exposed to AT
	it('current page is non-interactive span with aria-current="page"', () => {
		location.value = '/results/page/5';
		const { container } = render(
			<Pagination totalPages={10}>
				<p>content</p>
			</Pagination>
		);

		const current = container.querySelector('[aria-current="page"]');
		expect(current).not.toBeNull();
		expect(current?.tagName.toLowerCase()).toBe('span');
	});

	// WCAG SC 4.1.2: disabled state is exposed to AT and controls are non-actionable
	it('disabled prev is a non-link button with native disabled state', () => {
		// First page — prev is disabled
		const { getByRole } = render(
			<Pagination totalPages={10}>
				<p>content</p>
			</Pagination>
		);

		const prev = getByRole('button', { name: 'Previous page' }) as HTMLButtonElement;
		expect(prev.disabled).toBe(true);
	});

	// WCAG SC 4.1.2: all interactive controls must have accessible names
	it('prev, next, and page links all have accessible names', () => {
		location.value = '/results/page/5';
		const { container } = render(
			<Pagination totalPages={10}>
				<p>content</p>
			</Pagination>
		);

		const links = container.querySelectorAll('nav a');
		for (const link of links) {
			const name =
				link.getAttribute('aria-label') ??
				link.getAttribute('aria-labelledby') ??
				link.textContent?.trim();
			expect(name).toBeTruthy();
		}
	});
});
