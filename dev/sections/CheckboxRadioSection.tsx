import Checkbox from '@components/Checkbox';
import CheckboxGroup from '@components/CheckboxGroup';
import RadioGroup, { RadioItem } from '@components/RadioGroup';
import type { FunctionComponent } from 'preact';

export const CheckboxRadioSection: FunctionComponent = () => (
	<div class="dev-section">
		<h2>Checkbox / RadioGroup</h2>
		<div class="dev-row">
			<Checkbox label="Accept terms" name="terms" />
			<Checkbox label="Checked" name="checked" checked />
			<Checkbox label="Disabled" name="cb-dis" disabled />
		</div>
		<div class="dev-row">
			<RadioGroup legend="Preference" name="pref">
				<RadioItem label="Option A" value="a" />
				<RadioItem label="Option B" value="b" />
				<RadioItem label="Option C" value="c" />
			</RadioGroup>
			<RadioGroup legend="Disabled group" name="pref-dis" disabled>
				<RadioItem label="X" value="x" />
				<RadioItem label="Y" value="y" />
			</RadioGroup>
		</div>
		<div class="dev-row">
			<CheckboxGroup legend="Toppings">
				<Checkbox name="cheese" label="Cheese" />
				<Checkbox name="lettuce" label="Lettuce" checked />
				<Checkbox name="tomato" label="Tomato" checked />
				<Checkbox name="pickles" label="Pickles" />
			</CheckboxGroup>
			<CheckboxGroup legend="Disabled items">
				<Checkbox name="dis-a" label="Option A" disabled />
				<Checkbox name="dis-b" label="Option B" disabled checked />
			</CheckboxGroup>
			<CheckboxGroup legend="With error" error="Select at least one option">
				<Checkbox name="err-a" label="Option A" />
				<Checkbox name="err-b" label="Option B" />
			</CheckboxGroup>
		</div>
	</div>
);
