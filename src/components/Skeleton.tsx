import type { IBaseProps } from '@scripts/types';
import { cx } from '@scripts/utils';
import styles from '@styles/Skeleton.module.css';
import type { FunctionComponent } from 'preact';

/** Props for {@link Skeleton}. */
interface ISkeletonProps extends IBaseProps {
	/** Applies `border-radius: 9999em` for circular shapes (avatars). */
	rounded?: boolean;
}

/** Loading placeholder with a shimmer animation. Size via the `class` prop. */
const Skeleton: FunctionComponent<ISkeletonProps> = (props) => {
	const { rounded, class: className } = props;
	return (
		<div aria-hidden="true" class={cx(styles.skeleton, rounded && styles.rounded, className)} />
	);
};

export default Skeleton;
