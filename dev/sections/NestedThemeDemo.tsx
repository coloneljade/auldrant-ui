import Button from '@components/Button';
import Card from '@components/Card';
import Theme from '@components/Theme';
import type { FunctionComponent } from 'preact';

export const NestedThemeDemo: FunctionComponent = () => (
	<div class="dev-section">
		<h2>Nested Theme Override</h2>
		<p>The inner section uses a blue primary via a nested Theme:</p>
		<div class="dev-row" style="margin-top: 1em;">
			<Card>
				<p style="color: var(--aui-color-primary);">Default primary</p>
				<Button label="Default" />
			</Card>
			<Theme class="blue-theme">
				<Card>
					<p style="color: var(--aui-color-primary);">Blue primary</p>
					<Button label="Blue" />
				</Card>
			</Theme>
		</div>
	</div>
);
