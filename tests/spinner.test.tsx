import { describe, expect, it } from 'bun:test';
import Spinner from '@components/Spinner';
import { render } from '@testing-library/preact';

describe('Spinner', () => {
	it('renders a status live region', () => {
		// Act
		const { getByRole } = render(<Spinner />);

		// Assert
		getByRole('status');
	});

	it('renders the default label visually hidden', () => {
		// Act
		const { getByRole } = render(<Spinner />);

		// Assert — label text is inside the live region
		expect(getByRole('status').textContent).toBe('Loading\u2026');
	});

	it('renders a custom label', () => {
		// Act
		const { getByRole } = render(<Spinner label="Saving…" />);

		// Assert
		expect(getByRole('status').textContent).toBe('Saving…');
	});

	it('accepts a custom class', () => {
		// Act
		const { getByRole } = render(<Spinner class="custom" />);

		// Assert
		expect(getByRole('status').classList.contains('custom')).toBe(true);
	});

	it('size sm still renders the live region and label', () => {
		// Act
		const { getByRole } = render(<Spinner size="sm" />);

		// Assert
		expect(getByRole('status').textContent).toBe('Loading\u2026');
	});

	it('size lg still renders the live region and label', () => {
		// Act
		const { getByRole } = render(<Spinner size="lg" />);

		// Assert
		expect(getByRole('status').textContent).toBe('Loading\u2026');
	});
});
