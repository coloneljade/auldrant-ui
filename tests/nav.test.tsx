import { describe, expect, it } from 'bun:test';
import Nav from '@components/Nav';
import { render } from '@testing-library/preact';

describe('Nav', () => {
	it('does not render a heading when title is omitted', () => {
		const { container } = render(
			<Nav>
				<a href="/">Home</a>
			</Nav>
		);
		expect(container.querySelector('h2')).toBeNull();
	});
});
