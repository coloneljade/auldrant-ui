import CurrencyInput from '@components/CurrencyInput';
import { useSignal } from '@preact/signals';
import type { FunctionComponent } from 'preact';

export const CurrencyInputSection: FunctionComponent = () => {
	const usd = useSignal(1234.56);
	const yen = useSignal(98500);
	const euro = useSignal(1234.56);
	const amount = useSignal(9876.5);

	return (
		<div class="dev-section">
			<h2>CurrencyInput</h2>
			<div class="dev-row">
				<CurrencyInput
					label="USD"
					name="price"
					value={usd.value}
					currency="USD"
					locale="en-US"
					onInput={(v) => {
						usd.value = v;
					}}
				/>
				<CurrencyInput
					label="Yen"
					name="yen"
					value={yen.value}
					currency="JPY"
					locale="ja-JP"
					onInput={(v) => {
						yen.value = v;
					}}
				/>
				<CurrencyInput
					label="Euro (DE)"
					name="euro"
					value={euro.value}
					currency="EUR"
					locale="de-DE"
					onInput={(v) => {
						euro.value = v;
					}}
				/>
				<CurrencyInput
					label="No currency"
					name="amount"
					value={amount.value}
					locale="en-US"
					onInput={(v) => {
						amount.value = v;
					}}
				/>
				<CurrencyInput label="Disabled" name="price-dis" value={99.99} currency="USD" disabled />
				<CurrencyInput label="With error" name="price-err" error="Must be a positive amount" />
			</div>
		</div>
	);
};
