import Accordion, { AccordionItem } from '@components/Accordion';
import { IconName } from '@components/Icon';
import type { FunctionComponent } from 'preact';

export const AccordionSection: FunctionComponent = () => (
	<div class="dev-section">
		<h2>Accordion</h2>

		<h3>Multi-expand (default) — first item open</h3>
		<Accordion>
			<AccordionItem id="getting-started" label="Getting started" defaultOpen>
				<p>
					Install the library with <code>bun add @auldrant/ui</code> and import the stylesheet.
				</p>
			</AccordionItem>
			<AccordionItem id="configuration" label="Configuration">
				<p>
					Wrap your app in a <code>&lt;Theme&gt;</code> component to apply design tokens.
				</p>
			</AccordionItem>
			<AccordionItem id="customisation" label="Customisation">
				<p>
					Override <code>--aui-base-primary</code> and other base tokens to theme the library.
				</p>
			</AccordionItem>
		</Accordion>

		<h3>Exclusive mode (FAQ)</h3>
		<Accordion exclusive>
			<AccordionItem id="faq-1" label="What browsers are supported?">
				<p>All modern browsers — Chrome, Firefox, Safari, and Edge. No IE11 support.</p>
			</AccordionItem>
			<AccordionItem id="faq-2" label="Is server-side rendering supported?">
				<p>
					Yes. The library uses Preact, which supports SSR via <code>preact-render-to-string</code>.
				</p>
			</AccordionItem>
			<AccordionItem id="faq-3" label="Can I use this with React?">
				<p>
					Not directly, but Preact's compatibility layer (<code>preact/compat</code>) allows
					React-targeted code to use Preact components.
				</p>
			</AccordionItem>
		</Accordion>

		<h3>With icons — every item</h3>
		<Accordion>
			<AccordionItem id="icon-status" label="Status" icon={IconName.info} defaultOpen>
				<p>Informational status message.</p>
			</AccordionItem>
			<AccordionItem id="icon-warnings" label="Warnings" icon={IconName.warning}>
				<p>Warning details.</p>
			</AccordionItem>
			<AccordionItem id="icon-settings" label="Settings" icon={IconName.settings}>
				<p>Settings configuration panel.</p>
			</AccordionItem>
		</Accordion>

		<h3>Mixed — some items have icons, some don't</h3>
		<Accordion>
			<AccordionItem id="mixed-plain" label="Plain item">
				<p>No icon.</p>
			</AccordionItem>
			<AccordionItem id="mixed-icon" label="With icon" icon={IconName.search}>
				<p>This item has a leading icon.</p>
			</AccordionItem>
			<AccordionItem id="mixed-plain-2" label="Another plain item">
				<p>Also no icon.</p>
			</AccordionItem>
		</Accordion>

		<h3>Rich content — variable height</h3>
		<Accordion>
			<AccordionItem id="rich" label="Panel with rich content" defaultOpen>
				<div>
					<p>
						This panel contains a paragraph and a list to verify that the animation handles
						variable-height content correctly.
					</p>
					<ul>
						<li>First item in the list</li>
						<li>Second item in the list</li>
						<li>Third item — a bit longer to push the height up further</li>
					</ul>
				</div>
			</AccordionItem>
			<AccordionItem id="short" label="Short panel">
				<p>Brief content.</p>
			</AccordionItem>
		</Accordion>
	</div>
);
