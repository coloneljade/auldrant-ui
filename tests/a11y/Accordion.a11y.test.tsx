import { describe, expect, it } from 'bun:test';
import Accordion, { AccordionItem } from '@components/Accordion';
import { fireEvent, render } from '@testing-library/preact';
import { renderAndCheckA11y } from './setup';

describe('Accordion a11y', () => {
	it('has no axe violations — all collapsed (baseline)', async () => {
		await renderAndCheckA11y(
			<Accordion>
				<AccordionItem id="what" label="What is an accordion?">
					<p>
						An accordion is a vertically stacked set of interactive headings that each reveal a
						section of content.
					</p>
				</AccordionItem>
				<AccordionItem id="why" label="Why use an accordion?">
					<div>
						<p>
							Accordions help manage vertical space by hiding content until the user requests it.
						</p>
						<ul>
							<li>Reduces cognitive load</li>
							<li>Keeps the page scannable</li>
						</ul>
					</div>
				</AccordionItem>
				<AccordionItem id="when" label="When should I avoid them?">
					<p>Avoid accordions when users need to compare content across sections frequently.</p>
				</AccordionItem>
			</Accordion>
		);
	});

	it('has no axe violations — first item expanded', async () => {
		await renderAndCheckA11y(
			<Accordion>
				<AccordionItem id="what" label="What is an accordion?" defaultOpen>
					<p>An accordion is a vertically stacked set of interactive headings.</p>
				</AccordionItem>
				<AccordionItem id="why" label="Why use an accordion?">
					<p>Accordions help manage vertical space.</p>
				</AccordionItem>
				<AccordionItem id="when" label="When should I avoid them?">
					<p>Avoid accordions when users need to compare content.</p>
				</AccordionItem>
			</Accordion>
		);
	});

	it('has no axe violations — exclusive mode, one item open', async () => {
		await renderAndCheckA11y(
			<Accordion exclusive>
				<AccordionItem id="what" label="What is an accordion?">
					<p>An accordion is a vertically stacked set of interactive headings.</p>
				</AccordionItem>
				<AccordionItem id="why" label="Why use an accordion?" defaultOpen>
					<p>Accordions help manage vertical space.</p>
				</AccordionItem>
				<AccordionItem id="when" label="When should I avoid them?">
					<p>Avoid accordions when users need to compare content.</p>
				</AccordionItem>
			</Accordion>
		);
	});

	it('WCAG SC 4.1.2: each trigger has an accessible name from its label text', () => {
		const { getByRole } = render(
			<Accordion>
				<AccordionItem id="what" label="What is an accordion?">
					<p>Content.</p>
				</AccordionItem>
				<AccordionItem id="why" label="Why use an accordion?">
					<p>Content.</p>
				</AccordionItem>
				<AccordionItem id="when" label="When should I avoid them?">
					<p>Content.</p>
				</AccordionItem>
			</Accordion>
		);

		getByRole('button', { name: 'What is an accordion?' });
		getByRole('button', { name: 'Why use an accordion?' });
		getByRole('button', { name: 'When should I avoid them?' });
	});

	it('WCAG SC 4.1.2: aria-expanded is present on all triggers', () => {
		const { getAllByRole } = render(
			<Accordion>
				<AccordionItem id="what" label="What is an accordion?">
					<p>Content.</p>
				</AccordionItem>
				<AccordionItem id="why" label="Why use an accordion?">
					<p>Content.</p>
				</AccordionItem>
			</Accordion>
		);
		const buttons = getAllByRole('button');

		for (const button of buttons) {
			expect(button.hasAttribute('aria-expanded')).toBe(true);
		}
	});

	it('WCAG SC 4.1.2: aria-expanded updates correctly on toggle', () => {
		const { getByRole } = render(
			<Accordion>
				<AccordionItem id="what" label="What is an accordion?">
					<p>Content.</p>
				</AccordionItem>
			</Accordion>
		);
		const trigger = getByRole('button', { name: 'What is an accordion?' });

		expect(trigger.getAttribute('aria-expanded')).toBe('false');

		fireEvent.click(trigger);
		expect(trigger.getAttribute('aria-expanded')).toBe('true');

		fireEvent.click(trigger);
		expect(trigger.getAttribute('aria-expanded')).toBe('false');
	});

	describe('WCAG SC 2.1.1: keyboard navigation between triggers', () => {
		it('ArrowDown moves focus to the next header trigger', () => {
			const { getByRole } = render(
				<Accordion>
					<AccordionItem id="what" label="What is an accordion?">
						<p>Content.</p>
					</AccordionItem>
					<AccordionItem id="why" label="Why use an accordion?">
						<p>Content.</p>
					</AccordionItem>
				</Accordion>
			);
			const first = getByRole('button', { name: 'What is an accordion?' });
			const second = getByRole('button', { name: 'Why use an accordion?' });

			fireEvent.keyDown(first, { key: 'ArrowDown' });

			expect(document.activeElement).toBe(second);
		});

		it('ArrowUp moves focus to the previous header trigger', () => {
			const { getByRole } = render(
				<Accordion>
					<AccordionItem id="what" label="What is an accordion?">
						<p>Content.</p>
					</AccordionItem>
					<AccordionItem id="why" label="Why use an accordion?">
						<p>Content.</p>
					</AccordionItem>
				</Accordion>
			);
			const first = getByRole('button', { name: 'What is an accordion?' });
			const second = getByRole('button', { name: 'Why use an accordion?' });

			fireEvent.keyDown(second, { key: 'ArrowUp' });

			expect(document.activeElement).toBe(first);
		});

		it('Home moves focus to the first header trigger', () => {
			const { getByRole } = render(
				<Accordion>
					<AccordionItem id="what" label="What is an accordion?">
						<p>Content.</p>
					</AccordionItem>
					<AccordionItem id="why" label="Why use an accordion?">
						<p>Content.</p>
					</AccordionItem>
					<AccordionItem id="when" label="When should I avoid them?">
						<p>Content.</p>
					</AccordionItem>
				</Accordion>
			);
			const first = getByRole('button', { name: 'What is an accordion?' });
			const third = getByRole('button', { name: 'When should I avoid them?' });

			fireEvent.keyDown(third, { key: 'Home' });

			expect(document.activeElement).toBe(first);
		});

		it('End moves focus to the last header trigger', () => {
			const { getByRole } = render(
				<Accordion>
					<AccordionItem id="what" label="What is an accordion?">
						<p>Content.</p>
					</AccordionItem>
					<AccordionItem id="why" label="Why use an accordion?">
						<p>Content.</p>
					</AccordionItem>
					<AccordionItem id="when" label="When should I avoid them?">
						<p>Content.</p>
					</AccordionItem>
				</Accordion>
			);
			const first = getByRole('button', { name: 'What is an accordion?' });
			const third = getByRole('button', { name: 'When should I avoid them?' });

			fireEvent.keyDown(first, { key: 'End' });

			expect(document.activeElement).toBe(third);
		});
	});
});
