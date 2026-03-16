import { afterEach, beforeEach, describe, expect, it, jest } from 'bun:test';
import Tooltip from '@components/Tooltip';
import { act, fireEvent, render } from '@testing-library/preact';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function renderTooltip(content = 'Tooltip text', delay?: number) {
	return render(
		<Tooltip content={content} delay={delay}>
			<button type="button">Trigger</button>
		</Tooltip>
	);
}

async function hoverIn(element: HTMLElement) {
	await act(async () => {
		fireEvent.mouseEnter(element);
	});
}

async function hoverOut(element: HTMLElement) {
	await act(async () => {
		fireEvent.mouseLeave(element);
	});
}

// ---------------------------------------------------------------------------
// Rendering
// ---------------------------------------------------------------------------

describe('Tooltip', () => {
	describe('rendering', () => {
		it('renders trigger content', () => {
			const { getByRole } = renderTooltip();
			expect(getByRole('button', { name: 'Trigger' })).toBeTruthy();
		});

		it('renders tooltip with role="tooltip"', () => {
			const { getByRole } = renderTooltip();
			expect(getByRole('tooltip', { hidden: true })).toBeTruthy();
		});

		it('injects aria-describedby on trigger pointing to tooltip id', () => {
			const { getByRole } = renderTooltip();
			const button = getByRole('button', { name: 'Trigger' });
			const tooltip = getByRole('tooltip', { hidden: true });
			expect(button.getAttribute('aria-describedby')).toBe(tooltip.id);
		});

		it('tooltip is hidden by default (aria-hidden="true")', () => {
			const { getByRole } = renderTooltip();
			const tooltip = getByRole('tooltip', { hidden: true });
			expect(tooltip.getAttribute('aria-hidden')).toBe('true');
		});

		it('wraps non-element children in a span with aria-describedby', () => {
			const { getByRole, container } = render(<Tooltip content="Tooltip">plain text</Tooltip>);
			const tooltip = getByRole('tooltip', { hidden: true });
			const wrapper = container.querySelector('[aria-describedby]');
			expect(wrapper?.tagName).toBe('SPAN');
			expect(wrapper?.getAttribute('aria-describedby')).toBe(tooltip.id);
		});

		it('forwards class prop to root element', () => {
			const { container } = renderTooltip();
			expect(container.firstElementChild?.tagName).toBe('SPAN');
		});
	});

	// ---------------------------------------------------------------------------
	// Hover
	// ---------------------------------------------------------------------------

	describe('hover (with default 200ms delay)', () => {
		beforeEach(() => {
			jest.useFakeTimers();
		});

		afterEach(() => {
			jest.useRealTimers();
		});

		it('tooltip not shown synchronously on mouseenter', async () => {
			const { container, getByRole } = renderTooltip();
			const wrapper = container.firstElementChild as HTMLElement;

			await hoverIn(wrapper);

			const tooltip = getByRole('tooltip', { hidden: true });
			expect(tooltip.getAttribute('aria-hidden')).toBe('true');
		});

		it('tooltip shown after delay elapses', async () => {
			const { container, getByRole } = renderTooltip();
			const wrapper = container.firstElementChild as HTMLElement;

			await hoverIn(wrapper);

			await act(async () => {
				jest.advanceTimersByTime(200);
			});

			const tooltip = getByRole('tooltip', { hidden: true });
			expect(tooltip.getAttribute('aria-hidden')).toBeNull();
		});

		it('tooltip hidden on mouseleave', async () => {
			const { container, getByRole } = renderTooltip();
			const wrapper = container.firstElementChild as HTMLElement;

			await hoverIn(wrapper);
			await act(async () => {
				jest.advanceTimersByTime(200);
			});

			await hoverOut(wrapper);

			const tooltip = getByRole('tooltip', { hidden: true });
			expect(tooltip.getAttribute('aria-hidden')).toBe('true');
		});

		it('mouseleave before delay fires cancels timer', async () => {
			const { container, getByRole } = renderTooltip();
			const wrapper = container.firstElementChild as HTMLElement;

			await hoverIn(wrapper);
			await hoverOut(wrapper);

			await act(async () => {
				jest.advanceTimersByTime(200);
			});

			// Should still be hidden — timer was cancelled
			const tooltip = getByRole('tooltip', { hidden: true });
			expect(tooltip.getAttribute('aria-hidden')).toBe('true');
		});
	});

	// ---------------------------------------------------------------------------
	// delay=0
	// ---------------------------------------------------------------------------

	describe('delay=0', () => {
		it('tooltip shown synchronously on mouseenter', async () => {
			const { container, getByRole } = render(
				<Tooltip content="Tooltip" delay={0}>
					<button type="button">Trigger</button>
				</Tooltip>
			);
			const wrapper = container.firstElementChild as HTMLElement;

			await hoverIn(wrapper);

			const tooltip = getByRole('tooltip', { hidden: true });
			expect(tooltip.getAttribute('aria-hidden')).toBeNull();
		});
	});

	// ---------------------------------------------------------------------------
	// Focus
	// ---------------------------------------------------------------------------

	describe('focus', () => {
		it('tooltip shown immediately on focusin (no delay)', async () => {
			const { container, getByRole } = renderTooltip();
			const wrapper = container.firstElementChild as HTMLElement;

			await act(async () => {
				fireEvent.focusIn(wrapper);
			});

			const tooltip = getByRole('tooltip', { hidden: true });
			expect(tooltip.getAttribute('aria-hidden')).toBeNull();
		});

		it('tooltip hidden on focusout', async () => {
			const { container, getByRole } = renderTooltip();
			const wrapper = container.firstElementChild as HTMLElement;

			await act(async () => {
				fireEvent.focusIn(wrapper);
			});

			await act(async () => {
				fireEvent.focusOut(wrapper);
			});

			const tooltip = getByRole('tooltip', { hidden: true });
			expect(tooltip.getAttribute('aria-hidden')).toBe('true');
		});
	});

	// ---------------------------------------------------------------------------
	// Escape key
	// ---------------------------------------------------------------------------

	describe('keyboard', () => {
		it('Escape hides a visible tooltip', async () => {
			const { container, getByRole } = renderTooltip();
			const wrapper = container.firstElementChild as HTMLElement;

			// Show via focusin (no timer needed)
			await act(async () => {
				fireEvent.focusIn(wrapper);
			});

			expect(getByRole('tooltip', { hidden: true }).getAttribute('aria-hidden')).toBeNull();

			await act(async () => {
				fireEvent.keyDown(document, { key: 'Escape' });
			});

			expect(getByRole('tooltip', { hidden: true }).getAttribute('aria-hidden')).toBe('true');
		});

		it('Escape does nothing when tooltip is already hidden', async () => {
			const { container, getByRole } = renderTooltip();
			const wrapper = container.firstElementChild as HTMLElement;

			await act(async () => {
				fireEvent.keyDown(wrapper, { key: 'Escape' });
			});

			// Should remain hidden without throwing
			expect(getByRole('tooltip', { hidden: true }).getAttribute('aria-hidden')).toBe('true');
		});
	});

	// ---------------------------------------------------------------------------
	// data-placement
	// ---------------------------------------------------------------------------

	describe('data-placement', () => {
		it('defaults to "above"', () => {
			const { container } = renderTooltip();
			expect((container.firstElementChild as HTMLElement).dataset.placement).toBe('above');
		});
	});
});
