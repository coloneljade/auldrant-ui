import type { IDialogAction } from '@components/DialogBase';
import DialogBase from '@components/DialogBase';
import type { IBaseProps } from '@scripts/types';
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
		children,
		class: className,
	} = props;

	return (
		<DialogBase
			open={open}
			title={title}
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
