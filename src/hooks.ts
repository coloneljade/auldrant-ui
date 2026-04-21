import type { ReadonlySignal } from '@preact/signals';
import { computed } from '@preact/signals';
import { location } from '@signals/routing';
import { useEffect, useRef } from 'preact/hooks';

/**
 * Parse a pathname for the `/page/:n` suffix convention.
 * Returns `base` (pathname without the page suffix) and `page` (positive integer or undefined).
 * Returns `page: undefined` for any invalid or absent suffix (including non-numeric segments).
 */
function parsePaginationUrl(pathname: string): { base: string; page: number | undefined } {
	const i = pathname.lastIndexOf('/page/');
	if (i >= 0) {
		const segment = pathname.slice(i + 6);
		if (/^\d+$/.test(segment)) {
			const n = parseInt(segment, 10);
			if (n > 0) {
				return { base: pathname.slice(0, i) || '/', page: n };
			}
		}
	}
	return { base: pathname || '/', page: undefined };
}

/**
 * Returns the current page number from the URL convention `/page/:n`.
 * Returns `undefined` at the base route (no `/page/` suffix — treat as page 1).
 * Returns a positive integer when a page suffix is present.
 * Reading `location.value` during render subscribes the component to navigation.
 *
 * @example
 * const p = usePage(); // undefined at /results, 3 at /results/page/3
 */
export function usePage(): number | undefined {
	return parsePaginationUrl(location.value).page;
}

/**
 * Signal factory for the current page. Use at module level or outside components.
 * Returns `undefined` at the base route, positive integer otherwise.
 * For component use, prefer `usePage()`.
 *
 * @example
 * export const currentPage = page(); // ReadonlySignal<number | undefined>
 */
export function page(): ReadonlySignal<number | undefined> {
	return computed(() => parsePaginationUrl(location.value).page);
}

/** Controls returned by {@link useTimer}. All methods are safe to call in any order. */
export interface ITimerControls {
	/** Pause the timer. Safe to call when already paused. */
	pause: () => void;
	/** Resume after a pause. Safe to call when already running. */
	resume: () => void;
	/** Cancel without calling onComplete. Called automatically on unmount. */
	cancel: () => void;
}

/**
 * Pausable countdown timer. Calls `onComplete` after `duration` milliseconds of
 * active (unpaused) time. Starts automatically on mount; cancels on unmount.
 *
 * Uses refs for timer internals — remaining time and start timestamp are mutable
 * state that survives renders without causing them. Only the component's own
 * `dismissing` boolean (or equivalent) needs to trigger a render.
 */
export function useTimer(duration: number, onComplete: () => void): ITimerControls {
	const remainingRef = useRef<number>(duration);
	const startRef = useRef<number | null>(null);
	const handleRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const onCompleteRef = useRef(onComplete);

	// Keep onCompleteRef current without re-running the effect
	onCompleteRef.current = onComplete;

	const controlsRef = useRef<ITimerControls>({
		pause() {
			if (handleRef.current === null) {
				return;
			}
			clearTimeout(handleRef.current);
			handleRef.current = null;
			if (startRef.current !== null) {
				remainingRef.current -= Date.now() - startRef.current;
				startRef.current = null;
			}
		},
		resume() {
			if (handleRef.current !== null) {
				return;
			}
			startRef.current = Date.now();
			handleRef.current = setTimeout(() => {
				handleRef.current = null;
				onCompleteRef.current();
			}, remainingRef.current);
		},
		cancel() {
			if (handleRef.current !== null) {
				clearTimeout(handleRef.current);
				handleRef.current = null;
			}
		},
	});

	useEffect(() => {
		controlsRef.current.resume();
		return () => controlsRef.current.cancel();
	}, []);

	return controlsRef.current;
}
