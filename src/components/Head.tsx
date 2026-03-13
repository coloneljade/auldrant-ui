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
function syncProp(sig: { value: string }, value: string | undefined): void {
	if (value) {
		sig.value = value;
	}
}

const Head: FunctionComponent<IHeadProps> = (props) => {
	const {
		title: titleProp,
		description: descProp,
		canonical: canonicalProp,
		ogTitle: ogTitleProp,
		ogDescription: ogDescProp,
		ogImage: ogImageProp,
	} = props;

	useEffect(() => syncProp(title, titleProp), [titleProp]);
	useEffect(() => syncProp(description, descProp), [descProp]);
	useEffect(() => syncProp(canonical, canonicalProp), [canonicalProp]);
	useEffect(() => syncProp(ogTitle, ogTitleProp), [ogTitleProp]);
	useEffect(() => syncProp(ogDescription, ogDescProp), [ogDescProp]);
	useEffect(() => syncProp(ogImage, ogImageProp), [ogImageProp]);

	return null;
};

export default Head;
