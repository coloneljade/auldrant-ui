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

/** Preset palette class names for `<Theme class={Palette.blue}>`. */
export enum Palette {
	blue = 'aui-blue',
	purple = 'aui-purple',
	teal = 'aui-teal',
	red = 'aui-red',
	orange = 'aui-orange',
	yellow = 'aui-yellow',
}

/** Severity variants for Toast and Alert. Controls color and leading icon. */
export enum ToastVariant {
	info = 'info',
	success = 'success',
	warning = 'warning',
	error = 'error',
}

/** Action button metadata for Dialog/Modal. All fields required to enforce a11y-complete definitions. */
export interface IDialogAction {
	/** Button label text. */
	label: string;
	/** Accessible description. Rendered as native `title` tooltip. */
	description: string;
	/** Click handler. */
	onClick: () => void;
	/** Keyboard shortcut string. Single key ('d') or combo ('Shift+D', 'Ctrl+Enter').
	 *  Parsed internally and wired to a keydown listener while the dialog is open.
	 *  Displayed visually on the button as a hint. */
	shortcut: string;
}
