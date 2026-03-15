import { describe, expect, it } from 'bun:test';
import Section from '@components/Section';
import { render } from '@testing-library/preact';

describe('Section', () => {
	it('renders the title as a heading', () => {
		// Act
		const { getByRole } = render(<Section title="My Section">Content</Section>);

		// Assert
		getByRole('heading', { name: 'My Section' });
	});

	it('renders children', () => {
		// Act
		const { getByText } = render(<Section title="Section">Section body content</Section>);

		// Assert
		getByText('Section body content');
	});

	it('renders a <section> element', () => {
		// Act
		const { container } = render(<Section title="Region">Content</Section>);

		// Assert
		expect(container.querySelector('section')).not.toBeNull();
	});

	it('defaults to an h2 heading', () => {
		// Act
		const { container } = render(<Section title="Heading">Content</Section>);

		// Assert
		expect(container.querySelector('h2')).not.toBeNull();
	});

	it('forwards the class prop to the root element', () => {
		// Act
		const { container } = render(
			<Section title="Section" class="custom-section">
				Content
			</Section>
		);

		// Assert
		expect(container.firstElementChild?.classList.contains('custom-section')).toBe(true);
	});
});
