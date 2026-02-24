/** Combine CSS class names, filtering out falsy values. */
export function cx(...classes: ReadonlyArray<string | false | null | undefined>): string {
	return classes.filter(Boolean).join(' ');
}
