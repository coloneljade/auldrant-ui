import { describe, expect, it, mock } from 'bun:test';
import Form from '@components/Form';
import { fireEvent, render } from '@testing-library/preact';

describe('Form', () => {
	it('renders a submit button with default label', () => {
		const { getByText } = render(
			<Form onSubmit={() => {}}>
				<p>Content</p>
			</Form>
		);
		expect((getByText('Submit') as HTMLButtonElement).type).toBe('submit');
	});

	it('renders a reset button when resetLabel is provided', () => {
		const resetLabel = 'Clear';
		const { getByText } = render(
			<Form onSubmit={() => {}} resetLabel={resetLabel}>
				<p>Content</p>
			</Form>
		);
		expect((getByText(resetLabel) as HTMLButtonElement).type).toBe('reset');
	});

	it('does not render a reset button by default', () => {
		const { container } = render(
			<Form onSubmit={() => {}}>
				<p>Content</p>
			</Form>
		);
		expect(container.querySelector('button[type="reset"]')).toBeNull();
	});

	it('calls onSubmit with FormData on submit', () => {
		const handleSubmit = mock(() => {});
		const { container } = render(
			<Form onSubmit={handleSubmit}>
				<input name="test" value="hello" />
			</Form>
		);
		fireEvent.submit(container.querySelector('form') as HTMLFormElement);
		expect(handleSubmit).toHaveBeenCalledTimes(1);
		const formData = handleSubmit.mock.calls[0]?.[0] as FormData;
		expect(formData.get('test')).toBe('hello');
	});
});
