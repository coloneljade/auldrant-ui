import Icon, { IconName } from '@components/Icon';
import type { IBaseProps } from '@internal/types';
import styles from '@styles/DataCheckbox.module.css';
import { cx } from '@utils';
import type { ComponentChildren, FunctionComponent } from 'preact';

/** Props for {@link DataCheckbox}. */
interface IDataCheckboxProps extends IBaseProps {
	/** Element id. Use when an external `<label for>` references this checkbox, or for `aria-describedby` targets. */
	id?: string;
	/** ID of an element (typically a column `<th>`) whose text labels this checkbox. Use when no `<label for>` association is in scope. */
	ariaLabelledby?: string;
	/** ID(s) of element(s) that describe this checkbox — typically a `FieldError` rendered nearby. */
	ariaDescribedby?: string;
	/** Form name attribute. */
	name?: string;
	/** Whether the checkbox is checked. */
	checked?: boolean;
	/** Whether selection is required. */
	required?: boolean;
	/** Whether the checkbox is disabled. */
	disabled?: boolean;
	/** Truthy sets `aria-invalid="true"`. The message is rendered separately (see `FieldError`). */
	error?: string;
	/** Called with the new checked state on change. */
	onChange?: (checked: boolean) => void;
	/** Optional inline label text rendered inside the tile. */
	children?: ComponentChildren;
}

/**
 * Internal checkbox primitive — renders a styled tile (the `<label>` wrapper)
 * with an overlay `<input type="checkbox">` and a check-icon shown when
 * checked. Composed by {@link Checkbox} and usable directly in tabular
 * contexts where a column `<th>` provides the accessible name via
 * `ariaLabelledby`.
 *
 * Always renders a `<label>` wrapper so the styled tile is clickable. With
 * `ariaLabelledby` set, the input's explicit ARIA labelling overrides the
 * implicit `<label>` association per WAI-ARIA precedence — appropriate for
 * tabular cells where the `<th>` is the source of the accessible name.
 *
 * Sets `aria-invalid` from the truthiness of `error`. Does not render the
 * error message — the composer (or a sibling `FieldError`) handles that and
 * wires `ariaDescribedby` to its id.
 */
const DataCheckbox: FunctionComponent<IDataCheckboxProps> = (props) => {
	const {
		id,
		name,
		checked,
		required,
		disabled,
		error,
		onChange,
		ariaLabelledby,
		ariaDescribedby,
		class: className,
		children,
	} = props;

	return (
		<label class={cx(styles.field, className)}>
			<input
				class={styles.input}
				id={id}
				type="checkbox"
				name={name}
				checked={checked}
				required={required}
				disabled={disabled}
				aria-invalid={!!error || undefined}
				aria-labelledby={ariaLabelledby}
				aria-describedby={ariaDescribedby}
				onChange={onChange && ((e) => onChange((e.target as HTMLInputElement).checked))}
			/>
			<Icon name={IconName.check} class={styles.checkIcon} />
			{children}
		</label>
	);
};

export default DataCheckbox;
