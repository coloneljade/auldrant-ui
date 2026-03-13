import Button from '@components/Button';
import type { IBaseProps } from '@scripts/types';
import { cx } from '@scripts/utils';
import styles from '@styles/Form.module.css';
import type { ComponentChildren, FunctionComponent } from 'preact';

/** Props for {@link Form}. */
interface IFormProps extends IBaseProps {
	/** Called with FormData when the form is submitted. */
	onSubmit: (data: FormData) => void;
	/** Label for the submit button. Defaults to `'Submit'`. */
	submitLabel?: string;
	/** Label for the optional reset button. Omit to hide. */
	resetLabel?: string;
	/** Status message displayed after submission (e.g., success/failure feedback). */
	status?: string;
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
	} = props;

	return (
		<form
			class={cx(styles.form, className)}
			onSubmit={(e) => {
				e.preventDefault();
				const data = new FormData(e.currentTarget);
				onSubmit(data);
			}}
		>
			{children}
			<div class={styles.formActions}>
				<Button type="submit" label={submitLabel} />
				{resetLabel && <Button type="reset" label={resetLabel} />}
			</div>
			{status && <output class={styles.status}>{status}</output>}
		</form>
	);
};

export default Form;
