import { describe, it } from 'bun:test';
import Progress from '@components/Progress';
import { renderAndCheckA11y } from './setup';

describe('Progress a11y', () => {
	it('has no axe violations (determinate 40%)', async () => {
		// Act & Assert
		await renderAndCheckA11y(<Progress label="Uploading" value={40} />);
	});

	it('has no axe violations (indeterminate)', async () => {
		// Act & Assert
		await renderAndCheckA11y(<Progress label="Processing" indeterminate />);
	});

	it('has no axe violations (value=0)', async () => {
		// Act & Assert
		await renderAndCheckA11y(<Progress label="Starting" value={0} />);
	});

	it('has no axe violations (value=100)', async () => {
		// Act & Assert
		await renderAndCheckA11y(<Progress label="Complete" value={100} />);
	});
});
