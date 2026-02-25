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
