import Spinner from '@components/Spinner';
import type { FunctionComponent } from 'preact';

export const SpinnerSection: FunctionComponent = () => (
	<div class="dev-section">
		<h2>Spinner</h2>
		<div class="dev-row" style="align-items: center;">
			<Spinner size="sm" />
			<Spinner />
			<Spinner size="lg" />
			<Spinner label="Saving…" />
		</div>
	</div>
);
