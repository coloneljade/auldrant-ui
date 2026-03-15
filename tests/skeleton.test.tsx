import { describe, expect, it } from 'bun:test';
import Skeleton from '@components/Skeleton';
import { render } from '@testing-library/preact';

describe('Skeleton', () => {
	it('renders a div with aria-hidden="true"', () => {
		// Act
		const { container } = render(<Skeleton />);
		const el = container.firstElementChild as HTMLElement;

		// Assert
		expect(el.tagName).toBe('DIV');
		expect(el.getAttribute('aria-hidden')).toBe('true');
	});

	it('renders without error when rounded is omitted', () => {
		// Act
		const { container } = render(<Skeleton />);

		// Assert — element rendered successfully
		expect(container.firstElementChild).not.toBeNull();
	});

	it('renders without error when rounded={true}', () => {
		// Act
		const { container } = render(<Skeleton rounded />);

		// Assert — element rendered successfully
		expect(container.firstElementChild).not.toBeNull();
	});

	it('forwards the class prop to the root element', () => {
		// Act
		const { container } = render(<Skeleton class="custom-class" />);
		const el = container.firstElementChild as HTMLElement;

		// Assert
		expect(el.classList.contains('custom-class')).toBe(true);
	});
});
