import { describe, expect, it } from 'bun:test';
import Theme from '@components/Theme';
import { render } from '@testing-library/preact';

describe('Theme', () => {
	it('renders children', () => {
		const content = 'Hello';
		const { getByText } = render(
			<Theme>
				<p>{content}</p>
			</Theme>
		);
		getByText(content);
	});

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

	it('is nestable for sub-themes', () => {
		const content = 'Nested';
		const { getByText } = render(
			<Theme class="light">
				<Theme class="dark">
					<p>{content}</p>
				</Theme>
			</Theme>
		);
		getByText(content);
	});
});
