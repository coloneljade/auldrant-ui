import type { IBaseProps } from '@scripts/types';
import { cx } from '@scripts/utils';
import styles from '@styles/Theme.module.css';
import type { ComponentChildren, FunctionComponent } from 'preact';

/** Props for {@link Theme}. */
interface IThemeProps extends IBaseProps {
	/** Content to theme. */
	children: ComponentChildren;
}

/**
 * Theme wrapper that scopes `--aui-*` custom properties to its subtree.
 *
 * The consumer defines the custom properties in their own CSS class:
 *
 * ```css
 * .my-theme {
 *   --aui-color-text: #1a1a1a;
 *   --aui-color-background: #ffffff;
 *   --aui-color-primary: #2563eb;
 * }
 * ```
 *
 * Then wrap your app:
 *
 * ```tsx
 * <Theme class="my-theme">
 *   <App />
 * </Theme>
 * ```
 *
 * Nestable for sub-themes (e.g. dark mode sections).
 */
const Theme: FunctionComponent<IThemeProps> = (props) => {
	const { children, class: className } = props;
	return <div class={cx(styles.theme, className)}>{children}</div>;
};

export default Theme;
