import { describe, it } from 'bun:test';
import Skeleton from '@components/Skeleton';
import { renderAndCheckA11y } from './setup';

describe('Skeleton a11y', () => {
	it('has no axe violations (default)', async () => {
		// Act & Assert
		await renderAndCheckA11y(<Skeleton />);
	});

	it('has no axe violations (rounded)', async () => {
		// Act & Assert
		await renderAndCheckA11y(<Skeleton rounded />);
	});
});
