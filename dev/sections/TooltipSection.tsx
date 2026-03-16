import Button from '@components/Button';
import Icon, { IconName } from '@components/Icon';
import Tooltip from '@components/Tooltip';
import type { FunctionComponent } from 'preact';

export const TooltipSection: FunctionComponent = () => (
	<div class="dev-section">
		<h2>Tooltip</h2>

		<h3>Default — button trigger (200ms delay)</h3>
		<div class="dev-row">
			<Tooltip content="Save your work">
				<Button label="Save" onClick={() => {}} />
			</Tooltip>
		</div>

		<h3>Long content — wrapping text</h3>
		<div class="dev-row">
			<Tooltip content="This action will permanently delete the selected items and cannot be undone. Make sure you have a backup.">
				<Button label="Delete all" onClick={() => {}} />
			</Tooltip>
		</div>

		<h3>Icon trigger — aria-describedby use case</h3>
		<div class="dev-row">
			<Tooltip content="Upload a file">
				<button type="button" aria-label="Upload">
					<Icon name={IconName.upload} />
				</button>
			</Tooltip>
		</div>

		<h3>Instant — delay=0</h3>
		<div class="dev-row">
			<Tooltip content="Appears immediately" delay={0}>
				<Button label="Hover me" onClick={() => {}} />
			</Tooltip>
		</div>
	</div>
);
