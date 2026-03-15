import Icon, { IconName } from '@components/Icon';
import { useSignal } from '@preact/signals';
import type { IBaseProps } from '@scripts/types';
import useMenuPosition from '@scripts/useMenuPosition';
import { cx } from '@scripts/utils';
import styles from '@styles/Dropdown.module.css';
import type { ComponentChildren, FunctionComponent, VNode } from 'preact';
import { Fragment, isValidElement, toChildArray } from 'preact';
import { useId, useRef } from 'preact/hooks';

/** Recursively flattens Fragment VNodes that toChildArray leaves intact. */
function flattenChildren(children: ComponentChildren): VNode<object>[] {
	const out: VNode<object>[] = [];
	for (const child of toChildArray(children)) {
		if (!isValidElement(child)) {
			continue;
		}
		if (child.type === Fragment) {
			const { children: nested } = child.props as { children?: ComponentChildren };
			out.push(...flattenChildren(nested));
		} else {
			out.push(child);
		}
	}
	return out;
}

/** Props for {@link DropdownItem}. */
interface IDropdownItemProps {
	/**
	 * Item label. Must be a string to enable type-ahead navigation and guarantee
	 * an accessible name without guards.
	 */
	children: string;
	/** Called when the item is selected via click or keyboard. */
	onSelect?: () => void;
	/** When true, the item is rendered but cannot be selected. */
	disabled?: boolean;
}

/** Props for {@link Dropdown}. */
interface IDropdownProps extends IBaseProps {
	/** Content rendered inside the trigger button. */
	trigger: ComponentChildren;
	/** One or more {@link DropdownItem} elements. */
	children: ComponentChildren;
}

/**
 * A single item in a {@link Dropdown}. Renders null — all rendering is handled by Dropdown.
 *
 * @example
 * ```tsx
 * <Dropdown trigger="Options">
 *   <DropdownItem onSelect={() => copy()}>Copy</DropdownItem>
 *   <DropdownItem onSelect={() => paste()}>Paste</DropdownItem>
 *   <DropdownItem disabled>Archive</DropdownItem>
 * </Dropdown>
 * ```
 */
export const DropdownItem: FunctionComponent<IDropdownItemProps> = () => null;

/**
 * Trigger button with a popover menu. Uses the Popover API for top-layer rendering,
 * light-dismiss, and Escape handling. CSS Anchor Positioning positions the menu on
 * Chrome 131+ and Safari 26+; a JS fallback handles earlier browsers.
 *
 * Full keyboard support: Arrow keys, Home/End, type-ahead, Tab and Escape with correct
 * focus restoration.
 */
