import { describe, expect, it } from 'bun:test';
import Theme from '@components/Theme';
import { render } from '@testing-library/preact';

describe('Theme', () => {
	it('applies the consumer class', () => {
		// Arrange
		const themeClass = 'my-theme';

		// Act
		const { container } = render(
			<Theme class={themeClass}>
				<p>Themed</p>
			</Theme>
		);
		const wrapper = container.firstElementChild as HTMLElement;

		// Assert
		expect(wrapper.className).toContain(themeClass);
	});
});
