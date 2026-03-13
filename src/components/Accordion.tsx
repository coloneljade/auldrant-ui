import { useSignal } from '@preact/signals';
import type { IBaseProps } from '@scripts/types';
import { HeadingLevel } from '@scripts/types';
import { cx } from '@scripts/utils';
import styles from '@styles/Accordion.module.css';
import { ChevronDown } from 'lucide-preact';
import type { ComponentChildren, FunctionComponent } from 'preact';
import { useEffect, useId, useRef } from 'preact/hooks';

/** A single item in an {@link Accordion}. */
export interface IAccordionItem {
	/**
	 * Stable identifier. Used for aria-controls/aria-labelledby wiring and open-state tracking.
	 * Must be unique across all items. Valid characters: letters, digits, underscores, hyphens.
	 */
	id: string;
	/** Visible trigger label text. */
	trigger: string;
	/** Panel content. Supports arbitrary markup. */
	content: ComponentChildren;
	/** Whether this panel is open on initial render. Ignored after mount. */
	defaultOpen?: boolean;
}

/** Props for {@link Accordion}. */
interface IAccordionProps extends IBaseProps {
	/**
	 * Accordion items. Each requires a stable `id`, `trigger` label, and `content`.
	 *
	 * Note: each expanded panel renders `role="region"`. When many panels can be
	 * simultaneously open (exclusive=false), landmark proliferation may degrade
	 * screen reader navigation. Consider limiting item count in that mode.
	 */
	items: IAccordionItem[];
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
}

interface IAccordionPanelProps {
	id: string;
	labelledBy: string;
	isOpen: boolean;
	children: ComponentChildren;
}

const ID_FORMAT = /^[a-zA-Z0-9_-]+$/;

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
 * Collapsible disclosure sections with ARIA state, keyboard support, and smooth animation.
 * Supports multi-expand (default) and exclusive (single-open) modes.
 */
const Accordion: FunctionComponent<IAccordionProps> = (props) => {
	const { items, exclusive = false, headingLevel = HeadingLevel.h3, class: className } = props;

	const seenIds = new Set<string>();
	for (const item of items) {
		if (!ID_FORMAT.test(item.id)) {
			throw new Error(
				`[Accordion] Invalid item id: "${item.id}". Ids must contain only letters, digits, underscores, or hyphens.`
			);
		}
		if (seenIds.has(item.id)) {
			throw new Error(`[Accordion] Duplicate item id: "${item.id}". Item ids must be unique.`);
		}
		seenIds.add(item.id);
	}

	const instanceId = useId();
	const openIds = useSignal<Set<string>>(
		new Set(items.filter((item) => item.defaultOpen).map((item) => item.id))
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
				const triggerId = `${instanceId}-trigger-${item.id}`;
				const panelId = `${instanceId}-panel-${item.id}`;
				const isOpen = openIds.value.has(item.id);

				return (
					<div key={item.id} class={cx(styles.accordionItem, isOpen && styles.open)}>
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
								onClick={() => toggleItem(item.id)}
								onKeyDown={(e) => handleKeyDown(e, index)}
							>
								{item.trigger}
								<span class={styles.accordionTriggerIcon} aria-hidden="true">
									<ChevronDown size="1em" />
								</span>
							</button>
						</HeadingTag>
						<AccordionPanel id={panelId} labelledBy={triggerId} isOpen={isOpen}>
							{item.content}
						</AccordionPanel>
					</div>
				);
			})}
		</div>
	);
};

export default Accordion;
