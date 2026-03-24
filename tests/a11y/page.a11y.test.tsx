import { beforeEach, describe, it } from 'bun:test';
import Page from '@components/Page';
import { pageTitle } from '@signals/head';
import { location } from '@signals/routing';
import { renderAndCheckA11y } from './setup';

describe('Page a11y', () => {
	beforeEach(() => {
		location.value = '/';
		pageTitle.value = '';
	});

	it('has no axe violations when path matches', async () => {
		// Arrange
		location.value = '/about';

		// Act & Assert
		await renderAndCheckA11y(
			<Page path="/about" title="About">
				<p>About content</p>
			</Page>
		);
	});

	it('has no axe violations with wildcard path', async () => {
		// Arrange
		location.value = '/docs/guide';

		// Act & Assert
		await renderAndCheckA11y(
			<Page path="/docs/*" title="Documentation">
				<p>Doc content</p>
			</Page>
		);
	});
});
