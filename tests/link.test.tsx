import { describe, expect, it } from 'bun:test';
import Link from '@components/Link';
import { location } from '@signals/routing';
import { fireEvent, render } from '@testing-library/preact';

describe('Link', () => {
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
