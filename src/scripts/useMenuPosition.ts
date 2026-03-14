import { useEffect } from 'preact/hooks';

// Detected once at module load — safe because CSS.supports is pure and synchronous.
// Migration: when `anchor-scope` reaches cross-browser Baseline, delete this file,
// remove the import and call site in Dropdown.tsx, and remove the @supports not block
// in Dropdown.module.css (~20 lines total). See: https://github.com/coloneljade/auldrant-ui/issues/95
const supportsAnchorPositioning =
	typeof CSS !== 'undefined' &&
	CSS.supports('anchor-name: --x') &&
	CSS.supports('anchor-scope: --x');

/**
 * Positions the dropdown menu below (or above) its trigger via JS when CSS Anchor
 * Positioning is unavailable. No-op on Chrome 131+ and Safari 26+ where the CSS path
 * handles positioning entirely.
 */
export default function useMenuPosition(
	isOpen: boolean,
	triggerRef: { current: HTMLButtonElement | null },
	menuRef: { current: HTMLElement | null }
): void {
	useEffect(() => {
		if (supportsAnchorPositioning || !isOpen) {
			return;
		}

		const trigger = triggerRef.current;
		const menu = menuRef.current;
		if (!trigger || !menu) {
			return;
		}

		const position = () => {
			const rect = trigger.getBoundingClientRect();
			const menuHeight = menu.getBoundingClientRect().height;
			const placeAbove = window.innerHeight - rect.bottom < menuHeight && rect.top > menuHeight;
			menu.style.top = placeAbove ? `${rect.top - menuHeight}px` : `${rect.bottom}px`;
			menu.style.left = `${rect.left}px`;
			menu.style.minWidth = `${rect.width}px`;
		};

		position();
		window.addEventListener('scroll', position, { passive: true });
		window.addEventListener('resize', position, { passive: true });
		return () => {
			window.removeEventListener('scroll', position);
			window.removeEventListener('resize', position);
		};
	}, [isOpen, triggerRef, menuRef]);
}
