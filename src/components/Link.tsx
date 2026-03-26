import type { IBaseProps } from '@internal/types';
import { navigate } from '@signals/routing';
import styles from '@styles/Link.module.css';
import { cx } from '@utils';
import type { ComponentChildren, FunctionComponent } from 'preact';

/** Props for {@link Link}. */
interface ILinkProps extends IBaseProps {
	/** URL to navigate to. */
	href: string;
	/** Link content. */
	children: ComponentChildren;
	/** Force external behavior (same tab, rel attributes). */
	external?: boolean;
	/** Tab index override. Pass `-1` to remove the link from the tab order. */
	tabIndex?: number;
	/** Mark the link as non-interactive. Use with `tabIndex={-1}` for disabled links. */
	'aria-disabled'?: true;
	/** Accessible name for the link when visible text is insufficient. */
	'aria-label'?: string;
}

/** Detect whether a URL points to a different origin. */
function isExternal(href: string): boolean {
	try {
		return new URL(href, window.location.href).origin !== window.location.origin;
	} catch {
		return false;
	}
}

/**
 * Link that auto-detects internal vs external URLs.
 * Internal links use the routing signal's `navigate()`.
 * External links render a plain `<a>` in the same tab.
 */
const Link: FunctionComponent<ILinkProps> = (props) => {
	const {
		href,
		children,
		external,
		class: className,
		tabIndex,
		'aria-disabled': ariaDisabled,
		'aria-label': ariaLabel,
	} = props;
	const isExt = external ?? isExternal(href);

	if (isExt) {
		return (
			<a
				href={href}
				class={cx(styles.link, className)}
				rel="noopener noreferrer"
				tabIndex={tabIndex}
				aria-disabled={ariaDisabled}
				aria-label={ariaLabel}
			>
				{children}
			</a>
		);
	}

	return (
		<a
			href={href}
			class={cx(styles.link, className)}
			tabIndex={tabIndex}
			aria-disabled={ariaDisabled}
			aria-label={ariaLabel}
			onClick={(e) => {
				e.preventDefault();
				navigate(href);
			}}
		>
			{children}
		</a>
	);
};

export default Link;
