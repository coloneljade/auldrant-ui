import { expect } from 'bun:test';
import { render } from '@testing-library/preact';
import axe from 'axe-core';
import type { VNode } from 'preact';

/** Rules disabled because Happy-DOM has no CSS engine. */
const disabledRules = {
	'color-contrast': { enabled: false },
	'target-size': { enabled: false },
};

/** Run axe-core on a container with CSS-dependent rules disabled. */
export async function checkA11y(container: Element) {
	return axe.run(container, { rules: disabledRules });
}

/** Assert that axe found no violations. Formats failures with rule ID, impact, and HTML. */
export function expectNoViolations(results: Awaited<ReturnType<typeof checkA11y>>) {
	const violations = results.violations.map((v) => ({
		rule: v.id,
		impact: v.impact,
		nodes: v.nodes.map((n) => n.html),
	}));
	expect(violations).toEqual([]);
}

/** Render a component, run axe, assert no violations, and return the render result. */
export async function renderAndCheckA11y(vnode: VNode) {
	const result = render(vnode);
	const axeResults = await checkA11y(result.container);
	expectNoViolations(axeResults);
	return result;
}
