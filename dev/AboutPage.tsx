import Badge from '@components/Badge';
import Card from '@components/Card';
import Link from '@components/Link';
import text from '@styles/text.module.css';
import { cx } from '@utils';
import type { FunctionComponent } from 'preact';

interface IAboutPageProps {
	id?: string;
}

export const AboutPage: FunctionComponent<IAboutPageProps> = (props) => {
	const { id } = props;
	return (
		<main class="dev-page" id={id}>
			<h1>
				Auldrant UI <Badge>v0.16.0</Badge>
			</h1>
			<p class={cx(text.muted, text.lg)}>
				Accessible Preact component library with design tokens and CSS modules.
			</p>

			<div class="dev-about-links">
				<Card>
					<h2>GitHub</h2>
					<p>Source code, issues, and pull requests.</p>
					<Link href="https://github.com/coloneljade/auldrant-ui">coloneljade/auldrant-ui ↗</Link>
				</Card>
				<Card>
					<h2>npm</h2>
					<p>Package registry — install, changelog, and versions.</p>
					<Link href="https://www.npmjs.com/package/@auldrant/ui">@auldrant/ui ↗</Link>
				</Card>
			</div>

			<p class={cx(text.muted, text.sm)}>
				Built with <Link href="https://preactjs.com">Preact</Link>. Styled with CSS Modules and
				custom properties.
			</p>
		</main>
	);
};
