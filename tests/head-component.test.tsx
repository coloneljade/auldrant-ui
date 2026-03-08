import { afterEach, describe, expect, it } from 'bun:test';
import Head from '@components/Head';
import { canonical, description, ogDescription, ogImage, ogTitle, title } from '@signals/head';
import { render } from '@testing-library/preact';

describe('Head component', () => {
	afterEach(() => {
		title.value = '';
		description.value = '';
		canonical.value = '';
		ogTitle.value = '';
		ogDescription.value = '';
		ogImage.value = '';
	});

	it('sets document.title from title prop', () => {
		// Act
		render(<Head title="Page Title" />);

		// Assert
		expect(document.title).toBe('Page Title');
	});

	it('sets meta description from description prop', () => {
		// Act
		render(<Head description="Page description" />);

		// Assert
		const el = document.querySelector<HTMLMetaElement>('meta[name="description"]');
		expect(el?.content).toBe('Page description');
	});

	it('sets canonical URL from canonical prop', () => {
		// Act
		render(<Head canonical="https://example.com/page" />);

		// Assert
		const el = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
		expect(el?.href).toBe('https://example.com/page');
	});

	it('sets OG tags from props', () => {
		// Act
		render(
			<Head ogTitle="OG Title" ogDescription="OG desc" ogImage="https://example.com/img.png" />
		);

		// Assert
		expect(document.querySelector<HTMLMetaElement>('meta[property="og:title"]')?.content).toBe(
			'OG Title'
		);
		expect(
			document.querySelector<HTMLMetaElement>('meta[property="og:description"]')?.content
		).toBe('OG desc');
		expect(document.querySelector<HTMLMetaElement>('meta[property="og:image"]')?.content).toBe(
			'https://example.com/img.png'
		);
	});

	it('renders nothing to the DOM', () => {
		// Act
		const { container } = render(<Head title="Test" />);

		// Assert
		expect(container.children).toHaveLength(0);
	});
});
