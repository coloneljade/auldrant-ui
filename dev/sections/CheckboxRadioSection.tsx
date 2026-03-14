import Checkbox, { CheckboxVariant } from '@components/Checkbox';
import RadioGroup, { RadioItem } from '@components/RadioGroup';
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
			<Checkbox label="Highlight unchecked" name="hl-a" variant={CheckboxVariant.highlight} />
			<Checkbox label="Highlight checked" name="hl-b" variant={CheckboxVariant.highlight} checked />
			<Checkbox
				label="Highlight disabled"
				name="hl-c"
				variant={CheckboxVariant.highlight}
				disabled
			/>
		</div>
	</div>
);
