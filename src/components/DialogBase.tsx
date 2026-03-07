import type { IBaseProps } from '@scripts/types';
import useDraggable from '@scripts/useDraggable';
import { cx } from '@scripts/utils';
import styles from '@styles/Dialog.module.css';
import { X } from 'lucide-preact';
import type { ComponentChildren, FunctionComponent } from 'preact';
import { useEffect, useId, useRef } from 'preact/hooks';

/** Action button metadata. All fields required to enforce a11y-complete definitions. */
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

/** Props for {@link DialogBase}. */
interface IDialogBaseProps extends IBaseProps {
	/** Whether the dialog is open. */
	open: boolean;
	/** Dialog heading text. Rendered as h2, linked via aria-labelledby. */
	title: string;
	/** Whether this is an alert dialog (role="alertdialog"). */
	alert?: boolean;
	/** Whether the dialog can be dragged by its header. */
	draggable?: boolean;
	/** Called when the dialog is dismissed via Escape. */
	onDismiss: () => void;
	/** Called when the backdrop is clicked. Only Dialog wires this. */
	onBackdropClick?: (() => void) | undefined;
	/** Simple text content. Rendered as a paragraph. */
	message?: string | undefined;
	/** Primary action button. Auto-focused on open (unless focusCancel). */
	defaultAction?: IDialogAction | undefined;
	/** Additional action buttons. */
	actions?: IDialogAction[] | undefined;
	/** Cancel button label. Only used when onCancel is provided. */
	cancelLabel?: string | undefined;
	/** Cancel handler. When provided, renders a Cancel button. */
	onCancel?: (() => void) | undefined;
	/** Focus the Cancel button on open instead of defaultAction. */
	focusCancel?: boolean | undefined;
	/** Rich body content. Renders below message if both provided. */
	children?: ComponentChildren;
}

const defaults = {
	cancel: 'Cancel',
	cancelDescription: 'Dismiss this dialog',
	closeDescription: 'Close this dialog',
};

interface IParsedShortcut {
	key: string;
	ctrl: boolean;
	shift: boolean;
	alt: boolean;
}

function parseShortcut(shortcut: string): IParsedShortcut {
	const parts = shortcut.split('+');
	const key = parts.at(-1) ?? '';
	const mods = parts.slice(0, -1).map((m) => m.toLowerCase());
	return {
		key: key.toLowerCase(),
		ctrl: mods.includes('ctrl'),
		shift: mods.includes('shift'),
		alt: mods.includes('alt'),
	};
}

function formatHint(shortcut: string): string {
	return `(${shortcut})`;
}

/** Shared dialog/modal base. Not exported from the library. */
const DialogBase: FunctionComponent<IDialogBaseProps> = (props) => {
	const {
		open,
		title,
		alert,
		draggable,
		onDismiss,
		onBackdropClick,
		message,
		defaultAction,
		actions,
		cancelLabel,
		onCancel,
		focusCancel,
		children,
		class: className,
	} = props;

	const dialogRef = useRef<HTMLDialogElement>(null);
	const headerRef = useRef<HTMLElement>(null);
	const defaultButtonRef = useRef<HTMLButtonElement>(null);
	const cancelButtonRef = useRef<HTMLButtonElement>(null);
	const headingId = useId();

	const { isDragging, reset } = useDraggable(headerRef, dialogRef, open && !!draggable);

	// Sync open state with native dialog
	useEffect(() => {
		const dialog = dialogRef.current;
		if (!dialog) {
			return;
		}

		if (open && !dialog.open) {
			dialog.showModal();
			if (focusCancel && cancelButtonRef.current) {
				cancelButtonRef.current.focus();
			} else if (defaultButtonRef.current) {
				defaultButtonRef.current.focus();
			}
		} else if (!open && dialog.open) {
			dialog.close();
			reset();
		}
	}, [open, focusCancel, reset]);

	// Handle native cancel event (Escape key)
	useEffect(() => {
		const dialog = dialogRef.current;
		if (!dialog) {
			return;
		}

		const handleCancel = (e: Event) => {
			e.preventDefault();
			onDismiss();
		};
		dialog.addEventListener('cancel', handleCancel);
		return () => dialog.removeEventListener('cancel', handleCancel);
	}, [onDismiss]);

	// Keyboard shortcuts
	useEffect(() => {
		const dialog = dialogRef.current;
		if (!dialog || !open) {
			return;
		}

		const allActions = [...(actions ?? []), ...(defaultAction ? [defaultAction] : [])];
		if (allActions.length === 0) {
			return;
		}

		const shortcuts = allActions.map((action) => ({
			parsed: parseShortcut(action.shortcut),
			handler: action.onClick,
		}));

		const handleKeydown = (e: KeyboardEvent) => {
			for (const { parsed, handler } of shortcuts) {
				if (
					e.key.toLowerCase() === parsed.key &&
					e.ctrlKey === parsed.ctrl &&
					e.shiftKey === parsed.shift &&
					e.altKey === parsed.alt
				) {
					e.preventDefault();
					handler();
					return;
				}
			}
		};
		dialog.addEventListener('keydown', handleKeydown);
		return () => dialog.removeEventListener('keydown', handleKeydown);
	}, [open, actions, defaultAction]);

	// Backdrop click detection (mouse-only — keyboard uses Escape/cancel event)
	useEffect(() => {
		const dialog = dialogRef.current;
		if (!dialog || !open || !onBackdropClick) {
			return;
		}

		const handleClick = (e: MouseEvent) => {
			if (e.target === dialog) {
				onBackdropClick();
			}
		};
		dialog.addEventListener('click', handleClick);
		return () => dialog.removeEventListener('click', handleClick);
	}, [open, onBackdropClick]);

	const hasFooter = defaultAction || onCancel || (actions && actions.length > 0);

	return (
		<dialog
			ref={dialogRef}
			class={cx(styles.dialog, className)}
			aria-labelledby={headingId}
			role={alert ? 'alertdialog' : undefined}
		>
			<div class={styles.panel}>
				<header
					ref={headerRef}
					class={cx(styles.header, draggable && styles.draggable, isDragging && styles.dragging)}
				>
					<h2 id={headingId} class={styles.title}>
						{title}
					</h2>
					{!alert && (
						<button
							type="button"
							class={styles.close}
							title={defaults.closeDescription}
							onClick={onDismiss}
						>
							<X size="1.5em" aria-hidden="true" />
						</button>
					)}
				</header>
				<div class={styles.body}>
					{message && <p class={styles.message}>{message}</p>}
					{children}
				</div>
				{hasFooter && (
					<footer class={styles.footer}>
						{actions?.map((action) => (
							<button
								key={action.label}
								type="button"
								class={styles.action}
								title={action.description}
								onClick={action.onClick}
							>
								{action.label} {formatHint(action.shortcut)}
							</button>
						))}
						{defaultAction && (
							<button
								ref={defaultButtonRef}
								type="button"
								class={cx(styles.action, styles.primary)}
								title={defaultAction.description}
								onClick={defaultAction.onClick}
							>
								{defaultAction.label} {formatHint(defaultAction.shortcut)}
							</button>
						)}
						{onCancel && (
							<button
								ref={cancelButtonRef}
								type="button"
								class={styles.action}
								title={defaults.cancelDescription}
								onClick={onCancel}
							>
								{cancelLabel ?? defaults.cancel} {formatHint('Esc')}
							</button>
						)}
					</footer>
				)}
			</div>
		</dialog>
	);
};

export default DialogBase;
