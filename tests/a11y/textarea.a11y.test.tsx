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

		it('marks the textarea as invalid when over the character limit (SC 3.3.1)', () => {
			// Arrange
			const limit = 10;
			const { container } = render(<Textarea label={label} name={name} maxChars={limit} />);
			const textarea = container.querySelector('textarea') as HTMLTextAreaElement;

			// Act — type beyond the limit
			fireEvent.input(textarea, { target: { value: 'a'.repeat(15) } });

			// Assert
			expect(textarea.getAttribute('aria-invalid')).toBe('true');
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

		it('announces remaining characters at 75% threshold (SC 4.1.3)', () => {
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

		it('announces remaining characters at 90% threshold (SC 4.1.3)', () => {
			// Arrange
			const charLimit = 100;
			const { container } = render(<Textarea label={label} name={name} maxChars={charLimit} />);
			const textarea = container.querySelector('textarea') as HTMLTextAreaElement;
			const liveRegion = container.querySelector('[aria-live="polite"]') as HTMLElement;

			// Act
			fireEvent.input(textarea, { target: { value: 'a'.repeat(90) } });

			// Assert
			expect(liveRegion.textContent).toContain('10 characters remaining');
		});

		it('announces remaining characters at 100% threshold (SC 4.1.3)', () => {
			// Arrange
			const charLimit = 100;
			const { container } = render(<Textarea label={label} name={name} maxChars={charLimit} />);
			const textarea = container.querySelector('textarea') as HTMLTextAreaElement;
			const liveRegion = container.querySelector('[aria-live="polite"]') as HTMLElement;

			// Act
			fireEvent.input(textarea, { target: { value: 'a'.repeat(100) } });

			// Assert
			expect(liveRegion.textContent).toContain('0 characters remaining');
		});

		it('announces at absolute threshold even after percent threshold (SC 4.1.3)', () => {
			// Arrange — charLimit=200 so 90% (180 chars) leaves 20 remaining,
			// well above the absolute threshold (≤10). This separates the two triggers.
			const charLimit = 200;
			const { container } = render(<Textarea label={label} name={name} maxChars={charLimit} />);
			const textarea = container.querySelector('textarea') as HTMLTextAreaElement;
			const liveRegion = container.querySelector('[aria-live="polite"]') as HTMLElement;

			// Act — cross 90% first (remaining=20, above absolute threshold)
			fireEvent.input(textarea, { target: { value: 'a'.repeat(180) } });
			expect(liveRegion.textContent).toContain('20 characters remaining');

			// Act — then reach absolute threshold (≤10 remaining) without crossing 100%
			fireEvent.input(textarea, { target: { value: 'a'.repeat(191) } });

			// Assert — 9 remaining triggers absolute threshold announcement
			expect(liveRegion.textContent).toContain('9 characters remaining');
		});

		it('announces overage when over the character limit (SC 4.1.3)', () => {
			// Arrange
			const charLimit = 100;
			const { container } = render(<Textarea label={label} name={name} maxChars={charLimit} />);
			const textarea = container.querySelector('textarea') as HTMLTextAreaElement;
			const liveRegion = container.querySelector('[aria-live="polite"]') as HTMLElement;

			// Act — type 110 characters (110% threshold)
			fireEvent.input(textarea, { target: { value: 'a'.repeat(110) } });

			// Assert
			expect(liveRegion.textContent).toContain('10 characters over limit');
		});

		it('does not announce below 75% threshold (SC 4.1.3)', () => {
			// Arrange
			const charLimit = 100;
			const { container } = render(<Textarea label={label} name={name} maxChars={charLimit} />);
			const textarea = container.querySelector('textarea') as HTMLTextAreaElement;
			const liveRegion = container.querySelector('[aria-live="polite"]') as HTMLElement;

			// Act
			fireEvent.input(textarea, { target: { value: 'a'.repeat(50) } });

			// Assert
			expect(liveRegion.textContent).toBe('');
		});
	});
});
