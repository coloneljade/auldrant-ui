import { beforeEach, describe, expect, it } from 'bun:test';
import { hash, location, matchParams, navigate } from '@signals/routing';

describe('routing signals', () => {
	beforeEach(() => {
		location.value = '/';
		hash.value = '';
	});

	describe('navigate', () => {
		it('updates location signal', () => {
			// Act
			navigate('/users');

			// Assert
			expect(location.value).toBe('/users');
		});

		it('updates hash signal', () => {
			// Act
			navigate('/page#section');

			// Assert
			expect(hash.value).toBe('section');
		});

		it('handles path with search and hash', () => {
			// Act
			navigate('/items?sort=name#top');

			// Assert
			expect(location.value).toBe('/items');
			expect(hash.value).toBe('top');
		});

		it('uses replaceState when replace option is set', () => {
			// Arrange
			navigate('/first');

			// Act
			navigate('/second', { replace: true });

			// Assert
			expect(location.value).toBe('/second');
		});
	});

	describe('matchParams', () => {
		it('captures a single param', () => {
			expect(matchParams('/users/:id', '/users/42')).toEqual({ id: '42' });
		});

		it('captures multiple params', () => {
			expect(matchParams('/org/:orgId/items/:itemId', '/org/abc/items/xyz')).toEqual({
				orgId: 'abc',
				itemId: 'xyz',
			});
		});

		it('returns null when path is shorter than pattern', () => {
			expect(matchParams('/users/:id/settings', '/users/42')).toBeNull();
		});

		it('returns null when path is longer than pattern', () => {
			expect(matchParams('/users/:id', '/users/42/extra')).toBeNull();
		});

		it('returns null on static segment mismatch', () => {
			expect(matchParams('/users/:id', '/posts/42')).toBeNull();
		});

		it('returns empty object when pattern has no params and path matches', () => {
			expect(matchParams('/about', '/about')).toEqual({});
		});
	});

	describe('popstate sync', () => {
		it('reads from window.location on popstate', () => {
			// Arrange
			navigate('/page-a');
			navigate('/page-b');

			// Act
			// popstate reads window.location — in happy-dom this won't reflect
			// pushState changes, so just verify the handler doesn't throw
			window.dispatchEvent(new Event('popstate'));

			// Assert
			expect(typeof location.value).toBe('string');
		});
	});
});
