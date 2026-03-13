import type { IAccordionItem } from '@components/Accordion';
import Accordion from '@components/Accordion';
import type { FunctionComponent } from 'preact';

const multiExpandItems: IAccordionItem[] = [
	{
		id: 'getting-started',
		trigger: 'Getting started',
		content: (
			<p>
				Install the library with <code>bun add @auldrant/ui</code> and import the stylesheet.
			</p>
		),
		defaultOpen: true,
	},
	{
		id: 'configuration',
		trigger: 'Configuration',
		content: (
			<p>
				Wrap your app in a <code>&lt;Theme&gt;</code> component to apply design tokens.
			</p>
		),
	},
	{
		id: 'customisation',
		trigger: 'Customisation',
		content: (
			<p>
				Override <code>--aui-base-primary</code> and other base tokens to theme the library.
			</p>
		),
	},
];

const exclusiveItems: IAccordionItem[] = [
	{
		id: 'faq-1',
		trigger: 'What browsers are supported?',
		content: <p>All modern browsers — Chrome, Firefox, Safari, and Edge. No IE11 support.</p>,
	},
	{
		id: 'faq-2',
		trigger: 'Is server-side rendering supported?',
		content: (
			<p>
				Yes. The library uses Preact, which supports SSR via <code>preact-render-to-string</code>.
			</p>
		),
	},
	{
		id: 'faq-3',
		trigger: 'Can I use this with React?',
		content: (
			<p>
				Not directly, but Preact's compatibility layer (<code>preact/compat</code>) allows
				React-targeted code to use Preact components.
			</p>
		),
	},
];

const richContentItems: IAccordionItem[] = [
	{
		id: 'rich',
		trigger: 'Panel with rich content',
		content: (
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
		),
		defaultOpen: true,
	},
	{
		id: 'short',
		trigger: 'Short panel',
		content: <p>Brief content.</p>,
	},
];

export const AccordionSection: FunctionComponent = () => (
	<div class="dev-section">
		<h2>Accordion</h2>

		<h3>Multi-expand (default) — first item open</h3>
		<Accordion items={multiExpandItems} />

		<h3>Exclusive mode (FAQ)</h3>
		<Accordion items={exclusiveItems} exclusive />

		<h3>Rich content — variable height</h3>
		<Accordion items={richContentItems} />
	</div>
);
