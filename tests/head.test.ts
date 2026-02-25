import { beforeEach, describe, expect, it } from 'bun:test';
import { meta, title } from '@signals/head';

describe('head signals', () => {
	beforeEach(() => {
		title.value = '';
		meta.value = [];
		const managed = document.querySelectorAll('meta[data-aui]');
		for (const el of managed) {
			el.remove();
		}
	});

	describe('title', () => {
		it('syncs to document.title', () => {
			title.value = 'My Page';
			expect(document.title).toBe('My Page');
		});

		it('updates when signal changes', () => {
			title.value = 'First';
			expect(document.title).toBe('First');
			title.value = 'Second';
			expect(document.title).toBe('Second');
		});
	});

	describe('meta', () => {
		it('creates meta tags in document head', () => {
			const content = 'A test page';
			meta.value = [{ name: 'description', content }];
			const el = document.querySelector('meta[name="description"][data-aui]');
			expect(el).not.toBeNull();
			expect(el?.getAttribute('content')).toBe(content);
		});

		it('removes old meta tags when signal updates', () => {
			meta.value = [{ name: 'description', content: 'Old' }];
			meta.value = [{ name: 'keywords', content: 'new' }];

			expect(document.querySelector('meta[name="description"][data-aui]')).toBeNull();

			const current = document.querySelector('meta[name="keywords"][data-aui]');
			expect(current?.getAttribute('content')).toBe('new');
		});

		it('handles multiple meta entries', () => {
			meta.value = [
				{ name: 'description', content: 'Desc' },
				{ name: 'author', content: 'Jade' },
			];
			expect(document.querySelectorAll('meta[data-aui]').length).toBe(2);
		});

		it('clears all managed tags when set to empty', () => {
			meta.value = [{ name: 'description', content: 'Will be removed' }];
			meta.value = [];
			expect(document.querySelectorAll('meta[data-aui]').length).toBe(0);
		});
	});
});
