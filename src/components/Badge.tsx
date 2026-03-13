import type { IBaseProps } from '@scripts/types';
import { cx } from '@scripts/utils';
import styles from '@styles/Badge.module.css';
import type { ComponentChildren, FunctionComponent } from 'preact';

/** Color variant for {@link Badge}. */
export enum BadgeVariant {
	neutral = 'neutral',
	success = 'success',
	warning = 'warning',
	error = 'error',
}

/** Props for {@link Badge}. */
interface IBadgeProps extends IBaseProps {
	/**
	 * Badge label content. Should be self-describing text — avoid relying on
	 * color alone to convey meaning (WCAG 1.4.1). Prefer `"3 errors"` over a
	 * bare `"3"` on an error variant.
	 */
	children: ComponentChildren;
	/** Color variant. Defaults to `BadgeVariant.neutral`. */
	variant?: BadgeVariant;
}

/** Inline status or count indicator rendered as a styled pill. */
const Badge: FunctionComponent<IBadgeProps> = (props) => {
	const { children, variant = BadgeVariant.neutral, class: className } = props;
	return (
		<span
			class={cx(
				styles.badge,
				variant === BadgeVariant.success && styles.success,
				variant === BadgeVariant.warning && styles.warning,
				variant === BadgeVariant.error && styles.error,
				className
			)}
		>
			{children}
		</span>
	);
};

export default Badge;
