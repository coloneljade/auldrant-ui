import { describe, expect, it, mock } from 'bun:test';
import type { IDialogAction } from '@components/DialogBase';
import Modal from '@components/Modal';
import { fireEvent, render } from '@testing-library/preact';

const defaultAction: IDialogAction = {
	label: 'Confirm',
	description: 'Confirm this action',
	shortcut: 'Enter',
	onClick: () => {},
};

describe('Modal', () => {
	const title = 'Test Modal';
	const message = 'Are you sure?';

	it('renders the title as a heading', () => {
		// Act
		const { getByRole } = render(
			<Modal open title={title} onCancel={() => {}} defaultAction={defaultAction} />
		);

		// Assert
		getByRole('heading', { name: title });
	});

	it('renders message text', () => {
		// Act
		const { getByText } = render(
			<Modal
				open
				title={title}
				message={message}
				onCancel={() => {}}
				defaultAction={defaultAction}
			/>
		);

		// Assert
		getByText(message);
	});

	it('renders children', () => {
		// Arrange
		const content = 'Child content';

		// Act
		const { getByText } = render(
			<Modal open title={title} onCancel={() => {}} defaultAction={defaultAction}>
				<span>{content}</span>
			</Modal>
		);

		// Assert
		getByText(content);
	});

	it('calls onCancel when the Cancel button is clicked', () => {
		// Arrange
		const handleCancel = mock(() => {});
		const { getByRole } = render(
			<Modal open title={title} onCancel={handleCancel} defaultAction={defaultAction} />
		);

		// Act
		fireEvent.click(getByRole('button', { name: /Cancel/ }));

		// Assert
		expect(handleCancel).toHaveBeenCalledTimes(1);
	});

	it('renders Cancel button with default label and Esc hint', () => {
		// Act
		const { getByRole } = render(
			<Modal open title={title} onCancel={() => {}} defaultAction={defaultAction} />
		);

		// Assert
		const cancelBtn = getByRole('button', { name: /Cancel/ });
		expect(cancelBtn.textContent).toContain('Cancel');
		expect(cancelBtn.textContent).toContain('(Esc)');
	});

	it('renders Cancel button with custom label', () => {
		// Arrange
		const cancelLabel = 'Never mind';

		// Act
		const { getByRole } = render(
			<Modal
				open
				title={title}
				onCancel={() => {}}
				cancelLabel={cancelLabel}
				defaultAction={defaultAction}
			/>
		);

		// Assert
		expect(getByRole('button', { name: /Never mind/ }).textContent).toContain(cancelLabel);
	});

	it('renders defaultAction button with label and shortcut hint', () => {
		// Act
		const { getByRole } = render(
			<Modal open title={title} onCancel={() => {}} defaultAction={defaultAction} />
		);

		// Assert
		const button = getByRole('button', { name: /Confirm/ });
		expect(button.textContent).toContain(defaultAction.label);
		expect(button.textContent).toContain('(Enter)');
	});

	it('calls defaultAction onClick when the button is clicked', () => {
		// Arrange
		const handleClick = mock(() => {});
		const action: IDialogAction = { ...defaultAction, onClick: handleClick };
		const { getByRole } = render(
			<Modal open title={title} onCancel={() => {}} defaultAction={action} />
		);

		// Act
		fireEvent.click(getByRole('button', { name: /Confirm/ }));

		// Assert
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it('renders additional action buttons', () => {
		// Arrange
		const extra: IDialogAction = {
			label: 'Discard',
			description: 'Discard changes',
			shortcut: 'd',
			onClick: () => {},
		};

		// Act
		const { getByRole } = render(
			<Modal
				open
				title={title}
				onCancel={() => {}}
				defaultAction={defaultAction}
				actions={[extra]}
			/>
		);

		// Assert
		getByRole('button', { name: /Discard/ });
	});

	it('renders buttons in order: extras, default, cancel', () => {
		// Arrange
		const extra: IDialogAction = {
			label: 'Discard',
			description: 'Discard changes',
			shortcut: 'd',
			onClick: () => {},
		};

		// Act
		const { container } = render(
			<Modal
				open
				title={title}
				onCancel={() => {}}
				defaultAction={defaultAction}
				actions={[extra]}
			/>
		);

		// Assert — verify render order within the footer
		const buttons = container.querySelectorAll('footer button');
		expect(buttons).toHaveLength(3);
		expect(buttons[0]?.textContent).toContain(extra.label);
		expect(buttons[1]?.textContent).toContain(defaultAction.label);
		expect(buttons[2]?.textContent).toContain('Cancel');
	});

	it('has role="alertdialog"', () => {
		// Act
		const { getByRole } = render(
			<Modal open title={title} onCancel={() => {}} defaultAction={defaultAction} />
		);

		// Assert
		getByRole('alertdialog');
	});

	it('does not render the X close button', () => {
		// Act
		const { queryByRole } = render(
			<Modal open title={title} onCancel={() => {}} defaultAction={defaultAction} />
		);

		// Assert
		expect(queryByRole('button', { name: 'Close this dialog' })).toBeNull();
	});
});
