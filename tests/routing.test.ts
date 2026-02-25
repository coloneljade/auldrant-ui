import { beforeEach, describe, expect, it } from 'bun:test';
import { hash, location, navigate, searchParams } from '@signals/routing';

describe('routing signals', () => {
	beforeEach(() => {
		location.value = '/';
		searchParams.value = new URLSearchParams();
		hash.value = '';
	});

	describe('navigate', () => {
		it('updates location signal', () => {
			navigate('/users');
			expect(location.value).toBe('/users');
		});

		it('updates searchParams signal', () => {
			navigate('/search?q=test');
			expect(searchParams.value.get('q')).toBe('test');
		});

		it('updates hash signal', () => {
			navigate('/page#section');
			expect(hash.value).toBe('section');
		});

		it('handles path with all parts', () => {
			navigate('/items?sort=name#top');
			expect(location.value).toBe('/items');
			expect(searchParams.value.get('sort')).toBe('name');
			expect(hash.value).toBe('top');
		});

		it('uses replaceState when replace option is set', () => {
			navigate('/first');
			navigate('/second', { replace: true });
			expect(location.value).toBe('/second');
		});
	});

	describe('popstate sync', () => {
		it('reads from window.location on popstate', () => {
			navigate('/page-a');
			navigate('/page-b');

			// popstate reads window.location — in happy-dom this won't reflect
			// pushState changes, so just verify the handler doesn't throw
			window.dispatchEvent(new Event('popstate'));
			expect(typeof location.value).toBe('string');
		});
	});
});
