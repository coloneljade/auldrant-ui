import Section from '@components/Section';
import type { FunctionComponent } from 'preact';

export const SectionDemo: FunctionComponent = () => (
	<div class="dev-section">
		<h2>Section (nested)</h2>
		<Section title="Parent Section">
			<p>Top-level section content.</p>
			<Section title="Child Section" level={3}>
				<p>Nested section content.</p>
			</Section>
		</Section>
	</div>
);
