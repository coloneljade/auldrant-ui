import Dropdown, { DropdownItem } from '@components/Dropdown';
import { toast } from '@signals/toasts';
import type { FunctionComponent } from 'preact';

export const DropdownSection: FunctionComponent = () => (
	<div class="dev-section">
		<h2>Dropdown</h2>

		<h3>Default</h3>
		<div class="dev-row">
			<Dropdown trigger="File">
				<DropdownItem onSelect={() => toast('New file')}>New</DropdownItem>
				<DropdownItem onSelect={() => toast('Opened')}>Open</DropdownItem>
				<DropdownItem onSelect={() => toast('Saved')}>Save</DropdownItem>
				<DropdownItem onSelect={() => toast('Exported')}>Export</DropdownItem>
			</Dropdown>
		</div>

		<h3>With disabled items</h3>
		<div class="dev-row">
			<Dropdown trigger="Edit">
				<DropdownItem onSelect={() => toast('Cut')}>Cut</DropdownItem>
				<DropdownItem onSelect={() => toast('Copied')}>Copy</DropdownItem>
				<DropdownItem disabled>Paste</DropdownItem>
				<DropdownItem disabled>Undo</DropdownItem>
			</Dropdown>
		</div>

		<h3>Single item</h3>
		<div class="dev-row">
			<Dropdown trigger="Actions">
				<DropdownItem onSelect={() => toast('Deleted')}>Delete</DropdownItem>
			</Dropdown>
		</div>
	</div>
);
