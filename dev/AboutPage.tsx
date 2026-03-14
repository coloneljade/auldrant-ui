import Badge from '@components/Badge';
import Card from '@components/Card';
import Link from '@components/Link';
import type { FunctionComponent } from 'preact';

export const AboutPage: FunctionComponent = () => (
	<main class="dev-page">
		<h1>
			Auldrant UI <Badge>v0.16.0</Badge>
		</h1>
		<p class="dev-about-tagline">
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

		<p class="dev-about-footer">
			Built with <Link href="https://preactjs.com">Preact</Link>. Styled with CSS Modules and custom
			properties.
		</p>
	</main>
);
