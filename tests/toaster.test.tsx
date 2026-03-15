import { describe, expect, it } from 'bun:test';
import Toaster from '@components/Toaster';
import { toast } from '@signals/toasts';
import { act, fireEvent, render } from '@testing-library/preact';

describe('Toaster', () => {
	it('renders toast messages from the signal', async () => {
		// Arrange
		const message = 'Toaster-render-test';

		// Act
		await act(async () => {
			toast(message);
		});
		const { getByText } = render(<Toaster />);

		// Assert
		getByText(message);
	});

	it('renders a polite live region container', async () => {
		// Arrange
		await act(async () => {
			toast('Live-region-test');
		});

		// Act
		const { container } = render(<Toaster />);
		const region = container.querySelector('[aria-live="polite"]');

		// Assert
		expect(region).not.toBeNull();
		expect(region?.getAttribute('aria-atomic')).toBe('false');
	});

	it('removes toast on dismiss callback', async () => {
		// Arrange
		const message = 'Toaster-dismiss-test';
		await act(async () => {
			toast(message);
		});
		const { queryByText, getAllByRole } = render(<Toaster />);
		expect(queryByText(message)).not.toBeNull();

		// Find the status element containing our specific message
		const statuses = getAllByRole('status');
		const target = statuses.find((el) => el.textContent?.includes(message)) as HTMLElement;
		expect(target).toBeDefined();

		// Act — click dismiss then fire animationEnd to trigger onDismiss
		const dismissBtn = target.querySelector('button[aria-label="Dismiss"]') as HTMLElement;
		await act(async () => {
			fireEvent.click(dismissBtn);
			fireEvent.animationEnd(target);
		});

		// Assert
		expect(queryByText(message)).toBeNull();
	});
});
