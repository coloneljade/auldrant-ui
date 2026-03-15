import { describe, expect, it } from 'bun:test';
import Icon, { IconName } from '@components/Icon';
import { render } from '@testing-library/preact';
import { renderAndCheckA11y } from './setup';

describe('Icon a11y', () => {
	it('has no axe violations', async () => {
		await renderAndCheckA11y(<Icon name={IconName.info} />);
	});

	it('aria-hidden is present on all IconName members', () => {
		for (const name of Object.values(IconName)) {
			const { container, unmount } = render(<Icon name={name} />);
			const svg = container.querySelector('svg');
			expect(svg?.getAttribute('aria-hidden')).toBe('true');
			unmount();
		}
	});
});
