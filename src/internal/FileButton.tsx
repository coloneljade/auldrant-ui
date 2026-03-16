import Icon, { IconName } from '@components/Icon';
import Tooltip from '@components/Tooltip';
import styles from '@styles/FileInput.module.css';
import type { FunctionComponent } from 'preact';

/** Formatted file info for display. */
interface IFileInfo {
	/** File name. */
	name: string;
	/** Pre-formatted file size string. */
	size: string;
}

/** Props for the compact file button renderer. */
interface IFileButtonProps {
	/** Whether the input is disabled. */
	disabled: boolean;
	/** Formatted file list. */
	files: IFileInfo[];
	/** Total size across all files, pre-formatted. */
	totalSize?: string;
	/** Whether multi-file mode is active. */
	multiple: boolean;
	/** Called when all files are cleared. */
	onClear: () => void;
}

/** Compact file selection trigger — renders a button or file info with clear. */
const FileButton: FunctionComponent<IFileButtonProps> = (props) => {
	const { disabled, files, totalSize, multiple, onClear } = props;

	const [file] = files;

	if (file && !multiple) {
		// Single-file display
		return (
			<span class={styles.fileInputInfo}>
				<Icon name={IconName.file} />
				<span>
					{file.name} ({file.size})
				</span>
				<Tooltip content="Remove file">
					<button
						type="button"
						class={styles.fileInputClear}
						disabled={disabled}
						aria-label="Remove file"
						onClick={(e) => {
							e.preventDefault();
							onClear();
						}}
					>
						<Icon name={IconName.dismiss} />
					</button>
				</Tooltip>
			</span>
		);
	}

	if (files.length && multiple) {
		// Multi-file summary
		return (
			<span class={styles.fileInputInfo}>
				<Icon name={IconName.file} />
				<span>
					{files.length} files ({totalSize})
				</span>
				<Tooltip content="Clear all files">
					<button
						type="button"
						class={styles.fileInputClear}
						disabled={disabled}
						aria-label="Clear all files"
						onClick={(e) => {
							e.preventDefault();
							onClear();
						}}
					>
						<Icon name={IconName.dismiss} />
					</button>
				</Tooltip>
			</span>
		);
	}

	return (
		<span class={styles.fileInputButton} aria-hidden="true">
			{multiple ? 'Choose files' : 'Choose file'}
		</span>
	);
};

export default FileButton;
