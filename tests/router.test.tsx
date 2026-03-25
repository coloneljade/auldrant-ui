import { beforeEach, describe, expect, it } from 'bun:test';
import Page from '@components/Page';
import Route from '@components/Route';
import Router from '@components/Router';
import { location } from '@signals/routing';
import { render } from '@testing-library/preact';

describe('Router', () => {
	beforeEach(() => {
		location.value = '/';
	});

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

	it('renders a wrapped Route inside a custom component', () => {
		// Arrange
		location.value = '/dashboard';
		const Dashboard = () => (
			<Route path="/dashboard">
				<p>Dashboard</p>
			</Route>
		);

		// Act
		const { getByText } = render(
			<Router>
				<Dashboard />
			</Router>
		);

		// Assert
		getByText('Dashboard');
	});

	it('renders a wrapped Page inside a custom component', () => {
		// Arrange
		location.value = '/profile';
		const Profile = () => (
			<Page path="/profile" title="Profile">
				<p>Profile content</p>
			</Page>
		);

		// Act
		const { getByText } = render(
			<Router>
				<Profile />
			</Router>
		);

		// Assert
		getByText('Profile content');
	});

	it('renders only the first matching wrapped child', () => {
		// Arrange
		location.value = '/items';
		const Items = () => (
			<Route path="/items">
				<p>Items page</p>
			</Route>
		);
		const AlsoItems = () => (
			<Route path="/items">
				<p>Duplicate items</p>
			</Route>
		);

		// Act
		const { getByText, queryByText } = render(
			<Router>
				<Items />
				<AlsoItems />
			</Router>
		);

		// Assert
		getByText('Items page');
		expect(queryByText('Duplicate items')).toBeNull();
	});

	it('mixes direct and wrapped children correctly', () => {
		// Arrange
		location.value = '/wrapped';
		const WrappedRoute = () => (
			<Route path="/wrapped">
				<p>Wrapped</p>
			</Route>
		);

		// Act
		const { getByText, queryByText } = render(
			<Router>
				<Route path="/direct">
					<p>Direct</p>
				</Route>
				<WrappedRoute />
				<Route path="/*">
					<p>Catch-all</p>
				</Route>
			</Router>
		);

		// Assert
		getByText('Wrapped');
		expect(queryByText('Direct')).toBeNull();
		expect(queryByText('Catch-all')).toBeNull();
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
