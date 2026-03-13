import Link from '@components/Link';
import Nav from '@components/Nav';
import SkipLink from '@components/SkipLink';
import type { FunctionComponent } from 'preact';

export const NavDemo: FunctionComponent = () => (
	<div class="dev-section">
		<h2>Nav + SkipLink</h2>
		<SkipLink />
		<Nav title="Main navigation">
			<Link href="/">Home</Link>
			<Link href="/about">About</Link>
			<Link href="/contact">Contact</Link>
		</Nav>
	</div>
);
