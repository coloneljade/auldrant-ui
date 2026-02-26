import { describe, expect, it } from 'bun:test';
import DownloadLink from '@components/DownloadLink';
import { render } from '@testing-library/preact';
import { renderAndCheckA11y } from './setup';

describe('DownloadLink a11y', () => {
	const href = '/files/report.pdf';
	const fileName = 'report.pdf';
	const label = 'Download Report';

	it('has no axe violations', async () => {
		// Act & Assert
		await renderAndCheckA11y(<DownloadLink href={href} fileName={fileName} label={label} />);
	});

	// https://www.w3.org/TR/WCAG22/#compatible
	describe('WCAG A', () => {
		it('is an accessible link with download purpose (SC 4.1.2)', () => {
			// Act
			const { getByRole } = render(<DownloadLink href={href} fileName={fileName} label={label} />);
			const link = getByRole('link', { name: label });

			// Assert
			expect(link.getAttribute('download')).toBe(fileName);
		});
	});
});
