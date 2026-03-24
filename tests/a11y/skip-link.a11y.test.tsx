import { describe, expect, it } from 'bun:test';
import SkipLink from '@components/SkipLink';
import { render } from '@testing-library/preact';
import { renderAndCheckA11y } from './setup';

describe('SkipLink a11y', () => {
	it('has no axe violations', async () => {
		// Act & Assert
		await renderAndCheckA11y(<SkipLink target="#page-content" />);
	});

	// https://www.w3.org/TR/WCAG22/#navigable
	describe('WCAG A', () => {
		it('renders with the given target and accessible name (SC 2.4.1)', () => {
			// Act
			const { getByRole } = render(<SkipLink target="#app-root" />);
			const link = getByRole('link', { name: 'Skip to main content' });

			// Assert
			expect(link.getAttribute('href')).toBe('#app-root');
		});

		it('accepts a custom target (SC 2.4.1)', () => {
			// Arrange
			const target = '#article-body';

			// Act
			const { getByRole } = render(<SkipLink target={target} />);

			// Assert
			expect(getByRole('link').getAttribute('href')).toBe(target);
		});

		it('accepts a custom label (SC 2.4.1)', () => {
			// Arrange
			const label = 'Skip navigation';

			// Act
			const { getByRole } = render(<SkipLink target="#feed" label={label} />);

			// Assert
			getByRole('link', { name: label });
		});
	});
});
