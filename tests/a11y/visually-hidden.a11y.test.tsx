import { describe, expect, it } from 'bun:test';
import VisuallyHidden from '@components/VisuallyHidden';
import { render } from '@testing-library/preact';
import { renderAndCheckA11y } from './setup';

describe('VisuallyHidden a11y', () => {
	const text = 'Screen reader only';

	it('has no axe violations', async () => {
		// Act & Assert
		await renderAndCheckA11y(<VisuallyHidden>{text}</VisuallyHidden>);
	});

	// https://www.w3.org/TR/WCAG22/#adaptable
	describe('WCAG A', () => {
		it('keeps content in the accessible tree (SC 1.3.1)', () => {
			// Act
			const { getByText } = render(<VisuallyHidden>{text}</VisuallyHidden>);
			const el = getByText(text);

			// Assert
			expect(el.getAttribute('aria-hidden')).toBeNull();
		});
	});
});
