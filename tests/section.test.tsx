import { describe, expect, it } from 'bun:test';
import Section from '@components/Section';
import { render } from '@testing-library/preact';

describe('Section', () => {
	const title = 'About';

	it('renders a semantic section element with aria-labelledby', () => {
		const { container } = render(
			<Section title={title}>
				<p>Content</p>
			</Section>
		);
		const section = container.querySelector('section');
		const heading = container.querySelector('h2');
		expect(section).not.toBeNull();
		expect(section?.getAttribute('aria-labelledby')).toBe(heading?.id);
	});

	it('defaults to h2 heading', () => {
		const { getByText } = render(
			<Section title={title}>
				<p>Content</p>
			</Section>
		);
		expect(getByText(title).tagName).toBe('H2');
	});

	it('uses the specified heading level', () => {
		const subtitle = 'Subsection';
		const { getByText } = render(
			<Section title={subtitle} level={4}>
				<p>Content</p>
			</Section>
		);
		expect(getByText(subtitle).tagName).toBe('H4');
	});
});
