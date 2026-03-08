import type { IBaseProps } from '@scripts/types';
import { cx } from '@scripts/utils';
import styles from '@styles/Button.module.css';
import type { FunctionComponent, VNode } from 'preact';
import { cloneElement } from 'preact';

interface IButtonBaseProps extends IBaseProps {
	/** Click handler. */
	onClick?: () => void;
	/** HTML button type. Defaults to `'button'`. */
	type?: 'button' | 'submit' | 'reset';
	/** Whether the button is disabled. */
	disabled?: boolean;
}

/** Props for a text-label button. */
interface ITextButtonProps extends IButtonBaseProps {
	/** Visible button text. */
	label: string;
}

/** Props for an icon-only button. */
interface IIconButtonProps extends IButtonBaseProps {
	/** Icon element rendered inside the button. */
	icon: VNode;
	/** Accessible name for icon-only buttons. Required when `icon` is set. */
	'aria-label': string;
}

type IButtonProps = ITextButtonProps | IIconButtonProps;

function isIconButton(props: IButtonProps): props is IIconButtonProps {
	return 'icon' in props;
}

/** Standard button with configurable type and click handler. Supports text-label and icon-only variants. */
const Button: FunctionComponent<IButtonProps> = (props) => {
	const { onClick, type = 'button', disabled, class: className } = props;

	if (isIconButton(props)) {
		const { icon, 'aria-label': ariaLabel } = props;
		return (
			<button
				type={type}
				class={cx(styles.button, styles.iconButton, className)}
				aria-label={ariaLabel}
				onClick={onClick}
				disabled={disabled}
			>
				{cloneElement(icon, { 'aria-hidden': 'true' })}
			</button>
		);
	}

	const { label } = props;
	return (
		<button type={type} class={cx(styles.button, className)} onClick={onClick} disabled={disabled}>
			{label}
		</button>
	);
};

export default Button;
