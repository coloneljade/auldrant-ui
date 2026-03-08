import { describe, expect, it } from 'bun:test';
import Theme, { Palette } from '@components/Theme';
import { render } from '@testing-library/preact';

describe('Theme', () => {
	it('renders children', () => {
		// Act
		const { getByText } = render(
			<Theme>
				<span>Content</span>
			</Theme>
		);

		// Assert
		getByText('Content');
	});

	it('wraps children in a div element', () => {
		// Act
		const { container } = render(
			<Theme>
				<span>x</span>
			</Theme>
		);

		// Assert
		expect(container.firstElementChild?.tagName).toBe('DIV');
	});

	it('applies a palette class from Palette', () => {
		// Act
		const { container } = render(
			<Theme class={Palette.blue}>
				<span>x</span>
			</Theme>
		);

		// Assert
		expect(container.firstElementChild?.classList.contains('aui-blue')).toBe(true);
	});

	it('applies a custom class', () => {
		// Act
		const { container } = render(
			<Theme class="brand">
				<span>x</span>
			</Theme>
		);

		// Assert
		expect(container.firstElementChild?.classList.contains('brand')).toBe(true);
	});

	it('nests correctly — inner Theme renders inside outer', () => {
		// Act
		const { container } = render(
			<Theme class={Palette.blue}>
				<Theme class={Palette.red}>
					<span>nested</span>
				</Theme>
			</Theme>
		);

		// Assert
		const inner = container.querySelector('.aui-red');
		expect(inner).not.toBeNull();
		expect(inner?.querySelector('span')?.textContent).toBe('nested');
	});

	it('exposes all Palette keys', () => {
		// Assert — every palette value is a non-empty string
		for (const key of Object.keys(Palette)) {
			const value = Palette[key as keyof typeof Palette];
			expect(typeof value).toBe('string');
			expect(value.length).toBeGreaterThan(0);
		}
	});
});
