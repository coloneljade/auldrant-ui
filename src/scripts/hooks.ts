import { useEffect, useRef } from 'preact/hooks';

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
function useTimer(duration: number, onComplete: () => void): ITimerControls {
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

export default useTimer;
