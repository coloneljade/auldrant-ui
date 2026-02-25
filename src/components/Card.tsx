import type { IBaseProps } from '@scripts/types';
import { cx } from '@scripts/utils';
import styles from '@styles/Card.module.css';
import type { ComponentChildren, FunctionComponent } from 'preact';

/** Props for {@link Card}. */
interface ICardProps extends IBaseProps {
	/** Card body content. */
	children: ComponentChildren;
}

/** Visual surface container. Consumers provide their own headings as children. */
const Card: FunctionComponent<ICardProps> = (props) => {
	const { children, class: className } = props;
	return <div class={cx(styles.card, className)}>{children}</div>;
};

export default Card;
