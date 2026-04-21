import Toast from '@components/Toast';
import { remove, toasts } from '@signals/toasts';
import styles from '@styles/Toast.module.css';
import type { FunctionComponent } from 'preact';

/**
 * Fixed-position container that renders the toast queue. Mount once in the app root,
 * inside `<Theme>`. Call `toast()` from anywhere to enqueue a notification.
 *
 * @example
 * ```tsx
 * // App root
 * <Theme>
 *   <Toaster />
 *   <App />
 * </Theme>
 *
 * // Anywhere in the app
 * import { toast } from '@auldrant/ui';
 * toast('File saved.');
 * ```
 */
const Toaster: FunctionComponent = () => {
	const items = toasts.value;

	// Wrapper is the single persistent live region — always mounted so new toasts
	// are inserted into a region that already exists in the DOM. Screen readers
	// announce content added to a pre-existing live region; content inserted in
	// the same render that creates the region is commonly missed.
	return (
		<div class={styles.toaster} aria-live="polite" aria-atomic="false">
			{items.map((item) => (
				<Toast
					key={item.id}
					message={item.message}
					onDismiss={() => remove(item.id)}
					{...(item.variant && { variant: item.variant })}
					{...(item.title && { title: item.title })}
					{...(item.duration && { duration: item.duration })}
					{...(item.dismissLabel && { dismissLabel: item.dismissLabel })}
				/>
			))}
		</div>
	);
};

export default Toaster;
