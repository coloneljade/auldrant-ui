import { describe, expect, it } from 'bun:test';
import Progress from '@components/Progress';
import { render } from '@testing-library/preact';

describe('Progress', () => {
	it('determinate: resolves via getByRole("progressbar")', () => {
		// Act
		const { getByRole } = render(<Progress label="Uploading" value={50} />);

		// Assert
		getByRole('progressbar');
	});

	it('determinate: aria-valuenow equals the passed value', () => {
		// Act
		const { getByRole } = render(<Progress label="Uploading" value={50} />);

		// Assert
		expect(getByRole('progressbar').getAttribute('aria-valuenow')).toBe('50');
	});

	it('determinate: aria-valuemin="0" and aria-valuemax="100" are present', () => {
		// Act
		const { getByRole } = render(<Progress label="Uploading" value={50} />);
		const el = getByRole('progressbar');

		// Assert
		expect(el.getAttribute('aria-valuemin')).toBe('0');
		expect(el.getAttribute('aria-valuemax')).toBe('100');
	});

	it('indeterminate: aria-valuenow is absent', () => {
		// Act
		const { getByRole } = render(<Progress label="Processing" indeterminate />);

		// Assert
		expect(getByRole('progressbar').getAttribute('aria-valuenow')).toBeNull();
	});

	it('indeterminate: aria-valuemin and aria-valuemax are absent', () => {
		// Act
		const { getByRole } = render(<Progress label="Processing" indeterminate />);
		const el = getByRole('progressbar');

		// Assert
		expect(el.getAttribute('aria-valuemin')).toBeNull();
		expect(el.getAttribute('aria-valuemax')).toBeNull();
	});

	it('value={0} renders aria-valuenow="0"', () => {
		// Act
		const { getByRole } = render(<Progress label="Starting" value={0} />);

		// Assert
		expect(getByRole('progressbar').getAttribute('aria-valuenow')).toBe('0');
	});

	it('value={100} renders aria-valuenow="100"', () => {
		// Act
		const { getByRole } = render(<Progress label="Complete" value={100} />);

		// Assert
		expect(getByRole('progressbar').getAttribute('aria-valuenow')).toBe('100');
	});

	it('forwards the class prop to the root element', () => {
		// Act
		const { getByRole } = render(<Progress label="Uploading" value={50} class="custom-class" />);

		// Assert
		expect(getByRole('progressbar').classList.contains('custom-class')).toBe(true);
	});
});
