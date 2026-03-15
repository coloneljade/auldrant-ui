import { describe, expect, it } from 'bun:test';
import Icon, { IconName } from '@components/Icon';
import { render } from '@testing-library/preact';

describe('Icon', () => {
	it('renders an SVG element for each IconName member', () => {
		for (const name of Object.values(IconName)) {
			const { container, unmount } = render(<Icon name={name} />);
			const svg = container.querySelector('svg');
			expect(svg).not.toBeNull();
			unmount();
		}
	});

	it('has aria-hidden="true"', () => {
		// Act
		const { container } = render(<Icon name={IconName.info} />);
		const svg = container.querySelector('svg');

		// Assert
		expect(svg?.getAttribute('aria-hidden')).toBe('true');
	});

	it('accepts a custom class prop', () => {
		// Act
		const { container } = render(<Icon name={IconName.info} class="custom-icon" />);
		const svg = container.querySelector('svg');

		// Assert
		expect(svg?.classList.contains('custom-icon')).toBe(true);
	});
});
