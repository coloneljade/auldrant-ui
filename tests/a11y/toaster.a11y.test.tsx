import { describe, expect, it } from 'bun:test';
import Toaster from '@components/Toaster';
import { toast } from '@signals/toasts';
import { act, render } from '@testing-library/preact';
import { checkA11y, expectNoViolations } from './setup';

describe('Toaster a11y', () => {
	it('has no axe violations when rendering toasts', async () => {
		await act(async () => {
			toast('Accessibility test toast');
		});
		const { container } = render(<Toaster />);
		const results = await checkA11y(container);
		expectNoViolations(results);
	});

	it('live region has aria-live="polite"', async () => {
		await act(async () => {
			toast('Live region test');
		});
		const { container } = render(<Toaster />);
		const region = container.querySelector('[aria-live]');

		expect(region?.getAttribute('aria-live')).toBe('polite');
	});
});
