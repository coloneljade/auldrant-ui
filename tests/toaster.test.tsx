import { afterEach, describe, expect, it } from 'bun:test';
import Toaster from '@components/Toaster';
import { toast, toasts } from '@signals/toasts';
import { act, fireEvent, render } from '@testing-library/preact';

describe('Toaster', () => {
	// Module-level signal leaks between tests unless explicitly reset.
	afterEach(() => {
		toasts.value = [];
	});

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

	it('wrapper is the persistent polite live region', async () => {
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

	it('wrapper is mounted even when the toast queue is empty', () => {
		// Act — render with no toasts queued
		const { container } = render(<Toaster />);

		// Assert — wrapper exists so subsequent toasts insert into a pre-existing live region
		const region = container.querySelector('[aria-live="polite"]');
		expect(region).not.toBeNull();
		expect(region?.children.length).toBe(0);
	});

	it('removes toast on dismiss callback', async () => {
		// Arrange
		const message = 'Toaster-dismiss-test';
		await act(async () => {
			toast(message);
		});
		const { queryByText, getByRole, container } = render(<Toaster />);
		expect(queryByText(message)).not.toBeNull();

		// The toast is the first child of the aria-live wrapper
		const region = container.querySelector('[aria-live="polite"]') as HTMLElement;
		const target = region.firstElementChild as HTMLElement;

		// Act — click dismiss then fire animationEnd to trigger onDismiss
		const dismissBtn = getByRole('button', { name: 'Dismiss' });
		await act(async () => {
			fireEvent.click(dismissBtn);
			fireEvent.animationEnd(target);
		});

		// Assert
		expect(queryByText(message)).toBeNull();
	});
});
