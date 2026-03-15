import { describe, expect, it } from 'bun:test';
import Card from '@components/Card';
import { render } from '@testing-library/preact';

describe('Card', () => {
	it('renders children', () => {
		// Act
		const { getByText } = render(<Card>Card content</Card>);

		// Assert
		getByText('Card content');
	});

	it('renders optional heading when provided as a child', () => {
		// Act
		const { getByRole } = render(
			<Card>
				<h2>Card heading</h2>
				<p>Body</p>
			</Card>
		);

		// Assert
		getByRole('heading', { name: 'Card heading' });
	});

	it('renders optional footer content', () => {
		// Act
		const { getByText } = render(
			<Card>
				<p>Body</p>
				<footer>Footer text</footer>
			</Card>
		);

		// Assert
		getByText('Footer text');
	});

	it('forwards the class prop to the root element', () => {
		// Act
		const { container } = render(<Card class="custom-card">Content</Card>);

		// Assert
		expect(container.firstElementChild?.classList.contains('custom-card')).toBe(true);
	});
});
