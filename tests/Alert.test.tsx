import { describe, expect, it, mock } from 'bun:test';
import Alert, { AlertVariant } from '@components/Alert';
import { act, fireEvent, render } from '@testing-library/preact';

describe('Alert', () => {
	describe('ARIA role', () => {
		it('renders role="status" for the default (info) variant', () => {
			// Act
			const { getByRole } = render(<Alert message="Info message" />);

			// Assert
			getByRole('status');
		});

		it('renders role="alert" for the error variant', () => {
			// Act
			const { getByRole } = render(<Alert variant={AlertVariant.error} message="Error occurred" />);

			// Assert
			getByRole('alert');
		});

		it('renders role="alert" for the warning variant', () => {
			// Act
			const { getByRole } = render(<Alert variant={AlertVariant.warning} message="Warning" />);

			// Assert
			getByRole('alert');
		});

		it('renders role="status" for the success variant', () => {
			// Act
			const { getByRole } = render(<Alert variant={AlertVariant.success} message="Done" />);

			// Assert
			getByRole('status');
		});
	});

	describe('content', () => {
		it('renders the message text', () => {
			// Act
			const { getByText } = render(<Alert message="Hello world" />);

			// Assert
			getByText('Hello world');
		});

		it('renders the title when provided', () => {
			// Act
			const { getByText } = render(<Alert message="Body text" title="Alert heading" />);

			// Assert
			getByText('Alert heading');
		});

		it('does not render a title element when title is absent', () => {
			// Act
			const { queryByText } = render(<Alert message="Body" />);

			// Assert
			expect(queryByText('Alert heading')).toBeNull();
		});
	});

	describe('dismiss button', () => {
		it('does not render a dismiss button when onDismiss is absent', () => {
			// Act
			const { queryByRole } = render(<Alert message="No dismiss" />);

			// Assert
			expect(queryByRole('button', { name: 'Dismiss' })).toBeNull();
		});

		it('renders a dismiss button with the default label when onDismiss is provided', () => {
			// Act
			const { getByRole } = render(<Alert message="Dismissible" onDismiss={() => {}} />);

			// Assert
			getByRole('button', { name: 'Dismiss' });
		});

		it('renders the dismiss button with a custom label', () => {
			// Act
			const { getByRole } = render(
				<Alert message="Dismissible" onDismiss={() => {}} dismissLabel="Close" />
			);

			// Assert
			getByRole('button', { name: 'Close' });
		});

		it('calls onDismiss when the dismiss button is clicked', () => {
			// Arrange
			const onDismiss = mock(() => {});
			const { getByRole, container } = render(
				<Alert message="Dismissible" onDismiss={onDismiss} />
			);

			// Act — click starts the fade-out animation; animationend fires onDismiss
			fireEvent.click(getByRole('button', { name: 'Dismiss' }));
			fireEvent.animationEnd(container.firstElementChild as HTMLElement);

			// Assert
			expect(onDismiss).toHaveBeenCalledTimes(1);
		});
	});

	describe('action', () => {
		it('renders the action as a link when actionHref is set', () => {
			// Act
			const { getByRole } = render(
				<Alert message="With action" actionLabel="View details" actionHref="/details" />
			);

			// Assert
			getByRole('link', { name: 'View details' });
		});

		it('renders the action as a button when onAction is set', () => {
			// Act
			const { getByRole } = render(
				<Alert message="With action" actionLabel="Retry" onAction={() => {}} />
			);

			// Assert
			getByRole('button', { name: 'Retry' });
		});

		it('calls onAction when the action button is clicked', () => {
			// Arrange
			const onAction = mock(() => {});
			const { getByRole } = render(
				<Alert message="With action" actionLabel="Retry" onAction={onAction} />
			);

			// Act
			fireEvent.click(getByRole('button', { name: 'Retry' }));

			// Assert
			expect(onAction).toHaveBeenCalledTimes(1);
		});
	});

	// Bun 1.3.x has no mock.timers API. We replace global.setTimeout with a stub
	// that captures the callback and delay, then manually invoke it. The double
	// assertion (as unknown as typeof setTimeout) is needed because setTimeout's
	// return type varies across environments (number, Timer, NodeJS.Timeout).
	describe('auto-dismiss', () => {
		it('calls onDismiss after the specified duration', () => {
			// Arrange — replace setTimeout to capture the scheduled callback
			let capturedCallback: (() => void) | null = null;
			let capturedDelay: number | null = null;
			const origSetTimeout = global.setTimeout;
			global.setTimeout = ((fn: () => void, delay: number) => {
				capturedCallback = fn;
				capturedDelay = delay;
				return 0;
			}) as unknown as typeof setTimeout;

			const onDismiss = mock(() => {});
			const { container } = render(
				<Alert message="Auto-dismiss" duration={3000} onDismiss={onDismiss} />
			);

			// Act — timer fires (starts fade-out); animationend fires onDismiss
			expect(capturedDelay).toBe(3000);
			act(() => {
				capturedCallback?.();
			});
			fireEvent.animationEnd(container.firstElementChild as HTMLElement);

			// Assert
			expect(onDismiss).toHaveBeenCalledTimes(1);

			global.setTimeout = origSetTimeout;
		});

		it('does not call onDismiss when duration is not provided', () => {
			// Arrange — verify no timer is set when duration is absent
			let timerScheduled = false;
			const origSetTimeout = global.setTimeout;
			global.setTimeout = ((_fn: () => void, _delay: number) => {
				timerScheduled = true;
				return 0;
			}) as unknown as typeof setTimeout;

			const onDismiss = mock(() => {});
			render(<Alert message="No auto-dismiss" onDismiss={onDismiss} />);

			// Assert
			expect(timerScheduled).toBe(false);
			expect(onDismiss).not.toHaveBeenCalled();

			global.setTimeout = origSetTimeout;
		});
	});

	describe('class forwarding', () => {
		it('forwards the class prop to the root element', () => {
			// Act
			const { container } = render(<Alert message="Styled" class="custom-class" />);

			// Assert
			expect(container.firstElementChild?.classList.contains('custom-class')).toBe(true);
		});
	});
});
