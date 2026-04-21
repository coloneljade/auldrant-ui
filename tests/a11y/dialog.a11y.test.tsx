import { describe, expect, it } from 'bun:test';
import Dialog from '@components/Dialog';
import Modal from '@components/Modal';
import type { IDialogAction } from '@internal/types';
import { render } from '@testing-library/preact';
import { checkA11y, expectNoViolations, renderAndCheckA11y } from './setup';

// Happy-DOM does not implement showModal/close, so we stub them.
HTMLDialogElement.prototype.showModal ??= function () {
	this.setAttribute('open', '');
};
HTMLDialogElement.prototype.close ??= function () {
	this.removeAttribute('open');
};

const action: IDialogAction = {
	label: 'Confirm',
	description: 'Confirm this action',
	shortcut: 'Enter',
	onClick: () => {},
};

describe('Dialog a11y', () => {
	const title = 'Test Dialog';

	it('has no axe violations', async () => {
		// Act & Assert
		await renderAndCheckA11y(
			<Dialog open title={title} onClose={() => {}} defaultAction={action} />
		);
	});

	// https://www.w3.org/TR/WCAG22/#adaptable
	describe('WCAG A', () => {
		it('has aria-labelledby linked to the heading (SC 4.1.2)', () => {
			// Act
			const { getByRole } = render(<Dialog open title={title} onClose={() => {}} />);
			const dialog = getByRole('dialog');
			const heading = getByRole('heading', { name: title });

			// Assert
			expect(dialog.getAttribute('aria-labelledby')).toBe(heading.id);
		});
	});
});

describe('Modal a11y', () => {
	const title = 'Test Modal';

	it('has no axe violations', async () => {
		// Arrange
		const { container } = render(
			<Modal open title={title} onCancel={() => {}} defaultAction={action} />
		);

		// Act
		const results = await checkA11y(container);

		// Assert
		expectNoViolations(results);
	});

	// https://www.w3.org/TR/WCAG22/#adaptable
	describe('WCAG A', () => {
		it('has aria-labelledby linked to the heading (SC 4.1.2)', () => {
			// Act
			const { getByRole } = render(
				<Modal open title={title} onCancel={() => {}} defaultAction={action} />
			);
			const dialog = getByRole('alertdialog');
			const heading = getByRole('heading', { name: title });

			// Assert
			expect(dialog.getAttribute('aria-labelledby')).toBe(heading.id);
		});

		it('has role="alertdialog" for action-required semantics (SC 4.1.2)', () => {
			// Act
			const { getByRole } = render(
				<Modal open title={title} onCancel={() => {}} defaultAction={action} />
			);

			// Assert
			getByRole('alertdialog');
		});
	});
});
