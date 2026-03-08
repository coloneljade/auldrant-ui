import { afterEach, describe, expect, it } from 'bun:test';
import { canonical, description, ogDescription, ogImage, ogTitle, title } from '@signals/head';

describe('head signals', () => {
	describe('title', () => {
		it('syncs to document.title', () => {
			// Act
			title.value = 'My Page';

			// Assert
			expect(document.title).toBe('My Page');
		});

		it('updates when signal changes', () => {
			// Act & Assert
			title.value = 'First';
			expect(document.title).toBe('First');
			title.value = 'Second';
			expect(document.title).toBe('Second');
		});
	});

	describe('description', () => {
		afterEach(() => {
			description.value = '';
		});

		it('creates a meta[name="description"] tag when set', () => {
			// Act
			description.value = 'My description';

			// Assert
			const el = document.querySelector<HTMLMetaElement>('meta[name="description"]');
			expect(el?.content).toBe('My description');
		});

		it('removes the tag when reset to empty string', () => {
			// Arrange
			description.value = 'My description';

			// Act
			description.value = '';

			// Assert
			expect(document.querySelector('meta[name="description"]')).toBeNull();
		});
	});

	describe('canonical', () => {
		afterEach(() => {
			canonical.value = '';
		});

		it('creates a link[rel="canonical"] tag when set', () => {
			// Act
			canonical.value = 'https://example.com/page';

			// Assert
			const el = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
			expect(el?.href).toBe('https://example.com/page');
		});

		it('removes the tag when reset to empty string', () => {
			// Arrange
			canonical.value = 'https://example.com/page';

			// Act
			canonical.value = '';

			// Assert
			expect(document.querySelector('link[rel="canonical"]')).toBeNull();
		});
	});

	describe('OG tags', () => {
		afterEach(() => {
			ogTitle.value = '';
			ogDescription.value = '';
			ogImage.value = '';
		});

		it('creates og:title meta tag', () => {
			// Act
			ogTitle.value = 'OG Title';

			// Assert
			const el = document.querySelector<HTMLMetaElement>('meta[property="og:title"]');
			expect(el?.content).toBe('OG Title');
		});

		it('creates og:description meta tag', () => {
			// Act
			ogDescription.value = 'OG desc';

			// Assert
			const el = document.querySelector<HTMLMetaElement>('meta[property="og:description"]');
			expect(el?.content).toBe('OG desc');
		});

		it('creates og:image meta tag', () => {
			// Act
			ogImage.value = 'https://example.com/img.png';

			// Assert
			const el = document.querySelector<HTMLMetaElement>('meta[property="og:image"]');
			expect(el?.content).toBe('https://example.com/img.png');
		});
	});
});
