import type { FunctionComponent } from 'preact';

export const ThemeSwatches: FunctionComponent = () => (
	<div class="dev-section">
		<h2>Token Swatches</h2>
		<div class="dev-swatch-grid">
			<div
				class="dev-swatch"
				style="background: var(--aui-color-background); border: 1px solid var(--aui-color-border);"
			>
				<div style="color: var(--aui-color-text);">Text</div>
				<div class="dev-swatch-label">color-text on background</div>
			</div>
			<div
				class="dev-swatch"
				style="background: var(--aui-color-background); border: 1px solid var(--aui-color-border);"
			>
				<div style="color: var(--aui-color-text-muted);">Muted</div>
				<div class="dev-swatch-label">text-muted on background</div>
			</div>
			<div
				class="dev-swatch"
				style="background: var(--aui-color-surface); border: 1px solid var(--aui-color-border);"
			>
				<div style="color: var(--aui-color-text);">Surface</div>
				<div class="dev-swatch-label">text on surface</div>
			</div>
			<div
				class="dev-swatch"
				style="background: var(--aui-color-background); border: 1px solid var(--aui-color-border);"
			>
				<div style="color: var(--aui-color-primary);">Primary</div>
				<div class="dev-swatch-label">primary on background</div>
			</div>
			<div
				class="dev-swatch"
				style="background: var(--aui-color-background); border: 1px solid var(--aui-color-border);"
			>
				<div style="color: var(--aui-color-primary-hover);">Hover</div>
				<div class="dev-swatch-label">primary-hover on background</div>
			</div>
			<div
				class="dev-swatch"
				style="background: var(--aui-color-background); border: 1px solid var(--aui-color-border);"
			>
				<div style="color: var(--aui-color-error);">Error</div>
				<div class="dev-swatch-label">error on background</div>
			</div>
			<div
				class="dev-swatch"
				style="background: var(--aui-color-background); border: 1px solid var(--aui-color-border);"
			>
				<div style="color: var(--aui-color-success);">Success</div>
				<div class="dev-swatch-label">success on background</div>
			</div>
			<div
				class="dev-swatch"
				style="background: var(--aui-color-background-hover); border: 1px solid var(--aui-color-border);"
			>
				<div style="color: var(--aui-color-text);">Hover BG</div>
				<div class="dev-swatch-label">text on background-hover</div>
			</div>
			<div
				class="dev-swatch"
				style="background: var(--aui-color-primary); color: var(--aui-color-background);"
			>
				<div>Button Fill</div>
				<div class="dev-swatch-label">background on primary</div>
			</div>
			<div
				class="dev-swatch"
				style="background: var(--aui-color-background); border: 2px solid var(--aui-color-border);"
			>
				<div style="color: var(--aui-color-text);">Border</div>
				<div class="dev-swatch-label">border vs background</div>
			</div>
			<div
				class="dev-swatch"
				style="background: var(--aui-color-background); outline: 2px solid var(--aui-color-focus-ring); outline-offset: 2px;"
			>
				<div style="color: var(--aui-color-text);">Focus</div>
				<div class="dev-swatch-label">focus-ring outline</div>
			</div>
		</div>
	</div>
);
