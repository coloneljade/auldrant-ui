import { describe, expect, it, mock } from 'bun:test';
import Form from '@components/Form';
import { fireEvent, render } from '@testing-library/preact';

describe('Form', () => {
	it('renders a submit button with default label', () => {
		// Act
		const { getByText } = render(
			<Form onSubmit={() => {}}>
				<p>Content</p>
			</Form>
		);

		// Assert
		expect((getByText('Submit') as HTMLButtonElement).type).toBe('submit');
	});

	it('renders a reset button when resetLabel is provided', () => {
		// Arrange
		const resetLabel = 'Clear';

		// Act
		const { getByText } = render(
			<Form onSubmit={() => {}} resetLabel={resetLabel}>
				<p>Content</p>
			</Form>
		);

		// Assert
		expect((getByText(resetLabel) as HTMLButtonElement).type).toBe('reset');
	});

	it('does not render a reset button by default', () => {
		// Act
		const { container } = render(
			<Form onSubmit={() => {}}>
				<p>Content</p>
			</Form>
		);

		// Assert
		expect(container.querySelector('button[type="reset"]')).toBeNull();
	});

	it('submit button is disabled when submitDisabled={true}', () => {
		// Act
		const { getByRole } = render(
			<Form onSubmit={() => {}} submitDisabled={true}>
				<p>Content</p>
			</Form>
		);

		// Assert
		expect((getByRole('button', { name: 'Submit' }) as HTMLButtonElement).disabled).toBe(true);
	});

	it('submit button is not disabled when submitDisabled is omitted', () => {
		// Act
		const { getByRole } = render(
			<Form onSubmit={() => {}}>
				<p>Content</p>
			</Form>
		);

		// Assert
		expect((getByRole('button', { name: 'Submit' }) as HTMLButtonElement).disabled).toBe(false);
	});

	it('renders a custom submitLabel', () => {
		// Act
		const { getByRole } = render(
			<Form onSubmit={() => {}} submitLabel="Save">
				<p>Content</p>
			</Form>
		);

		// Assert
		expect((getByRole('button', { name: 'Save' }) as HTMLButtonElement).type).toBe('submit');
	});

	it('renders the status message when status is provided', () => {
		// Act
		const { getByRole } = render(
			<Form onSubmit={() => {}} status="Saved successfully">
				<p>Content</p>
			</Form>
		);

		// Assert
		expect(getByRole('status').textContent).toBe('Saved successfully');
	});

	it('calls onSubmit with FormData on submit', () => {
		// Arrange
		const handleSubmit = mock(() => {});
		const { container } = render(
			<Form onSubmit={handleSubmit}>
				<input name="test" value="hello" />
			</Form>
		);

		// Act
		fireEvent.submit(container.querySelector('form') as HTMLFormElement);

		// Assert
		expect(handleSubmit).toHaveBeenCalledTimes(1);
		const formData = handleSubmit.mock.calls[0]?.[0] as FormData;
		expect(formData.get('test')).toBe('hello');
	});
});
