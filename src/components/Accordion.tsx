import Icon, { IconName } from '@components/Icon';
import { useSignal } from '@preact/signals';
import type { IBaseProps } from '@scripts/types';
import { HeadingLevel } from '@scripts/types';
import { cx } from '@scripts/utils';
import styles from '@styles/Accordion.module.css';
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

/** Props for {@link AccordionItem}. */
interface IAccordionItemProps extends IBaseProps {
	/**
	 * Stable identifier. Used for aria-controls/aria-labelledby wiring and open-state tracking.
	 * Must be unique across all items. Valid characters: letters, digits, underscores, hyphens.
	 */
	id: string;
	/** Visible trigger label text. */
	label: string;
	/** Panel content. Supports arbitrary markup. */
	children: ComponentChildren;
	/** Whether this panel is open on initial render. Ignored after mount. */
	defaultOpen?: boolean;
}

/** Props for {@link Accordion}. */
interface IAccordionProps extends IBaseProps {
	/**
	 * When true, opening one panel closes all others.
	 * Defaults to false (multi-expand).
	 *
	 * Note: `defaultOpen` on multiple items is honoured on initial render
	 * regardless of this flag. Exclusive mode only applies to user-initiated toggles.
	 */
	exclusive?: boolean;
	/**
	 * Heading level for accordion item headings. Defaults to `HeadingLevel.h3`.
	 * Choose based on document outline — ensure heading levels are not skipped.
	 */
	headingLevel?: HeadingLevel;
	/**
	 * Accordion items. Each must be an {@link AccordionItem} element.
	 *
	 * Note: each expanded panel renders `role="region"`. When many panels can be
	 * simultaneously open (exclusive=false), landmark proliferation may degrade
	 * screen reader navigation. Consider limiting item count in that mode.
	 */
	children: ComponentChildren;
}

interface IAccordionPanelProps {
	id: string;
	labelledBy: string;
	isOpen: boolean;
	children: ComponentChildren;
}

const AccordionPanel: FunctionComponent<IAccordionPanelProps> = (props) => {
	const { id, labelledBy, isOpen, children } = props;
	const ref = useRef<HTMLElement>(null);

	useEffect(() => {
		if (ref.current) {
			ref.current.inert = !isOpen;
		}
	}, [isOpen]);

	return (
		<section ref={ref} id={id} aria-labelledby={labelledBy} class={styles.accordionPanel}>
			<div class={styles.accordionPanelInner}>{children}</div>
		</section>
	);
};

/**
 * A single item in an {@link Accordion}. Renders null — all rendering is handled by Accordion.
 *
 * @example
 * ```tsx
 * <Accordion exclusive>
 *   <AccordionItem id="one" label="Panel one" defaultOpen>
 *     <p>Content one</p>
 *   </AccordionItem>
 *   <AccordionItem id="two" label="Panel two">
 *     <p>Content two</p>
 *   </AccordionItem>
 * </Accordion>
 * ```
 */
export const AccordionItem: FunctionComponent<IAccordionItemProps> = () => null;

/**
 * Collapsible disclosure sections with ARIA state, keyboard support, and smooth animation.
 * Supports multi-expand (default) and exclusive (single-open) modes.
 */
const Accordion: FunctionComponent<IAccordionProps> = (props) => {
	const { exclusive = false, headingLevel = HeadingLevel.h3, class: className, children } = props;

	// Flatten fragments, arrays, and filter falsy values
	const flatChildren = flattenChildren(children);

	// Validate: all children must be <AccordionItem> elements
	for (const child of flatChildren) {
		if (!isValidElement(child) || child.type !== AccordionItem) {
			throw new Error('[Accordion] All children must be <AccordionItem>.');
		}
	}

	const items = flatChildren as VNode<IAccordionItemProps>[];

	// Validate IDs
	const seenIds = new Set<string>();
	for (const item of items) {
		const { id } = item.props;
		if (!ID_FORMAT.test(id)) {
			throw new Error(
				`[Accordion] Invalid item id: "${id}". Ids must contain only letters, digits, underscores, or hyphens.`
			);
		}
		if (seenIds.has(id)) {
			throw new Error(`[Accordion] Duplicate item id: "${id}". Item ids must be unique.`);
		}
		seenIds.add(id);
	}

	const instanceId = useId();
	const openIds = useSignal<Set<string>>(
		new Set(items.filter((item) => item.props.defaultOpen).map((item) => item.props.id))
	);
	const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);

	const HeadingTag = `h${headingLevel}` as const;

	function toggleItem(id: string) {
		const next = new Set(openIds.value);
		if (next.has(id)) {
			next.delete(id);
		} else {
			if (exclusive) {
				next.clear();
			}
			next.add(id);
		}
		openIds.value = next;
	}

	function handleKeyDown(e: KeyboardEvent, index: number) {
		let target = -1;
		if (e.key === 'ArrowDown') {
			target = (index + 1) % items.length;
		} else if (e.key === 'ArrowUp') {
			target = (index - 1 + items.length) % items.length;
		} else if (e.key === 'Home') {
			target = 0;
		} else if (e.key === 'End') {
			target = items.length - 1;
		}
		if (target !== -1) {
			e.preventDefault();
			triggerRefs.current[target]?.focus();
		}
	}

	return (
		<div class={cx(styles.accordion, className)}>
			{items.map((item, index) => {
				const { id, label, children: itemChildren } = item.props;
				const triggerId = `${instanceId}-trigger-${id}`;
				const panelId = `${instanceId}-panel-${id}`;
				const isOpen = openIds.value.has(id);

				return (
					<div key={id} class={cx(styles.accordionItem, isOpen && styles.open)}>
						<HeadingTag class={styles.accordionHeading}>
							<button
								type="button"
								id={triggerId}
								ref={(el) => {
									triggerRefs.current[index] = el as HTMLButtonElement | null;
								}}
								class={styles.accordionTrigger}
								aria-expanded={isOpen ? 'true' : 'false'}
								aria-controls={panelId}
								onClick={() => toggleItem(id)}
								onKeyDown={(e) => handleKeyDown(e, index)}
							>
								{label}
								<span class={styles.accordionTriggerIcon} aria-hidden="true">
									<Icon name={IconName.chevronDown} />
								</span>
							</button>
						</HeadingTag>
						<AccordionPanel id={panelId} labelledBy={triggerId} isOpen={isOpen}>
							{itemChildren}
						</AccordionPanel>
					</div>
				);
			})}
		</div>
	);
};

export default Accordion;
