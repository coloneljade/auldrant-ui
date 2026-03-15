import { describe, expect, it } from 'bun:test';
import SkipLink from '@components/SkipLink';
import { render } from '@testing-library/preact';

describe('SkipLink', () => {
	it('renders as a link with href="#main" by default', () => {
		// Act
		const { getByRole } = render(<SkipLink />);
		const link = getByRole('link', { name: 'Skip to main content' });

		// Assert
		expect(link.getAttribute('href')).toBe('#main');
	});

	it('renders with a custom target', () => {
		// Act
		const { getByRole } = render(<SkipLink target="#content" />);

		// Assert
		expect(getByRole('link').getAttribute('href')).toBe('#content');
	});

	it('renders with a custom label', () => {
		// Act
		const { getByRole } = render(<SkipLink label="Skip navigation" />);

		// Assert
		getByRole('link', { name: 'Skip navigation' });
	});

	it('forwards the class prop to the root element', () => {
		// Act
		const { getByRole } = render(<SkipLink class="custom-skip" />);

		// Assert
		expect(getByRole('link').classList.contains('custom-skip')).toBe(true);
	});
});
