import type { IBaseProps } from '@scripts/types';
import { cx } from '@scripts/utils';
import styles from '@styles/Theme.module.css';
import type { ComponentChildren, FunctionComponent } from 'preact';

/** Preset palette class names for `<Theme class={Palette.blue}>`. */
export const Palette = {
	blue: 'aui-blue',
	purple: 'aui-purple',
	teal: 'aui-teal',
	red: 'aui-red',
	orange: 'aui-orange',
	yellow: 'aui-yellow',
} as const;

/** Props for {@link Theme}. */
interface IThemeProps extends IBaseProps {
	/** Content to theme. */
	children: ComponentChildren;
}

/**
 * Theme wrapper that scopes `--aui-base-*` overrides to its subtree.
 *
 * The library provides sensible defaults — no theme class is required for
 * the default dark/light appearance. Override the base primary to brand:
 *
 * ```css
 * .brand {
 *   --aui-base-primary: oklch(0.65 0.20 280);
 * }
 * ```
 *
 * ```tsx
 * <Theme class="brand">
 *   <App />
 * </Theme>
 * ```
 *
 * Full override (primary + white/black):
 *
 * ```css
 * .custom {
 *   --aui-base-primary: oklch(0.62 0.19 150);
 *   --aui-base-white: #fafafa;
 *   --aui-base-black: #111111;
 * }
 * ```
 *
 * Nestable for sub-themes (e.g. accent sections within a page).
 */
const Theme: FunctionComponent<IThemeProps> = (props) => {
	const { children, class: className } = props;
	return <div class={cx(styles.theme, className)}>{children}</div>;
};

export default Theme;
