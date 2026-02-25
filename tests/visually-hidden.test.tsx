import { describe, it } from 'bun:test';
import VisuallyHidden from '@components/VisuallyHidden';
import { render } from '@testing-library/preact';

describe('VisuallyHidden', () => {
	it('renders children accessible to screen readers', () => {
		const content = 'Accessible label';
		const { getByText } = render(<VisuallyHidden>{content}</VisuallyHidden>);
		getByText(content);
	});
});
