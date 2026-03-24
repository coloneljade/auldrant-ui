import Button from '@components/Button';
import { confirm, dialog } from '@signals/dialogs';
import { toast } from '@signals/toasts';
import type { FunctionComponent } from 'preact';

export const DialogHostSection: FunctionComponent = () => (
	<div class="dev-section">
		<h2>DialogHost</h2>
		<h3>Confirm</h3>
		<div class="dev-row">
			<Button
				label="Confirm"
				onClick={async () => {
					const ok = await confirm({
						title: 'Save changes?',
						message: 'Your unsaved changes will be saved to the server.',
					});
					toast(ok ? 'Confirmed.' : 'Cancelled.');
				}}
			/>
			<Button
				label="Destructive confirm"
				onClick={async () => {
					const ok = await confirm({
						title: 'Delete item?',
						message: 'This will permanently remove the item. This cannot be undone.',
						actionLabel: 'Delete',
						actionShortcut: 'd',
						focusCancel: true,
					});
					toast(ok ? 'Deleted.' : 'Cancelled.');
				}}
			/>
		</div>
		<h3>Dialog</h3>
		<div class="dev-row">
			<Button
				label="Multi-action dialog"
				onClick={async () => {
					const choice = await dialog({
						title: 'Unsaved changes',
						message: 'You have unsaved changes. What would you like to do?',
						defaultAction: { label: 'Save', shortcut: 'Enter' },
						actions: [{ label: 'Discard', shortcut: 'd' }],
					});
					toast(choice ? `Chose: ${choice}` : 'Dismissed.');
				}}
			/>
		</div>
	</div>
);
