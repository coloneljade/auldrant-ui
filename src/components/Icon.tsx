import { cx } from '@scripts/utils';
import styles from '@styles/Icon.module.css';
import {
	Check,
	CheckCircle,
	ChevronDown,
	Eye,
	EyeOff,
	File,
	Info,
	Search,
	TriangleAlert,
	Upload,
	X,
	XCircle,
} from 'lucide-preact';
import type { FunctionComponent } from 'preact';

/** All icons exposed by the library. Add to this enum when introducing a new icon. */
export enum IconName {
	check = 'check',
	chevronDown = 'chevronDown',
	dismiss = 'dismiss',
	error = 'error',
	file = 'file',
	hidePassword = 'hidePassword',
	info = 'info',
	search = 'search',
	showPassword = 'showPassword',
	success = 'success',
	upload = 'upload',
	warning = 'warning',
}

/** Props for {@link Icon}. Also serves as the base type for icon props across library components. */
export interface IIconProps {
	/** Semantic name determining which icon to render. */
	name: IconName;
	/**
	 * Optional CSS class for size or color overrides. The default size is `1em × 1em`.
	 * Pass a class with `width`/`height` to override — no `size` prop needed.
	 */
	class?: string | undefined;
}

// Exhaustive map — TypeScript errors if an IconName member is missing.
// Uses `satisfies` for the key check while preserving inferred LucideIcon types,
// avoiding `exactOptionalPropertyTypes` conflicts with ComponentType<T>.
const iconMap = {
	[IconName.check]: Check,
	[IconName.chevronDown]: ChevronDown,
	[IconName.dismiss]: X,
	[IconName.error]: XCircle,
	[IconName.file]: File,
	[IconName.hidePassword]: EyeOff,
	[IconName.info]: Info,
	[IconName.search]: Search,
	[IconName.showPassword]: Eye,
	[IconName.success]: CheckCircle,
	[IconName.upload]: Upload,
	[IconName.warning]: TriangleAlert,
} satisfies { [key in IconName]: unknown };

/**
 * Renders a single icon by semantic name. Icons are `aria-hidden="true"` by default
 * (set by lucide) — the surrounding context (visible text or `aria-label`) must provide
 * accessible meaning.
 *
 * Defaults to `1em × 1em`; override via the `class` prop.
 *
 * Never import lucide-preact directly in library components — use this component instead.
 * Swapping the underlying icon library requires changing only this file.
 */
const Icon: FunctionComponent<IIconProps> = (props) => {
	const { name, class: className } = props;
	const LucideIcon = iconMap[name];
	return <LucideIcon class={cx(styles.icon, className)} />;
};

export default Icon;
