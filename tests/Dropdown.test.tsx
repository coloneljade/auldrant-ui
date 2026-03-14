import { beforeAll, describe, expect, it, mock } from 'bun:test';
import Dropdown, { DropdownItem } from '@components/Dropdown';
import { act, fireEvent, render } from '@testing-library/preact';

// ---------------------------------------------------------------------------
// Stub Popover API — Happy-DOM v20.x does not implement showPopover/hidePopover.
// These stubs fire the `toggle` event so the component's handleToggle runs,
// keeping light-dismiss behavior exercisable in integration tests.
// ---------------------------------------------------------------------------
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

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

async function openMenu(triggerButton: HTMLElement) {
	await act(async () => {
		fireEvent.click(triggerButton);
	});
}

// ---------------------------------------------------------------------------
// Rendering
// ---------------------------------------------------------------------------

describe('Dropdown', () => {
	describe('rendering', () => {
		it('renders trigger button with aria-haspopup="menu"', () => {
			const { getByRole } = render(
				<Dropdown trigger="Options">
					<DropdownItem>Copy</DropdownItem>
				</Dropdown>
			);
			expect(getByRole('button', { name: /options/i }).getAttribute('aria-haspopup')).toBe('menu');
		});

		it('renders aria-expanded="false" initially', () => {
			const { getByRole } = render(
				<Dropdown trigger="Options">
					<DropdownItem>Copy</DropdownItem>
				</Dropdown>
			);
			expect(getByRole('button', { name: /options/i }).getAttribute('aria-expanded')).toBe('false');
		});

		it('renders all item labels', async () => {
			const { getByRole, getAllByRole } = render(
				<Dropdown trigger="Options">
					<DropdownItem>Copy</DropdownItem>
					<DropdownItem>Paste</DropdownItem>
					<DropdownItem>Delete</DropdownItem>
				</Dropdown>
			);
			await openMenu(getByRole('button', { name: /options/i }));
			expect(getAllByRole('menuitem')).toHaveLength(3);
		});

		it('forwards class prop to root element', () => {
			const { container } = render(
				<Dropdown trigger="Options" class="custom">
					<DropdownItem>Copy</DropdownItem>
				</Dropdown>
			);
			expect(container.firstElementChild?.classList.contains('custom')).toBe(true);
		});

		it('throws when no items are provided', () => {
			expect(() => render(<Dropdown trigger="Options">{[]}</Dropdown>)).toThrow(
				'[Dropdown] At least one <DropdownItem> is required.'
			);
		});

		it('throws when a non-DropdownItem child is passed', () => {
			expect(() =>
				render(
					<Dropdown trigger="Options">
						<DropdownItem>Copy</DropdownItem>
						<div>Not an item</div>
					</Dropdown>
				)
			).toThrow('[Dropdown] All children must be <DropdownItem>.');
		});
	});

	// ---------------------------------------------------------------------------
	// Open / close
	// ---------------------------------------------------------------------------

	describe('open/close', () => {
		it('clicking trigger sets aria-expanded to true', async () => {
			const { getByRole } = render(
				<Dropdown trigger="Options">
					<DropdownItem>Copy</DropdownItem>
				</Dropdown>
			);
			const trigger = getByRole('button', { name: /options/i });

			await openMenu(trigger);

			expect(trigger.getAttribute('aria-expanded')).toBe('true');
		});

		it('clicking trigger again sets aria-expanded to false', async () => {
			const { getByRole } = render(
				<Dropdown trigger="Options">
					<DropdownItem>Copy</DropdownItem>
				</Dropdown>
			);
			const trigger = getByRole('button', { name: /options/i });

			await openMenu(trigger);
			expect(trigger.getAttribute('aria-expanded')).toBe('true');

			await act(async () => {
				fireEvent.click(trigger);
			});
			expect(trigger.getAttribute('aria-expanded')).toBe('false');
		});

		it('clicking an enabled item calls onSelect', async () => {
			const onSelect = mock(() => {});
			const { getByRole } = render(
				<Dropdown trigger="Options">
					<DropdownItem onSelect={onSelect}>Copy</DropdownItem>
				</Dropdown>
			);
			await openMenu(getByRole('button', { name: /options/i }));

			await act(async () => {
				fireEvent.click(getByRole('menuitem', { name: 'Copy' }));
			});
			expect(onSelect).toHaveBeenCalledTimes(1);
		});

		it('clicking a disabled item does NOT call onSelect', async () => {
			const onSelect = mock(() => {});
			const { getByRole } = render(
				<Dropdown trigger="Options">
					<DropdownItem onSelect={onSelect} disabled>
						Archive
					</DropdownItem>
				</Dropdown>
			);
			await openMenu(getByRole('button', { name: /options/i }));

			await act(async () => {
				fireEvent.click(getByRole('menuitem', { name: 'Archive', hidden: true }));
			});
			expect(onSelect).not.toHaveBeenCalled();
		});

		it('clicking an item closes the menu', async () => {
			const { getByRole } = render(
				<Dropdown trigger="Options">
					<DropdownItem onSelect={() => {}}>Copy</DropdownItem>
				</Dropdown>
			);
			const trigger = getByRole('button', { name: /options/i });
			await openMenu(trigger);

			await act(async () => {
				fireEvent.click(getByRole('menuitem', { name: 'Copy' }));
			});
			expect(trigger.getAttribute('aria-expanded')).toBe('false');
		});
	});

	// ---------------------------------------------------------------------------
	// ARIA
	// ---------------------------------------------------------------------------

	describe('ARIA', () => {
		it('aria-controls on trigger matches menu id', () => {
			const { getByRole } = render(
				<Dropdown trigger="Options">
					<DropdownItem>Copy</DropdownItem>
				</Dropdown>
			);
			const trigger = getByRole('button', { name: /options/i });
			const menu = getByRole('menu', { hidden: true });
			expect(trigger.getAttribute('aria-controls')).toBe(menu.id);
		});

		it('aria-labelledby on menu matches trigger id', () => {
			const { getByRole } = render(
				<Dropdown trigger="Options">
					<DropdownItem>Copy</DropdownItem>
				</Dropdown>
			);
			const trigger = getByRole('button', { name: /options/i });
			const menu = getByRole('menu', { hidden: true });
			expect(menu.getAttribute('aria-labelledby')).toBe(trigger.id);
		});

		it('menu items have role="menuitem"', async () => {
			const { getByRole, getAllByRole } = render(
				<Dropdown trigger="Options">
					<DropdownItem>Copy</DropdownItem>
					<DropdownItem>Paste</DropdownItem>
				</Dropdown>
			);
			await openMenu(getByRole('button', { name: /options/i }));
			const items = getAllByRole('menuitem');
			expect(items).toHaveLength(2);
		});

		it('menu items have tabIndex=-1', async () => {
			const { getByRole, getAllByRole } = render(
				<Dropdown trigger="Options">
					<DropdownItem>Copy</DropdownItem>
					<DropdownItem>Paste</DropdownItem>
				</Dropdown>
			);
			await openMenu(getByRole('button', { name: /options/i }));
			for (const item of getAllByRole('menuitem')) {
				expect(item.getAttribute('tabindex')).toBe('-1');
			}
		});

		it('disabled item has disabled attribute', async () => {
			const { getByRole } = render(
				<Dropdown trigger="Options">
					<DropdownItem disabled>Archive</DropdownItem>
				</Dropdown>
			);
			await openMenu(getByRole('button', { name: /options/i }));
			const item = getByRole('menuitem', { name: 'Archive', hidden: true });
			expect(item.hasAttribute('disabled')).toBe(true);
		});
	});

	// ---------------------------------------------------------------------------
	// Keyboard — trigger
	// ---------------------------------------------------------------------------

	describe('keyboard: trigger', () => {
		it('ArrowDown opens menu', async () => {
			const { getByRole } = render(
				<Dropdown trigger="Options">
					<DropdownItem>Copy</DropdownItem>
				</Dropdown>
			);
			const trigger = getByRole('button', { name: /options/i });
			trigger.focus();

			await act(async () => {
				fireEvent.keyDown(trigger, { key: 'ArrowDown' });
			});

			expect(trigger.getAttribute('aria-expanded')).toBe('true');
		});

		it('Enter opens menu', async () => {
			const { getByRole } = render(
				<Dropdown trigger="Options">
					<DropdownItem>Copy</DropdownItem>
				</Dropdown>
			);
			const trigger = getByRole('button', { name: /options/i });
			trigger.focus();

			await act(async () => {
				fireEvent.keyDown(trigger, { key: 'Enter' });
			});

			expect(trigger.getAttribute('aria-expanded')).toBe('true');
		});

		it('Space opens menu', async () => {
			const { getByRole } = render(
				<Dropdown trigger="Options">
					<DropdownItem>Copy</DropdownItem>
				</Dropdown>
			);
			const trigger = getByRole('button', { name: /options/i });
			trigger.focus();

			await act(async () => {
				fireEvent.keyDown(trigger, { key: ' ' });
			});

			expect(trigger.getAttribute('aria-expanded')).toBe('true');
		});

		it('ArrowUp opens menu', async () => {
			const { getByRole } = render(
				<Dropdown trigger="Options">
					<DropdownItem>Copy</DropdownItem>
				</Dropdown>
			);
			const trigger = getByRole('button', { name: /options/i });
			trigger.focus();

			await act(async () => {
				fireEvent.keyDown(trigger, { key: 'ArrowUp' });
			});

			expect(trigger.getAttribute('aria-expanded')).toBe('true');
		});
	});

	// ---------------------------------------------------------------------------
	// Keyboard — menu
	// ---------------------------------------------------------------------------

	describe('keyboard: menu', () => {
		async function renderOpenMenu() {
			const onSelect1 = mock(() => {});
			const onSelect2 = mock(() => {});
			const result = render(
				<Dropdown trigger="Options">
					<DropdownItem onSelect={onSelect1}>Copy</DropdownItem>
					<DropdownItem onSelect={onSelect2}>Paste</DropdownItem>
					<DropdownItem>Delete</DropdownItem>
				</Dropdown>
			);
			const trigger = result.getByRole('button', { name: /options/i });
			await openMenu(trigger);
			const menu = result.getByRole('menu');
			const items = result.getAllByRole('menuitem');
			return { ...result, trigger, menu, items, onSelect1, onSelect2 };
		}

		it('ArrowDown moves focus to next item', async () => {
			const { menu, items } = await renderOpenMenu();
			items[0]?.focus();

			await act(async () => {
				fireEvent.keyDown(menu, { key: 'ArrowDown' });
			});

			expect(document.activeElement).toBe(items[1]);
		});

		it('ArrowDown wraps from last to first', async () => {
			const { menu, items } = await renderOpenMenu();
			items[2]?.focus();

			await act(async () => {
				fireEvent.keyDown(menu, { key: 'ArrowDown' });
			});

			expect(document.activeElement).toBe(items[0]);
		});

		it('ArrowUp moves focus to previous item', async () => {
			const { menu, items } = await renderOpenMenu();
			items[1]?.focus();

			await act(async () => {
				fireEvent.keyDown(menu, { key: 'ArrowUp' });
			});

			expect(document.activeElement).toBe(items[0]);
		});

		it('ArrowUp wraps from first to last', async () => {
			const { menu, items } = await renderOpenMenu();
			items[0]?.focus();

			await act(async () => {
				fireEvent.keyDown(menu, { key: 'ArrowUp' });
			});

			expect(document.activeElement).toBe(items[2]);
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

		it('ArrowDown skips disabled items', async () => {
			const { getByRole, getAllByRole } = render(
				<Dropdown trigger="Options">
					<DropdownItem>Copy</DropdownItem>
					<DropdownItem disabled>Archive</DropdownItem>
					<DropdownItem>Delete</DropdownItem>
				</Dropdown>
			);
			await openMenu(getByRole('button', { name: /options/i }));
			const menu = getByRole('menu');
			const items = getAllByRole('menuitem', { hidden: true });
			items[0]?.focus();

			await act(async () => {
				fireEvent.keyDown(menu, { key: 'ArrowDown' });
			});

			expect(document.activeElement).toBe(items[2]);
		});

		it('Enter activates focused item', async () => {
			const { menu, items, onSelect1 } = await renderOpenMenu();
			items[0]?.focus();

			await act(async () => {
				fireEvent.keyDown(menu, { key: 'Enter' });
			});

			expect(onSelect1).toHaveBeenCalledTimes(1);
		});

		it('Space activates focused item', async () => {
			const { menu, items, onSelect1 } = await renderOpenMenu();
			items[0]?.focus();

			await act(async () => {
				fireEvent.keyDown(menu, { key: ' ' });
			});

			expect(onSelect1).toHaveBeenCalledTimes(1);
		});

		it('Escape closes menu', async () => {
			const { trigger, menu } = await renderOpenMenu();

			await act(async () => {
				fireEvent.keyDown(menu, { key: 'Escape' });
			});

			expect(trigger.getAttribute('aria-expanded')).toBe('false');
		});
	});

	// ---------------------------------------------------------------------------
	// Focus restoration
	// ---------------------------------------------------------------------------

	describe('focus restoration', () => {
		it('Escape returns focus to trigger', async () => {
			const { getByRole } = render(
				<Dropdown trigger="Options">
					<DropdownItem>Copy</DropdownItem>
				</Dropdown>
			);
			const trigger = getByRole('button', { name: /options/i });
			await openMenu(trigger);
			const menu = getByRole('menu');

			await act(async () => {
				fireEvent.keyDown(menu, { key: 'Escape' });
			});

			expect(document.activeElement).toBe(trigger);
		});

		it('selecting an item returns focus to trigger', async () => {
			const { getByRole } = render(
				<Dropdown trigger="Options">
					<DropdownItem onSelect={() => {}}>Copy</DropdownItem>
				</Dropdown>
			);
			const trigger = getByRole('button', { name: /options/i });
			await openMenu(trigger);

			await act(async () => {
				fireEvent.click(getByRole('menuitem', { name: 'Copy' }));
			});

			expect(document.activeElement).toBe(trigger);
		});

		it('Tab does NOT return focus to trigger', async () => {
			const { getByRole } = render(
				<Dropdown trigger="Options">
					<DropdownItem>Copy</DropdownItem>
				</Dropdown>
			);
			const trigger = getByRole('button', { name: /options/i });
			await openMenu(trigger);
			const menu = getByRole('menu');

			await act(async () => {
				fireEvent.keyDown(menu, { key: 'Tab' });
			});

			expect(document.activeElement).not.toBe(trigger);
		});
	});

	// ---------------------------------------------------------------------------
	// Type-ahead
	// ---------------------------------------------------------------------------

	describe('type-ahead', () => {
		it('pressing a char focuses matching item', async () => {
			const { getByRole, getAllByRole } = render(
				<Dropdown trigger="Options">
					<DropdownItem>Copy</DropdownItem>
					<DropdownItem>Paste</DropdownItem>
					<DropdownItem>Delete</DropdownItem>
				</Dropdown>
			);
			await openMenu(getByRole('button', { name: /options/i }));
			const menu = getByRole('menu');
			const items = getAllByRole('menuitem');

			await act(async () => {
				fireEvent.keyDown(menu, { key: 'p' });
			});

			expect(document.activeElement).toBe(items[1]);
		});

		it('pressing a char with no match leaves focus unchanged', async () => {
			const { getByRole, getAllByRole } = render(
				<Dropdown trigger="Options">
					<DropdownItem>Copy</DropdownItem>
					<DropdownItem>Paste</DropdownItem>
				</Dropdown>
			);
			await openMenu(getByRole('button', { name: /options/i }));
			const menu = getByRole('menu');
			const items = getAllByRole('menuitem');
			items[0]?.focus();

			await act(async () => {
				fireEvent.keyDown(menu, { key: 'z' });
			});

			expect(document.activeElement).toBe(items[0]);
		});

		it('type-ahead wraps from current position', async () => {
			const { getByRole, getAllByRole } = render(
				<Dropdown trigger="Options">
					<DropdownItem>Copy</DropdownItem>
					<DropdownItem>Paste</DropdownItem>
					<DropdownItem>Cut</DropdownItem>
				</Dropdown>
			);
			await openMenu(getByRole('button', { name: /options/i }));
			const menu = getByRole('menu');
			const items = getAllByRole('menuitem');
			// Focus last item ("Cut"), then type 'c' — should wrap to "Copy" (index 0)
			items[2]?.focus();

			await act(async () => {
				fireEvent.keyDown(menu, { key: 'c' });
			});

			expect(document.activeElement).toBe(items[0]);
		});
	});
});
