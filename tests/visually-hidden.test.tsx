import { describe, expect, it } from 'bun:test';
import VisuallyHidden from '@components/VisuallyHidden';
import { render } from '@testing-library/preact';

describe('VisuallyHidden', () => {
	it('children are present in the DOM', () => {
		// Act
		const { getByText } = render(<VisuallyHidden>Screen reader text</VisuallyHidden>);

		// Assert
		getByText('Screen reader text');
	});

	it('renders a <span> element', () => {
		// Act
		const { container } = render(<VisuallyHidden>Hidden</VisuallyHidden>);

		// Assert
		expect(container.firstElementChild?.tagName).toBe('SPAN');
	});

	it('is not interactive — has no role or tabIndex by default', () => {
		// Act
		const { container } = render(<VisuallyHidden>Hidden</VisuallyHidden>);
		const span = container.firstElementChild as HTMLElement;

		// Assert — plain span, not focusable or announced as an interactive widget
		expect(span.getAttribute('role')).toBeNull();
		expect(span.getAttribute('tabindex')).toBeNull();
	});
});
