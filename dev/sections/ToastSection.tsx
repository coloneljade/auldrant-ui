import Button from '@components/Button';
import { ToastVariant } from '@components/Toast';
import { toast } from '@signals/toasts';
import type { FunctionComponent } from 'preact';

export const ToastSection: FunctionComponent = () => (
	<div class="dev-section">
		<h2>Toast</h2>
		<h3>Variants</h3>
		<div class="dev-row">
			<Button
				label="Info"
				onClick={() =>
					toast('Your session will expire in 5 minutes.', { variant: ToastVariant.info })
				}
			/>
			<Button
				label="Success"
				onClick={() => toast('Your changes have been saved.', { variant: ToastVariant.success })}
			/>
			<Button
				label="Warning"
				onClick={() => toast('Disk space is running low.', { variant: ToastVariant.warning })}
			/>
			<Button
				label="Error"
				onClick={() => toast('Failed to connect to the server.', { variant: ToastVariant.error })}
			/>
		</div>
		<h3>With title</h3>
		<div class="dev-row">
			<Button
				label="With title"
				onClick={() =>
					toast('Your payment method is expiring soon.', {
						variant: ToastVariant.warning,
						title: 'Action required',
					})
				}
			/>
			<Button
				label="Short duration (2s)"
				onClick={() =>
					toast('This dismisses after 2 seconds.', {
						variant: ToastVariant.info,
						duration: 2000,
					})
				}
			/>
			<Button
				label="Stack three"
				onClick={() => {
					toast('First notification.', { variant: ToastVariant.info });
					toast('Second notification.', { variant: ToastVariant.success });
					toast('Third notification.', { variant: ToastVariant.warning });
				}}
			/>
		</div>
	</div>
);
