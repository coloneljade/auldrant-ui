import { describe, expect, it } from 'bun:test';
import Form from '@components/Form';
import { render } from '@testing-library/preact';
import { renderAndCheckA11y } from './setup';

describe('Form a11y', () => {
	const noop = () => {};

	it('has no axe violations', async () => {
		// Act & Assert
		await renderAndCheckA11y(
			<Form onSubmit={noop}>
				<p>Fields</p>
			</Form>
		);
	});

	// https://www.w3.org/TR/WCAG22/#compatible
	describe('WCAG A', () => {
		it('exposes an accessible submit button (SC 4.1.2)', () => {
			// Arrange
			const submitLabel = 'Submit';

			// Act
			const { getByRole } = render(
				<Form onSubmit={noop}>
					<p>Fields</p>
				</Form>
			);

			// Assert
			getByRole('button', { name: submitLabel });
		});

		it('exposes an accessible reset button when configured (SC 4.1.2)', () => {
			// Arrange
			const resetLabel = 'Clear';

			// Act
			const { getByRole } = render(
				<Form onSubmit={noop} resetLabel={resetLabel}>
					<p>Fields</p>
				</Form>
			);

			// Assert
			getByRole('button', { name: resetLabel });
		});
	});

	// https://www.w3.org/TR/WCAG22/#status-messages
	describe('WCAG AA', () => {
		it('exposes status messages via role="status" (SC 4.1.3)', () => {
			// Arrange
			const statusMessage = 'Form submitted successfully';

			// Act
			const { getByRole } = render(
				<Form onSubmit={noop} status={statusMessage}>
					<p>Fields</p>
				</Form>
			);
			const status = getByRole('status');

			// Assert
			expect(status.textContent).toBe(statusMessage);
		});
	});
});
