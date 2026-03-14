import { describe, it } from 'bun:test';
import Toast, { ToastVariant } from '@components/Toast';
import { render } from '@testing-library/preact';
import { renderAndCheckA11y } from './setup';

describe('Toast a11y', () => {
	it('has no axe violations (comprehensive render)', async () => {
		await renderAndCheckA11y(
			<Toast
				variant={ToastVariant.error}
				title="Payment failed"
				message="Your card was declined."
				dismissLabel="Dismiss notification"
				onDismiss={() => {}}
			/>
		);
	});

	it('WCAG SC 4.1.3: all variants use role="status" (polite)', () => {
		for (const variant of Object.values(ToastVariant)) {
			const { getByRole, unmount } = render(
				<Toast variant={variant} message={`${variant} toast`} onDismiss={() => {}} />
			);
			getByRole('status');
			unmount();
		}
	});

	it('WCAG SC 4.1.2: dismiss button has an accessible name', () => {
		const { getByRole } = render(<Toast message="Test" onDismiss={() => {}} />);
		getByRole('button', { name: 'Dismiss' });
	});

	it('WCAG SC 4.1.2: custom dismissLabel is exposed as accessible name', () => {
		const { getByRole } = render(
			<Toast message="Test" dismissLabel="Close alert" onDismiss={() => {}} />
		);
		getByRole('button', { name: 'Close alert' });
	});
});
