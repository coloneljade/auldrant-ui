import { beforeEach, describe, expect, it } from 'bun:test';
import Route from '@components/Route';
import { location } from '@signals/routing';
import { render } from '@testing-library/preact';

describe('Route', () => {
	beforeEach(() => {
		location.value = '/';
	});

	it('renders children when path matches exactly', () => {
		// Arrange
		const content = 'About page';
		location.value = '/about';

		// Act
		const { getByText } = render(
			<Route path="/about">
				<p>{content}</p>
			</Route>
		);

		// Assert
		getByText(content);
	});

	it('renders nothing when path does not match', () => {
		// Arrange
		location.value = '/other';

		// Act
		const { container } = render(
			<Route path="/about">
				<p>About page</p>
			</Route>
		);

		// Assert
		expect(container.textContent).toBe('');
	});

	it('supports wildcard matching', () => {
		// Arrange
		const content = 'User detail';
		location.value = '/users/123';

		// Act
		const { getByText } = render(
			<Route path="/users/*">
				<p>{content}</p>
			</Route>
		);

		// Assert
		getByText(content);
	});

	it('matches wildcard base path without trailing slash', () => {
		// Arrange
		const content = 'Users';
		location.value = '/users';

		// Act
		const { getByText } = render(
			<Route path="/users/*">
				<p>{content}</p>
			</Route>
		);

		// Assert
		getByText(content);
	});

	it('does not match wildcard for different prefix', () => {
		// Arrange
		location.value = '/admin/users';

		// Act
		const { container } = render(
			<Route path="/users/*">
				<p>Users</p>
			</Route>
		);

		// Assert
		expect(container.textContent).toBe('');
	});
});
