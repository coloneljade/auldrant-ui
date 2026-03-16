import Icon, { IconName } from '@components/Icon';
import Tooltip from '@components/Tooltip';
import type { IBaseProps } from '@scripts/types';
import { cx } from '@scripts/utils';
import styles from '@styles/Chip.module.css';
import type { FunctionComponent } from 'preact';

/** Color variants for {@link Chip}. */
export enum ChipVariant {
	neutral = 'neutral',
	success = 'success',
	warning = 'warning',
	error = 'error',
}

/** Props for {@link Chip}. */
interface IChipProps extends IBaseProps {
	/** Chip label text. */
	label: string;
	/** Color variant. Defaults to {@link ChipVariant.neutral}. */
	variant?: ChipVariant;
	/**
	 * Called when the remove button is clicked or Backspace/Delete is pressed on it.
	 * When provided, a remove button (X icon) is rendered.
	 */
	onRemove?: () => void;
	/** Accessible label for the remove button. Defaults to `"Remove [label]"`. */
	removeLabel?: string;
	/** Whether the chip and its remove button are disabled. */
	disabled?: boolean;
}

const variantClass: { [key in ChipVariant]: string | undefined } = {
	[ChipVariant.neutral]: undefined,
	[ChipVariant.success]: styles.success,
	[ChipVariant.warning]: styles.warning,
	[ChipVariant.error]: styles.error,
};

/** Interactive dismissible tag. Use for filters, selected items, and recipient lists. */
const Chip: FunctionComponent<IChipProps> = (props) => {
	const {
		label,
		variant = ChipVariant.neutral,
		onRemove,
		removeLabel = `Remove ${label}`,
		disabled,
		class: className,
	} = props;

	return (
		<span
			class={cx(styles.chip, variantClass[variant], onRemove && styles.chipDismissible, className)}
		>
			{label}
			{onRemove && (
				<Tooltip content={removeLabel}>
					<button
						type="button"
						class={styles.chipRemove}
						aria-label={removeLabel}
						disabled={disabled}
						onClick={onRemove}
						onKeyDown={(e) => {
							if (e.key === 'Backspace' || e.key === 'Delete') {
								e.preventDefault();
								onRemove();
							}
						}}
					>
						<Icon name={IconName.dismiss} />
					</button>
				</Tooltip>
			)}
		</span>
	);
};

export default Chip;
