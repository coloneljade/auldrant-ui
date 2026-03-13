import Textarea from '@components/Textarea';
import type { FunctionComponent } from 'preact';

export const TextareaSection: FunctionComponent = () => (
	<div class="dev-section">
		<h2>Textarea</h2>
		<div class="dev-stack">
			<Textarea label="Message" name="message" maxChars={200} placeholder="Type a message..." />
			<Textarea label="Disabled" name="msg-dis" maxChars={100} disabled />
			<Textarea label="With error" name="msg-err" maxChars={50} error="Too short" />
		</div>
	</div>
);
