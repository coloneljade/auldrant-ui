import Link from '@components/Link';
import Nav from '@components/Nav';
import type { FunctionComponent } from 'preact';

export const NavDemo: FunctionComponent = () => (
	<div class="dev-section">
		<h2>Nav + SkipLink</h2>
		<p>
			<code>Nav</code> and <code>SkipLink</code> are dogfooded as the site header on every route.
			Below is a standalone demo.
		</p>
		<Nav title="Standalone nav demo">
			<Link href="/about">About</Link>
			<Link href="/not-found">Test 404</Link>
		</Nav>
	</div>
);
