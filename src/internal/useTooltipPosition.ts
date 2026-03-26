import { useEffect } from 'preact/hooks';

// Detected once at module load — safe because CSS.supports is pure and synchronous.
// Migration: when `anchor-scope` reaches cross-browser Baseline, delete this file,
// remove the import and call site in Tooltip.tsx, and remove the @supports not block
// in Tooltip.module.css (~25 lines total). See: https://github.com/coloneljade/auldrant-ui/issues/117
const supportsAnchorPositioning =
	typeof CSS !== 'undefined' &&
	CSS.supports('anchor-name: --x') &&
	CSS.supports('anchor-scope: --x');

/**
 * Positions the tooltip above or below its trigger via JS when CSS Anchor Positioning
 * is unavailable. No-op on Chrome 131+ and Safari 26+ where the CSS path handles
 * positioning entirely.
 *
 * JS sets --tooltip-x / --tooltip-y as viewport coordinates on the tooltip element;
 * the CSS @supports not block reads them via var() to position the element as
 * position:fixed (viewport-relative). This works correctly because the dialog's
 * transform is applied only via inline style while dragging — when at rest the
 * dialog has no transform, so position:fixed is relative to the viewport as expected.
 */
export default function useTooltipPosition(
	isVisible: boolean,
	triggerRef: { current: HTMLElement | null },
	tooltipRef: { current: HTMLElement | null },
	wrapperRef: { current: HTMLElement | null }
): void {
	useEffect(() => {
		if (supportsAnchorPositioning || !isVisible) {
			return;
		}

		const trigger = triggerRef.current;
		const tooltip = tooltipRef.current;
		const wrapper = wrapperRef.current;
		if (!trigger || !tooltip || !wrapper) {
			return;
		}

		const position = () => {
			const rect = trigger.getBoundingClientRect();
			const tooltipHeight = tooltip.getBoundingClientRect().height;
			const gap = 8;
			const placeAbove =
				window.innerHeight - rect.bottom < tooltipHeight + gap && rect.top > tooltipHeight + gap;
			tooltip.style.setProperty('--tooltip-x', `${rect.left + rect.width / 2}px`);
			tooltip.style.setProperty(
				'--tooltip-y',
				placeAbove ? `${rect.top - tooltipHeight - gap}px` : `${rect.bottom + gap}px`
			);
			wrapper.dataset.placement = placeAbove ? 'above' : 'below';
		};

		position();
		window.addEventListener('scroll', position, { passive: true });
		window.addEventListener('resize', position, { passive: true });
		return () => {
			window.removeEventListener('scroll', position);
			window.removeEventListener('resize', position);
		};
	}, [isVisible, triggerRef, tooltipRef, wrapperRef]);
}
