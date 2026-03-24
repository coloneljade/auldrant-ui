import Dialog from '@components/Dialog';
import Modal from '@components/Modal';
import { dismiss, queue } from '@signals/dialogs';
import type { FunctionComponent } from 'preact';

/**
 * Renders the global dialog queue. Mount once in the app root, inside `<Theme>`.
 * Call `confirm()` or `dialog()` from anywhere to show a dialog.
 *
 * @example
 * ```tsx
 * // App root
 * <Theme>
 *   <App />
 *   <Toaster />
 *   <DialogHost />
 * </Theme>
 *
 * // Anywhere in the app
 * import { confirm } from '@auldrant/ui';
 * const ok = await confirm({ title: 'Sure?' });
 * ```
 */
const DialogHost: FunctionComponent = () => {
	const entry = queue.value[0];

	if (!entry) {
		return null;
	}

	const { modal, content } = entry;

	if (modal) {
		return (
			<Modal
				open
				title={entry.title}
				message={entry.message}
				defaultAction={entry.defaultAction}
				actions={entry.actions}
				cancelLabel={entry.cancelLabel}
				focusCancel={entry.focusCancel}
				onCancel={() => dismiss(null)}
			>
				{content}
			</Modal>
		);
	}

	return (
		<Dialog
			open
			title={entry.title}
			message={entry.message}
			defaultAction={entry.defaultAction}
			actions={entry.actions}
			onClose={() => dismiss(null)}
		>
			{content}
		</Dialog>
	);
};

export default DialogHost;
