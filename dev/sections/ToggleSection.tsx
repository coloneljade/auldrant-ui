import Toggle from '@components/Toggle';
import { useSignal } from '@preact/signals';
import type { FunctionComponent } from 'preact';

export const ToggleSection: FunctionComponent = () => {
	const notifications = useSignal(false);
	const darkMode = useSignal(true);

	return (
		<div class="dev-section">
			<h2>Toggle</h2>

			<h3>Interactive</h3>
			<div class="dev-row">
				<Toggle
					label="Enable notifications"
					checked={notifications.value}
					onChange={(v) => {
						notifications.value = v;
					}}
				/>
				<Toggle
					label="Dark mode"
					checked={darkMode.value}
					onChange={(v) => {
						darkMode.value = v;
					}}
				/>
			</div>

			<h3>Disabled</h3>
			<div class="dev-row">
				<Toggle label="Disabled off" checked={false} disabled />
				<Toggle label="Disabled on" checked={true} disabled />
			</div>
		</div>
	);
};
