import { describe, expect, it } from 'bun:test';
import Textarea from '@components/Textarea';
import { fireEvent, render } from '@testing-library/preact';
import { renderAndCheckA11y } from './setup';

describe('Textarea a11y', () => {
	const label = 'Bio';
	const name = 'bio';
	const maxChars = 200;

	it('has no axe violations', async () => {
		// Act & Assert
		await renderAndCheckA11y(<Textarea label={label} name={name} maxChars={maxChars} />);
	});

	// https://www.w3.org/TR/WCAG22/#compatible
	describe('WCAG A', () => {
		it('is an accessible textbox with programmatic label (SC 4.1.2)', () => {
			// Act
			const { getByRole } = render(<Textarea label={label} name={name} maxChars={maxChars} />);

			// Assert
			getByRole('textbox', { name: /Bio/ });
		});

		it('describes the textarea with the character counter (SC 1.3.1)', () => {
			// Act
			const { container } = render(<Textarea label={label} name={name} maxChars={maxChars} />);
			const textarea = container.querySelector('textarea');
			const describedBy = textarea?.getAttribute('aria-describedby') ?? '';

			// Assert
			expect(describedBy).not.toBe('');
			const counterId = describedBy.split(' ').find((id) => id.includes('counter'));
			expect(counterId).toBeTruthy();
			const counter = counterId ? container.querySelector(`#${CSS.escape(counterId)}`) : null;
			expect(counter).not.toBeNull();
			expect(counter?.textContent).toContain(String(maxChars));
		});

		it('exposes the disabled state (SC 4.1.2)', () => {
			// Act
			const { getByRole } = render(
				<Textarea label={label} name={name} maxChars={maxChars} disabled />
			);
			const textarea = getByRole('textbox', { name: /Bio/ });

			// Assert
			expect((textarea as HTMLTextAreaElement).disabled).toBe(true);
		});

		it('exposes the required state (SC 4.1.2)', () => {
			// Act
			const { getByRole } = render(
				<Textarea label={label} name={name} maxChars={maxChars} required />
			);
			const textarea = getByRole('textbox', { name: /Bio/ });

			// Assert
			expect((textarea as HTMLTextAreaElement).required).toBe(true);
		});

		it('marks the textarea as invalid with error (SC 3.3.1)', () => {
			// Arrange
			const error = 'Bio is required';

			// Act
			const { getByRole } = render(
				<Textarea label={label} name={name} maxChars={maxChars} error={error} />
			);
			const textarea = getByRole('textbox', { name: /Bio/ });

			// Assert
			expect(textarea.getAttribute('aria-invalid')).toBe('true');
		});

		it('composes aria-describedby with error and counter (SC 3.3.1)', () => {
			// Arrange
			const error = 'Bio is required';

			// Act
			const { container, getByText } = render(
				<Textarea label={label} name={name} maxChars={maxChars} error={error} />
			);
			const textarea = container.querySelector('textarea');
			const describedBy = textarea?.getAttribute('aria-describedby') ?? '';
			const errorElement = getByText(error);
			const ids = describedBy.split(' ');

			// Assert
			expect(ids).toContain(errorElement.id);
			expect(ids.length).toBeGreaterThanOrEqual(2);
		});

		it('announces the error message via role="alert" (SC 3.3.1)', () => {
			// Act
			const { getByRole } = render(
				<Textarea label={label} name={name} maxChars={maxChars} error="Bio is required" />
			);

			// Assert
			getByRole('alert');
		});
	});

	// https://www.w3.org/TR/WCAG22/#status-messages
	describe('WCAG AA', () => {
		it('has a live region for character count announcements (SC 4.1.3)', () => {
			// Act
			const { container } = render(<Textarea label={label} name={name} maxChars={maxChars} />);
			const liveRegion = container.querySelector('[aria-live="polite"]');

			// Assert
			expect(liveRegion).not.toBeNull();
		});

		it('announces remaining characters at threshold (SC 4.1.3)', () => {
			// Arrange
			const charLimit = 100;
			const { container } = render(<Textarea label={label} name={name} maxChars={charLimit} />);
			const textarea = container.querySelector('textarea') as HTMLTextAreaElement;
			const liveRegion = container.querySelector('[aria-live="polite"]') as HTMLElement;

			// Act — type 75 characters to cross the 75% threshold
			fireEvent.input(textarea, { target: { value: 'a'.repeat(75) } });

			// Assert
			expect(liveRegion.textContent).toContain('25 characters remaining');
		});
	});
});
