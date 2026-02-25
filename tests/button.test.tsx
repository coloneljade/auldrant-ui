import { describe, expect, it, mock } from 'bun:test';
import Button from '@components/Button';
import { fireEvent, render } from '@testing-library/preact';

describe('Button', () => {
	it('renders the label text', () => {
		const label = 'Click me';
		const { getByText } = render(<Button label={label} />);
		getByText(label);
	});

	it('defaults to type="button"', () => {
		const label = 'Test';
		const { getByText } = render(<Button label={label} />);
		expect((getByText(label) as HTMLButtonElement).type).toBe('button');
	});

	it('accepts a custom type', () => {
		const label = 'Submit';
		const { getByText } = render(<Button label={label} type="submit" />);
		expect((getByText(label) as HTMLButtonElement).type).toBe('submit');
	});

	it('calls onClick when clicked', () => {
		const label = 'Go';
		const handleClick = mock(() => {});
		const { getByText } = render(<Button label={label} onClick={handleClick} />);
		fireEvent.click(getByText(label));
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it('does not call onClick when disabled', () => {
		const label = 'Nope';
		const handleClick = mock(() => {});
		const { getByText } = render(<Button label={label} onClick={handleClick} disabled />);
		const button = getByText(label) as HTMLButtonElement;
		expect(button.disabled).toBe(true);
		fireEvent.click(button);
		expect(handleClick).not.toHaveBeenCalled();
	});
});
