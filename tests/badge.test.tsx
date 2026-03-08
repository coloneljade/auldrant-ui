import { describe, expect, it } from 'bun:test';
import Badge from '@components/Badge';
import { render } from '@testing-library/preact';

describe('Badge', () => {
	it('renders children', () => {
		// Act
		const { getByText } = render(<Badge>12</Badge>);

		// Assert
		getByText('12');
	});

	it('renders as a span element', () => {
		// Act
		const { container } = render(<Badge>New</Badge>);

		// Assert
		expect(container.firstElementChild?.tagName).toBe('SPAN');
	});

	it('renders neutral variant by default', () => {
		// Act & Assert — no throw; neutral is the default
		render(<Badge>Status</Badge>);
	});

	it('renders success variant without error', () => {
		// Act & Assert
		render(<Badge variant="success">Active</Badge>);
	});

	it('renders warning variant without error', () => {
		// Act & Assert
		render(<Badge variant="warning">Pending</Badge>);
	});

	it('renders error variant without error', () => {
		// Act & Assert
		render(<Badge variant="error">Failed</Badge>);
	});

	it('accepts a custom class', () => {
		// Act
		const { container } = render(<Badge class="custom">x</Badge>);

		// Assert
		expect(container.firstElementChild?.classList.contains('custom')).toBe(true);
	});
});
