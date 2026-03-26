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
