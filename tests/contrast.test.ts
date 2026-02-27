import { describe, expect, it } from 'bun:test';
import { interpolate, parse, wcagContrast } from 'culori';

/*
 * Automated contrast validation for the token derivation system.
 *
 * Replicates color-mix(in oklch, ...) math in TypeScript using culori,
 * then verifies WCAG contrast ratios hold for all derived tokens.
 *
 * Targets:
 *   - Text tokens: AAA (7:1) against background
 *   - Non-text tokens (border, focus-ring): 3:1 per WCAG 1.4.11
 *   - Primary/error/success: AAA (7:1) against background
 *
 * The "low contrast (edge)" pair (#e8e8e8/#2a2a2a) has only 11.71:1
 * inherent contrast vs 15.96:1 for the default. These tests assert
 * AA (4.5:1) for the edge pair — a deliberate documentation of limits.
 */

/** Simulate CSS `color-mix(in oklch, c1 P%, c2)`. */
function colorMix(c1: string, c2: string, pct: number) {
	const a = parse(c1);
	const b = parse(c2);
	if (!a || !b) {
		throw new Error(`Failed to parse: ${c1} or ${c2}`);
	}
	return interpolate([a, b], 'oklch')(1 - pct / 100);
}

/** WCAG 2.x contrast ratio between two CSS color strings. */
function contrast(a: string, b: string) {
	const ca = parse(a);
	const cb = parse(b);
	if (!ca || !cb) {
		throw new Error(`Failed to parse: ${a} or ${b}`);
	}
	return wcagContrast(ca, cb);
}

/** WCAG contrast ratio between a mixed color and a CSS color string. */
function contrastMixed(mixed: ReturnType<ReturnType<typeof interpolate>>, ref: string) {
	const r = parse(ref);
	if (!r) {
		throw new Error(`Failed to parse: ${ref}`);
	}
	return wcagContrast(mixed, r);
}

const AAA = 7;
const AA = 4.5;
const NON_TEXT = 3;

/** Default base tokens matching tokens.css (L=0.78). */
const DEFAULTS = {
	primary: 'oklch(0.78 0.18 160)',
	error: 'oklch(0.78 0.22 27)',
	success: 'oklch(0.78 0.18 145)',
};

/** Blend percentages matching tokens.css. */
const BLEND = {
	textMuted: 82,
	border: 50,
	primaryLight: 33,
	primaryHoverDark: 85,
	primaryHoverLight: 25,
};

/** White/black sample pairs — first 3 are recommended, last is edge case. */
const RECOMMENDED_PAIRS = [
	{ name: 'warm neutral (default)', white: '#f5f5f5', black: '#1a1a1a' },
	{ name: 'slightly darker', white: '#f0f0f0', black: '#222222' },
	{ name: 'high contrast', white: '#fafafa', black: '#111111' },
];

const EDGE_PAIR = {
	name: 'low contrast (edge)',
	white: '#e8e8e8',
	black: '#2a2a2a',
};

/** Primary hues to test — all AAA-verified preset palettes. */
const HUES = [
	{ name: 'green', color: 'oklch(0.78 0.18 160)' },
	{ name: 'blue', color: 'oklch(0.78 0.18 260)' },
	{ name: 'purple', color: 'oklch(0.78 0.18 300)' },
	{ name: 'teal', color: 'oklch(0.78 0.15 195)' },
	{ name: 'red', color: 'oklch(0.78 0.22 27)' },
	{ name: 'orange', color: 'oklch(0.78 0.18 55)' },
	{ name: 'yellow', color: 'oklch(0.78 0.18 95)' },
];

/*
 * Test helper: run the full token suite for a given pair and threshold.
 */
function testDarkMode(pair: { name: string; white: string; black: string }, textThreshold: number) {
	describe(pair.name, () => {
		const fg = pair.white;
		const bg = pair.black;

		it('text meets threshold against background', () => {
			// Act
			const ratio = contrast(fg, bg);

			// Assert
			expect(ratio).toBeGreaterThanOrEqual(textThreshold);
		});

		it(`text-muted (${BLEND.textMuted}% fg) meets threshold against background`, () => {
			// Act
			const muted = colorMix(fg, bg, BLEND.textMuted);
			const ratio = contrastMixed(muted, bg);

			// Assert
			expect(ratio).toBeGreaterThanOrEqual(textThreshold);
		});

		it(`border (${BLEND.border}% bg) meets 3:1 against background`, () => {
			// Act
			const border = colorMix(bg, fg, BLEND.border);
			const ratio = contrastMixed(border, bg);

			// Assert
			expect(ratio).toBeGreaterThanOrEqual(NON_TEXT);
		});

		it('primary meets threshold against background', () => {
			// Act
			const ratio = contrast(DEFAULTS.primary, bg);

			// Assert
			expect(ratio).toBeGreaterThanOrEqual(textThreshold);
		});

		it(`primary-hover (${BLEND.primaryHoverDark}%) meets threshold against background`, () => {
			// Act
			const hover = colorMix(DEFAULTS.primary, fg, BLEND.primaryHoverDark);
			const ratio = contrastMixed(hover, bg);

			// Assert
			expect(ratio).toBeGreaterThanOrEqual(textThreshold);
		});

		it('focus-ring meets 3:1 against background', () => {
			// Act
			const ratio = contrast(DEFAULTS.primary, bg);

			// Assert
			expect(ratio).toBeGreaterThanOrEqual(NON_TEXT);
		});

		it('error meets threshold against background', () => {
			// Act
			const ratio = contrast(DEFAULTS.error, bg);

			// Assert
			expect(ratio).toBeGreaterThanOrEqual(textThreshold);
		});

		it('success meets threshold against background', () => {
			// Act
			const ratio = contrast(DEFAULTS.success, bg);

			// Assert
			expect(ratio).toBeGreaterThanOrEqual(textThreshold);
		});
	});
}

