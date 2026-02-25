import type { IBaseProps } from '@scripts/types';
import { cx } from '@scripts/utils';
import { navigate } from '@signals/routing';
import styles from '@styles/Link.module.css';
import type { ComponentChildren, FunctionComponent } from 'preact';

/** Props for {@link Link}. */
interface ILinkProps extends IBaseProps {
	/** URL to navigate to. */
	href: string;
	/** Link content. */
	children: ComponentChildren;
	/** Force external behavior (same tab, rel attributes). */
	external?: boolean;
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
	const { href, children, external, class: className } = props;
	const isExt = external ?? isExternal(href);

	if (isExt) {
		return (
			<a href={href} class={cx(styles.link, className)} rel="noopener noreferrer">
				{children}
			</a>
		);
	}

	return (
		<a
			href={href}
			class={cx(styles.link, className)}
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
