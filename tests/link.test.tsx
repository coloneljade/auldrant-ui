import { describe, expect, it } from 'bun:test';
import Link from '@components/Link';
import { location } from '@signals/routing';
import { fireEvent, render } from '@testing-library/preact';

describe('Link', () => {
	it('navigates internally for relative paths', () => {
		const text = 'Go';
		const href = '/dashboard';
		const { getByText } = render(<Link href={href}>{text}</Link>);
		fireEvent.click(getByText(text));
		expect(location.value).toBe(href);
	});

	it('does not add rel for internal links', () => {
		const text = 'About';
		const { getByText } = render(<Link href="/about">{text}</Link>);
		expect((getByText(text) as HTMLAnchorElement).getAttribute('rel')).toBeNull();
	});

	it('adds rel="noopener noreferrer" for external links', () => {
		const text = 'External';
		const { getByText } = render(<Link href="https://example.com">{text}</Link>);
		expect((getByText(text) as HTMLAnchorElement).getAttribute('rel')).toBe('noopener noreferrer');
	});

	it('allows forcing external behavior', () => {
		const text = 'Forced External';
		const { getByText } = render(
			<Link href="/internal" external>
				{text}
			</Link>
		);
		expect((getByText(text) as HTMLAnchorElement).getAttribute('rel')).toBe('noopener noreferrer');
	});
});
