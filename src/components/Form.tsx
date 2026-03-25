import Button from '@components/Button';
import type { IBaseProps } from '@internal/types';
import styles from '@styles/Form.module.css';
import { cx } from '@utils';
import type { ComponentChildren, FunctionComponent } from 'preact';

/** Props for {@link Form}. */
interface IFormProps extends IBaseProps {
	/** Called with FormData when the form is submitted. Async handlers are supported; rejections are caught and logged. */
	onSubmit: (data: FormData) => void;
	/** Label for the submit button. Defaults to `'Submit'`. */
	submitLabel?: string;
	/** Label for the optional reset button. Omit to hide. */
	resetLabel?: string;
	/** Status message displayed after submission (e.g., success/failure feedback). */
	status?: string;
	/**
	 * When `true`, the submit button is disabled.
	 * Use when app-level validation (outside native constraint validation) detects errors.
	 */
	submitDisabled?: boolean;
	/** Form field children. */
	children: ComponentChildren;
}

/** Form with submit/reset buttons. Prevents default and provides FormData. */
const Form: FunctionComponent<IFormProps> = (props) => {
	const {
		onSubmit,
		submitLabel = 'Submit',
		resetLabel,
		status,
		children,
		class: className,
		submitDisabled,
	} = props;

	return (
		<form
			class={cx(styles.form, className)}
			onSubmit={(e) => {
				e.preventDefault();
				const data = new FormData(e.currentTarget);
				// Promise.resolve() passes a Promise through unchanged and wraps void in a
				// resolved promise — so both sync and async onSubmit handlers are covered.
				Promise.resolve(onSubmit(data)).catch((err) => {
					console.error('Form onSubmit rejected:', err);
				});
			}}
		>
			{children}
			<div class={styles.formActions}>
				<Button type="submit" label={submitLabel} disabled={submitDisabled} />
				{resetLabel && <Button type="reset" label={resetLabel} />}
			</div>
			{status && <output class={styles.status}>{status}</output>}
		</form>
	);
};

export default Form;
