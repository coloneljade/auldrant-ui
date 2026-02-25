import { describe, it } from 'bun:test';
import Card from '@components/Card';
import { render } from '@testing-library/preact';

describe('Card', () => {
	it('renders children', () => {
		const content = 'Card content';
		const { getByText } = render(
			<Card>
				<p>{content}</p>
			</Card>
		);
		getByText(content);
	});
});
