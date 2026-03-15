import { describe, it } from 'bun:test';
import Theme, { Palette } from '@components/Theme';
import { renderAndCheckA11y } from './setup';

describe('Theme a11y', () => {
	it('has no axe violations (default theme)', async () => {
		await renderAndCheckA11y(
			<Theme>
				<p>Content</p>
			</Theme>
		);
	});

	it('has no axe violations (palette class applied)', async () => {
		await renderAndCheckA11y(
			<Theme class={Palette.blue}>
				<p>Content</p>
			</Theme>
		);
	});
});
