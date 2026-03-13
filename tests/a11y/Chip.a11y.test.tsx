import { describe, it } from 'bun:test';
import Chip, { ChipVariant } from '@components/Chip';
import { render } from '@testing-library/preact';
import { renderAndCheckA11y } from './setup';

describe('Chip a11y', () => {
	it('has no axe violations (comprehensive render)', async () => {
		// Act & Assert — covers label, variant, and remove button together
		await renderAndCheckA11y(
			<Chip label="TypeScript" variant={ChipVariant.success} onRemove={() => {}} />
		);
	});

	it('WCAG SC 4.1.2: remove button has an accessible name', () => {
		// Act
		const { getByRole } = render(<Chip label="TypeScript" onRemove={() => {}} />);

		// Assert
		getByRole('button', { name: 'Remove TypeScript' });
	});
});
