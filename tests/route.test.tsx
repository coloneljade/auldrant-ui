import { beforeEach, describe, expect, it } from 'bun:test';
import Route from '@components/Route';
import { location } from '@signals/routing';
import { render } from '@testing-library/preact';

describe('Route', () => {
	beforeEach(() => {
		location.value = '/';
	});

	it('renders children when path matches exactly', () => {
		const content = 'About page';
		location.value = '/about';
		const { getByText } = render(
			<Route path="/about">
				<p>{content}</p>
			</Route>
		);
		getByText(content);
	});

	it('renders nothing when path does not match', () => {
		location.value = '/other';
		const { container } = render(
			<Route path="/about">
				<p>About page</p>
			</Route>
		);
		expect(container.textContent).toBe('');
	});

	it('supports wildcard matching', () => {
		const content = 'User detail';
		location.value = '/users/123';
		const { getByText } = render(
			<Route path="/users/*">
				<p>{content}</p>
			</Route>
		);
		getByText(content);
	});

	it('matches wildcard base path without trailing slash', () => {
		const content = 'Users';
		location.value = '/users';
		const { getByText } = render(
			<Route path="/users/*">
				<p>{content}</p>
			</Route>
		);
		getByText(content);
	});

	it('does not match wildcard for different prefix', () => {
		location.value = '/admin/users';
		const { container } = render(
			<Route path="/users/*">
				<p>Users</p>
			</Route>
		);
		expect(container.textContent).toBe('');
	});
});
