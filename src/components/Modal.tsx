import type { IDialogAction } from '@components/DialogBase';
import DialogBase from '@components/DialogBase';
import type { IBaseProps } from '@scripts/types';
import type { ComponentChildren, FunctionComponent } from 'preact';

/** Props for {@link Modal}. */
interface IModalProps extends IBaseProps {
	/** Whether the modal is open. */
	open: boolean;
	/** Modal heading text. Rendered as h2, linked via aria-labelledby. */
	title: string;
	/** Called when the user cancels (Escape key or Cancel button). */
	onCancel: () => void;
	/** Cancel button label. Defaults to "Cancel". */
	cancelLabel?: string;
	/** Simple text content. Rendered as a paragraph. */
	message?: string;
	/** Primary action button (required). Auto-focused on open (unless focusCancel). */
	defaultAction: IDialogAction;
	/** Additional action buttons beyond the default. */
	actions?: IDialogAction[];
	/** Focus the Cancel button on open instead of defaultAction.
	 *  Use for destructive/dangerous actions to prevent accidental confirmation. */
	focusCancel?: boolean;
	/** Whether the modal can be dragged by its header. Defaults to false. */
	draggable?: boolean;
	/** Rich body content. Renders below message if both provided. */
	children?: ComponentChildren;
}

/**
 * Action-required modal using native `<dialog>` with `role="alertdialog"`.
 * Escape maps to Cancel. Backdrop does not dismiss.
 */
const Modal: FunctionComponent<IModalProps> = (props) => {
	const {
		open,
		title,
		onCancel,
		cancelLabel,
		message,
		defaultAction,
		actions,
		focusCancel,
		draggable = false,
		children,
		class: className,
	} = props;

	return (
		<DialogBase
			open={open}
			title={title}
			alert
			draggable={draggable}
			onDismiss={onCancel}
			onCancel={onCancel}
			cancelLabel={cancelLabel}
			message={message}
			defaultAction={defaultAction}
			actions={actions}
			focusCancel={focusCancel}
			class={className}
		>
			{children}
		</DialogBase>
	);
};

export default Modal;
