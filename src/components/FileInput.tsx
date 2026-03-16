import FormField from '@components/FormField';
import FileButton from '@internal/FileButton';
import FileZone from '@internal/FileZone';
import { useSignal } from '@preact/signals';
import type { IFieldProps } from '@scripts/types';
import styles from '@styles/FileInput.module.css';
import type { FunctionComponent } from 'preact';
import { useRef } from 'preact/hooks';

/** Props for {@link FileInput}. */
interface IFileInputProps extends IFieldProps {
	/** Render the drag-and-drop zone variant instead of the compact button. */
	zone?: boolean;
	/** Accepted MIME types or file extensions (e.g. ".pdf,.docx" or "image/*"). */
	accept: string;
	/** Maximum file size in bytes (per file). */
	maxSize: number;
	/** Enable multi-file selection and append semantics. */
	multiple?: boolean;
	/** Maximum number of files allowed (requires `multiple`). */
	maxFiles?: number;
	/** Maximum total size in bytes across all files (requires `multiple`). */
	maxTotalSize?: number;
	/** Called with the current file list when files are added. Always `File[]`. */
	onSelect: (files: File[]) => void;
	/** Called when an individual file is removed (requires `multiple`). */
	onRemove?: (file: File) => void;
	/** Called when all files are cleared. */
	onClear?: () => void;
}

/** Extension-to-MIME mapping for common file types used in accept validation. */
const extToMime: { [key: string]: string } = {
	'.csv': 'text/csv',
	'.doc': 'application/msword',
	'.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
	'.gif': 'image/gif',
	'.jpeg': 'image/jpeg',
	'.jpg': 'image/jpeg',
	'.json': 'application/json',
	'.mp3': 'audio/mpeg',
	'.mp4': 'video/mp4',
	'.pdf': 'application/pdf',
	'.png': 'image/png',
	'.svg': 'image/svg+xml',
	'.txt': 'text/plain',
	'.webp': 'image/webp',
	'.xls': 'application/vnd.ms-excel',
	'.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
	'.xml': 'application/xml',
	'.zip': 'application/zip',
};

/**
 * Validate a file's type against the accept attribute string.
 *
 * Handles three accept forms:
 * - `.ext` — maps extension to expected MIME, compares against File.type
 * - `type/*` wildcard — prefix match on File.type
 * - `application/pdf` exact — direct File.type comparison
 *
 * Note: File.type is browser-derived from the file extension, not from file
 * content magic bytes. True content validation requires reading file headers
 * and is not performed here — this matches standard file input behavior.
 */
function validateAccept(file: File, accept: string): boolean {
	const types = accept.split(',').map((t) => t.trim().toLowerCase());
	const fileType = file.type.toLowerCase();
	const fileName = file.name.toLowerCase();

	return types.some((type) => {
		if (type.startsWith('.')) {
			// Extension match: check file extension OR map to MIME and compare
			if (fileName.endsWith(type)) {
				return true;
			}
			const expectedMime = extToMime[type];
			return expectedMime ? fileType === expectedMime : false;
		}
		if (type.endsWith('/*')) {
			// Wildcard MIME: prefix match (e.g. "image/*" matches "image/png")
			return fileType.startsWith(type.slice(0, -1));
		}
		// Exact MIME match
		return fileType === type;
	});
}

/** Format a byte count to a human-readable size string. */
function formatSize(bytes: number): string {
	if (bytes < 1024) {
		return `${bytes} B`;
	}
	if (bytes < 1024 ** 2) {
		return `${(bytes / 1024).toFixed(1)} KB`;
	}
	if (bytes < 1024 ** 3) {
		return `${(bytes / 1024 ** 2).toFixed(1)} MB`;
	}
	return `${(bytes / 1024 ** 3).toFixed(1)} GB`;
}

/** Check if a file is a duplicate by name + size. */
function isDuplicate(file: File, existing: File[]): boolean {
	return existing.some((f) => f.name === file.name && f.size === file.size);
}

