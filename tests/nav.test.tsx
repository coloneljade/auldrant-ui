import { describe, expect, it } from 'bun:test';
import Nav from '@components/Nav';
import { render } from '@testing-library/preact';

describe('Nav', () => {
	it('renders a navigation landmark', () => {
		// Act
		const { getByRole } = render(
			<Nav title="Main">
				<a href="/home">Home</a>
			</Nav>
		);

		// Assert
		getByRole('navigation');
	});

	it('labels the landmark with the title', () => {
		// Act
		const { getByRole } = render(
			<Nav title="Main">
				<a href="/home">Home</a>
			</Nav>
		);

		// Assert
		getByRole('navigation', { name: 'Main' });
	});

	it('renders the title as a visually hidden heading', () => {
		// Act
		const { getByRole } = render(
			<Nav title="Site">
				<a href="/home">Home</a>
			</Nav>
		);

		// Assert
		expect(getByRole('heading', { level: 2 }).textContent).toBe('Site');
	});

	it('renders children as navigation content', () => {
		// Act
		const { getByText } = render(
			<Nav title="Links">
				<a href="/a">First</a>
				<a href="/b">Second</a>
			</Nav>
		);

		// Assert
		getByText('First');
		getByText('Second');
	});
});
