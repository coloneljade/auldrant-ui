import FieldError from '@internal/FieldError';
import type { IBaseProps } from '@internal/types';
import { describeBy } from '@internal/utils';
import styles from '@styles/CheckboxGroup.module.css';
import { cx } from '@utils';
import type { ComponentChildren, FunctionComponent } from 'preact';
import { useId } from 'preact/hooks';

/** Props for {@link CheckboxGroup}. */
interface ICheckboxGroupProps extends IBaseProps {
	/** Fieldset legend text. */
	legend: string;
	/** Error message. When set, renders an error alert and marks the fieldset as invalid. */
	error?: string;
	/** Checkbox components. */
	children: ComponentChildren;
}

/** Fieldset wrapper for grouping {@link Checkbox} components. */
const CheckboxGroup: FunctionComponent<ICheckboxGroupProps> = (props) => {
	const { legend, error, children, class: className } = props;
	const errorId = useId();

	return (
		<fieldset
			class={cx(styles.fieldset, className)}
			aria-invalid={!!error || undefined}
			aria-describedby={describeBy(error && errorId)}
		>
			<legend class={styles.legend}>{legend}</legend>
			{children}
			{error && (
				<FieldError id={errorId} class={styles.error}>
					{error}
				</FieldError>
			)}
		</fieldset>
	);
};

export default CheckboxGroup;
