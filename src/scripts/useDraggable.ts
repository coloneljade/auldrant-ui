import type { RefObject } from 'preact';
import { useCallback, useEffect, useRef, useState } from 'preact/hooks';

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
	const [isDragging, setIsDragging] = useState(false);
	const startRef = useRef({ x: 0, y: 0, offsetX: 0, offsetY: 0 });

	const reset = useCallback(() => {
		const el = containerRef.current;
		if (!el) {
			return;
		}
		el.style.removeProperty('--drag-x');
		el.style.removeProperty('--drag-y');
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

			// Current offset from CSS custom properties (or 0)
			const currentX = Number.parseFloat(c.style.getPropertyValue('--drag-x') || '0');
			const currentY = Number.parseFloat(c.style.getPropertyValue('--drag-y') || '0');

			startRef.current = {
				x: e.clientX,
				y: e.clientY,
				offsetX: currentX,
				offsetY: currentY,
			};

			h.setPointerCapture(e.pointerId);
			setIsDragging(true);

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

				c.style.setProperty('--drag-x', `${clampedX}px`);
				c.style.setProperty('--drag-y', `${clampedY}px`);
			};

			const onPointerUp = () => {
				h.removeEventListener('pointermove', onPointerMove);
				h.removeEventListener('pointerup', onPointerUp);
				setIsDragging(false);
			};

			h.addEventListener('pointermove', onPointerMove);
			h.addEventListener('pointerup', onPointerUp);
		};

		h.addEventListener('pointerdown', onPointerDown);
		return () => h.removeEventListener('pointerdown', onPointerDown);
	}, [handleRef, containerRef, enabled]);

	return { isDragging, reset };
}

export default useDraggable;