const Dropdown: FunctionComponent<IDropdownProps> = (props) => {
	const { trigger, class: className, children } = props;

	const flatChildren = flattenChildren(children);

	for (const child of flatChildren) {
		if (!isValidElement(child) || child.type !== DropdownItem) {
			throw new Error('[Dropdown] All children must be <DropdownItem>.');
		}
	}

	if (flatChildren.length === 0) {
		throw new Error('[Dropdown] At least one <DropdownItem> is required.');
	}

	const items = flatChildren as VNode<IDropdownItemProps>[];
	const enabledIndices = items
		.map((item, i) => (item.props.disabled ? -1 : i))
		.filter((i) => i !== -1);

	const instanceId = useId();
	const menuId = `${instanceId}-menu`;
	const triggerId = `${instanceId}-trigger`;

	const isOpen = useSignal(false);
	const triggerRef = useRef<HTMLButtonElement>(null);
	const menuRef = useRef<HTMLDivElement>(null);
	/** DOM index of the currently focused menu item; -1 when nothing is focused. */
	const focusedIndexRef = useRef(-1);
	const typeAheadBufferRef = useRef('');
	const typeAheadTimerRef = useRef<number | null>(null);

	useMenuPosition(isOpen.value, triggerRef, menuRef);

	function getActiveFocusedIndex(): number {
		const allItems = menuRef.current?.querySelectorAll<HTMLButtonElement>('[role="menuitem"]');
		if (allItems) {
			for (let i = 0; i < allItems.length; i++) {
				if (allItems[i] === document.activeElement) {
					return i;
				}
			}
		}
		return focusedIndexRef.current;
	}

	function focusItem(index: number) {
		focusedIndexRef.current = index;
		const allItems = menuRef.current?.querySelectorAll<HTMLButtonElement>('[role="menuitem"]');
		allItems?.[index]?.focus();
	}

	function openMenu(focusLast: boolean) {
		isOpen.value = true;
		menuRef.current?.showPopover();
		const target = focusLast ? enabledIndices[enabledIndices.length - 1] : enabledIndices[0];
		if (target !== undefined) {
			focusItem(target);
		}
	}

	function closeMenu(restoreFocus: boolean) {
		isOpen.value = false;
		focusedIndexRef.current = -1;
		menuRef.current?.hidePopover();
		if (restoreFocus) {
			triggerRef.current?.focus();
		}
	}

	function selectItem(index: number) {
		if (items[index]?.props.disabled) {
			return;
		}
		items[index]?.props.onSelect?.();
		closeMenu(true);
	}

	/**
	 * Syncs signal state for browser-initiated changes only (light-dismiss, auto-exclusive).
	 * Programmatic open/close sets isOpen.value directly before calling show/hidePopover,
	 * so by the time the toggle event arrives, the signal is already correct.
	 */
	function handleToggle(e: Event) {
		const open = (e as ToggleEvent).newState === 'open';
		if (isOpen.value !== open) {
			isOpen.value = open;
			if (!open) {
				focusedIndexRef.current = -1;
			}
		}
	}

	function handleTriggerKeyDown(e: KeyboardEvent) {
		if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			openMenu(false);
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			openMenu(true);
		}
	}

	function handleTypeAhead(char: string) {
		if (typeAheadTimerRef.current !== null) {
			clearTimeout(typeAheadTimerRef.current);
		}
		typeAheadBufferRef.current += char.toLowerCase();
		typeAheadTimerRef.current = window.setTimeout(() => {
			typeAheadBufferRef.current = '';
			typeAheadTimerRef.current = null;
		}, 500);

		const current = getActiveFocusedIndex();
		const startPos =
			current === -1 ? 0 : (enabledIndices.indexOf(current) + 1) % enabledIndices.length;
		const ordered = [...enabledIndices.slice(startPos), ...enabledIndices.slice(0, startPos)];

		for (const idx of ordered) {
			const label = items[idx]?.props.children ?? '';
			if (label.toLowerCase().startsWith(typeAheadBufferRef.current)) {
				focusItem(idx);
				break;
			}
		}
	}

	function handleMenuKeyDown(e: KeyboardEvent) {
		const current = getActiveFocusedIndex();

		if (e.key === 'ArrowDown') {
			e.preventDefault();
			const next = current === -1 ? 0 : (current + 1) % items.length;
			focusItem(next);
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			const effectivePos = current === -1 ? items.length : current;
			const prev = (effectivePos - 1 + items.length) % items.length;
			focusItem(prev);
		} else if (e.key === 'Home') {
			e.preventDefault();
			if (items.length > 0) {
				focusItem(0);
			}
		} else if (e.key === 'End') {
			e.preventDefault();
			if (items.length > 0) {
				focusItem(items.length - 1);
			}
		} else if (e.key === 'Escape') {
			closeMenu(true);
		} else if (e.key === 'Tab') {
			closeMenu(false);
		} else if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			if (current !== -1) {
				selectItem(current);
			}
		} else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
			e.preventDefault();
			handleTypeAhead(e.key);
		}
	}

	return (
		<div class={cx(styles.dropdown, className)}>
			<button
				ref={triggerRef}
				id={triggerId}
				type="button"
				aria-haspopup="menu"
				aria-expanded={isOpen.value ? 'true' : 'false'}
				aria-controls={menuId}
				class={styles.dropdownTrigger}
				onClick={() => (isOpen.value ? closeMenu(true) : openMenu(false))}
				onKeyDown={handleTriggerKeyDown}
			>
				{trigger}
				<Icon name={IconName.chevronDown} class={styles.dropdownTriggerIcon} />
			</button>

			<div
				ref={menuRef}
				id={menuId}
				role="menu"
				aria-labelledby={triggerId}
				popover="auto"
				class={styles.dropdownMenu}
				onToggle={handleToggle}
				onKeyDown={handleMenuKeyDown}
			>
				{items.map((item, index) => (
					<div key={item.props.children} role="none">
						<button
							type="button"
							role="menuitem"
							tabIndex={-1}
							aria-disabled={item.props.disabled ? 'true' : undefined}
							class={cx(styles.dropdownItem, item.props.disabled && styles.disabledItem)}
							onClick={() => selectItem(index)}
						>
							{item.props.children}
						</button>
					</div>
				))}
			</div>
		</div>
	);
};

export default Dropdown;
