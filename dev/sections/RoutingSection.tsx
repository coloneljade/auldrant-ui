import Button from '@components/Button';
import Input from '@components/Input';
import { signal } from '@preact/signals';
import { navigate } from '@signals/routing';
import type { FunctionComponent } from 'preact';

const routePath = signal('');

export const RoutingSection: FunctionComponent = () => (
	<div class="dev-section">
		<h2>Routing</h2>
		<p>Navigate to any path. Unknown paths show the catch-all NotFound page.</p>
		<form
			class="dev-row"
			onSubmit={(e) => {
				e.preventDefault();
				if (routePath.value) {
					navigate(routePath.value);
				}
			}}
		>
			<Input
				label="Path"
				name="nav-path"
				placeholder="/about"
				value={routePath.value}
				onInput={(val) => {
					routePath.value = val;
				}}
			/>
			<Button type="submit" label="Navigate" />
		</form>
	</div>
);
