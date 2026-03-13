import Button from '@components/Button';
import { Search, Trash2, X } from 'lucide-preact';
import type { FunctionComponent } from 'preact';

export const ButtonSection: FunctionComponent = () => (
	<div class="dev-section">
		<h2>Button</h2>
		<div class="dev-row">
			<Button label="Default" />
			<Button label="Submit" type="submit" />
			<Button label="Reset" type="reset" />
			<Button label="Disabled" disabled />
		</div>
		<div class="dev-row" style="margin-top: 0.75em; align-items: center;">
			<span style="color: var(--aui-color-text-muted); font-size: 0.875em;">Icon-only:</span>
			<Button icon={<Search size="1.25em" aria-hidden="true" />} aria-label="Search" />
			<Button icon={<X size="1.25em" aria-hidden="true" />} aria-label="Close" />
			<Button icon={<Trash2 size="1.25em" aria-hidden="true" />} aria-label="Delete" disabled />
		</div>
	</div>
);
