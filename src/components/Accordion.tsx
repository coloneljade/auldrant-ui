import { useSignal } from '@preact/signals';
import type { IBaseProps } from '@scripts/types';
import { cx } from '@scripts/utils';
import styles from '@styles/Accordion.module.css';
import { ChevronDown } from 'lucide-preact';
import type { ComponentChildren, FunctionComponent } from 'preact';
import { useEffect, useId, useRef } from 'preact/hooks';

/** A single item in an {@link Accordion}. */
export interface IAccordionItem {
	/** Stable identifier. Used for aria-controls/aria-labelledby wiring and open-state tracking. */
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
 * Collapsible disclosure sections with ARIA state, keyboard support, and smooth animation.
 * Supports multi-expand (default) and exclusive (single-open) modes.
 */
const Accordion: FunctionComponent<IAccordionProps> = (props) => {
	const { items, exclusive = false, class: className } = props;

	const seenIds = new Set<string>();
	for (const item of items) {
		if (seenIds.has(item.id)) {
			throw new Error(`[Accordion] Duplicate item id: "${item.id}". Item ids must be unique.`);
		}
		seenIds.add(item.id);
	}

	const instanceId = useId();
	const openIds = useSignal<Set<string>>(
		new Set(items.filter((item) => item.defaultOpen).map((item) => item.id))
	);

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

	return (
		<div class={cx(styles.accordion, className)}>
			{items.map((item) => {
				const triggerId = `${instanceId}-trigger-${item.id}`;
				const panelId = `${instanceId}-panel-${item.id}`;
				const isOpen = openIds.value.has(item.id);

				return (
					<div key={item.id} class={cx(styles.accordionItem, isOpen && styles.open)}>
						<h3 class={styles.accordionHeading}>
							<button
								type="button"
								id={triggerId}
								class={styles.accordionTrigger}
								aria-expanded={isOpen ? 'true' : 'false'}
								aria-controls={panelId}
								onClick={() => toggleItem(item.id)}
							>
								{item.trigger}
								<span class={styles.accordionTriggerIcon} aria-hidden="true">
									<ChevronDown size="1em" />
								</span>
							</button>
						</h3>
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
