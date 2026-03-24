import { afterEach, describe, expect, it, mock } from 'bun:test';
import DialogHost from '@components/DialogHost';
import { confirm, dialog, queue } from '@signals/dialogs';
import { act, fireEvent, render } from '@testing-library/preact';

// Happy-DOM does not implement showModal/close, so we stub them.
HTMLDialogElement.prototype.showModal ??= function () {
	this.setAttribute('open', '');
};
HTMLDialogElement.prototype.close ??= function () {
	this.removeAttribute('open');
};

afterEach(() => {
	queue.value = [];
});

describe('DialogHost', () => {
	it('returns null when no dialog is queued', () => {
		// Act
		const { container } = render(<DialogHost />);

		// Assert
		expect(container.children).toHaveLength(0);
	});
});

describe('confirm', () => {
	it('renders a Modal with the given title and message', async () => {
		// Act
		await act(async () => {
			confirm({ title: 'Delete item?', message: 'This cannot be undone.' });
		});
		const { getByRole, getByText } = render(<DialogHost />);

		// Assert
		getByRole('alertdialog');
		getByRole('heading', { name: 'Delete item?' });
		getByText('This cannot be undone.');
	});

	it('defaults action label to "Confirm"', async () => {
		// Act
		await act(async () => {
			confirm({ title: 'Proceed?' });
		});
		const { getByRole } = render(<DialogHost />);

		// Assert
		getByRole('button', { name: /Confirm/ });
	});

	it('uses a custom action label', async () => {
		// Act
		await act(async () => {
			confirm({ title: 'Delete?', actionLabel: 'Delete' });
		});
		const { getByRole } = render(<DialogHost />);

		// Assert
		getByRole('button', { name: /Delete/ });
	});

	it('resolves true when the action button is clicked', async () => {
		// Arrange
		const onResult = mock(() => {});
		await act(async () => {
			confirm({ title: 'Proceed?' }).then(onResult);
		});
		const { getByRole } = render(<DialogHost />);

		// Act
		await act(async () => {
			fireEvent.click(getByRole('button', { name: /Confirm/ }));
		});

		// Assert
		expect(onResult).toHaveBeenCalledWith(true);
	});

	it('resolves false when Cancel is clicked', async () => {
		// Arrange
		const onResult = mock(() => {});
		await act(async () => {
			confirm({ title: 'Proceed?' }).then(onResult);
		});
		const { getByRole } = render(<DialogHost />);

		// Act
		await act(async () => {
			fireEvent.click(getByRole('button', { name: /Cancel/ }));
		});

		// Assert
		expect(onResult).toHaveBeenCalledWith(false);
	});

	it('uses a custom cancel label', async () => {
		// Act
		await act(async () => {
			confirm({ title: 'Proceed?', cancelLabel: 'Nevermind' });
		});
		const { getByRole } = render(<DialogHost />);

		// Assert
		getByRole('button', { name: /Nevermind/ });
	});

	it('passes focusCancel to the Modal', async () => {
		// Act
		await act(async () => {
			confirm({ title: 'Delete?', actionLabel: 'Delete', focusCancel: true });
		});
		const { getByRole } = render(<DialogHost />);

		// Assert — focusCancel means the Cancel button receives focus, not the action
		const cancelBtn = getByRole('button', { name: /Cancel/ });
		expect(cancelBtn).toBe(document.activeElement);
	});
});

describe('dialog', () => {
	it('renders a Dialog with the given title and message', async () => {
		// Act
		await act(async () => {
			dialog({ title: 'Unsaved changes', message: 'What would you like to do?' });
		});
		const { getByRole, getByText } = render(<DialogHost />);

		// Assert
		getByRole('dialog');
		getByRole('heading', { name: 'Unsaved changes' });
		getByText('What would you like to do?');
	});

	it('renders action buttons', async () => {
		// Act
		await act(async () => {
			dialog({
				title: 'Choose',
				defaultAction: { label: 'Save', shortcut: 'Enter' },
				actions: [{ label: 'Discard', shortcut: 'd' }],
			});
		});
		const { getByRole } = render(<DialogHost />);

		// Assert
		getByRole('button', { name: /Save/ });
		getByRole('button', { name: /Discard/ });
	});

	it('resolves with the action label when clicked', async () => {
		// Arrange
		const onResult = mock(() => {});
		await act(async () => {
			dialog({
				title: 'Choose',
				defaultAction: { label: 'Save', shortcut: 'Enter' },
			}).then(onResult);
		});
		const { getByRole } = render(<DialogHost />);

		// Act
		await act(async () => {
			fireEvent.click(getByRole('button', { name: /Save/ }));
		});

		// Assert
		expect(onResult).toHaveBeenCalledWith('Save');
	});

	it('resolves null when dismissed via X button', async () => {
		// Arrange
		const onResult = mock(() => {});
		await act(async () => {
			dialog({ title: 'Info' }).then(onResult);
		});
		const { getByRole } = render(<DialogHost />);

		// Act
		await act(async () => {
			fireEvent.click(getByRole('button', { name: 'Close this dialog' }));
		});

		// Assert
		expect(onResult).toHaveBeenCalledWith(null);
	});
});

describe('queue', () => {
	it('shows the next dialog after the current one resolves', async () => {
		// Arrange — queue two dialogs
		await act(async () => {
			confirm({ title: 'First' });
			confirm({ title: 'Second' });
		});
		const { getByRole, rerender } = render(<DialogHost />);
		getByRole('heading', { name: 'First' });

		// Act — dismiss the first
		await act(async () => {
			fireEvent.click(getByRole('button', { name: /Cancel/ }));
		});
		rerender(<DialogHost />);

		// Assert — second is now showing
		getByRole('heading', { name: 'Second' });
	});
});
