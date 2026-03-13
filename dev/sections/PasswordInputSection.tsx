import PasswordInput, { PasswordPurpose } from '@components/PasswordInput';
import type { FunctionComponent } from 'preact';

export const PasswordInputSection: FunctionComponent = () => (
	<div class="dev-section">
		<h2>PasswordInput</h2>
		<div class="dev-row">
			<PasswordInput label="Current password" name="pw-current" purpose={PasswordPurpose.current} />
			<PasswordInput label="New password" name="pw-new" purpose={PasswordPurpose.new} />
			<PasswordInput label="Disabled" name="pw-dis" purpose={PasswordPurpose.current} disabled />
			<PasswordInput
				label="With error"
				name="pw-err"
				purpose={PasswordPurpose.current}
				error="Password is required"
			/>
		</div>
	</div>
);
