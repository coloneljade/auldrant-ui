import { describe, expect, it } from 'bun:test';
import Page from '@components/Page';
import { pageTitle } from '@signals/head';
import { location } from '@signals/routing';
import { render } from '@testing-library/preact';

describe('Page', () => {
	it('renders children when path matches', () => {
		// Arrange
		location.value = '/about';

		// Act
		const { getByText } = render(
			<Page path="/about" title="About">
				<p>About content</p>
			</Page>
		);

		// Assert
		getByText('About content');
	});

	it('returns null when path does not match', () => {
		// Arrange
		location.value = '/home';

		// Act
		const { container } = render(
			<Page path="/about" title="About">
				<p>About content</p>
			</Page>
		);

		// Assert
		expect(container.textContent).not.toContain('About content');
	});

	it('sets pageTitle signal when path matches', () => {
		// Arrange
		location.value = '/contact';
		pageTitle.value = '';

		// Act
		render(
			<Page path="/contact" title="Contact Us">
				<p>Contact form</p>
			</Page>
		);

		// Assert
		expect(pageTitle.value).toBe('Contact Us');
	});

	it('sets document title via Head when path matches', () => {
		// Arrange
		location.value = '/services';

		// Act
		render(
			<Page path="/services" title="Our Services">
				<p>Services</p>
			</Page>
		);

		// Assert
		expect(document.title).toBe('Our Services');
	});

	it('supports wildcard paths', () => {
		// Arrange
		location.value = '/users/123';

		// Act
		const { getByText } = render(
			<Page path="/users/*" title="Users">
				<p>User content</p>
			</Page>
		);

		// Assert
		getByText('User content');
	});
});
