import { beforeEach, describe, expect, it } from 'bun:test';
import { page, usePage } from '@scripts/hooks';
import { location } from '@signals/routing';

describe('usePage', () => {
	beforeEach(() => {
		location.value = '/results';
	});

	it('returns undefined at the base URL (no page suffix)', () => {
		expect(usePage()).toBeUndefined();
	});

	it('returns the page number from a valid /page/:n suffix', () => {
		location.value = '/results/page/3';
		expect(usePage()).toBe(3);
	});

	it('returns the page number for page 1 suffix', () => {
		location.value = '/results/page/1';
		expect(usePage()).toBe(1);
	});

	it('returns undefined for non-numeric /page/ suffix', () => {
		location.value = '/results/page/abc';
		expect(usePage()).toBeUndefined();
	});

	it('returns undefined for partially-numeric /page/ suffix', () => {
		// parseInt would parse '5abc' as 5 without strict validation
		location.value = '/results/page/5abc';
		expect(usePage()).toBeUndefined();
	});

	it('returns undefined for /page/0', () => {
		location.value = '/results/page/0';
		expect(usePage()).toBeUndefined();
	});

	it('uses lastIndexOf — picks up rightmost /page/ segment', () => {
		location.value = '/results/page/2/page/5';
		expect(usePage()).toBe(5);
	});
});

describe('page (signal factory)', () => {
	beforeEach(() => {
		location.value = '/results';
	});

	it('returns a signal with undefined at base URL', () => {
		const sig = page();
		expect(sig.value).toBeUndefined();
	});

	it('returns a signal with the current page number', () => {
		location.value = '/results/page/7';
		const sig = page();
		expect(sig.value).toBe(7);
	});

	it('signal updates reactively when location changes', () => {
		const sig = page();
		expect(sig.value).toBeUndefined();

		location.value = '/results/page/4';
		expect(sig.value).toBe(4);

		location.value = '/results';
		expect(sig.value).toBeUndefined();
	});
});
