import { describe, expect, it } from 'bun:test';
import Nav from '@components/Nav';
import { render } from '@testing-library/preact';

describe('Nav', () => {
	it('does not render a heading when title is omitted', () => {
		// Act
		const { container } = render(
			<Nav>
				<a href="/">Home</a>
			</Nav>
		);

		// Assert
		expect(container.querySelector('[role="heading"]')).toBeNull();
	});
});
