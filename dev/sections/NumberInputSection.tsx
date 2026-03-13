import NumberInput from '@components/NumberInput';
import type { FunctionComponent } from 'preact';

export const NumberInputSection: FunctionComponent = () => (
	<div class="dev-section">
		<h2>NumberInput</h2>
		<div class="dev-row">
			<NumberInput label="Quantity" name="qty" min={0} max={100} />
			<NumberInput label="Disabled" name="qty-dis" disabled />
			<NumberInput label="With error" name="qty-err" error="Must be positive" />
		</div>
	</div>
);
