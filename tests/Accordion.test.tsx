import { describe, expect, it } from 'bun:test';
import type { IAccordionItem } from '@components/Accordion';
import Accordion from '@components/Accordion';
import { HeadingLevel } from '@scripts/types';
import { fireEvent, render } from '@testing-library/preact';

const baseItems: IAccordionItem[] = [
	{ id: 'one', trigger: 'Panel one', content: <p>Content one</p> },
	{ id: 'two', trigger: 'Panel two', content: <p>Content two</p> },
	{ id: 'three', trigger: 'Panel three', content: <p>Content three</p> },
];

describe('Accordion', () => {
	describe('rendering', () => {
		it('renders all trigger labels', () => {
			const { getByRole } = render(<Accordion items={baseItems} />);

			getByRole('button', { name: 'Panel one' });
			getByRole('button', { name: 'Panel two' });
			getByRole('button', { name: 'Panel three' });
		});

		it('forwards the class prop to the root element', () => {
			const { container } = render(<Accordion items={baseItems} class="custom-class" />);

			expect(container.firstElementChild?.classList.contains('custom-class')).toBe(true);
		});

		it('throws when two items share the same id', () => {
			const duplicateItems: IAccordionItem[] = [
				{ id: 'dup', trigger: 'First', content: 'A' },
				{ id: 'dup', trigger: 'Second', content: 'B' },
			];

			expect(() => render(<Accordion items={duplicateItems} />)).toThrow(
				'[Accordion] Duplicate item id: "dup". Item ids must be unique.'
			);
		});

		it('throws when an item id contains invalid characters', () => {
			const invalidItems: IAccordionItem[] = [{ id: 'bad id!', trigger: 'First', content: 'A' }];

			expect(() => render(<Accordion items={invalidItems} />)).toThrow(
				'[Accordion] Invalid item id: "bad id!"'
			);
		});
	});

	describe('initial state', () => {
		it('all panels are collapsed by default', () => {
			const { getAllByRole } = render(<Accordion items={baseItems} />);

			const buttons = getAllByRole('button');
			for (const button of buttons) {
				expect(button.getAttribute('aria-expanded')).toBe('false');
			}
		});

		it('item with defaultOpen is expanded on mount', () => {
			const items: IAccordionItem[] = [
				{ id: 'one', trigger: 'Panel one', content: 'Content', defaultOpen: true },
				{ id: 'two', trigger: 'Panel two', content: 'Content' },
			];
			const { getByRole } = render(<Accordion items={items} />);

			expect(getByRole('button', { name: 'Panel one' }).getAttribute('aria-expanded')).toBe('true');
			expect(getByRole('button', { name: 'Panel two' }).getAttribute('aria-expanded')).toBe(
				'false'
			);
		});

		it('multiple defaultOpen items are all open in multi-expand mode', () => {
			const items: IAccordionItem[] = [
				{ id: 'one', trigger: 'Panel one', content: 'Content', defaultOpen: true },
				{ id: 'two', trigger: 'Panel two', content: 'Content', defaultOpen: true },
				{ id: 'three', trigger: 'Panel three', content: 'Content' },
			];
			const { getByRole } = render(<Accordion items={items} />);

			expect(getByRole('button', { name: 'Panel one' }).getAttribute('aria-expanded')).toBe('true');
			expect(getByRole('button', { name: 'Panel two' }).getAttribute('aria-expanded')).toBe('true');
			expect(getByRole('button', { name: 'Panel three' }).getAttribute('aria-expanded')).toBe(
				'false'
			);
		});
	});

	describe('multi-expand (default)', () => {
		it('clicking a collapsed trigger expands it', () => {
			const { getByRole } = render(<Accordion items={baseItems} />);
			const trigger = getByRole('button', { name: 'Panel one' });

			fireEvent.click(trigger);

			expect(trigger.getAttribute('aria-expanded')).toBe('true');
		});

		it('clicking an expanded trigger collapses it', () => {
			const items: IAccordionItem[] = [
				{ id: 'one', trigger: 'Panel one', content: 'Content', defaultOpen: true },
			];
			const { getByRole } = render(<Accordion items={items} />);
			const trigger = getByRole('button', { name: 'Panel one' });

			fireEvent.click(trigger);

			expect(trigger.getAttribute('aria-expanded')).toBe('false');
		});

		it('opening one item does not close another', () => {
			const { getByRole } = render(<Accordion items={baseItems} />);

			fireEvent.click(getByRole('button', { name: 'Panel one' }));
			fireEvent.click(getByRole('button', { name: 'Panel two' }));

			expect(getByRole('button', { name: 'Panel one' }).getAttribute('aria-expanded')).toBe('true');
			expect(getByRole('button', { name: 'Panel two' }).getAttribute('aria-expanded')).toBe('true');
		});
	});

	describe('exclusive mode', () => {
		it('opening an item closes all others', () => {
			const items: IAccordionItem[] = [
				{ id: 'one', trigger: 'Panel one', content: 'Content', defaultOpen: true },
				{ id: 'two', trigger: 'Panel two', content: 'Content' },
				{ id: 'three', trigger: 'Panel three', content: 'Content' },
			];
			const { getByRole } = render(<Accordion items={items} exclusive />);

			fireEvent.click(getByRole('button', { name: 'Panel two' }));

			expect(getByRole('button', { name: 'Panel one' }).getAttribute('aria-expanded')).toBe(
				'false'
			);
			expect(getByRole('button', { name: 'Panel two' }).getAttribute('aria-expanded')).toBe('true');
			expect(getByRole('button', { name: 'Panel three' }).getAttribute('aria-expanded')).toBe(
				'false'
			);
		});

		it('toggling the open item closes it', () => {
			const items: IAccordionItem[] = [
				{ id: 'one', trigger: 'Panel one', content: 'Content', defaultOpen: true },
			];
			const { getByRole } = render(<Accordion items={items} exclusive />);
			const trigger = getByRole('button', { name: 'Panel one' });

			fireEvent.click(trigger);

			expect(trigger.getAttribute('aria-expanded')).toBe('false');
		});
	});

	describe('ARIA attributes', () => {
		it('each trigger has aria-controls matching its panel id', () => {
			const { getAllByRole } = render(<Accordion items={baseItems} />);
			const buttons = getAllByRole('button');
			const regions = getAllByRole('region');

			for (let i = 0; i < buttons.length; i++) {
				const panelId = buttons[i]?.getAttribute('aria-controls');
				expect(panelId).toBeTruthy();
				expect(regions[i]?.id).toBe(panelId);
			}
		});

		it('each panel has aria-labelledby matching its trigger id', () => {
			const { getAllByRole } = render(<Accordion items={baseItems} />);
			const buttons = getAllByRole('button');
			const regions = getAllByRole('region');

			for (let i = 0; i < regions.length; i++) {
				const triggerId = regions[i]?.getAttribute('aria-labelledby');
				expect(triggerId).toBeTruthy();
				expect(buttons[i]?.id).toBe(triggerId);
			}
		});

		it('each panel has role="region"', () => {
			const { getAllByRole } = render(<Accordion items={baseItems} />);
			const regions = getAllByRole('region');

			expect(regions).toHaveLength(baseItems.length);
		});

		it('aria-expanded reflects defaultOpen state for each trigger', () => {
			const items: IAccordionItem[] = [
				{ id: 'one', trigger: 'Panel one', content: 'Content', defaultOpen: true },
				{ id: 'two', trigger: 'Panel two', content: 'Content' },
				{ id: 'three', trigger: 'Panel three', content: 'Content' },
			];
			const { getByRole } = render(<Accordion items={items} />);

			expect(getByRole('button', { name: 'Panel one' }).getAttribute('aria-expanded')).toBe('true');
			expect(getByRole('button', { name: 'Panel two' }).getAttribute('aria-expanded')).toBe(
				'false'
			);
			expect(getByRole('button', { name: 'Panel three' }).getAttribute('aria-expanded')).toBe(
				'false'
			);
		});
	});

	describe('keyboard navigation', () => {
		it('ArrowDown moves focus to the next trigger', () => {
			const { getByRole } = render(<Accordion items={baseItems} />);
			const first = getByRole('button', { name: 'Panel one' });
			const second = getByRole('button', { name: 'Panel two' });

			fireEvent.keyDown(first, { key: 'ArrowDown' });

			expect(document.activeElement).toBe(second);
		});

		it('ArrowUp moves focus to the previous trigger', () => {
			const { getByRole } = render(<Accordion items={baseItems} />);
			const first = getByRole('button', { name: 'Panel one' });
			const second = getByRole('button', { name: 'Panel two' });

			fireEvent.keyDown(second, { key: 'ArrowUp' });

			expect(document.activeElement).toBe(first);
		});

		it('Home moves focus to the first trigger', () => {
			const { getByRole } = render(<Accordion items={baseItems} />);
			const first = getByRole('button', { name: 'Panel one' });
			const third = getByRole('button', { name: 'Panel three' });

			fireEvent.keyDown(third, { key: 'Home' });

			expect(document.activeElement).toBe(first);
		});

		it('End moves focus to the last trigger', () => {
			const { getByRole } = render(<Accordion items={baseItems} />);
			const first = getByRole('button', { name: 'Panel one' });
			const third = getByRole('button', { name: 'Panel three' });

			fireEvent.keyDown(first, { key: 'End' });

			expect(document.activeElement).toBe(third);
		});

		it('ArrowDown from last trigger wraps to first', () => {
			const { getByRole } = render(<Accordion items={baseItems} />);
			const first = getByRole('button', { name: 'Panel one' });
			const third = getByRole('button', { name: 'Panel three' });

			fireEvent.keyDown(third, { key: 'ArrowDown' });

			expect(document.activeElement).toBe(first);
		});

		it('ArrowUp from first trigger wraps to last', () => {
			const { getByRole } = render(<Accordion items={baseItems} />);
			const first = getByRole('button', { name: 'Panel one' });
			const third = getByRole('button', { name: 'Panel three' });

			fireEvent.keyDown(first, { key: 'ArrowUp' });

			expect(document.activeElement).toBe(third);
		});
	});

	describe('headingLevel', () => {
		it('renders h3 headings by default', () => {
			const { container } = render(<Accordion items={baseItems} />);

			const headings = container.querySelectorAll('h3');
			expect(headings).toHaveLength(baseItems.length);
		});

		it('renders h2 headings when headingLevel={HeadingLevel.h2}', () => {
			const { container } = render(<Accordion items={baseItems} headingLevel={HeadingLevel.h2} />);

			const headings = container.querySelectorAll('h2');
			expect(headings).toHaveLength(baseItems.length);
		});
	});

	describe('panel content', () => {
		it('content is in the DOM when collapsed', () => {
			const { getByText } = render(<Accordion items={baseItems} />);

			getByText('Content one');
			getByText('Content two');
			getByText('Content three');
		});
	});
});
