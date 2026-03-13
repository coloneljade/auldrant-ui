import Select from '@components/Select';
import type { FunctionComponent } from 'preact';

export const SelectSection: FunctionComponent = () => (
	<div class="dev-section">
		<h2>Select</h2>
		<div class="dev-row">
			<Select
				label="Color"
				name="color"
				placeholder="Choose..."
				options={[
					{ label: 'Red', value: 'red' },
					{ label: 'Green', value: 'green' },
					{ label: 'Blue', value: 'blue' },
				]}
			/>
			<Select
				label="Grouped"
				name="grouped"
				options={[
					{
						label: 'Fruits',
						options: [
							{ label: 'Apple', value: 'apple' },
							{ label: 'Banana', value: 'banana' },
						],
					},
					{
						label: 'Vegetables',
						options: [
							{ label: 'Carrot', value: 'carrot' },
							{ label: 'Pea', value: 'pea' },
						],
					},
				]}
			/>
			<Select
				label="Disabled"
				name="sel-dis"
				disabled
				options={[{ label: 'Only', value: 'only' }]}
			/>
			<Select
				label="With error"
				name="sel-err"
				error="Selection is required"
				options={[
					{ label: 'Red', value: 'red' },
					{ label: 'Green', value: 'green' },
				]}
			/>
		</div>
	</div>
);
