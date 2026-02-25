import { describe, expect, it } from 'bun:test';
import Theme from '@components/Theme';
import { render } from '@testing-library/preact';

describe('Theme', () => {
	it('applies the consumer class', () => {
		const themeClass = 'my-theme';
		const { container } = render(
			<Theme class={themeClass}>
				<p>Themed</p>
			</Theme>
		);
		const wrapper = container.firstElementChild as HTMLElement;
		expect(wrapper.className).toContain(themeClass);
	});
});
