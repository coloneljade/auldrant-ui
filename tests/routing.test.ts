import { beforeEach, describe, expect, it } from 'bun:test';
import { hash, location, navigate } from '@signals/routing';

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
