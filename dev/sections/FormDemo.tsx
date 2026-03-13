import Card from '@components/Card';
import Checkbox from '@components/Checkbox';
import Form from '@components/Form';
import Input from '@components/Input';
import NumberInput from '@components/NumberInput';
import PasswordInput, { PasswordPurpose } from '@components/PasswordInput';
import Select from '@components/Select';
import Textarea from '@components/Textarea';
import type { FunctionComponent } from 'preact';

export const FormDemo: FunctionComponent = () => (
	<div class="dev-section">
		<h2>Full Form</h2>
		<Card>
			<Form
				onSubmit={(data) => {
					console.log('Form submitted:', Object.fromEntries(data));
				}}
				submitLabel="Create Account"
				resetLabel="Clear"
			>
				<Input label="Full name" name="fullname" required />
				<Input label="Email" name="email" type="email" required />
				<PasswordInput label="Password" name="password" purpose={PasswordPurpose.new} required />
				<NumberInput label="Age" name="age" min={0} max={150} />
				<Select
					label="Country"
					name="country"
					placeholder="Select..."
					options={[
						{ label: 'United States', value: 'us' },
						{ label: 'Canada', value: 'ca' },
						{ label: 'United Kingdom', value: 'uk' },
					]}
				/>
				<Textarea label="Bio" name="bio" maxChars={300} />
				<Checkbox label="I agree to the terms" name="agree" required />
			</Form>
		</Card>
	</div>
);
