import { describe, it } from 'bun:test';
import Card from '@components/Card';
import { renderAndCheckA11y } from './setup';

describe('Card a11y', () => {
	it('has no axe violations', async () => {
		// Act & Assert
		await renderAndCheckA11y(
			<Card>
				<p>Card content</p>
			</Card>
		);
	});

	// https://www.w3.org/TR/WCAG22/#adaptable
	describe('WCAG A', () => {
		it('preserves heading accessibility when provided as children (SC 1.3.1)', async () => {
			// Arrange
			const title = 'Card Title';

			// Act
			const { getByRole } = await renderAndCheckA11y(
				<Card>
					<h3>{title}</h3>
					<p>Card content</p>
				</Card>
			);

			// Assert
			getByRole('heading', { name: title, level: 3 });
		});
	});
});
