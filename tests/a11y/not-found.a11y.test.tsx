import { describe, it } from 'bun:test';
import NotFound from '@components/NotFound';
import { renderAndCheckA11y } from './setup';

describe('NotFound a11y', () => {
	it('has no axe violations (default props)', async () => {
		await renderAndCheckA11y(<NotFound />);
	});

	it('has no axe violations (with message)', async () => {
		await renderAndCheckA11y(
			<NotFound
				heading="404"
				message="This page does not exist."
				href="/home"
				linkLabel="Go home"
			/>
		);
	});
});
