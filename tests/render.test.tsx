import { describe, it } from 'bun:test';
import { render } from '@testing-library/preact';

describe('test infrastructure', () => {
	it('renders a Preact component into happy-dom', () => {
		const message = 'Hello, Auldrant';

		function Greeting() {
			return <p>{message}</p>;
		}

		const { getByText } = render(<Greeting />);
		getByText(message);
	});
});
