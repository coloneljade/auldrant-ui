import { describe, expect, it } from 'bun:test';
import SearchInput from '@components/SearchInput';
import { render } from '@testing-library/preact';
import { renderAndCheckA11y } from './setup';

describe('SearchInput a11y', () => {
	const label = 'Search';
	const name = 'search';

	it('has no axe violations', async () => {
		// Act & Assert
		await renderAndCheckA11y(<SearchInput label={label} name={name} />);
	});

	// https://www.w3.org/TR/WCAG22/#compatible
	describe('WCAG A', () => {
		it('labels the search input programmatically (SC 4.1.2)', () => {
			// Act
			const { getByRole } = render(<SearchInput label={label} name={name} />);

			// Assert — searchbox has accessible name (regardless of labelling mechanism)
			getByRole('searchbox', { name: /Search/ });
		});

		it('provides an accessible clear button (SC 4.1.2)', () => {
			// Act
			const { getByRole } = render(<SearchInput label={label} name={name} value="query" />);

			// Assert
			getByRole('button', { name: /clear search/i });
		});

		it('exposes the disabled state on input and clear button (SC 4.1.2)', () => {
			// Act
			const { getByRole } = render(
				<SearchInput label={label} name={name} value="query" disabled />
			);
			const input = getByRole('searchbox', { name: /Search/ }) as HTMLInputElement;
			const clearBtn = getByRole('button', { name: /clear search/i });

			// Assert
			expect(input.disabled).toBe(true);
			expect((clearBtn as HTMLButtonElement).disabled).toBe(true);
		});

		it('exposes the required state (SC 4.1.2)', () => {
			// Act
			const { getByRole } = render(<SearchInput label={label} name={name} required />);

			// Assert
			expect((getByRole('searchbox', { name: /Search/ }) as HTMLInputElement).required).toBe(true);
		});

		it('marks the input as invalid with error (SC 3.3.1)', () => {
			// Act
			const { getByRole } = render(
				<SearchInput label={label} name={name} error="Search term required" />
			);

			// Assert
			expect(getByRole('searchbox', { name: /Search/ }).getAttribute('aria-invalid')).toBe('true');
		});

		it('describes the input with the error message (SC 3.3.1)', () => {
			// Arrange
			const error = 'Search term required';

			// Act
			const { getByRole, getByText } = render(
				<SearchInput label={label} name={name} error={error} />
			);
			const input = getByRole('searchbox', { name: /Search/ });
			const errorElement = getByText(error);

			// Assert
			expect(input.getAttribute('aria-describedby')).toBe(errorElement.id);
		});

		it('announces the error message via role="alert" (SC 3.3.1)', () => {
			// Act
			const { getByRole } = render(
				<SearchInput label={label} name={name} error="Search term required" />
			);

			// Assert
			getByRole('alert');
		});
	});
});
