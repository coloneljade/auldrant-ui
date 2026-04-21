import Icon, { IconName } from '@components/Icon';
import Tooltip from '@components/Tooltip';
import { useTimer } from '@hooks';
import { ToastVariant } from '@internal/types';
import type { IBaseProps } from '@internal/types';
import { useSignal } from '@preact/signals';
import styles from '@styles/Toast.module.css';
import { cx } from '@utils';
import type { FunctionComponent } from 'preact';
import { useEffect, useRef } from 'preact/hooks';

export { ToastVariant } from '@internal/types';

/** Props for {@link Toast}. */
interface IToastProps extends IBaseProps {
	/** Toast message text. */
	message: string;
	/** Severity variant. Defaults to {@link ToastVariant.info}. */
	variant?: ToastVariant;
	/** Optional heading rendered above the message. */
	title?: string;
	/** Called after the exit animation completes (timer fire or manual dismiss). */
	onDismiss?: () => void;
	/** Auto-dismiss delay in milliseconds. Defaults to `5000`. */
	duration?: number;
	/** Accessible label for the dismiss button. Defaults to `'Dismiss'`. */
	dismissLabel?: string;
}

const variantIcon: { [key in ToastVariant]: IconName } = {
	[ToastVariant.info]: IconName.info,
	[ToastVariant.success]: IconName.success,
	[ToastVariant.warning]: IconName.warning,
	[ToastVariant.error]: IconName.error,
};

const variantClass: { [key in ToastVariant]: string | undefined } = {
	[ToastVariant.info]: styles.info,
	[ToastVariant.success]: styles.success,
	[ToastVariant.warning]: styles.warning,
	[ToastVariant.error]: styles.error,
};

/**
 * Individual toast notification. Mount via {@link Toaster} — do not use directly.
 *
 * Toasts are rendered as plain content inside the Toaster's single polite live region
 * (a per-toast live region would nest with the wrapper's and cause inconsistent
 * announcements). Transient — for critical errors the user must act on, use {@link Alert}.
 */
const Toast: FunctionComponent<IToastProps> = (props) => {
	const {
		message,
		variant = ToastVariant.info,
		title,
		onDismiss,
		duration = 5000,
		dismissLabel = 'Dismiss',
		class: className,
	} = props;

	const dismissing = useSignal(false);
	const rootRef = useRef<HTMLDivElement>(null);

	const timer = useTimer(duration, () => {
		dismissing.value = true;
	});

	function dismiss() {
		timer.cancel();
		dismissing.value = true;
	}

	// Pause-on-hover / pause-on-focus wired as imperative DOM listeners. The root
	// <div> is presentational (no role); JSX event handlers on a static element
	// trigger biome's noStaticElementInteractions — this pattern mirrors Tooltip.tsx.
	useEffect(() => {
		const root = rootRef.current;
		if (!root) {
			return;
		}
		const pause = () => timer.pause();
		const resume = () => timer.resume();
		root.addEventListener('mouseenter', pause);
		root.addEventListener('mouseleave', resume);
		root.addEventListener('focusin', pause);
		root.addEventListener('focusout', resume);
		return () => {
			root.removeEventListener('mouseenter', pause);
			root.removeEventListener('mouseleave', resume);
			root.removeEventListener('focusin', pause);
			root.removeEventListener('focusout', resume);
		};
	}, [timer]);

	return (
		<div
			ref={rootRef}
			class={cx(
				styles.toast,
				variantClass[variant],
				dismissing.value && styles.dismissing,
				className
			)}
			onAnimationEnd={(e) => {
				if (dismissing.value && e.target === e.currentTarget) {
					onDismiss?.();
				}
			}}
		>
			<Icon name={variantIcon[variant]} class={styles.toastIcon} />
			<div class={styles.toastBody}>
				{title && <p class={styles.toastTitle}>{title}</p>}
				<p class={styles.toastMessage}>{message}</p>
			</div>
			<Tooltip content={dismissLabel}>
				<button
					type="button"
					class={styles.toastDismiss}
					aria-label={dismissLabel}
					onClick={dismiss}
				>
					<Icon name={IconName.dismiss} />
				</button>
			</Tooltip>
		</div>
	);
};

export default Toast;
