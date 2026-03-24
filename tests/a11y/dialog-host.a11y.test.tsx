import { afterEach, describe, it } from 'bun:test';
import DialogHost from '@components/DialogHost';
import { confirm, dialog, queue } from '@signals/dialogs';
import { act, render } from '@testing-library/preact';
import { checkA11y, expectNoViolations } from './setup';

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

describe('DialogHost a11y', () => {
	it('confirm path (Modal) has no axe violations', async () => {
		// Arrange
		await act(async () => {
			confirm({ title: 'Delete item?', message: 'This cannot be undone.', actionLabel: 'Delete' });
		});
		const { container } = render(<DialogHost />);

		// Act
		const results = await checkA11y(container);

		// Assert
		expectNoViolations(results);
	});

	it('dialog path (Dialog) has no axe violations', async () => {
		// Arrange
		await act(async () => {
			dialog({
				title: 'Unsaved changes',
				message: 'What would you like to do?',
				defaultAction: { label: 'Save', shortcut: 'Enter' },
				actions: [{ label: 'Discard', shortcut: 'd' }],
			});
		});
		const { container } = render(<DialogHost />);

		// Act
		const results = await checkA11y(container);

		// Assert
		expectNoViolations(results);
	});
});