function testLightMode(
	pair: { name: string; white: string; black: string },
	textThreshold: number
) {
	describe(pair.name, () => {
		const fg = pair.black;
		const bg = pair.white;

		it('text meets threshold against background', () => {
			// Act
			const ratio = contrast(fg, bg);

			// Assert
			expect(ratio).toBeGreaterThanOrEqual(textThreshold);
		});

		it(`text-muted (${BLEND.textMuted}% fg) meets threshold against background`, () => {
			// Act
			const muted = colorMix(fg, bg, BLEND.textMuted);
			const ratio = contrastMixed(muted, bg);

			// Assert
			expect(ratio).toBeGreaterThanOrEqual(textThreshold);
		});

		it(`border (${BLEND.border}% bg) meets 3:1 against background`, () => {
			// Act
			const border = colorMix(bg, fg, BLEND.border);
			const ratio = contrastMixed(border, bg);

			// Assert
			expect(ratio).toBeGreaterThanOrEqual(NON_TEXT);
		});

		it(`primary (${BLEND.primaryLight}% base) meets threshold against background`, () => {
			// Act
			const primary = colorMix(DEFAULTS.primary, fg, BLEND.primaryLight);
			const ratio = contrastMixed(primary, bg);

			// Assert
			expect(ratio).toBeGreaterThanOrEqual(textThreshold);
		});

		it(`primary-hover (${BLEND.primaryHoverLight}% base) meets threshold against background`, () => {
			// Act
			const hover = colorMix(DEFAULTS.primary, fg, BLEND.primaryHoverLight);
			const ratio = contrastMixed(hover, bg);

			// Assert
			expect(ratio).toBeGreaterThanOrEqual(textThreshold);
		});

		it(`focus-ring (${BLEND.primaryLight}% base) meets 3:1 against background`, () => {
			// Act
			const ring = colorMix(DEFAULTS.primary, fg, BLEND.primaryLight);
			const ratio = contrastMixed(ring, bg);

			// Assert
			expect(ratio).toBeGreaterThanOrEqual(NON_TEXT);
		});

		it(`error (${BLEND.primaryLight}% base) meets threshold against background`, () => {
			// Act
			const error = colorMix(DEFAULTS.error, fg, BLEND.primaryLight);
			const ratio = contrastMixed(error, bg);

			// Assert
			expect(ratio).toBeGreaterThanOrEqual(textThreshold);
		});

		it(`success (${BLEND.primaryLight}% base) meets threshold against background`, () => {
			// Act
			const success = colorMix(DEFAULTS.success, fg, BLEND.primaryLight);
			const ratio = contrastMixed(success, bg);

			// Assert
			expect(ratio).toBeGreaterThanOrEqual(textThreshold);
		});
	});
}

describe('contrast: dark mode (AAA)', () => {
	for (const pair of RECOMMENDED_PAIRS) {
		testDarkMode(pair, AAA);
	}
});

describe('contrast: dark mode (AA — edge pair)', () => {
	testDarkMode(EDGE_PAIR, AA);
});

describe('contrast: light mode (AAA)', () => {
	for (const pair of RECOMMENDED_PAIRS) {
		testLightMode(pair, AAA);
	}
});

describe('contrast: light mode (AA — edge pair)', () => {
	testLightMode(EDGE_PAIR, AA);
});

describe('contrast: primary hue coverage (all presets × all pairs)', () => {
	for (const pair of RECOMMENDED_PAIRS) {
		describe(pair.name, () => {
			describe('dark mode', () => {
				for (const hue of HUES) {
					it(`${hue.name} meets AAA against dark background`, () => {
						// Act
						const ratio = contrast(hue.color, pair.black);

						// Assert
						expect(ratio).toBeGreaterThanOrEqual(AAA);
					});

					it(`${hue.name} hover (${BLEND.primaryHoverDark}%) meets AAA against dark background`, () => {
						// Act
						const hover = colorMix(hue.color, pair.white, BLEND.primaryHoverDark);
						const ratio = contrastMixed(hover, pair.black);

						// Assert
						expect(ratio).toBeGreaterThanOrEqual(AAA);
					});
				}
			});

			describe('light mode', () => {
				for (const hue of HUES) {
					it(`${hue.name} (${BLEND.primaryLight}% base) meets AAA against light background`, () => {
						// Act
						const primary = colorMix(hue.color, pair.black, BLEND.primaryLight);
						const ratio = contrastMixed(primary, pair.white);

						// Assert
						expect(ratio).toBeGreaterThanOrEqual(AAA);
					});

					it(`${hue.name} hover (${BLEND.primaryHoverLight}%) meets AAA against light background`, () => {
						// Act
						const hover = colorMix(hue.color, pair.black, BLEND.primaryHoverLight);
						const ratio = contrastMixed(hover, pair.white);

						// Assert
						expect(ratio).toBeGreaterThanOrEqual(AAA);
					});
				}
			});
		});
	}
});
