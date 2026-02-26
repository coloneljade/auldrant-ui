import { describe, expect, it } from 'bun:test';
import Link from '@components/Link';
import { render } from '@testing-library/preact';
import { renderAndCheckA11y } from './setup';

describe('Link a11y', () => {
	it('has no axe violations for internal links', async () => {
		// Act & Assert
		await renderAndCheckA11y(<Link href="/about">About</Link>);
	});

	it('has no axe violations for external links', async () => {
		// Act & Assert
		await renderAndCheckA11y(<Link href="https://example.com">External</Link>);
	});

	// https://www.w3.org/TR/WCAG22/#compatible
	describe('WCAG A', () => {
		it('is an accessible link (SC 4.1.2)', () => {
			// Arrange
			const text = 'About';

			// Act
			const { getByRole } = render(<Link href="/about">{text}</Link>);

			// Assert
			getByRole('link', { name: text });
		});

		it('omits rel for internal links (SC 2.4.4)', () => {
			// Arrange
			const text = 'About';

			// Act
			const { getByRole } = render(<Link href="/about">{text}</Link>);

			// Assert
			expect(getByRole('link', { name: text }).getAttribute('rel')).toBeNull();
		});

		it('adds rel="noopener noreferrer" for external links (SC 2.4.4)', () => {
			// Arrange
			const text = 'External';

			// Act
			const { getByRole } = render(<Link href="https://example.com">{text}</Link>);

			// Assert
			expect(getByRole('link', { name: text }).getAttribute('rel')).toBe('noopener noreferrer');
		});

		it('allows forcing external behavior (SC 2.4.4)', () => {
			// Arrange
			const text = 'Forced External';

			// Act
			const { getByRole } = render(
				<Link href="/internal" external>
					{text}
				</Link>
			);

			// Assert
			expect(getByRole('link', { name: text }).getAttribute('rel')).toBe('noopener noreferrer');
		});
	});
});
