import { describe, it } from 'bun:test';
import Badge from '@components/Badge';
import { renderAndCheckA11y } from './setup';

describe('Badge a11y', () => {
	it('has no axe violations (neutral)', async () => {
		// Act & Assert
		await renderAndCheckA11y(<Badge>12</Badge>);
	});

	it('has no axe violations (success)', async () => {
		// Act & Assert
		await renderAndCheckA11y(<Badge variant="success">Active</Badge>);
	});

	it('has no axe violations (warning)', async () => {
		// Act & Assert
		await renderAndCheckA11y(<Badge variant="warning">Pending</Badge>);
	});

	it('has no axe violations (error)', async () => {
		// Act & Assert
		await renderAndCheckA11y(<Badge variant="error">Failed</Badge>);
	});
});
