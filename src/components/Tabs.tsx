import { useSignal } from '@preact/signals';
import type { IBaseProps } from '@scripts/types';
import { cx } from '@scripts/utils';
import styles from '@styles/Tabs.module.css';
import type { ComponentChildren, FunctionComponent, VNode } from 'preact';
import { Fragment, isValidElement, toChildArray } from 'preact';
import { useEffect, useId, useRef } from 'preact/hooks';

const ID_FORMAT = /^[a-zA-Z0-9_-]+$/;

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

/** Props for {@link Tab}. */
interface ITabProps extends IBaseProps {
	/**
	 * Stable identifier. Used for aria-controls/aria-labelledby wiring and active-state tracking.
	 * Must be unique across all tabs. Valid characters: letters, digits, underscores, hyphens.
	 */
	id: string;
	/** Visible tab label text. */
	label: string;
	/** Called when this tab is activated. */
	onActivate?: () => void;
	/**
	 * Mount this tab's panel immediately, even if not initially active.
	 * Overrides the group-level `eager` default.
	 */
	eager?: boolean;
	/** Panel content. */
	children: ComponentChildren;
}

/** Props for {@link TabGroup}. */
interface ITabGroupProps extends IBaseProps {
	/** ID of the initially active tab. Defaults to the first tab's id. */
	defaultActive?: string;
	/** Called when the active tab changes. */
	onChange?: (id: string) => void;
	/**
	 * When true, all tab panels are mounted immediately rather than on first activation.
	 * Per-tab `eager` takes precedence over this group default. Defaults to false.
	 */
	eager?: boolean;
	/** Tab items. Each must be a {@link Tab} element. */
	children: ComponentChildren;
}

interface ITabPanelProps {
	id: string;
	labelledBy: string;
	isActive: boolean;
	mounted: boolean;
	children: ComponentChildren;
}

const TabPanel: FunctionComponent<ITabPanelProps> = (props) => {
	const { id, labelledBy, isActive, mounted, children } = props;
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (ref.current) {
			ref.current.inert = !isActive;
		}
	}, [isActive]);

	return (
		<div
			ref={ref}
			role="tabpanel"
			id={id}
			aria-labelledby={labelledBy}
			hidden={!isActive}
			class={styles.tabPanel}
		>
			{mounted ? children : null}
		</div>
	);
};

/**
 * A single tab within a {@link TabGroup}. Renders null — all rendering is handled by TabGroup.
 *
 * @example
 * ```tsx
 * <TabGroup>
 *   <Tab id="overview" label="Overview">
 *     <p>Overview content</p>
 *   </Tab>
 *   <Tab id="details" label="Details" onActivate={fetchDetails} eager>
 *     <p>Details content</p>
 *   </Tab>
 * </TabGroup>
 * ```
 */
export const Tab: FunctionComponent<ITabProps> = () => null;

/**
 * Accessible tab interface with ARIA state, keyboard navigation, and lazy panel mounting.
 *
 * Keyboard: ArrowRight/Left navigate tabs with wrapping; Home/End jump to first/last.
 * All navigation auto-activates the focused tab.
 *
 * Panels are lazy-mounted by default — content renders on first activation and stays
 * mounted. Set `eager` on the group or individual tabs to mount immediately.
 */
const TabGroup: FunctionComponent<ITabGroupProps> = (props) => {
	const { defaultActive, onChange, eager: groupEager = false, class: className, children } = props;

	// Flatten fragments, arrays, and filter falsy values
	const flatChildren = flattenChildren(children);

	// Validate: all children must be <Tab> elements
	for (const child of flatChildren) {
		if (!isValidElement(child) || child.type !== Tab) {
			throw new Error('[TabGroup] All children must be <Tab>.');
		}
	}

	const tabs = flatChildren as VNode<ITabProps>[];

	// Validate IDs
	const seenIds = new Set<string>();
	for (const tab of tabs) {
		const { id } = tab.props;
		if (!ID_FORMAT.test(id)) {
			throw new Error(
				`[TabGroup] Invalid tab id: "${id}". Ids must contain only letters, digits, underscores, or hyphens.`
			);
		}
		if (seenIds.has(id)) {
			throw new Error(`[TabGroup] Duplicate tab id: "${id}". Tab ids must be unique.`);
		}
		seenIds.add(id);
	}

	const firstId = tabs[0]?.props.id ?? '';
	const instanceId = useId();
	const activeId = useSignal<string>(
		defaultActive && tabs.some((t) => t.props.id === defaultActive) ? defaultActive : firstId
	);
	const mountedIds = useSignal<Set<string>>(new Set([activeId.value]));
	const tablistRef = useRef<HTMLDivElement>(null);

	function activateTab(id: string) {
		activeId.value = id;
		mountedIds.value = new Set([...mountedIds.value, id]);
		onChange?.(id);
		tabs.find((t) => t.props.id === id)?.props.onActivate?.();
	}

	function handleKeyDown(e: KeyboardEvent) {
		const tabEls = tablistRef.current
			? Array.from(tablistRef.current.querySelectorAll<HTMLElement>('[role=tab]'))
			: [];
		const idx = tabEls.indexOf(e.target as HTMLElement);
		if (idx === -1) {
			return;
		}

		let target = -1;
		if (e.key === 'ArrowRight') {
			target = (idx + 1) % tabEls.length;
		} else if (e.key === 'ArrowLeft') {
			target = (idx - 1 + tabEls.length) % tabEls.length;
		} else if (e.key === 'Home') {
			target = 0;
		} else if (e.key === 'End') {
			target = tabEls.length - 1;
		}

		if (target !== -1) {
			e.preventDefault();
			const targetEl = tabEls[target];
			const tabId = targetEl?.dataset.tabId;
			if (targetEl && tabId) {
				targetEl.focus();
				activateTab(tabId);
			}
		}
	}

	return (
		<div class={cx(styles.tabGroup, className)}>
			<div ref={tablistRef} role="tablist" class={styles.tabList} onKeyDown={handleKeyDown}>
				{tabs.map((tab) => {
					const { id, label } = tab.props;
					const isActive = activeId.value === id;
					const tabDomId = `${instanceId}-tab-${id}`;
					const panelDomId = `${instanceId}-tabpanel-${id}`;

					return (
						<button
							key={id}
							type="button"
							role="tab"
							id={tabDomId}
							class={styles.tab}
							aria-selected={isActive ? 'true' : 'false'}
							aria-controls={panelDomId}
							tabIndex={isActive ? 0 : -1}
							data-tab-id={id}
							onClick={() => activateTab(id)}
						>
							{label}
						</button>
					);
				})}
			</div>
			{tabs.map((tab) => {
				const { id, children: tabChildren, eager: tabEager } = tab.props;
				const isActive = activeId.value === id;
				const tabDomId = `${instanceId}-tab-${id}`;
				const panelDomId = `${instanceId}-tabpanel-${id}`;
				const shouldEager = tabEager ?? groupEager;
				const mounted = shouldEager || mountedIds.value.has(id);

				return (
					<TabPanel
						key={id}
						id={panelDomId}
						labelledBy={tabDomId}
						isActive={isActive}
						mounted={mounted}
					>
						{tabChildren}
					</TabPanel>
				);
			})}
		</div>
	);
};

export default TabGroup;
