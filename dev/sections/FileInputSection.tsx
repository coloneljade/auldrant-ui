import FileInput from '@components/FileInput';
import { useSignal } from '@preact/signals';
import type { FunctionComponent } from 'preact';

export const FileInputSection: FunctionComponent = () => {
	const buttonFile = useSignal('');
	const zoneFile = useSignal('');
	const multiButtonFiles = useSignal<string[]>([]);
	const multiZoneFiles = useSignal<string[]>([]);

	return (
		<div class="dev-section">
			<h2>FileInput</h2>

			<h3>Button (default)</h3>
			<div class="dev-row">
				<FileInput
					label="Resume"
					name="demo-resume"
					accept=".pdf,.docx"
					maxSize={5 * 1024 * 1024}
					onSelect={(files) => {
						buttonFile.value = files[0]?.name ?? '';
					}}
					onClear={() => {
						buttonFile.value = '';
					}}
				/>
				{buttonFile.value && <p>Selected: {buttonFile.value}</p>}
			</div>

			<h3>Button — Disabled</h3>
			<div class="dev-row">
				<FileInput
					label="Resume (disabled)"
					name="demo-resume-disabled"
					accept=".pdf"
					maxSize={5 * 1024 * 1024}
					disabled
					onSelect={() => {}}
				/>
			</div>

			<h3>Button — Error</h3>
			<div class="dev-row">
				<FileInput
					label="Resume (error)"
					name="demo-resume-error"
					accept=".pdf"
					maxSize={5 * 1024 * 1024}
					error="Please upload a valid PDF"
					onSelect={() => {}}
				/>
			</div>

			<h3>Zone</h3>
			<div class="dev-row">
				<FileInput
					label="Photo"
					name="demo-photo"
					zone
					accept="image/*"
					maxSize={10 * 1024 * 1024}
					onSelect={(files) => {
						zoneFile.value = files[0]?.name ?? '';
					}}
					onClear={() => {
						zoneFile.value = '';
					}}
				/>
				{zoneFile.value && <p>Selected: {zoneFile.value}</p>}
			</div>

			<h3>Zone — Disabled</h3>
			<div class="dev-row">
				<FileInput
					label="Photo (disabled)"
					name="demo-photo-disabled"
					zone
					accept="image/*"
					maxSize={10 * 1024 * 1024}
					disabled
					onSelect={() => {}}
				/>
			</div>

			<h3>Zone — Error</h3>
			<div class="dev-row">
				<FileInput
					label="Photo (error)"
					name="demo-photo-error"
					zone
					accept="image/*"
					maxSize={10 * 1024 * 1024}
					error="Image is required"
					onSelect={() => {}}
				/>
			</div>

			<h3>Button — Multiple</h3>
			<div class="dev-row">
				<FileInput
					label="Attachments"
					name="demo-attachments"
					accept=".pdf,.docx,.txt"
					maxSize={5 * 1024 * 1024}
					multiple
					maxFiles={5}
					onSelect={(files) => {
						multiButtonFiles.value = files.map((f) => f.name);
					}}
					onClear={() => {
						multiButtonFiles.value = [];
					}}
				/>
				{multiButtonFiles.value.length > 0 && <p>Selected: {multiButtonFiles.value.join(', ')}</p>}
			</div>

			<h3>Zone — Multiple (max 3 files, 5 MB total)</h3>
			<div class="dev-row">
				<FileInput
					label="Photos"
					name="demo-photos"
					zone
					accept="image/*"
					maxSize={5 * 1024 * 1024}
					multiple
					maxFiles={3}
					maxTotalSize={5 * 1024 * 1024}
					onSelect={(files) => {
						multiZoneFiles.value = files.map((f) => f.name);
					}}
					onRemove={(file) => {
						multiZoneFiles.value = multiZoneFiles.value.filter((n) => n !== file.name);
					}}
					onClear={() => {
						multiZoneFiles.value = [];
					}}
				/>
				{multiZoneFiles.value.length > 0 && <p>Selected: {multiZoneFiles.value.join(', ')}</p>}
			</div>

			<h3>Zone — Multiple (Disabled)</h3>
			<div class="dev-row">
				<FileInput
					label="Documents (disabled)"
					name="demo-documents-disabled"
					zone
					accept=".pdf"
					maxSize={10 * 1024 * 1024}
					multiple
					disabled
					onSelect={() => {}}
				/>
			</div>
		</div>
	);
};
