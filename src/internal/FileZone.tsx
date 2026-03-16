import Icon, { IconName } from '@components/Icon';
import Tooltip from '@components/Tooltip';
import { cx } from '@scripts/utils';
import styles from '@styles/FileInput.module.css';
import type { FunctionComponent } from 'preact';

/** Formatted file info for display. */
interface IFileInfo {
	/** File name. */
	name: string;
	/** Pre-formatted file size string. */
	size: string;
}

/** Props for the drag-and-drop zone renderer. */
interface IFileZoneProps {
	/** Whether the input is disabled. */
	disabled: boolean;
	/** Whether a file is being dragged over the zone. */
	dragover: boolean;
	/** Formatted file list. */
	files: IFileInfo[];
	/** Total size across all files, pre-formatted. */
	totalSize?: string;
	/** Whether multi-file mode is active. */
	multiple: boolean;
	/** Called with the file index to remove. */
	onRemove: (index: number) => void;
	/** Called when all files are cleared. */
	onClear: () => void;
}

/** Drag-and-drop file zone renderer. Pure visual — drag events handled by parent. */
const FileZone: FunctionComponent<IFileZoneProps> = (props) => {
	const { disabled, dragover, files, totalSize, multiple, onRemove, onClear } = props;

	const [first] = files;
	const prompt = multiple
		? 'Drag files here or click to browse'
		: 'Drag a file here or click to browse';

	return (
		<div class={cx(styles.fileInputZone, dragover && styles.dragover, disabled && styles.disabled)}>
			{first && !multiple ? (
				// Single-file inline display
				<span class={styles.fileInputInfo}>
					<Icon name={IconName.file} />
					<span>
						{first.name} ({first.size})
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
			) : first && multiple ? (
				// Multi-file list with prompt to add more
				<div class={styles.fileInputList}>
					{files.map((file, i) => (
						<span key={`${file.name}-${file.size}`} class={styles.fileInputItem}>
							<Icon name={IconName.file} />
							<span class={styles.fileInputItemName}>
								{file.name} ({file.size})
							</span>
							<Tooltip content={`Remove ${file.name}`}>
								<button
									type="button"
									class={styles.fileInputClear}
									disabled={disabled}
									aria-label={`Remove ${file.name}`}
									onClick={(e) => {
										e.preventDefault();
										onRemove(i);
									}}
								>
									<Icon name={IconName.dismiss} />
								</button>
							</Tooltip>
						</span>
					))}
					<span class={styles.fileInputZoneSummary}>
						<span>
							{files.length} files ({totalSize})
						</span>
						<Tooltip content="Clear all files">
							<button
								type="button"
								class={styles.fileInputClearAll}
								disabled={disabled}
								aria-label="Clear all files"
								onClick={(e) => {
									e.preventDefault();
									onClear();
								}}
							>
								Clear all
							</button>
						</Tooltip>
					</span>
					<span class={styles.fileInputZonePrompt} aria-hidden="true">
						<Icon name={IconName.upload} />
						<span class={styles.fileInputZoneText}>Add more files</span>
					</span>
				</div>
			) : (
				// Empty prompt
				<span class={styles.fileInputZonePrompt} aria-hidden="true">
					<Icon name={IconName.upload} />
					<span class={styles.fileInputZoneText}>{prompt}</span>
				</span>
			)}
		</div>
	);
};

export default FileZone;
