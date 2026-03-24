import { describe, expect, it } from 'bun:test';
import SkipLink from '@components/SkipLink';
import { render } from '@testing-library/preact';

describe('SkipLink', () => {
	it('renders as a link pointing to the given target', () => {
		// Act
		const { getByRole } = render(<SkipLink target="#app-body" />);
		const link = getByRole('link', { name: 'Skip to main content' });

		// Assert
		expect(link.getAttribute('href')).toBe('#app-body');
	});

	it('renders with a different target', () => {
		// Act
		const { getByRole } = render(<SkipLink target="#content-region" />);

		// Assert
		expect(getByRole('link').getAttribute('href')).toBe('#content-region');
	});

	it('renders with a custom label', () => {
		// Act
		const { getByRole } = render(<SkipLink target="#dashboard" label="Skip navigation" />);

		// Assert
		getByRole('link', { name: 'Skip navigation' });
	});

	it('forwards the class prop to the root element', () => {
		// Act
		const { getByRole } = render(<SkipLink target="#sidebar" class="custom-skip" />);

		// Assert
		expect(getByRole('link').classList.contains('custom-skip')).toBe(true);
	});
});