/** File input with button or drag-and-drop zone variant, wrapped in FormField. */
const FileInput: FunctionComponent<IFileInputProps> = (props) => {
	const {
		label,
		name,
		required,
		disabled,
		error,
		zone,
		accept,
		maxSize,
		multiple,
		maxFiles,
		maxTotalSize,
		onSelect,
		onRemove,
		onClear,
		class: className,
	} = props;

	const inputRef = useRef<HTMLInputElement>(null);
	const selectedFiles = useSignal<File[]>([]);
	const validationError = useSignal<string | null>(null);
	const dragover = useSignal(false);

	const displayError = error ?? validationError.value ?? undefined;

	function processFiles(incoming: File[]) {
		const errors: string[] = [];
		const accepted: File[] = [];

		for (const file of incoming) {
			if (isDuplicate(file, selectedFiles.value)) {
				continue;
			}
			if (!validateAccept(file, accept)) {
				errors.push('type not accepted');
				continue;
			}
			if (file.size > maxSize) {
				errors.push('size');
				continue;
			}
			accepted.push(file);
		}

		if (!multiple) {
			// Single-file mode: replace
			if (accepted[0]) {
				validationError.value = null;
				selectedFiles.value = [accepted[0]];
				onSelect([accepted[0]]);
			} else if (errors.length) {
				const hasTypeError = errors.includes('type not accepted');
				validationError.value = hasTypeError
					? 'File type not accepted'
					: `File exceeds the ${formatSize(maxSize)} limit`;
				selectedFiles.value = [];
			}
			return;
		}

		// Multi-file mode: append with limits
		let toAdd = accepted;

		if (maxFiles) {
			const remaining = maxFiles - selectedFiles.value.length;
			if (remaining <= 0) {
				validationError.value = `Maximum ${maxFiles} files reached`;
				return;
			}
			if (toAdd.length > remaining) {
				errors.push('maxFiles');
				toAdd = toAdd.slice(0, remaining);
			}
		}

		if (maxTotalSize) {
			const currentTotal = selectedFiles.value.reduce((sum, f) => sum + f.size, 0);
			const budget = maxTotalSize - currentTotal;
			const fitted: File[] = [];
			let used = 0;
			for (const file of toAdd) {
				if (used + file.size <= budget) {
					fitted.push(file);
					used += file.size;
				} else {
					errors.push('totalSize');
				}
			}
			toAdd = fitted;
		}

		if (toAdd.length) {
			selectedFiles.value = [...selectedFiles.value, ...toAdd];
			onSelect(selectedFiles.value);
		}

		// Build aggregate error message
		const typeCount = errors.filter((e) => e === 'type not accepted').length;
		const sizeCount = errors.filter((e) => e === 'size').length;
		const messages: string[] = [];
		if (typeCount) {
			messages.push(`${typeCount} file(s) skipped: type not accepted`);
		}
		if (sizeCount) {
			messages.push(`${sizeCount} file(s) skipped: exceeds the ${formatSize(maxSize)} limit`);
		}
		if (errors.includes('maxFiles')) {
			messages.push(`Maximum ${maxFiles} files reached`);
		}
		if (errors.includes('totalSize')) {
			messages.push('Total size limit exceeded');
		}
		validationError.value = messages.length ? messages.join('. ') : null;
	}

	function handleChange(e: Event) {
		const input = e.target as HTMLInputElement;
		const files = input.files;
		if (files?.length) {
			processFiles(Array.from(files));
		}
		// Reset input so the same file(s) can be re-selected
		if (inputRef.current) {
			inputRef.current.value = '';
		}
	}

	function handleDrop(e: DragEvent) {
		const files = e.dataTransfer?.files;
		if (files?.length) {
			processFiles(Array.from(files));
		}
	}

	function handleRemove(index: number) {
		const removed = selectedFiles.value[index];
		if (!removed) {
			return;
		}
		selectedFiles.value = selectedFiles.value.filter((_, i) => i !== index);
		validationError.value = null;
		onRemove?.(removed);
		if (!selectedFiles.value.length) {
			onClear?.();
		}
	}

	function handleClear() {
		selectedFiles.value = [];
		validationError.value = null;
		if (inputRef.current) {
			inputRef.current.value = '';
		}
		onClear?.();
	}

	const files = selectedFiles.value.map((f) => ({
		name: f.name,
		size: formatSize(f.size),
	}));

	const totalSize = selectedFiles.value.length
		? formatSize(selectedFiles.value.reduce((sum, f) => sum + f.size, 0))
		: undefined;

	return (
		<FormField label={label} required={required} error={displayError} class={className}>
			{/* biome-ignore lint/a11y/noStaticElementInteractions: drag-and-drop enhancement — keyboard access via the file input */}
			<div
				onDragEnter={
					zone
						? (e) => {
								e.preventDefault();
								if (!disabled) {
									dragover.value = true;
								}
							}
						: undefined
				}
				onDragOver={
					zone
						? (e) => {
								e.preventDefault();
							}
						: undefined
				}
				onDragLeave={
					zone
						? (e) => {
								if (!e.currentTarget.contains(e.relatedTarget as Node)) {
									dragover.value = false;
								}
							}
						: undefined
				}
				onDrop={
					zone
						? (e) => {
								e.preventDefault();
								dragover.value = false;
								if (!disabled) {
									handleDrop(e as DragEvent);
								}
							}
						: undefined
				}
			>
				<input
					ref={inputRef}
					class={styles.fileInputNative}
					type="file"
					name={name}
					accept={accept}
					required={required}
					disabled={disabled}
					multiple={multiple || undefined}
					onChange={handleChange}
				/>
				{zone ? (
					<FileZone
						disabled={!!disabled}
						dragover={dragover.value}
						files={files}
						totalSize={totalSize}
						multiple={!!multiple}
						onRemove={handleRemove}
						onClear={handleClear}
					/>
				) : (
					<FileButton
						disabled={!!disabled}
						files={files}
						totalSize={totalSize}
						multiple={!!multiple}
						onClear={handleClear}
					/>
				)}
			</div>
		</FormField>
	);
};

export default FileInput;
