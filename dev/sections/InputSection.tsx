import Input from '@components/Input';
import type { FunctionComponent } from 'preact';

export const InputSection: FunctionComponent = () => (
	<div class="dev-section">
		<h2>Input</h2>
		<div class="dev-row">
			<Input label="Text" name="text" />
			<Input label="Email" name="email" type="email" />
			<Input label="URL" name="url" type="url" placeholder="https://..." />
		</div>
		<div class="dev-row">
			<Input label="Required" name="req" required />
			<Input label="Disabled" name="dis" disabled />
			<Input label="With error" name="err" error="This field is required" />
		</div>
		<div class="dev-row">
			<Input label="Date" name="date" type="date" />
			<Input label="Time" name="time" type="time" />
			<Input label="Date & Time" name="datetime" type="datetime-local" />
		</div>
	</div>
);
