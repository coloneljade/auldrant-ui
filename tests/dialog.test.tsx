import { describe, expect, it, mock } from 'bun:test';
import Dialog from '@components/Dialog';
import type { IDialogAction } from '@components/DialogBase';
import { fireEvent, render } from '@testing-library/preact';

describe('Dialog', () => {
	const title = 'Test Dialog';
	const message = 'Hello world';

	it('renders the title as a heading', () => {
		// Act
		const { getByRole } = render(<Dialog open title={title} onClose={() => {}} />);

		// Assert
		getByRole('heading', { name: title });
	});

	it('renders message text', () => {
		// Act
		const { getByText } = render(
			<Dialog open title={title} message={message} onClose={() => {}} />
		);

		// Assert
		getByText(message);
	});

	it('renders children', () => {
		// Arrange
		const content = 'Child content';

		// Act
		const { getByText } = render(
			<Dialog open title={title} onClose={() => {}}>
				<span>{content}</span>
			</Dialog>
		);

		// Assert
		getByText(content);
	});

	it('renders both message and children together', () => {
		// Arrange
		const content = 'Child content';

		// Act
		const { getByText } = render(
			<Dialog open title={title} message={message} onClose={() => {}}>
				<span>{content}</span>
			</Dialog>
		);

		// Assert
		getByText(message);
		getByText(content);
	});

	it('calls onClose when the X button is clicked', () => {
		// Arrange
		const handleClose = mock(() => {});
		const { getByTitle } = render(<Dialog open title={title} onClose={handleClose} />);

		// Act
		fireEvent.click(getByTitle('Close this dialog'));

		// Assert
		expect(handleClose).toHaveBeenCalledTimes(1);
	});

	it('renders the X close button', () => {
		// Act
		const { getByTitle } = render(<Dialog open title={title} onClose={() => {}} />);

		// Assert
		getByTitle('Close this dialog');
	});

	it('renders defaultAction button with label and shortcut hint', () => {
		// Arrange
		const action: IDialogAction = {
			label: 'Download',
			description: 'Download the file',
			shortcut: 'Shift+D',
			onClick: () => {},
		};

		// Act
		const { getByTitle } = render(
			<Dialog open title={title} defaultAction={action} onClose={() => {}} />
		);

		// Assert
		const button = getByTitle(action.description);
		expect(button.textContent).toContain(action.label);
		expect(button.textContent).toContain('(Shift+D)');
	});

	it('renders additional action buttons', () => {
		// Arrange
		const action: IDialogAction = {
			label: 'Save',
			description: 'Save changes',
			shortcut: 's',
			onClick: () => {},
		};

		// Act
		const { getByTitle } = render(
			<Dialog open title={title} actions={[action]} onClose={() => {}} />
		);

		// Assert
		getByTitle(action.description);
	});

	it('does not render a footer when no actions are provided', () => {
		// Act
		const { container } = render(<Dialog open title={title} onClose={() => {}} />);

		// Assert
		expect(container.querySelector('footer')).toBeNull();
	});

	it('does not have role="alertdialog"', () => {
		// Act
		const { queryByRole } = render(<Dialog open title={title} onClose={() => {}} />);

		// Assert
		expect(queryByRole('alertdialog')).toBeNull();
	});
});
