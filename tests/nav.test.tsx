import { describe, expect, it } from 'bun:test';
import Nav from '@components/Nav';
import { render } from '@testing-library/preact';

describe('Nav', () => {
	it('renders a semantic nav element', () => {
		const { container } = render(
			<Nav>
				<a href="/">Home</a>
			</Nav>
		);
		expect(container.querySelector('nav')).not.toBeNull();
	});

	it('renders a title heading when provided', () => {
		const title = 'Main Navigation';
		const { container, getByText } = render(
			<Nav title={title}>
				<a href="/">Home</a>
			</Nav>
		);
		getByText(title);

		const nav = container.querySelector('nav');
		const heading = container.querySelector('h2');
		expect(nav?.getAttribute('aria-labelledby')).toBe(heading?.id);
	});

	it('does not render a heading when title is omitted', () => {
		const { container } = render(
			<Nav>
				<a href="/">Home</a>
			</Nav>
		);
		expect(container.querySelector('h2')).toBeNull();
	});
});
