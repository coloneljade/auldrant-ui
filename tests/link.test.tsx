import { describe, expect, it } from 'bun:test';
import Link from '@components/Link';
import { location } from '@signals/routing';
import { fireEvent, render } from '@testing-library/preact';

describe('Link', () => {
	it('does not update location for external links', () => {
		// Arrange
		const before = location.value;
		const { getByText } = render(<Link href="https://example.com">External</Link>);
		const link = getByText('External');

		// Prevent Happy-DOM from navigating to the external URL (which would
		// change window.location.origin and break isExternal for later tests).
		// This doesn't interfere with navigate() — it uses pushState, not default link behavior.
		link.addEventListener('click', (e) => e.preventDefault());

		// Act
		fireEvent.click(link);

		// Assert
		expect(location.value).toBe(before);
	});

	it('navigates internally for relative paths', () => {
		// Arrange
		const text = 'Go';
		const href = '/dashboard';
		const { getByText } = render(<Link href={href}>{text}</Link>);

		// Act
		fireEvent.click(getByText(text));

		// Assert
		expect(location.value).toBe(href);
	});
});
