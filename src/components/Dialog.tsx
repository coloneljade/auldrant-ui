import DialogBase from '@internal/DialogBase';
import type { IBaseProps, IDialogAction } from '@internal/types';
import type { ComponentChildren, FunctionComponent } from 'preact';

/** Props for {@link Dialog}. */
interface IDialogProps extends IBaseProps {
	/** Whether the dialog is open. */
	open: boolean;
	/** Dialog heading text. Rendered as h2, linked via aria-labelledby. */
	title: string;
	/** Called when the dialog is dismissed (Escape, backdrop click, or X button). */
	onClose: () => void;
	/** Simple text content. Rendered as a paragraph. */
	message?: string;
	/** Primary action button. Auto-focused on open. */
	defaultAction?: IDialogAction;
	/** Additional action buttons. */
	actions?: IDialogAction[];
	/** Whether the dialog can be dragged by its header. Defaults to true. */
	draggable?: boolean;
	/** Rich body content. Renders below message if both provided. */
	children?: ComponentChildren;
}

/**
 * Dismissible dialog using native `<dialog>`.
 * Escape, backdrop click, and X button all call `onClose`.
 */
const Dialog: FunctionComponent<IDialogProps> = (props) => {
	const {
		open,
		title,
		onClose,
		message,
		defaultAction,
		actions,
		draggable = true,
		children,
		class: className,
	} = props;

	return (
		<DialogBase
			open={open}
			title={title}
			draggable={draggable}
			onDismiss={onClose}
			onBackdropClick={onClose}
			message={message}
			defaultAction={defaultAction}
			actions={actions}
			class={className}
		>
			{children}
		</DialogBase>
	);
};

export default Dialog;
