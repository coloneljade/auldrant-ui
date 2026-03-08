import type { IBaseProps } from '@scripts/types';
import { cx } from '@scripts/utils';
import styles from '@styles/Badge.module.css';
import type { ComponentChildren, FunctionComponent } from 'preact';

/** Props for {@link Badge}. */
interface IBadgeProps extends IBaseProps {
	/**
	 * Badge label content. Should be self-describing text — avoid relying on
	 * color alone to convey meaning (WCAG 1.4.1). Prefer `"3 errors"` over a
	 * bare `"3"` on an error variant.
	 */
	children: ComponentChildren;
	/** Color variant. Defaults to `'neutral'`. */
	variant?: 'neutral' | 'success' | 'warning' | 'error';
}

/** Inline status or count indicator rendered as a styled pill. */
const Badge: FunctionComponent<IBadgeProps> = (props) => {
	const { children, variant = 'neutral', class: className } = props;
	return (
		<span
			class={cx(
				styles.badge,
				variant === 'success' && styles.success,
				variant === 'warning' && styles.warning,
				variant === 'error' && styles.error,
				className
			)}
		>
			{children}
		</span>
	);
};

export default Badge;
