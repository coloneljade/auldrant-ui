import type { IBaseProps } from '@scripts/types';
import { cx, describeBy } from '@scripts/utils';
import styles from '@styles/RadioGroup.module.css';
import type { ComponentChildren, FunctionComponent, VNode } from 'preact';
import { Fragment, isValidElement, toChildArray } from 'preact';
import { useId } from 'preact/hooks';

/** Recursively flattens Fragment VNodes that toChildArray leaves intact. */
function flattenChildren(children: ComponentChildren): VNode<object>[] {
	const out: VNode<object>[] = [];
	for (const child of toChildArray(children)) {
		if (!isValidElement(child)) {
			continue;
		}
		if (child.type === Fragment) {
			const { children: nested } = child.props as { children?: ComponentChildren };
			out.push(...flattenChildren(nested));
		} else {
			out.push(child);
		}
	}
	return out;
}

/** Visual variant for {@link RadioGroup}. */
export enum RadioGroupVariant {
	default = 'default',
	highlight = 'highlight',
}

/** Props for {@link RadioItem}. */
interface IRadioItemProps extends IBaseProps {
	/** Visible label text. */
	label: string;
	/** Form value when selected. */
	value: string;
}

/** Props for {@link RadioGroup}. */
interface IRadioGroupProps extends IBaseProps {
	/** Fieldset legend text. */
	legend: string;
	/** Field name attribute for form submission. */
	name: string;
	/** Currently selected value. */
	value?: string;
	/** Whether a selection is required. */
	required?: boolean;
	/** Whether the group is disabled. */
	disabled?: boolean;
	/** Error message. When set, renders an error message and marks the fieldset as invalid. */
	error?: string;
	/** Visual variant. `highlight` renders conjoined tile buttons. */
	variant?: RadioGroupVariant;
	/** Called with the selected value on change. */
	onChange?: (value: string) => void;
	/**
	 * Radio items. Each must be a {@link RadioItem} element.
	 */
	children: ComponentChildren;
}

/**
 * A single option in a {@link RadioGroup}. Renders null — all rendering is handled by RadioGroup.
 *
 * @example
 * ```tsx
 * <RadioGroup legend="Size" name="size">
 *   <RadioItem label="Small" value="sm" />
 *   <RadioItem label="Medium" value="md" />
 *   <RadioItem label="Large" value="lg" />
 * </RadioGroup>
 * ```
 */
export const RadioItem: FunctionComponent<IRadioItemProps> = () => null;

/** Radio button group inside a fieldset with legend. */
const RadioGroup: FunctionComponent<IRadioGroupProps> = (props) => {
	const {
		legend,
		name,
		value,
		variant,
		required,
		disabled,
		error,
		onChange,
		class: className,
		children,
	} = props;
	const groupId = useId();
	const errorId = `${groupId}-error`;

	// Flatten fragments, arrays, and filter falsy values
	const flatChildren = flattenChildren(children);

	// Validate: all children must be <RadioItem> elements
	for (const child of flatChildren) {
		if (!isValidElement(child) || child.type !== RadioItem) {
			throw new Error('[RadioGroup] All children must be <RadioItem>.');
		}
	}

	const items = flatChildren as VNode<IRadioItemProps>[];

	const isHighlight = variant === RadioGroupVariant.highlight;

	return (
		<fieldset
			class={cx(styles.fieldset, isHighlight && styles.fieldsetHighlight, className)}
			aria-invalid={!!error || undefined}
			aria-describedby={describeBy(error && errorId)}
		>
			<legend class={styles.legend}>{legend}</legend>
			{items.map((item) => {
				const { label, value: itemValue } = item.props;
				if (isHighlight) {
					return (
						<label key={itemValue} class={styles.option}>
							<input
								class={styles.input}
								type="radio"
								name={name}
								value={itemValue}
								checked={value === itemValue}
								required={required}
								disabled={disabled}
								onChange={onChange && (() => onChange(itemValue))}
							/>
							{label}
						</label>
					);
				}
				const optionId = `${groupId}-${itemValue}`;
				return (
					<div key={itemValue} class={styles.option}>
						<input
							id={optionId}
							class={styles.input}
							type="radio"
							name={name}
							value={itemValue}
							checked={value === itemValue}
							required={required}
							disabled={disabled}
							onChange={onChange && (() => onChange(itemValue))}
						/>
						<label for={optionId}>{label}</label>
					</div>
				);
			})}
			{error && (
				<p id={errorId} class={styles.error} role="alert">
					{error}
				</p>
			)}
		</fieldset>
	);
};

export default RadioGroup;
