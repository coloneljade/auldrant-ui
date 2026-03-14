import { beforeAll, describe, expect, it } from 'bun:test';
import Dropdown, { DropdownItem } from '@components/Dropdown';
import { act, fireEvent, render } from '@testing-library/preact';
import { renderAndCheckA11y } from './setup';

// Stub Popover API — same as Dropdown.test.tsx
beforeAll(() => {
	type PopoverElement = HTMLElement & { showPopover?: unknown; hidePopover?: unknown };
	if (typeof (HTMLElement.prototype as PopoverElement).showPopover !== 'function') {
		Object.defineProperty(HTMLElement.prototype, 'showPopover', {
			configurable: true,
			value(this: HTMLElement) {
				const event = new Event('toggle', { bubbles: false });
				Object.defineProperty(event, 'newState', { value: 'open', writable: false });
				this.dispatchEvent(event);
			},
		});
		Object.defineProperty(HTMLElement.prototype, 'hidePopover', {
			configurable: true,
			value(this: HTMLElement) {
				const event = new Event('toggle', { bubbles: false });
				Object.defineProperty(event, 'newState', { value: 'closed', writable: false });
				this.dispatchEvent(event);
			},
		});
	}
});

describe('Dropdown a11y', () => {
	it('has no axe violations — closed', async () => {
		await renderAndCheckA11y(
			<Dropdown trigger="Options">
				<DropdownItem onSelect={() => {}}>Copy</DropdownItem>
				<DropdownItem onSelect={() => {}}>Paste</DropdownItem>
				<DropdownItem disabled>Archive</DropdownItem>
			</Dropdown>
		);
	});

	it('has no axe violations — with all items disabled', async () => {
		await renderAndCheckA11y(
			<Dropdown trigger="Actions">
				<DropdownItem disabled>Delete</DropdownItem>
				<DropdownItem disabled>Archive</DropdownItem>
			</Dropdown>
		);
	});

	it('WCAG SC 4.1.2: aria-controls on trigger references menu element', () => {
		const { getByRole } = render(
			<Dropdown trigger="Options">
				<DropdownItem>Copy</DropdownItem>
			</Dropdown>
		);
		const trigger = getByRole('button', { name: /options/i });
		const menu = getByRole('menu', { hidden: true });
		const controlsId = trigger.getAttribute('aria-controls');

		expect(controlsId).toBeTruthy();
		expect(menu.id).toBe(controlsId);
	});

	it('WCAG SC 4.1.2: aria-labelledby on menu references trigger', () => {
		const { getByRole } = render(
			<Dropdown trigger="Options">
				<DropdownItem>Copy</DropdownItem>
			</Dropdown>
		);
		const trigger = getByRole('button', { name: /options/i });
		const menu = getByRole('menu', { hidden: true });
		const labelledById = menu.getAttribute('aria-labelledby');

		expect(labelledById).toBeTruthy();
		expect(trigger.id).toBe(labelledById);
	});

	describe('WCAG SC 2.1.1: keyboard navigation', () => {
		async function renderOpenMenu() {
			const result = render(
				<Dropdown trigger="Options">
					<DropdownItem>Copy</DropdownItem>
					<DropdownItem>Paste</DropdownItem>
					<DropdownItem>Delete</DropdownItem>
				</Dropdown>
			);
			const trigger = result.getByRole('button', { name: /options/i });
			await act(async () => {
				fireEvent.click(trigger);
			});
			const menu = result.getByRole('menu');
			const items = result.getAllByRole('menuitem');
			return { ...result, trigger, menu, items };
		}

		it('ArrowDown moves focus to next item', async () => {
			const { menu, items } = await renderOpenMenu();
			items[0]?.focus();

			await act(async () => {
				fireEvent.keyDown(menu, { key: 'ArrowDown' });
			});

			expect(document.activeElement).toBe(items[1]);
		});

		it('ArrowUp moves focus to previous item', async () => {
			const { menu, items } = await renderOpenMenu();
			items[2]?.focus();

			await act(async () => {
				fireEvent.keyDown(menu, { key: 'ArrowUp' });
			});

			expect(document.activeElement).toBe(items[1]);
		});

		it('Home moves focus to first item', async () => {
			const { menu, items } = await renderOpenMenu();
			items[2]?.focus();

			await act(async () => {
				fireEvent.keyDown(menu, { key: 'Home' });
			});

			expect(document.activeElement).toBe(items[0]);
		});

		it('End moves focus to last item', async () => {
			const { menu, items } = await renderOpenMenu();
			items[0]?.focus();

			await act(async () => {
				fireEvent.keyDown(menu, { key: 'End' });
			});

			expect(document.activeElement).toBe(items[2]);
		});

		it('Escape closes the menu', async () => {
			const { trigger, menu } = await renderOpenMenu();

			await act(async () => {
				fireEvent.keyDown(menu, { key: 'Escape' });
			});

			expect(trigger.getAttribute('aria-expanded')).toBe('false');
		});
	});

	describe('WCAG SC 2.4.3: focus order', () => {
		it('Escape returns focus to the trigger button', async () => {
			const { getByRole } = render(
				<Dropdown trigger="Options">
					<DropdownItem>Copy</DropdownItem>
					<DropdownItem>Paste</DropdownItem>
				</Dropdown>
			);
			const trigger = getByRole('button', { name: /options/i });

			await act(async () => {
				fireEvent.click(trigger);
			});

			const menu = getByRole('menu');

			await act(async () => {
				fireEvent.keyDown(menu, { key: 'Escape' });
			});

			expect(document.activeElement).toBe(trigger);
		});
	});
});
