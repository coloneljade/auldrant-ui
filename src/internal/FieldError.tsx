import type { IBaseProps } from '@internal/types';
import styles from '@styles/FieldError.module.css';
import { cx } from '@utils';
import type { ComponentChildren, FunctionComponent } from 'preact';

/** Props for {@link FieldError}. */
interface IFieldErrorProps extends IBaseProps {
	/** ID for `aria-describedby` wiring from the associated input. */
	id: string;
	/** Error message text. */
	children: ComponentChildren;
}

/**
 * Inline form-error message with `role="alert"`.
 * Intended for use alongside form controls (`Input`, `DataInput`, etc.) where
 * the consumer wires `aria-describedby` from the input to this element's `id`.
 *
 * Used internally by {@link FormField} for the standard form path, and exposed
 * publicly so consumers placing inputs in custom layouts (tabular cells,
 * toolbars) can render a consistently-styled error message.
 */
const FieldError: FunctionComponent<IFieldErrorProps> = (props) => {
	const { id, children, class: className } = props;
	return (
		<p id={id} class={cx(styles.error, className)} role="alert">
			{children}
		</p>
	);
};

export default FieldError;
