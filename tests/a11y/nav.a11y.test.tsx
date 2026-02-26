import { describe, it } from 'bun:test';
import Nav from '@components/Nav';
import { render } from '@testing-library/preact';
import { renderAndCheckA11y } from './setup';

describe('Nav a11y', () => {
	it('has no axe violations', async () => {
		// Act & Assert
		await renderAndCheckA11y(
			<Nav>
				<a href="/">Home</a>
			</Nav>
		);
	});

	// https://www.w3.org/TR/WCAG22/#adaptable
	describe('WCAG A', () => {
		it('renders a navigation landmark (SC 1.3.1)', () => {
			// Act
			const { getByRole } = render(
				<Nav>
					<a href="/">Home</a>
				</Nav>
			);

			// Assert
			getByRole('navigation');
		});

		it('is a named landmark when title is provided (SC 1.3.1)', () => {
			// Arrange
			const title = 'Main Navigation';

			// Act
			const { getByRole } = render(
				<Nav title={title}>
					<a href="/">Home</a>
				</Nav>
			);

			// Assert
			getByRole('navigation', { name: title });
			getByRole('heading', { name: title });
		});
	});
});
