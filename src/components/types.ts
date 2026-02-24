import type { ComponentChildren } from 'preact';

/** Base props shared by all components. */
export interface BaseProps {
	class?: string;
	children?: ComponentChildren;
}

/** Props for form field components that render a label. */
export interface FieldProps extends BaseProps {
	/** Visible label text for the field. */
	label: string;
	/** Whether the field is required. Adds a visual asterisk to the label. */
	required?: boolean;
	/** Whether the field is disabled. */
	disabled?: boolean;
	/** Accessible name override (rarely needed — label is used by default). */
	name?: string;
}
