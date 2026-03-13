import { AlertVariant } from '@components/Alert';
import Badge from '@components/Badge';
import type { FunctionComponent } from 'preact';

export const BadgeSection: FunctionComponent = () => (
	<div class="dev-section">
		<h2>Badge</h2>
		<div class="dev-row" style="align-items: center; flex-wrap: wrap; gap: 0.5em;">
			<Badge>Neutral</Badge>
			<Badge variant={AlertVariant.success}>Active</Badge>
			<Badge variant={AlertVariant.warning}>Pending</Badge>
			<Badge variant={AlertVariant.error}>Failed</Badge>
			<Badge>42</Badge>
			<Badge variant={AlertVariant.success}>✓ Verified</Badge>
		</div>
	</div>
);
