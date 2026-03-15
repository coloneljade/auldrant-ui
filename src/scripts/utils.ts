import type { ComponentChildren, VNode } from 'preact';
import { Fragment, isValidElement, toChildArray } from 'preact';

/**
 * Flattens ComponentChildren into a list of VNodes.
 * Preact's toChildArray leaves Fragments intact — this recurses into them.
 */
export function flattenChildren(children: ComponentChildren): VNode<object>[] {
	const out: VNode<object>[] = [];
	for (const child of toChildArray(children)) {
		if (!isValidElement(child)) {
			continue;
		}
		if (child.type === Fragment) {
			const { children: nested } = child.props as { children?: ComponentChildren };
			out.push(...flattenChildren(nested));
		} else {
			out.push(child);
		}
	}
	return out;
}

/**
 * Combine CSS class names, filtering out falsy values.
 *
 * The type accepts `false` and `undefined` because those are the two falsy
 * values that naturally appear when building class lists:
 *
 * - **`false`** — from the `&&` short-circuit pattern:
 *   ```ts
 *   cx(styles.button, isActive && styles.active)
 *   //                 ^^^^^^^^^^^^^^^^^^^^^^^^^ → string | false
 *   ```
 *
 * - **`undefined`** — from optional props like `class?`:
 *   ```ts
 *   cx(styles.card, className)
 *   //              ^^^^^^^^^ → string | undefined
 *   ```
 *
 * @example
 * // Static classes
 * cx(styles.button, styles.primary)  // "btn_x1 primary_x2"
 *
 * @example
 * // Conditional class via &&
 * cx(styles.button, disabled && styles.disabled)
 *
 * @example
 * // Forwarding an optional class prop
 * cx(styles.card, props.class)
 *
 * @param classes - Class names to combine. `false` and `undefined` values are
 *   filtered out; only truthy strings are joined.
 * @returns Space-separated class string, or empty string if no truthy values.
 */
export function cx(...classes: (string | false | undefined)[]): string {
	return classes.filter(Boolean).join(' ');
}

/**
 * Compose `aria-describedby` from a list of element IDs, filtering falsy values.
 *
 * Returns `undefined` when no truthy IDs remain — this keeps the attribute off the
 * element entirely rather than rendering an empty string.
 *
 * @example
 * // Single description
 * describeBy(error && errorId)              // "field-error" | undefined
 *
 * @example
 * // Multiple descriptions
 * describeBy(error && errorId, counterId)   // "field-error counter" | undefined
 *
 * @param ids - IDs to compose. `false` and `undefined` values are filtered out.
 * @returns Space-separated ID string, or `undefined` if empty.
 */
export function describeBy(...ids: (string | false | undefined)[]): string | undefined {
	const result = ids.filter(Boolean).join(' ');
	return result || undefined;
}
