import { canonical, description, ogDescription, ogImage, ogTitle, title } from '@signals/head';
import type { FunctionComponent } from 'preact';
import { useEffect } from 'preact/hooks';

/** Props for {@link Head}. */
interface IHeadProps {
	/** Document title. */
	title?: string;
	/** Meta description content. */
	description?: string;
	/** Canonical URL. */
	canonical?: string;
	/** Open Graph title. */
	ogTitle?: string;
	/** Open Graph description. */
	ogDescription?: string;
	/** Open Graph image URL. */
	ogImage?: string;
}

/**
 * Declarative document head manager. Render-less component that syncs props
 * to head signals, which are then reflected in the actual document `<head>`.
 *
 * ```tsx
 * <Head title="My Page" description="Page description" canonical="https://example.com/page" />
 * ```
 */
const Head: FunctionComponent<IHeadProps> = (props) => {
	const {
		title: titleProp,
		description: descProp,
		canonical: canonicalProp,
		ogTitle: ogTitleProp,
		ogDescription: ogDescProp,
		ogImage: ogImageProp,
	} = props;

	useEffect(() => {
		if (titleProp !== undefined) {
			title.value = titleProp;
		}
	}, [titleProp]);

	useEffect(() => {
		if (descProp !== undefined) {
			description.value = descProp;
		}
	}, [descProp]);

	useEffect(() => {
		if (canonicalProp !== undefined) {
			canonical.value = canonicalProp;
		}
	}, [canonicalProp]);

	useEffect(() => {
		if (ogTitleProp !== undefined) {
			ogTitle.value = ogTitleProp;
		}
	}, [ogTitleProp]);

	useEffect(() => {
		if (ogDescProp !== undefined) {
			ogDescription.value = ogDescProp;
		}
	}, [ogDescProp]);

	useEffect(() => {
		if (ogImageProp !== undefined) {
			ogImage.value = ogImageProp;
		}
	}, [ogImageProp]);

	return null;
};

export default Head;
