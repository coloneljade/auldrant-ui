import { describe, expect, it } from 'bun:test';
import Textarea from '@components/Textarea';
import { render } from '@testing-library/preact';
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
			const counter = container.querySelector(`#${CSS.escape(describedBy)}`);
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
	});
});
