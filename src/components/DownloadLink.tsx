import type { IBaseProps } from '@scripts/types';
import { cx } from '@scripts/utils';
import styles from '@styles/DownloadLink.module.css';
import type { FunctionComponent } from 'preact';

/** Props for {@link DownloadLink}. */
interface IDownloadLinkProps extends IBaseProps {
	/** URL of the file to download. */
	href: string;
	/** Filename for the downloaded file. */
	fileName: string;
	/** Visible link text. */
	label: string;
}

/** Download link using `<a download>` for file downloads. */
const DownloadLink: FunctionComponent<IDownloadLinkProps> = (props) => {
	const { href, fileName, label, class: className } = props;
	return (
		<a href={href} download={fileName} class={cx(styles.link, className)}>
			{label}
		</a>
	);
};

export default DownloadLink;
