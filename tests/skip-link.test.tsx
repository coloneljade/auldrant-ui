import { describe, expect, it } from 'bun:test';
import SkipLink from '@components/SkipLink';
import { render } from '@testing-library/preact';

describe('SkipLink', () => {
	it('defaults to targeting #main', () => {
		const { container } = render(<SkipLink />);
		const anchor = container.querySelector('a') as HTMLAnchorElement;
		expect(anchor).not.toBeNull();
		expect(anchor.getAttribute('href')).toBe('#main');
	});

	it('defaults to "Skip to main content" label', () => {
		const { getByText } = render(<SkipLink />);
		getByText('Skip to main content');
	});

	it('accepts a custom target', () => {
		const target = '#content';
		const { container } = render(<SkipLink target={target} />);
		const anchor = container.querySelector('a') as HTMLAnchorElement;
		expect(anchor.getAttribute('href')).toBe(target);
	});

	it('accepts a custom label', () => {
		const label = 'Skip navigation';
		const { getByText } = render(<SkipLink label={label} />);
		getByText(label);
	});
});
