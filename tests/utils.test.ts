import { describe, expect, it } from 'bun:test';
import { cx } from '@components/utils';

describe('cx', () => {
	it('joins class names with a space', () => {
		expect(cx('a', 'b', 'c')).toBe('a b c');
	});

	it('filters out falsy values', () => {
		expect(cx('a', false, null, undefined, 'b')).toBe('a b');
	});

	it('returns an empty string when all values are falsy', () => {
		expect(cx(false, null, undefined)).toBe('');
	});

	it('returns a single class without extra spaces', () => {
		expect(cx('only')).toBe('only');
	});
});
