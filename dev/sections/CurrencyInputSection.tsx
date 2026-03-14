import CurrencyInput from '@components/CurrencyInput';
import type { FunctionComponent } from 'preact';

export const CurrencyInputSection: FunctionComponent = () => (
	<div class="dev-section">
		<h2>CurrencyInput</h2>
		<div class="dev-row">
			<CurrencyInput label="USD" name="price" value={1234.56} currency="USD" locale="en-US" />
			<CurrencyInput label="Yen" name="yen" value={98500} currency="JPY" locale="ja-JP" />
			<CurrencyInput label="Euro (DE)" name="euro" value={1234.56} currency="EUR" locale="de-DE" />
			<CurrencyInput label="No currency" name="amount" value={9876.5} locale="en-US" />
			<CurrencyInput label="Disabled" name="price-dis" value={99.99} currency="USD" disabled />
			<CurrencyInput label="With error" name="price-err" error="Must be a positive amount" />
		</div>
	</div>
);
