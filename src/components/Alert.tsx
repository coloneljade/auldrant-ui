import Icon, { IconName } from '@components/Icon';
import Link from '@components/Link';
import type { IBaseProps } from '@scripts/types';
import { cx } from '@scripts/utils';
import styles from '@styles/Alert.module.css';
import type { FunctionComponent } from 'preact';
import { useEffect, useState } from 'preact/hooks';

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

const variantIcon: { [key in AlertVariant]: IconName } = {
	[AlertVariant.info]: IconName.info,
	[AlertVariant.success]: IconName.success,
	[AlertVariant.warning]: IconName.warning,
	[AlertVariant.error]: IconName.error,
};

const variantClass: { [key in AlertVariant]: string | undefined } = {
	[AlertVariant.info]: styles.info,
	[AlertVariant.success]: styles.success,
	[AlertVariant.warning]: styles.warning,
	[AlertVariant.error]: styles.error,
};

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
	const [dismissing, setDismissing] = useState(false);

	useEffect(() => {
		if (!duration || !onDismiss) {
			return;
		}
		const t = setTimeout(() => setDismissing(true), duration);
		return () => clearTimeout(t);
	}, [duration, onDismiss]);

	return (
		<div
			role={role}
			class={cx(styles.alert, variantClass[variant], dismissing && styles.dismissing, className)}
			onAnimationEnd={(e) => {
				if (dismissing && e.target === e.currentTarget) {
					onDismiss?.();
				}
			}}
		>
			<Icon name={variantIcon[variant]} class={styles.alertIcon} />
			<div class={styles.alertBody}>
				{title && <p class={styles.alertTitle}>{title}</p>}
				<p class={styles.alertMessage}>{message}</p>
				{actionLabel && actionHref && (
					<Link href={actionHref} class={styles.alertAction}>
						{actionLabel}
					</Link>
				)}
				{actionLabel && onAction && (
					<button type="button" class={styles.alertAction} onClick={onAction}>
						{actionLabel}
					</button>
				)}
			</div>
			{onDismiss && (
				<button type="button" class={styles.alertDismiss} onClick={() => setDismissing(true)}>
					{dismissLabel}
				</button>
			)}
		</div>
	);
};

export default Alert;
