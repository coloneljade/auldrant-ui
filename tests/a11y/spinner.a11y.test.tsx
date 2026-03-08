import { describe, it } from 'bun:test';
import Spinner from '@components/Spinner';
import { renderAndCheckA11y } from './setup';

describe('Spinner a11y', () => {
	it('has no axe violations (default)', async () => {
		// Act & Assert
		await renderAndCheckA11y(<Spinner />);
	});

	it('has no axe violations (custom label)', async () => {
		// Act & Assert
		await renderAndCheckA11y(<Spinner label="Saving…" />);
	});

	it('has no axe violations (sm)', async () => {
		// Act & Assert
		await renderAndCheckA11y(<Spinner size="sm" />);
	});

	it('has no axe violations (lg)', async () => {
		// Act & Assert
		await renderAndCheckA11y(<Spinner size="lg" />);
	});
});
