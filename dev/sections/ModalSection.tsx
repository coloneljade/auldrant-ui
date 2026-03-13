import Button from '@components/Button';
import Modal from '@components/Modal';
import { useSignal } from '@preact/signals';
import type { FunctionComponent } from 'preact';

export const ModalSection: FunctionComponent = () => {
	const confirmOpen = useSignal(false);
	const destructiveOpen = useSignal(false);

	return (
		<div class="dev-section">
			<h2>Modal</h2>
			<div class="dev-row">
				<Button label="Open Modal" onClick={() => (confirmOpen.value = true)} />
				<Button label="Destructive Modal" onClick={() => (destructiveOpen.value = true)} />
			</div>
			<Modal
				open={confirmOpen.value}
				title="Confirm Action"
				message="Are you sure you want to proceed? This action requires confirmation."
				onCancel={() => (confirmOpen.value = false)}
				defaultAction={{
					label: 'Confirm',
					description: 'Confirm this action',
					onClick: () => (confirmOpen.value = false),
					shortcut: 'Enter',
				}}
			/>
			<Modal
				open={destructiveOpen.value}
				title="Delete Item"
				message="This will permanently delete the item. This cannot be undone."
				onCancel={() => (destructiveOpen.value = false)}
				focusCancel
				defaultAction={{
					label: 'Delete',
					description: 'Permanently delete this item',
					onClick: () => (destructiveOpen.value = false),
					shortcut: 'd',
				}}
			/>
		</div>
	);
};
