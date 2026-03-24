import type { IDialogAction } from '@internal/DialogBase';
import { signal } from '@preact/signals';
import type { ComponentChildren } from 'preact';

/** Consumer-facing action definition. DialogHost wires `onClick` internally. */
export interface IDialogActionOption {
	/** Button label text. */
	label: string;
	/** Accessible description. Defaults to `label` when omitted. */
	description?: string;
	/** Keyboard shortcut string (e.g. `'Enter'`, `'d'`, `'Shift+D'`). */
	shortcut: string;
}

/** Options for {@link confirm}. */
export interface IConfirmOptions {
	/** Dialog heading. */
	title: string;
	/** Explanatory message shown below the heading. */
	message?: string;
	/** Rich body content. Renders below message if both provided. */
	content?: ComponentChildren;
	/** Primary action button label. Defaults to `'Confirm'`. */
	actionLabel?: string;
	/** Primary action keyboard shortcut. Defaults to `'Enter'`. */
	actionShortcut?: string;
	/** Cancel button label. Defaults to `'Cancel'`. */
	cancelLabel?: string;
	/** Focus Cancel on open instead of the action button. Use for destructive actions. */
	focusCancel?: boolean;
}

/** Options for {@link dialog}. */
export interface IDialogOptions {
	/** Dialog heading. */
	title: string;
	/** Explanatory message shown below the heading. */
	message?: string;
	/** Rich body content. Renders below message if both provided. */
	content?: ComponentChildren;
	/** Primary action button. */
	defaultAction?: IDialogActionOption;
	/** Additional action buttons. */
	actions?: IDialogActionOption[];
}

/** Shared fields for all queue entries. */
interface IDialogEntryBase {
	title: string;
	message?: string;
	content?: ComponentChildren;
	actions?: IDialogAction[];
	resolve: (value: string | null) => void;
}

/** Modal entry (confirm path). defaultAction is always present. */
interface IModalEntry extends IDialogEntryBase {
	modal: true;
	defaultAction: IDialogAction;
	cancelLabel?: string;
	focusCancel?: boolean;
}

/** Dialog entry (dialog path). defaultAction is optional. */
interface IDialogEntry extends IDialogEntryBase {
	modal: false;
	defaultAction?: IDialogAction;
}

type DialogQueueEntry = IModalEntry | IDialogEntry;

/** Internal signal. Not part of the public API — consumed only by DialogHost. */
export const queue = signal<DialogQueueEntry[]>([]);

/** Convert a consumer action option to a full IDialogAction. */
function toAction(opt: IDialogActionOption): IDialogAction {
	return {
		label: opt.label,
		description: opt.description ?? opt.label,
		shortcut: opt.shortcut,
		onClick: () => dismiss(opt.label),
	};
}

/**
 * Resolve the frontmost dialog and remove it from the queue.
 * Exported for use by DialogHost (onClose/onCancel handlers).
 */
export function dismiss(result: string | null): void {
	const current = queue.value[0];
	if (current) {
		current.resolve(result);
		queue.value = queue.value.slice(1);
	}
}

/**
 * Show a confirmation modal and wait for the user's response.
 * Resolves `true` when the action is confirmed, `false` when cancelled.
 *
 * @example
 * ```ts
 * const confirmed = await confirm({
 *   title: 'Delete item?',
 *   message: 'This cannot be undone.',
 *   actionLabel: 'Delete',
 *   focusCancel: true,
 * });
 * if (confirmed) { await deleteItem(); }
 * ```
 */
export function confirm(options: IConfirmOptions): Promise<boolean> {
	const actionLabel = options.actionLabel ?? 'Confirm';
	const actionShortcut = options.actionShortcut ?? 'Enter';

	return new Promise<boolean>((resolve) => {
		const entry: IModalEntry = {
			modal: true,
			title: options.title,
			message: options.message,
			content: options.content,
			cancelLabel: options.cancelLabel,
			focusCancel: options.focusCancel,
			defaultAction: {
				label: actionLabel,
				description: actionLabel,
				shortcut: actionShortcut,
				onClick: () => dismiss(actionLabel),
			},
			resolve: (result) => resolve(result === actionLabel),
		};
		queue.value = [...queue.value, entry];
	});
}

/**
 * Show a dismissible dialog and wait for the user's choice.
 * Resolves with the chosen action's label, or `null` if dismissed.
 *
 * @example
 * ```ts
 * const choice = await dialog({
 *   title: 'Unsaved changes',
 *   message: 'What would you like to do?',
 *   defaultAction: { label: 'Save', shortcut: 'Enter' },
 *   actions: [{ label: 'Discard', shortcut: 'd' }],
 * });
 * if (choice === 'Save') { await save(); }
 * ```
 */
export function dialog(options: IDialogOptions): Promise<string | null> {
	return new Promise<string | null>((resolve) => {
		const entry: IDialogEntry = {
			modal: false,
			title: options.title,
			message: options.message,
			content: options.content,
			defaultAction: options.defaultAction ? toAction(options.defaultAction) : undefined,
			actions: options.actions?.map(toAction),
			resolve,
		};
		queue.value = [...queue.value, entry];
	});
}
