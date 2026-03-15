import SearchInput from '@components/SearchInput';
import { useSignal } from '@preact/signals';
import type { FunctionComponent } from 'preact';

export const SearchInputSection: FunctionComponent = () => {
	const value = useSignal('');
	const submitted = useSignal('');

	return (
		<div class="dev-section">
			<h2>SearchInput</h2>

			<h3>Default</h3>
			<div class="dev-row">
				<SearchInput
					label="Search"
					name="demo-search"
					value={value.value}
					placeholder="Type to search…"
					onInput={(v) => {
						value.value = v;
					}}
					onClear={() => {
						value.value = '';
						submitted.value = '';
					}}
					onSubmit={(v) => {
						submitted.value = v;
					}}
				/>
				{submitted.value && <p>Submitted: {submitted.value}</p>}
			</div>

			<h3>Disabled</h3>
			<div class="dev-row">
				<SearchInput
					label="Search (disabled)"
					name="demo-search-disabled"
					value="locked query"
					disabled
				/>
			</div>

			<h3>Error</h3>
			<div class="dev-row">
				<SearchInput label="Search (error)" name="demo-search-error" error="No results found" />
			</div>
		</div>
	);
};
