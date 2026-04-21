import { describe, expect, it, mock } from 'bun:test';
import Toast from '@components/Toast';
import { act, fireEvent, render } from '@testing-library/preact';

describe('Toast', () => {
	describe('content', () => {
		it('renders the message text', () => {
			const { getByText } = render(<Toast message="Hello world" onDismiss={() => {}} />);
			getByText('Hello world');
		});

		it('renders the title when provided', () => {
			const { getByText } = render(
				<Toast message="Body text" title="Toast heading" onDismiss={() => {}} />
			);
			getByText('Toast heading');
		});

		it('does not render a title element when title is absent', () => {
			const { queryByText } = render(<Toast message="Body" onDismiss={() => {}} />);
			expect(queryByText('Toast heading')).toBeNull();
		});
	});

	describe('dismiss button', () => {
		it('renders a dismiss button with the default accessible label', () => {
			const { getByRole } = render(<Toast message="Test" onDismiss={() => {}} />);
			getByRole('button', { name: 'Dismiss' });
		});

		it('renders the dismiss button with a custom label', () => {
			const { getByRole } = render(
				<Toast message="Test" onDismiss={() => {}} dismissLabel="Close notification" />
			);
			getByRole('button', { name: 'Close notification' });
		});

		it('clicking dismiss starts exit animation then calls onDismiss', () => {
			const onDismiss = mock(() => {});
			const { getByRole, container } = render(<Toast message="Test" onDismiss={onDismiss} />);

			fireEvent.click(getByRole('button', { name: 'Dismiss' }));
			fireEvent.animationEnd(container.firstElementChild as HTMLElement);

			expect(onDismiss).toHaveBeenCalledTimes(1);
		});
	});

	// Bun 1.3.x has no mock.timers API. We replace global.setTimeout with a stub
	// that captures the callback and delay, then manually invoke it. try/finally
	// ensures a failed assertion doesn't leak stubbed globals into other tests.
	describe('auto-dismiss timer', () => {
		it('calls onDismiss after the specified duration', () => {
			let capturedCallback: (() => void) | null = null;
			let capturedDelay: number | null = null;
			const origSetTimeout = global.setTimeout;
			global.setTimeout = ((fn: () => void, delay: number) => {
				capturedCallback = fn;
				capturedDelay = delay;
				return 0;
			}) as unknown as typeof setTimeout;

			try {
				const onDismiss = mock(() => {});
				const { container } = render(
					<Toast message="Auto-dismiss" duration={3000} onDismiss={onDismiss} />
				);

				expect(capturedDelay).toBe(3000);
				act(() => {
					capturedCallback?.();
				});
				fireEvent.animationEnd(container.firstElementChild as HTMLElement);

				expect(onDismiss).toHaveBeenCalledTimes(1);
			} finally {
				global.setTimeout = origSetTimeout;
			}
		});

		it('pauses timer on mouse enter and resumes on mouse leave', () => {
			const timeouts: { fn: () => void; delay: number }[] = [];
			const origSetTimeout = global.setTimeout;
			const origClearTimeout = global.clearTimeout;
			global.setTimeout = ((fn: () => void, delay: number) => {
				timeouts.push({ fn, delay });
				return timeouts.length - 1;
			}) as unknown as typeof setTimeout;
			global.clearTimeout = ((_handle: unknown) => {}) as unknown as typeof clearTimeout;

			try {
				const { container } = render(
					<Toast message="Hover pause" duration={5000} onDismiss={() => {}} />
				);

				// Timer started — one timeout queued
				expect(timeouts.length).toBe(1);

				// Hover pauses (clearTimeout called), leave resumes (new setTimeout queued)
				fireEvent.mouseEnter(container.firstElementChild as HTMLElement);
				fireEvent.mouseLeave(container.firstElementChild as HTMLElement);

				// A new timeout should have been queued for the resumed timer
				expect(timeouts.length).toBe(2);
				// Resumed delay should be <= original duration (remaining time)
				expect(timeouts[1]?.delay).toBeLessThanOrEqual(5000);
			} finally {
				global.setTimeout = origSetTimeout;
				global.clearTimeout = origClearTimeout;
			}
		});
	});

	describe('class forwarding', () => {
		it('forwards the class prop to the root element', () => {
			const { container } = render(
				<Toast message="Styled" onDismiss={() => {}} class="custom-class" />
			);
			expect(container.firstElementChild?.classList.contains('custom-class')).toBe(true);
		});
	});
});
