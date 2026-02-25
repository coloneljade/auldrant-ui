import { describe, expect, it } from 'bun:test';
import { title } from '@signals/head';

describe('head signals', () => {
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
});
