import Button from '@components/Button';
import Card from '@components/Card';
import Input from '@components/Input';
import type { FunctionComponent } from 'preact';

export const CardSection: FunctionComponent = () => (
	<div class="dev-section">
		<h2>Card</h2>
		<div class="dev-row">
			<Card>
				<p>A simple card with text content.</p>
			</Card>
			<Card>
				<h3>Card with heading</h3>
				<p>And some descriptive text below it.</p>
			</Card>
			<Card>
				<Input label="Name" name="card-name" />
				<Button label="Submit" type="submit" />
			</Card>
		</div>
	</div>
);
