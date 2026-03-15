import { describe, expect, it } from 'bun:test';
import Nav from '@components/Nav';
import { render } from '@testing-library/preact';

describe('Nav', () => {
	it('renders a navigation landmark', () => {
		// Act
		const { getByRole } = render(
			<Nav>
				<a href="/home">Home</a>
			</Nav>
		);

		// Assert
		getByRole('navigation');
	});

	it('labels the landmark with the title when provided', () => {
		// Act
		const { getByRole } = render(
			<Nav title="Main">
				<a href="/home">Home</a>
			</Nav>
		);

		// Assert
		getByRole('navigation', { name: 'Main' });
	});

	it('renders title as a heading', () => {
		// Act
		const { getByRole } = render(
			<Nav title="Site">
				<a href="/home">Home</a>
			</Nav>
		);

		// Assert
		expect(getByRole('heading', { level: 2 }).textContent).toBe('Site');
	});

	it('wraps the title in a link when route is provided', () => {
		// Act
		const { getByRole } = render(
			<Nav title="Brand" route="/">
				<a href="/about">About</a>
			</Nav>
		);

		// Assert
		const heading = getByRole('heading', { level: 2 });
		const link = heading.querySelector('a');
		expect(link).not.toBeNull();
		expect(link?.getAttribute('href')).toBe('/');
	});

	it('renders children as navigation content', () => {
		// Act
		const { getByText } = render(
			<Nav>
				<a href="/a">First</a>
				<a href="/b">Second</a>
			</Nav>
		);

		// Assert
		getByText('First');
		getByText('Second');
	});

	it('does not render a heading when title is omitted', () => {
		// Act
		const { queryByRole } = render(
			<Nav>
				<a href="/home">Home</a>
			</Nav>
		);

		// Assert
		expect(queryByRole('heading')).toBeNull();
	});
});
