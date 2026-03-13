import Button from '@components/Button';
import Dialog from '@components/Dialog';
import { useSignal } from '@preact/signals';
import type { FunctionComponent } from 'preact';

export const DialogSection: FunctionComponent = () => {
	const open = useSignal(false);

	return (
		<div class="dev-section">
			<h2>Dialog</h2>
			<Button label="Open Dialog" onClick={() => (open.value = true)} />
			<Dialog
				open={open.value}
				title="Notification"
				message="This is a dismissible dialog. Close it with Escape, the backdrop, or the X button."
				onClose={() => (open.value = false)}
				defaultAction={{
					label: 'Got it',
					description: 'Acknowledge and close',
					onClick: () => (open.value = false),
					shortcut: 'Enter',
				}}
			/>
		</div>
	);
};
