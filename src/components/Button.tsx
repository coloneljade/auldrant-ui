import type { IBaseProps } from '@scripts/types';
import { cx } from '@scripts/utils';
import styles from '@styles/Button.module.css';
import type { FunctionComponent } from 'preact';

/** Props for {@link Button}. */
interface IButtonProps extends IBaseProps {
	/** Visible button text. */
	label: string;
	/** Click handler. */
	onClick?: () => void;
	/** HTML button type. Defaults to `'button'`. */
	type?: 'button' | 'submit' | 'reset';
	/** Whether the button is disabled. */
	disabled?: boolean;
}

/** Standard button with configurable type and click handler. */
const Button: FunctionComponent<IButtonProps> = (props) => {
	const { label, onClick, type = 'button', disabled, class: className } = props;
	return (
		<button type={type} class={cx(styles.button, className)} onClick={onClick} disabled={disabled}>
			{label}
		</button>
	);
};

export default Button;
