import { describe, it } from 'bun:test';
import Toggle from '@components/Toggle';
import { renderAndCheckA11y } from './setup';

describe('Toggle a11y', () => {
	const label = 'Enable notifications';

	it('has no axe violations when unchecked', async () => {
		await renderAndCheckA11y(<Toggle label={label} checked={false} />);
	});

	it('has no axe violations when checked', async () => {
		await renderAndCheckA11y(<Toggle label={label} checked={true} />);
	});

	it('has no axe violations when disabled', async () => {
		await renderAndCheckA11y(<Toggle label={label} checked={false} disabled />);
	});
});
