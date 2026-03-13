import { describe, expect, it } from 'bun:test';
import type { IAccordionItem } from '@components/Accordion';
import Accordion from '@components/Accordion';
import { fireEvent, render } from '@testing-library/preact';
import { renderAndCheckA11y } from './setup';

const items: IAccordionItem[] = [
	{
		id: 'what',
		trigger: 'What is an accordion?',
		content: (
			<p>
				An accordion is a vertically stacked set of interactive headings that each reveal a section
				of content.
			</p>
		),
	},
	{
		id: 'why',
		trigger: 'Why use an accordion?',
		content: (
			<div>
				<p>Accordions help manage vertical space by hiding content until the user requests it.</p>
				<ul>
					<li>Reduces cognitive load</li>
					<li>Keeps the page scannable</li>
				</ul>
			</div>
		),
	},
	{
		id: 'when',
		trigger: 'When should I avoid them?',
		content: <p>Avoid accordions when users need to compare content across sections frequently.</p>,
	},
];

describe('Accordion a11y', () => {
	it('has no axe violations — all collapsed (baseline)', async () => {
		await renderAndCheckA11y(<Accordion items={items} />);
	});

	it('has no axe violations — first item expanded', async () => {
		const openItems = items.map((item, i) => ({ ...item, defaultOpen: i === 0 }));
		await renderAndCheckA11y(<Accordion items={openItems} />);
	});

	it('has no axe violations — exclusive mode, one item open', async () => {
		const openItems = items.map((item, i) => ({ ...item, defaultOpen: i === 1 }));
		await renderAndCheckA11y(<Accordion items={openItems} exclusive />);
	});

	it('WCAG SC 4.1.2: each trigger has an accessible name from its label text', () => {
		const { getByRole } = render(<Accordion items={items} />);

		getByRole('button', { name: 'What is an accordion?' });
		getByRole('button', { name: 'Why use an accordion?' });
		getByRole('button', { name: 'When should I avoid them?' });
	});

	it('WCAG SC 4.1.2: aria-expanded is present on all triggers', () => {
		const { getAllByRole } = render(<Accordion items={items} />);
		const buttons = getAllByRole('button');

		for (const button of buttons) {
			expect(button.hasAttribute('aria-expanded')).toBe(true);
		}
	});

	it('WCAG SC 4.1.2: aria-expanded updates correctly on toggle', () => {
		const { getByRole } = render(<Accordion items={items} />);
		const trigger = getByRole('button', { name: 'What is an accordion?' });

		expect(trigger.getAttribute('aria-expanded')).toBe('false');

		fireEvent.click(trigger);
		expect(trigger.getAttribute('aria-expanded')).toBe('true');

		fireEvent.click(trigger);
		expect(trigger.getAttribute('aria-expanded')).toBe('false');
	});
});
