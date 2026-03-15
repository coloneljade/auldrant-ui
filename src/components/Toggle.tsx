import Icon, { IconName } from '@components/Icon';
import type { IBaseProps } from '@scripts/types';
import { cx } from '@scripts/utils';
import styles from '@styles/Toggle.module.css';
import type { FunctionComponent } from 'preact';

/** Props for {@link Toggle}. */
interface IToggleProps extends IBaseProps {
	/** Visible label text; also provides the accessible name for the switch. */
	label: string;
	/** Whether the toggle is on. */
	checked: boolean;
	/** Called with the new state when the user clicks. Omit for disabled/display-only use. */
	onChange?: (checked: boolean) => void;
	/** Whether the toggle is disabled. */
	disabled?: boolean;
}

/** Immediate-action on/off control. Fires effect on click — not for form submission. */
const Toggle: FunctionComponent<IToggleProps> = (props) => {
	const { label, checked, onChange, disabled, class: className } = props;

	return (
		<button
			type="button"
			role="switch"
			aria-checked={checked}
			disabled={disabled}
			class={cx(styles.toggle, className)}
			onClick={() => onChange?.(!checked)}
		>
			<Icon name={IconName.check} class={styles.toggleThumb} />
			{label}
		</button>
	);
};

export default Toggle;
