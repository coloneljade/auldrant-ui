import { describe, expect, it } from 'bun:test';
import DownloadLink from '@components/DownloadLink';
import { render } from '@testing-library/preact';

describe('DownloadLink', () => {
	const href = '/files/report.pdf';
	const fileName = 'report.pdf';
	const label = 'Download Report';

	it('sets the download attribute to the fileName', () => {
		// Act
		const { getByText } = render(<DownloadLink href={href} fileName={fileName} label={label} />);

		// Assert
		expect((getByText(label) as HTMLAnchorElement).getAttribute('download')).toBe(fileName);
	});

	it('sets the href attribute', () => {
		// Act
		const { getByText } = render(<DownloadLink href={href} fileName={fileName} label={label} />);

		// Assert
		expect((getByText(label) as HTMLAnchorElement).getAttribute('href')).toBe(href);
	});
});
