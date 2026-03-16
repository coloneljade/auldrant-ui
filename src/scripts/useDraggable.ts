import { useSignal } from '@preact/signals';
import type { RefObject } from 'preact';
import { useCallback, useEffect, useRef } from 'preact/hooks';

interface IDraggableResult {
	/** Whether a drag is currently in progress. */
	isDragging: boolean;
	/** Reset position to center (removes CSS custom properties). */
	reset: () => void;
}

/**
 * Makes an element draggable via pointer events.
 * Sets `--drag-x` and `--drag-y` CSS custom properties on the container.
 */
function useDraggable(
	handleRef: RefObject<HTMLElement>,
	containerRef: RefObject<HTMLElement>,
	enabled: boolean
): IDraggableResult {
	const isDragging = useSignal(false);
	const startRef = useRef({ x: 0, y: 0, offsetX: 0, offsetY: 0 });

	const reset = useCallback(() => {
		const el = containerRef.current;
		if (!el) {
			return;
		}
		el.style.removeProperty('transform');
	}, [containerRef]);

	useEffect(() => {
		const h = handleRef.current;
		const c = containerRef.current;
		if (!h || !c || !enabled) {
			return;
		}

		const onPointerDown = (e: PointerEvent) => {
			// Don't drag when clicking buttons inside the header
			if ((e.target as HTMLElement).closest('button')) {
				return;
			}

			const rect = c.getBoundingClientRect();

			// Current offset from inline transform (or 0 if not yet dragged)
			const match = /translate\(([^,]+)px,\s*([^)]+)px\)/.exec(c.style.transform);
			const currentX = match ? Number.parseFloat(match[1] ?? '0') : 0;
			const currentY = match ? Number.parseFloat(match[2] ?? '0') : 0;

			startRef.current = {
				x: e.clientX,
				y: e.clientY,
				offsetX: currentX,
				offsetY: currentY,
			};

			h.setPointerCapture(e.pointerId);
			isDragging.value = true;

			// Compute bounds: how far the dialog can move from its current position
			// before hitting viewport edges
			const maxLeft = -(rect.left - currentX);
			const maxRight = window.innerWidth - rect.right + currentX;
			const maxTop = -(rect.top - currentY);
			const maxBottom = window.innerHeight - rect.bottom + currentY;

			const onPointerMove = (e: PointerEvent) => {
				const dx = e.clientX - startRef.current.x + startRef.current.offsetX;
				const dy = e.clientY - startRef.current.y + startRef.current.offsetY;

				const clampedX = Math.max(maxLeft, Math.min(maxRight, dx));
				const clampedY = Math.max(maxTop, Math.min(maxBottom, dy));

				c.style.transform = `translate(${clampedX}px, ${clampedY}px)`;
			};

			const onPointerUp = () => {
				h.removeEventListener('pointermove', onPointerMove);
				h.removeEventListener('pointerup', onPointerUp);
				isDragging.value = false;
			};

			h.addEventListener('pointermove', onPointerMove);
			h.addEventListener('pointerup', onPointerUp);
		};

		h.addEventListener('pointerdown', onPointerDown);
		return () => h.removeEventListener('pointerdown', onPointerDown);
	}, [handleRef, containerRef, enabled]);

	return { isDragging: isDragging.value, reset };
}

export default useDraggable;
