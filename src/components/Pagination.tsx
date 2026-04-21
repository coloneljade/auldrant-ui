import Link from '@components/Link';
import NotFound from '@components/NotFound';
import type { IBaseProps } from '@internal/types';
import { location } from '@signals/routing';
import styles from '@styles/Pagination.module.css';
import { cx } from '@utils';
import type { ComponentChildren, FunctionComponent } from 'preact';

/** Props for {@link Pagination}. */
interface IPaginationProps extends IBaseProps {
	/** Total number of pages. Must be >= 1. */
	totalPages: number;
	/** Paginated content, rendered above the nav. */
	children: ComponentChildren;
	/** Label for the previous page control. @default 'Previous' */
	prevLabel?: string;
	/** Label for the next page control. @default 'Next' */
	nextLabel?: string;
}

/** Page item — either a page number, or an ellipsis sentinel. */
type PageItem = number | '…';

/**
 * Parse a pathname for the `/page/:n` suffix convention.
 * Distinguishes three states:
 * - No `/page/` suffix → base URL, currentPage 1, invalid false
 * - Valid `/page/N` → base URL, currentPage N, invalid false
 * - Malformed `/page/X` (non-numeric or N ≤ 0) → invalid true
 */
function parsePaginationRoute(
	pathname: string
): { base: string; currentPage: number; invalid: false } | { invalid: true } {
	const i = pathname.lastIndexOf('/page/');
	if (i >= 0) {
		const segment = pathname.slice(i + 6);
		if (/^\d+$/.test(segment)) {
			const n = parseInt(segment, 10);
			if (n > 0) {
				return { base: pathname.slice(0, i) || '/', currentPage: n, invalid: false };
			}
		}
		return { invalid: true };
	}
	return { base: pathname || '/', currentPage: 1, invalid: false };
}

/**
 * Build the list of page items to render.
 * Always includes: page 1, currentPage ± 2 (clamped), and last page.
 * A gap of exactly 1 fills with the missing page; larger gaps become '…'.
 */
function buildPageItems(currentPage: number, totalPages: number): PageItem[] {
	const included = new Set<number>();
	included.add(1);
	included.add(totalPages);
	for (let i = currentPage - 2; i <= currentPage + 2; i++) {
		if (i >= 1 && i <= totalPages) {
			included.add(i);
		}
	}

	const sorted = Array.from(included).sort((a, b) => a - b);
	const items: PageItem[] = [];

	for (const [i, curr] of sorted.entries()) {
		if (i > 0) {
			const prev = sorted[i - 1] ?? curr;
			const gap = curr - prev;
			if (gap === 2) {
				// Fill single-page gap
				items.push(prev + 1);
			} else if (gap > 2) {
				items.push('…');
			}
		}
		items.push(curr);
	}

	return items;
}

/** Build the href for a given page number. Page 1 = base URL; page N = base/page/N. */
function pageHref(base: string, p: number): string {
	return p === 1 ? base : `${base}/page/${p}`;
}

/**
 * Pagination wrapper. Renders children above a pagination `<nav>`.
 * Automatically detects the current page and base URL from the URL
 * using the `/page/:n` convention. Page 1 is the base URL (no suffix).
 * Subscribes to the location signal — re-renders on navigation changes.
 *
 * Renders `<NotFound>` when the URL has an invalid or out-of-range page suffix.
 *
 * The parent route must use a wildcard to catch page sub-paths:
 * `<Route path="/results/*"><ResultsComponent /></Route>`
 *
 * @throws When `totalPages < 1` — this is a programming error; Pagination
 * requires at least one page.
 */
const Pagination: FunctionComponent<IPaginationProps> = (props) => {
	const {
		totalPages,
		children,
		prevLabel = 'Previous',
		nextLabel = 'Next',
		class: className,
	} = props;

	if (totalPages < 1) {
		throw new Error(`Pagination: totalPages must be >= 1, got ${totalPages}`);
	}

	const parsed = parsePaginationRoute(location.value);

	if (parsed.invalid || parsed.currentPage > totalPages) {
		return <NotFound />;
	}

	const { base, currentPage } = parsed;

	const prevPage = Math.max(1, currentPage - 1);
	const nextPage = Math.min(totalPages, currentPage + 1);
	const isPrevDisabled = currentPage <= 1;
	const isNextDisabled = currentPage >= totalPages;

	const items = buildPageItems(currentPage, totalPages);

	return (
		<>
			{children}
			<nav class={cx(styles.pagination, className)} aria-label="Pagination">
				<ul class={styles.list}>
					<li class={styles.item}>
						{isPrevDisabled ? (
							<button type="button" class={styles.pageButton} aria-label="Previous page" disabled>
								{prevLabel}
							</button>
						) : (
							<Link
								href={pageHref(base, prevPage)}
								class={styles.pageButton}
								aria-label="Previous page"
							>
								{prevLabel}
							</Link>
						)}
					</li>

					{items.map((item, i) =>
						item === '…' ? (
							<li key={`ellipsis-${i}`} class={styles.item} aria-hidden="true">
								<span class={styles.ellipsis}>…</span>
							</li>
						) : item === currentPage ? (
							<li key={item} class={styles.item}>
								<span class={styles.currentPage} aria-current="page">
									{item}
								</span>
							</li>
						) : (
							<li key={item} class={styles.item}>
								<Link
									href={pageHref(base, item)}
									class={styles.pageButton}
									aria-label={`Go to page ${item}`}
								>
									{item}
								</Link>
							</li>
						)
					)}

					<li class={styles.item}>
						{isNextDisabled ? (
							<button type="button" class={styles.pageButton} aria-label="Next page" disabled>
								{nextLabel}
							</button>
						) : (
							<Link
								href={pageHref(base, nextPage)}
								class={styles.pageButton}
								aria-label="Next page"
							>
								{nextLabel}
							</Link>
						)}
					</li>
				</ul>
			</nav>
		</>
	);
};

export default Pagination;
