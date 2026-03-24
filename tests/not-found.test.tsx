import { describe, expect, it } from 'bun:test';
import NotFound from '@components/NotFound';
import { render } from '@testing-library/preact';

describe('NotFound', () => {
	it('renders the message when provided', () => {
		// Act
		const { getByText } = render(<NotFound message="The page you requested does not exist." />);

		// Assert
		getByText('The page you requested does not exist.');
	});

	it('renders a link to "/" by default', () => {
		// Act
		const { getByRole } = render(<NotFound />);
		const link = getByRole('link', { name: 'Go home' });

		// Assert
		expect(link.getAttribute('href')).toBe('/');
	});

	it('renders a link to a custom href', () => {
		// Act
		const { getByRole } = render(<NotFound href="/dashboard" linkLabel="Back to dashboard" />);
		const link = getByRole('link', { name: 'Back to dashboard' });

		// Assert
		expect(link.getAttribute('href')).toBe('/dashboard');
	});
});
