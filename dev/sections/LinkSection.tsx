import DownloadLink from '@components/DownloadLink';
import Link from '@components/Link';
import type { FunctionComponent } from 'preact';

export const LinkSection: FunctionComponent = () => (
	<div class="dev-section">
		<h2>Link / DownloadLink</h2>
		<div class="dev-stack">
			<div>
				<Link href="/about">Internal link</Link>
				{' — '}
				<Link href="https://example.com">External link</Link>
				{' — '}
				<DownloadLink href="/file.pdf" fileName="document.pdf" label="Download PDF" />
			</div>
		</div>
	</div>
);
