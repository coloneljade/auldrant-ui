import type { IBaseProps } from '@internal/types';
import useTooltipPosition from '@internal/useTooltipPosition';
import { useSignal } from '@preact/signals';
import styles from '@styles/Tooltip.module.css';
import { cx } from '@utils';
import type { ComponentChildren, FunctionComponent, VNode } from 'preact';
import { cloneElement, isValidElement } from 'preact';
import { useEffect, useId, useRef } from 'preact/hooks';

/** Props for {@link Tooltip}. */
interface ITooltipProps extends IBaseProps {
	/** Element that triggers the tooltip — receives aria-describedby automatically. */
	children: ComponentChildren;
	/** Tooltip text or inline content. Must not contain interactive elements. */
	content: ComponentChildren;
	/** Delay in ms before showing on hover. Default: 200. Set to 0 to disable. */
	delay?: number;
}

/**
 * Hover/focus tooltip with CSS Anchor Positioning and accessible aria-describedby wiring.
 * Wrap any interactive element to provide a visible label hint for sighted users.
 *
 * The child element automatically receives `aria-describedby` pointing to the tooltip.
 * Uses CSS Anchor Positioning on Chrome 131+/Safari 26+; a JS fallback handles Firefox
 * and earlier browsers.
 *
 * @example
 * ```tsx
 * <Tooltip content="Save your work">
 *   <Button label="Save" />
 * </Tooltip>
 * ```
 */
const Tooltip: FunctionComponent<ITooltipProps> = (props) => {
	const { children, content, delay = 200, class: className } = props;

	const isVisible = useSignal(false);
	const tooltipId = useId();
	const wrapperRef = useRef<HTMLSpanElement>(null);
	const triggerRef = useRef<HTMLSpanElement>(null);
	const tooltipRef = useRef<HTMLDivElement>(null);
	const timerRef = useRef<number | null>(null);

	useTooltipPosition(isVisible.value, triggerRef, tooltipRef, wrapperRef);

	// All hover and focus events wired as imperative DOM listeners so the static
	// <span> wrapper carries zero JSX event handler attributes. Any JSX handler
	// on a non-interactive element triggers biome's noStaticElementInteractions
	// rule — this structure avoids that entirely without adding a spurious role.
	// delay is a dep so re-hovering after a prop change uses the current value.
	useEffect(() => {
		const wrapper = wrapperRef.current;
		if (!wrapper) {
			return;
		}

		const clearTimer = () => {
			if (timerRef.current !== null) {
				clearTimeout(timerRef.current);
				timerRef.current = null;
			}
		};

		const onMouseEnter = () => {
			clearTimer();
			if (delay > 0) {
				timerRef.current = window.setTimeout(() => {
					isVisible.value = true;
					timerRef.current = null;
				}, delay);
			} else {
				isVisible.value = true;
			}
		};

		const onMouseLeave = () => {
			clearTimer();
			isVisible.value = false;
		};

		// focusin/focusout bubble from focused descendants — no delay on focus
		// (WAI-ARIA requirement: tooltip must appear immediately on keyboard focus).
		const onFocusIn = () => {
			clearTimer();
			isVisible.value = true;
		};

		const onFocusOut = () => {
			clearTimer();
			isVisible.value = false;
		};

		wrapper.addEventListener('mouseenter', onMouseEnter);
		wrapper.addEventListener('mouseleave', onMouseLeave);
		wrapper.addEventListener('focusin', onFocusIn);
		wrapper.addEventListener('focusout', onFocusOut);
		return () => {
			wrapper.removeEventListener('mouseenter', onMouseEnter);
			wrapper.removeEventListener('mouseleave', onMouseLeave);
			wrapper.removeEventListener('focusin', onFocusIn);
			wrapper.removeEventListener('focusout', onFocusOut);
		};
	}, [delay]);

	// Escape to dismiss — document-level so it fires even when the tooltip is
	// shown via hover with nothing focused (injecting onKeyDown into the child
	// would not cover that case). Not stopPropagation — a parent dialog's Escape
	// is handled via the native cancel event, a separate event type, unaffected.
	useEffect(() => {
		if (!isVisible.value) {
			return;
		}
		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				isVisible.value = false;
			}
		};
		document.addEventListener('keydown', onKeyDown);
		return () => document.removeEventListener('keydown', onKeyDown);
	}, [isVisible.value]);

	// Inject aria-describedby into the child element if it is a single VNode;
	// otherwise wrap in a span so the attribute is still applied.
	const trigger = isValidElement(children)
		? cloneElement(children as VNode<{ 'aria-describedby'?: string }>, {
				'aria-describedby': tooltipId,
			})
		: ((<span aria-describedby={tooltipId}>{children}</span>) as ComponentChildren);

	return (
		<span ref={wrapperRef} class={cx(styles.tooltip, className)} data-placement="above">
			<span ref={triggerRef} class={styles.tooltipTriggerAnchor}>
				{trigger}
			</span>
			<div
				id={tooltipId}
				ref={tooltipRef}
				role="tooltip"
				aria-hidden={isVisible.value ? undefined : 'true'}
				class={cx(styles.tooltipContent, isVisible.value && styles.visible)}
			>
				{content}
			</div>
		</span>
	);
};

export default Tooltip;
