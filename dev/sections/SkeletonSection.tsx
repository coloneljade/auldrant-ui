import Skeleton from '@components/Skeleton';
import type { FunctionComponent } from 'preact';

export const SkeletonSection: FunctionComponent = () => (
	<div class="dev-section">
		<h2>Skeleton</h2>

		<h3>Text lines</h3>
		<div class="dev-stack dev-narrow">
			<Skeleton class="dev-skeleton-line-full" />
			<Skeleton class="dev-skeleton-line-75" />
			<Skeleton class="dev-skeleton-line-50" />
		</div>

		<h3>Card block</h3>
		<Skeleton class="dev-skeleton-card" />

		<h3>Avatar (rounded)</h3>
		<Skeleton rounded class="dev-skeleton-avatar" />
	</div>
);
