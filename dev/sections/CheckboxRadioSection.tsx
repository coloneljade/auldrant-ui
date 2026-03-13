import Checkbox from '@components/Checkbox';
import RadioGroup from '@components/RadioGroup';
import type { FunctionComponent } from 'preact';

export const CheckboxRadioSection: FunctionComponent = () => (
	<div class="dev-section">
		<h2>Checkbox / RadioGroup</h2>
		<div class="dev-row">
			<div class="dev-stack">
				<Checkbox label="Accept terms" name="terms" />
				<Checkbox label="Checked" name="checked" checked />
				<Checkbox label="Disabled" name="cb-dis" disabled />
			</div>
			<RadioGroup
				legend="Preference"
				name="pref"
				options={[
					{ label: 'Option A', value: 'a' },
					{ label: 'Option B', value: 'b' },
					{ label: 'Option C', value: 'c' },
				]}
			/>
			<RadioGroup
				legend="Disabled group"
				name="pref-dis"
				disabled
				options={[
					{ label: 'X', value: 'x' },
					{ label: 'Y', value: 'y' },
				]}
			/>
		</div>
	</div>
);
