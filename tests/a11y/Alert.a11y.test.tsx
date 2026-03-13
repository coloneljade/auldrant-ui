import { describe, it } from 'bun:test';
import Alert, { AlertVariant } from '@components/Alert';
import { render } from '@testing-library/preact';
import { renderAndCheckA11y } from './setup';

describe('Alert a11y', () => {
	it('has no axe violations (comprehensive render)', async () => {
		// Act & Assert — one baseline covering title, action, and dismiss together
		await renderAndCheckA11y(
			<Alert
				variant={AlertVariant.error}
				title="Submission failed"
				message="Please correct the errors below."
				actionLabel="Review errors"
				onAction={() => {}}
				onDismiss={() => {}}
				dismissLabel="Dismiss"
			/>
		);
	});

	it('WCAG SC 4.1.3: assertive variant exposes role="alert"', () => {
		// Act
		const { getByRole } = render(<Alert variant={AlertVariant.error} message="Error occurred" />);

		// Assert
		getByRole('alert');
	});

	it('WCAG SC 4.1.3: polite variant exposes role="status"', () => {
		// Act
		const { getByRole } = render(<Alert variant={AlertVariant.info} message="Info message" />);

		// Assert
		getByRole('status');
	});

	it('WCAG SC 4.1.2: dismiss button has an accessible name', () => {
		// Act
		const { getByRole } = render(<Alert message="Dismissible" onDismiss={() => {}} />);

		// Assert
		getByRole('button', { name: 'Dismiss' });
	});
});
