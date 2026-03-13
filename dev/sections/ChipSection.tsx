import Chip, { ChipVariant } from '@components/Chip';
import { useSignal } from '@preact/signals';
import type { FunctionComponent } from 'preact';

export const ChipSection: FunctionComponent = () => {
	const tags = useSignal(['TypeScript', 'Preact', 'CSS Modules', 'Accessibility']);

	return (
		<div class="dev-section">
			<h2>Chip</h2>
			<h3>Variants (static)</h3>
			<div class="dev-row" style="flex-wrap: wrap; gap: 0.5em;">
				<Chip label="Neutral" />
				<Chip label="Success" variant={ChipVariant.success} />
				<Chip label="Warning" variant={ChipVariant.warning} />
				<Chip label="Error" variant={ChipVariant.error} />
			</div>
			<h3>Dismissible</h3>
			<div class="dev-row" style="flex-wrap: wrap; gap: 0.5em;">
				<Chip label="Neutral" onRemove={() => {}} />
				<Chip label="Success" variant={ChipVariant.success} onRemove={() => {}} />
				<Chip label="Warning" variant={ChipVariant.warning} onRemove={() => {}} />
				<Chip label="Error" variant={ChipVariant.error} onRemove={() => {}} />
				<Chip label="Disabled" onRemove={() => {}} disabled />
			</div>
			<h3>Interactive tag list</h3>
			<div class="dev-row" style="flex-wrap: wrap; gap: 0.5em;">
				{tags.value.map((tag) => (
					<Chip
						key={tag}
						label={tag}
						variant={ChipVariant.neutral}
						onRemove={() => {
							tags.value = tags.value.filter((t) => t !== tag);
						}}
					/>
				))}
			</div>
			{tags.value.length === 0 && (
				<p style="font-size: 0.875em; color: var(--aui-color-text-muted);">
					All chips removed.{' '}
					<button
						type="button"
						style="font: inherit; color: var(--aui-color-primary); cursor: pointer; background: none; border: none; padding: 0; text-decoration: underline;"
						onClick={() => (tags.value = ['TypeScript', 'Preact', 'CSS Modules', 'Accessibility'])}
					>
						Reset
					</button>
				</p>
			)}
		</div>
	);
};
