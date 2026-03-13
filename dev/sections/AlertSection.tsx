import Alert, { AlertVariant } from '@components/Alert';
import Button from '@components/Button';
import { useSignal } from '@preact/signals';
import type { FunctionComponent } from 'preact';

export const AlertSection: FunctionComponent = () => {
	const withTitle = useSignal(false);
	const withAction = useSignal(false);
	const dismissible = useSignal(false);
	const autoDismiss = useSignal(false);

	return (
		<div class="dev-section">
			<h2>Alert</h2>
			<h3>Variants</h3>
			<div class="dev-stack">
				<Alert variant={AlertVariant.info} message="This is an informational message." />
				<Alert variant={AlertVariant.success} message="Your changes have been saved." />
				<Alert variant={AlertVariant.warning} message="Your session will expire in 5 minutes." />
				<Alert variant={AlertVariant.error} message="Something went wrong. Please try again." />
			</div>
			<h3>Interactive demos</h3>
			<div class="dev-row">
				<Button label="With title" onClick={() => (withTitle.value = true)} />
				<Button label="With action link" onClick={() => (withAction.value = true)} />
				<Button label="Dismissible" onClick={() => (dismissible.value = true)} />
				<Button label="Auto-dismiss (3s)" onClick={() => (autoDismiss.value = true)} />
			</div>
			<div class="dev-stack" style="margin-top: 0.75em;">
				{withTitle.value && (
					<Alert
						variant={AlertVariant.info}
						title="With title"
						message="This alert has an optional heading above the message."
						onDismiss={() => (withTitle.value = false)}
					/>
				)}
				{withAction.value && (
					<Alert
						variant={AlertVariant.warning}
						title="Action required"
						message="Your payment method is expiring soon."
						actionLabel="Update payment"
						actionHref="/billing"
						onDismiss={() => (withAction.value = false)}
					/>
				)}
				{dismissible.value && (
					<Alert
						variant={AlertVariant.success}
						message="This alert can be dismissed using the button."
						onDismiss={() => (dismissible.value = false)}
					/>
				)}
				{autoDismiss.value && (
					<Alert
						variant={AlertVariant.info}
						message="This alert auto-dismisses after 3 seconds."
						duration={3000}
						onDismiss={() => (autoDismiss.value = false)}
					/>
				)}
			</div>
		</div>
	);
};
