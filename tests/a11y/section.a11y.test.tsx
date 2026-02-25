import { describe, it } from 'bun:test';
import Section from '@components/Section';
import { render } from '@testing-library/preact';
import { renderAndCheckA11y } from './setup';

describe('Section a11y', () => {
	const title = 'About';

	it('has no axe violations', async () => {
		// Act & Assert
		await renderAndCheckA11y(
			<Section title={title}>
				<p>Content</p>
			</Section>
		);
	});

	// https://www.w3.org/TR/WCAG22/#adaptable
	describe('WCAG A', () => {
		it('is a named region landmark (SC 1.3.1)', () => {
			// Act
			const { getByRole } = render(
				<Section title={title}>
					<p>Content</p>
				</Section>
			);

			// Assert
			getByRole('region', { name: title });
		});

		it('defaults to h2 heading (SC 1.3.1)', () => {
			// Act
			const { getByRole } = render(
				<Section title={title}>
					<p>Content</p>
				</Section>
			);

			// Assert
			getByRole('heading', { level: 2, name: title });
		});

		it('uses the specified heading level (SC 1.3.1)', () => {
			// Arrange
			const subtitle = 'Subsection';

			// Act
			const { getByRole } = render(
				<Section title={subtitle} level={4}>
					<p>Content</p>
				</Section>
			);

			// Assert
			getByRole('heading', { level: 4, name: subtitle });
		});
	});
});
