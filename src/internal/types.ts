/** Base props shared by all components. */
export interface IBaseProps {
	/** CSS class name for custom styling. Accepts `undefined` for prop forwarding. */
	class?: string | undefined;
}

/** Props for form field components that render a label. */
export interface IFieldProps extends IBaseProps {
	/** Visible label text for the field. */
	label: string;
	/** Field name attribute for form submission. */
	name: string;
	/** Whether the field is required. Adds a visual asterisk to the label. */
	required?: boolean;
	/** Whether the field is disabled. */
	disabled?: boolean;
	/** Error message. When set, renders an error message and marks the field as invalid. */
	error?: string;
}
