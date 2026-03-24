import { beforeEach, describe, it } from 'bun:test';
import Route from '@components/Route';
import Router from '@components/Router';
import { location } from '@signals/routing';
import { renderAndCheckA11y } from './setup';

describe('Router a11y', () => {
	beforeEach(() => {
		location.value = '/';
	});

	it('has no axe violations when a route matches', async () => {
		// Arrange
		location.value = '/home';

		// Act & Assert
		await renderAndCheckA11y(
			<Router>
				<Route path="/home">
					<p>Home content</p>
				</Route>
			</Router>
		);
	});

	it('has no axe violations with catch-all route', async () => {
		// Arrange
		location.value = '/unknown';

		// Act & Assert
		await renderAndCheckA11y(
			<Router>
				<Route path="/home">
					<p>Home</p>
				</Route>
				<Route path="/*">
					<p>Fallback content</p>
				</Route>
			</Router>
		);
	});
});
