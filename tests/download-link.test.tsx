import { describe, expect, it } from 'bun:test';
import DownloadLink from '@components/DownloadLink';
import { render } from '@testing-library/preact';

describe('DownloadLink', () => {
	const href = '/files/report.pdf';
	const fileName = 'report.pdf';
	const label = 'Download Report';

	it('sets the download attribute to the fileName', () => {
		const { getByText } = render(<DownloadLink href={href} fileName={fileName} label={label} />);
		expect((getByText(label) as HTMLAnchorElement).getAttribute('download')).toBe(fileName);
	});

	it('sets the href attribute', () => {
		const { getByText } = render(<DownloadLink href={href} fileName={fileName} label={label} />);
		expect((getByText(label) as HTMLAnchorElement).getAttribute('href')).toBe(href);
	});
});
