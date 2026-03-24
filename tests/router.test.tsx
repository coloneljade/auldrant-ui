import { describe, expect, it } from 'bun:test';
import Page from '@components/Page';
import Route from '@components/Route';
import Router from '@components/Router';
import { location } from '@signals/routing';
import { render } from '@testing-library/preact';

describe('Router', () => {
	it('renders the first matching Route', () => {
		// Arrange
		location.value = '/home';

		// Act
		const { getByText } = render(
			<Router>
				<Route path="/home">
					<p>Home</p>
				</Route>
				<Route path="/about">
					<p>About</p>
				</Route>
			</Router>
		);

		// Assert
		getByText('Home');
		expect(() => getByText('About')).toThrow();
	});

	it('renders the first matching Page', () => {
		// Arrange
		location.value = '/settings';

		// Act
		const { getByText } = render(
			<Router>
				<Page path="/home" title="Home">
					<p>Home</p>
				</Page>
				<Page path="/settings" title="Settings">
					<p>Settings</p>
				</Page>
			</Router>
		);

		// Assert
		getByText('Settings');
		expect(() => getByText('Home')).toThrow();
	});

	it('renders catch-all route last', () => {
		// Arrange
		location.value = '/unknown';

		// Act
		const { getByText } = render(
			<Router>
				<Route path="/home">
					<p>Home</p>
				</Route>
				<Route path="/*">
					<p>Not found</p>
				</Route>
			</Router>
		);

		// Assert
		getByText('Not found');
	});

	it('returns null when no route matches', () => {
		// Arrange
		location.value = '/unknown';

		// Act
		const { container } = render(
			<Router>
				<Route path="/home">
					<p>Home</p>
				</Route>
				<Route path="/about">
					<p>About</p>
				</Route>
			</Router>
		);

		// Assert
		expect(container.textContent).not.toContain('Home');
		expect(container.textContent).not.toContain('About');
	});

	it('renders only the first matching child', () => {
		// Arrange
		location.value = '/about';

		// Act
		const { queryByText } = render(
			<Router>
				<Route path="/about">
					<p>First about</p>
				</Route>
				<Route path="/about">
					<p>Second about</p>
				</Route>
			</Router>
		);

		// Assert
		queryByText('First about');
		expect(queryByText('Second about')).toBeNull();
	});

	it('supports exact and wildcard paths in mixed routes', () => {
		// Arrange
		location.value = '/docs/guide';

		// Act
		const { getByText } = render(
			<Router>
				<Route path="/docs">
					<p>Docs index</p>
				</Route>
				<Route path="/docs/*">
					<p>Docs content</p>
				</Route>
			</Router>
		);

		// Assert
		getByText('Docs content');
	});
});
