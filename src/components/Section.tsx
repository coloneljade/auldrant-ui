import type { IBaseProps } from '@scripts/types';
import { HeadingLevel } from '@scripts/types';
import { cx } from '@scripts/utils';
import styles from '@styles/Section.module.css';
import type { ComponentChildren, FunctionComponent } from 'preact';
import { useId } from 'preact/hooks';

/** Props for {@link Section}. */
interface ISectionProps extends IBaseProps {
	/** Section heading text. */
	title: string;
	/** Heading level. Defaults to `HeadingLevel.h2`. */
	level?: HeadingLevel;
	/** Section body content. */
	children: ComponentChildren;
}

/**
 * Semantic `<section>` with configurable heading level (defaults to h2).
 * `aria-labelledby` links the region landmark to its heading.
 */
const Section: FunctionComponent<ISectionProps> = (props) => {
	const { title, level = HeadingLevel.h2, children, class: className } = props;
	const headingId = useId();
	const Heading = `h${level}` as const;
	return (
		<section class={cx(styles.section, className)} aria-labelledby={headingId}>
			<Heading id={headingId}>{title}</Heading>
			{children}
		</section>
	);
};

export default Section;
