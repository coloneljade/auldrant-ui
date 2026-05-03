import { describe, expect, it } from 'bun:test';
import Accordion, { AccordionItem } from '@components/Accordion';
import { IconName } from '@components/Icon';
import { fireEvent, render } from '@testing-library/preact';
import { HeadingLevel } from '@utils';

describe('Accordion', () => {
	describe('rendering', () => {
		it('renders all trigger labels', () => {
			const { getByRole } = render(
				<Accordion>
					<AccordionItem id="one" label="Panel one">
						Content one
					</AccordionItem>
					<AccordionItem id="two" label="Panel two">
						Content two
					</AccordionItem>
					<AccordionItem id="three" label="Panel three">
						Content three
					</AccordionItem>
				</Accordion>
			);

			getByRole('button', { name: 'Panel one' });
			getByRole('button', { name: 'Panel two' });
			getByRole('button', { name: 'Panel three' });
		});

		it('forwards the class prop to the root element', () => {
			const { container } = render(
				<Accordion class="custom-class">
					<AccordionItem id="one" label="Panel one">
						Content one
					</AccordionItem>
				</Accordion>
			);

			expect(container.firstElementChild?.classList.contains('custom-class')).toBe(true);
		});

		it('throws when two items share the same id', () => {
			expect(() =>
				render(
					<Accordion>
						<AccordionItem id="dup" label="First">
							A
						</AccordionItem>
						<AccordionItem id="dup" label="Second">
							B
						</AccordionItem>
					</Accordion>
				)
			).toThrow('[Accordion] Duplicate item id: "dup". Item ids must be unique.');
		});

		it('throws when an item id contains invalid characters', () => {
			expect(() =>
				render(
					<Accordion>
						<AccordionItem id="bad id!" label="First">
							A
						</AccordionItem>
					</Accordion>
				)
			).toThrow('[Accordion] Invalid item id: "bad id!"');
		});

		it('throws when a non-AccordionItem child is passed', () => {
			expect(() =>
				render(
					<Accordion>
						<AccordionItem id="one" label="One">
							A
						</AccordionItem>
						<div>Not an accordion item</div>
					</Accordion>
				)
			).toThrow('[Accordion] All children must be <AccordionItem>.');
		});
	});

	describe('initial state', () => {
		it('all panels are collapsed by default', () => {
			const { getAllByRole } = render(
				<Accordion>
					<AccordionItem id="one" label="Panel one">
						Content one
					</AccordionItem>
					<AccordionItem id="two" label="Panel two">
						Content two
					</AccordionItem>
					<AccordionItem id="three" label="Panel three">
						Content three
					</AccordionItem>
				</Accordion>
			);

			const buttons = getAllByRole('button');
			for (const button of buttons) {
				expect(button.getAttribute('aria-expanded')).toBe('false');
			}
		});

		it('item with defaultOpen is expanded on mount', () => {
			const { getByRole } = render(
				<Accordion>
					<AccordionItem id="one" label="Panel one" defaultOpen>
						Content one
					</AccordionItem>
					<AccordionItem id="two" label="Panel two">
						Content two
					</AccordionItem>
				</Accordion>
			);

			expect(getByRole('button', { name: 'Panel one' }).getAttribute('aria-expanded')).toBe('true');
			expect(getByRole('button', { name: 'Panel two' }).getAttribute('aria-expanded')).toBe(
				'false'
			);
		});

		it('multiple defaultOpen items are all open in multi-expand mode', () => {
			const { getByRole } = render(
				<Accordion>
					<AccordionItem id="one" label="Panel one" defaultOpen>
						Content one
					</AccordionItem>
					<AccordionItem id="two" label="Panel two" defaultOpen>
						Content two
					</AccordionItem>
					<AccordionItem id="three" label="Panel three">
						Content three
					</AccordionItem>
				</Accordion>
			);

			expect(getByRole('button', { name: 'Panel one' }).getAttribute('aria-expanded')).toBe('true');
			expect(getByRole('button', { name: 'Panel two' }).getAttribute('aria-expanded')).toBe('true');
			expect(getByRole('button', { name: 'Panel three' }).getAttribute('aria-expanded')).toBe(
				'false'
			);
		});
	});

	describe('multi-expand (default)', () => {
		it('clicking a collapsed trigger expands it', () => {
			const { getByRole } = render(
				<Accordion>
					<AccordionItem id="one" label="Panel one">
						Content one
					</AccordionItem>
					<AccordionItem id="two" label="Panel two">
						Content two
					</AccordionItem>
				</Accordion>
			);
			const trigger = getByRole('button', { name: 'Panel one' });

			fireEvent.click(trigger);

			expect(trigger.getAttribute('aria-expanded')).toBe('true');
		});

		it('clicking an expanded trigger collapses it', () => {
			const { getByRole } = render(
				<Accordion>
					<AccordionItem id="one" label="Panel one" defaultOpen>
						Content one
					</AccordionItem>
				</Accordion>
			);
			const trigger = getByRole('button', { name: 'Panel one' });

			fireEvent.click(trigger);

			expect(trigger.getAttribute('aria-expanded')).toBe('false');
		});

		it('opening one item does not close another', () => {
			const { getByRole } = render(
				<Accordion>
					<AccordionItem id="one" label="Panel one">
						Content one
					</AccordionItem>
					<AccordionItem id="two" label="Panel two">
						Content two
					</AccordionItem>
					<AccordionItem id="three" label="Panel three">
						Content three
					</AccordionItem>
				</Accordion>
			);

			fireEvent.click(getByRole('button', { name: 'Panel one' }));
			fireEvent.click(getByRole('button', { name: 'Panel two' }));

			expect(getByRole('button', { name: 'Panel one' }).getAttribute('aria-expanded')).toBe('true');
			expect(getByRole('button', { name: 'Panel two' }).getAttribute('aria-expanded')).toBe('true');
		});
	});

	describe('exclusive mode', () => {
		it('opening an item closes all others', () => {
			const { getByRole } = render(
				<Accordion exclusive>
					<AccordionItem id="one" label="Panel one" defaultOpen>
						Content one
					</AccordionItem>
					<AccordionItem id="two" label="Panel two">
						Content two
					</AccordionItem>
					<AccordionItem id="three" label="Panel three">
						Content three
					</AccordionItem>
				</Accordion>
			);

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
			const { getByRole } = render(
				<Accordion exclusive>
					<AccordionItem id="one" label="Panel one" defaultOpen>
						Content one
					</AccordionItem>
				</Accordion>
			);
			const trigger = getByRole('button', { name: 'Panel one' });

			fireEvent.click(trigger);

			expect(trigger.getAttribute('aria-expanded')).toBe('false');
		});
	});

	describe('ARIA attributes', () => {
		it('each trigger has aria-controls matching its panel id', () => {
			const { getAllByRole } = render(
				<Accordion>
					<AccordionItem id="one" label="Panel one">
						Content one
					</AccordionItem>
					<AccordionItem id="two" label="Panel two">
						Content two
					</AccordionItem>
					<AccordionItem id="three" label="Panel three">
						Content three
					</AccordionItem>
				</Accordion>
			);
			const buttons = getAllByRole('button');
			const regions = getAllByRole('region');

			for (let i = 0; i < buttons.length; i++) {
				const panelId = buttons[i]?.getAttribute('aria-controls');
				expect(panelId).toBeTruthy();
				expect(regions[i]?.id).toBe(panelId);
			}
		});

		it('each panel has aria-labelledby matching its trigger id', () => {
			const { getAllByRole } = render(
				<Accordion>
					<AccordionItem id="one" label="Panel one">
						Content one
					</AccordionItem>
					<AccordionItem id="two" label="Panel two">
						Content two
					</AccordionItem>
					<AccordionItem id="three" label="Panel three">
						Content three
					</AccordionItem>
				</Accordion>
			);
			const buttons = getAllByRole('button');
			const regions = getAllByRole('region');

			for (let i = 0; i < regions.length; i++) {
				const triggerId = regions[i]?.getAttribute('aria-labelledby');
				expect(triggerId).toBeTruthy();
				expect(buttons[i]?.id).toBe(triggerId);
			}
		});

		it('each panel has role="region"', () => {
			const { getAllByRole } = render(
				<Accordion>
					<AccordionItem id="one" label="Panel one">
						Content one
					</AccordionItem>
					<AccordionItem id="two" label="Panel two">
						Content two
					</AccordionItem>
					<AccordionItem id="three" label="Panel three">
						Content three
					</AccordionItem>
				</Accordion>
			);
			const regions = getAllByRole('region');

			expect(regions).toHaveLength(3);
		});

		it('aria-expanded reflects defaultOpen state for each trigger', () => {
			const { getByRole } = render(
				<Accordion>
					<AccordionItem id="one" label="Panel one" defaultOpen>
						Content one
					</AccordionItem>
					<AccordionItem id="two" label="Panel two">
						Content two
					</AccordionItem>
					<AccordionItem id="three" label="Panel three">
						Content three
					</AccordionItem>
				</Accordion>
			);

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
			const { getByRole } = render(
				<Accordion>
					<AccordionItem id="one" label="Panel one">
						Content one
					</AccordionItem>
					<AccordionItem id="two" label="Panel two">
						Content two
					</AccordionItem>
					<AccordionItem id="three" label="Panel three">
						Content three
					</AccordionItem>
				</Accordion>
			);
			const first = getByRole('button', { name: 'Panel one' });
			const second = getByRole('button', { name: 'Panel two' });

			fireEvent.keyDown(first, { key: 'ArrowDown' });

			expect(document.activeElement).toBe(second);
		});

		it('ArrowUp moves focus to the previous trigger', () => {
			const { getByRole } = render(
				<Accordion>
					<AccordionItem id="one" label="Panel one">
						Content one
					</AccordionItem>
					<AccordionItem id="two" label="Panel two">
						Content two
					</AccordionItem>
					<AccordionItem id="three" label="Panel three">
						Content three
					</AccordionItem>
				</Accordion>
			);
			const first = getByRole('button', { name: 'Panel one' });
			const second = getByRole('button', { name: 'Panel two' });

			fireEvent.keyDown(second, { key: 'ArrowUp' });

			expect(document.activeElement).toBe(first);
		});

		it('Home moves focus to the first trigger', () => {
			const { getByRole } = render(
				<Accordion>
					<AccordionItem id="one" label="Panel one">
						Content one
					</AccordionItem>
					<AccordionItem id="two" label="Panel two">
						Content two
					</AccordionItem>
					<AccordionItem id="three" label="Panel three">
						Content three
					</AccordionItem>
				</Accordion>
			);
			const first = getByRole('button', { name: 'Panel one' });
			const third = getByRole('button', { name: 'Panel three' });

			fireEvent.keyDown(third, { key: 'Home' });

			expect(document.activeElement).toBe(first);
		});

		it('End moves focus to the last trigger', () => {
			const { getByRole } = render(
				<Accordion>
					<AccordionItem id="one" label="Panel one">
						Content one
					</AccordionItem>
					<AccordionItem id="two" label="Panel two">
						Content two
					</AccordionItem>
					<AccordionItem id="three" label="Panel three">
						Content three
					</AccordionItem>
				</Accordion>
			);
			const first = getByRole('button', { name: 'Panel one' });
			const third = getByRole('button', { name: 'Panel three' });

			fireEvent.keyDown(first, { key: 'End' });

			expect(document.activeElement).toBe(third);
		});

		it('ArrowDown from last trigger wraps to first', () => {
			const { getByRole } = render(
				<Accordion>
					<AccordionItem id="one" label="Panel one">
						Content one
					</AccordionItem>
					<AccordionItem id="two" label="Panel two">
						Content two
					</AccordionItem>
					<AccordionItem id="three" label="Panel three">
						Content three
					</AccordionItem>
				</Accordion>
			);
			const first = getByRole('button', { name: 'Panel one' });
			const third = getByRole('button', { name: 'Panel three' });

			fireEvent.keyDown(third, { key: 'ArrowDown' });

			expect(document.activeElement).toBe(first);
		});

		it('ArrowUp from first trigger wraps to last', () => {
			const { getByRole } = render(
				<Accordion>
					<AccordionItem id="one" label="Panel one">
						Content one
					</AccordionItem>
					<AccordionItem id="two" label="Panel two">
						Content two
					</AccordionItem>
					<AccordionItem id="three" label="Panel three">
						Content three
					</AccordionItem>
				</Accordion>
			);
			const first = getByRole('button', { name: 'Panel one' });
			const third = getByRole('button', { name: 'Panel three' });

			fireEvent.keyDown(first, { key: 'ArrowUp' });

			expect(document.activeElement).toBe(third);
		});
	});

	describe('headingLevel', () => {
		it('renders h3 headings by default', () => {
			const { container } = render(
				<Accordion>
					<AccordionItem id="one" label="Panel one">
						Content one
					</AccordionItem>
					<AccordionItem id="two" label="Panel two">
						Content two
					</AccordionItem>
					<AccordionItem id="three" label="Panel three">
						Content three
					</AccordionItem>
				</Accordion>
			);

			const headings = container.querySelectorAll('h3');
			expect(headings).toHaveLength(3);
		});

		it('renders h2 headings when headingLevel={HeadingLevel.h2}', () => {
			const { container } = render(
				<Accordion headingLevel={HeadingLevel.h2}>
					<AccordionItem id="one" label="Panel one">
						Content one
					</AccordionItem>
					<AccordionItem id="two" label="Panel two">
						Content two
					</AccordionItem>
					<AccordionItem id="three" label="Panel three">
						Content three
					</AccordionItem>
				</Accordion>
			);

			const headings = container.querySelectorAll('h2');
			expect(headings).toHaveLength(3);
		});
	});

	describe('panel content', () => {
		it('content is in the DOM when collapsed', () => {
			const { getByText } = render(
				<Accordion>
					<AccordionItem id="one" label="Panel one">
						<p>Content one</p>
					</AccordionItem>
					<AccordionItem id="two" label="Panel two">
						<p>Content two</p>
					</AccordionItem>
					<AccordionItem id="three" label="Panel three">
						<p>Content three</p>
					</AccordionItem>
				</Accordion>
			);

			getByText('Content one');
			getByText('Content two');
			getByText('Content three');
		});
	});

	describe('icon prop', () => {
		it('preserves accessible name from label when icon is set', () => {
			// Arrange & Act
			const { getByRole } = render(
				<Accordion>
					<AccordionItem id="settings" label="Settings" icon={IconName.settings}>
						Content
					</AccordionItem>
				</Accordion>
			);

			// Assert — icons are aria-hidden by Icon's lucide default; label remains the accessible name
			expect(getByRole('button', { name: 'Settings' })).toBeTruthy();
		});

		it('does not affect open/close behavior when icon is set', () => {
			// Arrange
			const { getByRole } = render(
				<Accordion>
					<AccordionItem id="security" label="Security" icon={IconName.warning}>
						Content
					</AccordionItem>
				</Accordion>
			);

			// Act
			const trigger = getByRole('button', { name: 'Security' });
			fireEvent.click(trigger);

			// Assert
			expect(trigger.getAttribute('aria-expanded')).toBe('true');
		});
	});
});
