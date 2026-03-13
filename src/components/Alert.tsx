import Link from '@components/Link';
import type { IBaseProps } from '@scripts/types';
import { cx } from '@scripts/utils';
import styles from '@styles/Alert.module.css';
import type { FunctionComponent } from 'preact';
import { useEffect } from 'preact/hooks';

/** Severity variants for {@link Alert}. Controls ARIA live region role and color. */
export enum AlertVariant {
	info = 'info',
	success = 'success',
	warning = 'warning',
	error = 'error',
}

/** Props for {@link Alert}. */
interface IAlertProps extends IBaseProps {
	/** Severity variant — controls ARIA role and color. Defaults to {@link AlertVariant.info}. */
	variant?: AlertVariant;
	/** Optional heading rendered above the message. */
	title?: string;
	/** Alert message text. */
	message: string;
	/** Label for the action element. Rendered only when `actionHref` or `onAction` is set. */
	actionLabel?: string;
	/**
	 * Renders the action as a {@link Link} (handles internal SPA nav + external rel).
	 * Mutually exclusive with `onAction`.
	 */
	actionHref?: string;
	/** Renders the action as a `<button>`. Mutually exclusive with `actionHref`. */
	onAction?: () => void;
	/**
	 * Callback fired when the dismiss button is clicked, or after `duration` ms elapses.
	 * When provided, a dismiss button is rendered.
	 */
	onDismiss?: () => void;
	/** Accessible label for the dismiss button. Defaults to `'Dismiss'`. */
	dismissLabel?: string;
	/**
	 * Auto-dismiss delay in milliseconds. When set and `onDismiss` is provided,
	 * calls `onDismiss` after this delay. The parent is responsible for unmounting.
	 */
	duration?: number;
}

const roleByVariant: { [key in AlertVariant]: 'alert' | 'status' } = {
	[AlertVariant.error]: 'alert',
	[AlertVariant.warning]: 'alert',
	[AlertVariant.info]: 'status',
	[AlertVariant.success]: 'status',
};

/**
 * Alert/Banner that surfaces status messages with screen-reader-appropriate live
 * region roles. `error` and `warning` variants use `role="alert"` (assertive);
 * `info` and `success` use `role="status"` (polite).
 */
const Alert: FunctionComponent<IAlertProps> = (props) => {
	const {
		variant = AlertVariant.info,
		title,
		message,
		actionLabel,
		actionHref,
		onAction,
		onDismiss,
		dismissLabel = 'Dismiss',
		duration,
		class: className,
	} = props;

	const role = roleByVariant[variant];

	useEffect(() => {
		if (!duration || !onDismiss) {
			return;
		}
		const t = setTimeout(onDismiss, duration);
		return () => clearTimeout(t);
	}, [duration, onDismiss]);

	return (
		<div role={role} class={cx(styles.alert, styles[variant], className)}>
			<div class={styles.body}>
				{title && <p class={styles.title}>{title}</p>}
				<p class={styles.message}>{message}</p>
				{actionLabel && actionHref && (
					<Link href={actionHref} class={styles.action}>
						{actionLabel}
					</Link>
				)}
				{actionLabel && onAction && (
					<button type="button" class={styles.action} onClick={onAction}>
						{actionLabel}
					</button>
				)}
			</div>
			{onDismiss && (
				<button type="button" class={styles.dismiss} onClick={onDismiss}>
					{dismissLabel}
				</button>
			)}
		</div>
	);
};

export default Alert;
