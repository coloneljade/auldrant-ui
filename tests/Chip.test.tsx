import { describe, expect, it, mock } from 'bun:test';
import Chip, { ChipVariant } from '@components/Chip';
import { fireEvent, render } from '@testing-library/preact';

describe('Chip', () => {
	describe('rendering', () => {
		it('renders the label text', () => {
			// Act
			const { getByText } = render(<Chip label="TypeScript" />);

			// Assert
			getByText('TypeScript');
		});

		it('renders as a <span> element', () => {
			// Act
			const { container } = render(<Chip label="TypeScript" />);

			// Assert
			expect(container.firstElementChild?.tagName).toBe('SPAN');
		});
	});

	describe('remove button', () => {
		it('does not render a remove button when onRemove is absent', () => {
			// Act
			const { queryByRole } = render(<Chip label="TypeScript" />);

			// Assert
			expect(queryByRole('button')).toBeNull();
		});

		it('renders a remove button with the default accessible name when onRemove is provided', () => {
			// Act
			const { getByRole } = render(<Chip label="TypeScript" onRemove={() => {}} />);

			// Assert
			getByRole('button', { name: 'Remove TypeScript' });
		});

		it('uses a custom removeLabel when provided', () => {
			// Act
			const { getByRole } = render(
				<Chip label="TypeScript" onRemove={() => {}} removeLabel="Dismiss TypeScript" />
			);

			// Assert
			getByRole('button', { name: 'Dismiss TypeScript' });
		});

		it('calls onRemove when the remove button is clicked', () => {
			// Arrange
			const onRemove = mock(() => {});
			const { getByRole } = render(<Chip label="TypeScript" onRemove={onRemove} />);

			// Act
			fireEvent.click(getByRole('button', { name: 'Remove TypeScript' }));

			// Assert
			expect(onRemove).toHaveBeenCalledTimes(1);
		});

		it('calls onRemove when Backspace is pressed on the remove button', () => {
			// Arrange
			const onRemove = mock(() => {});
			const { getByRole } = render(<Chip label="TypeScript" onRemove={onRemove} />);

			// Act
			fireEvent.keyDown(getByRole('button', { name: 'Remove TypeScript' }), {
				key: 'Backspace',
			});

			// Assert
			expect(onRemove).toHaveBeenCalledTimes(1);
		});

		it('calls onRemove when Delete is pressed on the remove button', () => {
			// Arrange
			const onRemove = mock(() => {});
			const { getByRole } = render(<Chip label="TypeScript" onRemove={onRemove} />);

			// Act
			fireEvent.keyDown(getByRole('button', { name: 'Remove TypeScript' }), { key: 'Delete' });

			// Assert
			expect(onRemove).toHaveBeenCalledTimes(1);
		});

		it('disables the remove button when disabled prop is set', () => {
			// Act
			const { getByRole } = render(<Chip label="TypeScript" onRemove={() => {}} disabled={true} />);

			// Assert
			expect(
				(getByRole('button', { name: 'Remove TypeScript' }) as HTMLButtonElement).disabled
			).toBe(true);
		});
	});

	describe('variants', () => {
		it.each(Object.values(ChipVariant))('renders %s variant without error', (variant) => {
			// Act & Assert — smoke test
			render(<Chip label="TypeScript" variant={variant} />);
		});
	});

	describe('class forwarding', () => {
		it('forwards the class prop to the root element', () => {
			// Act
			const { container } = render(<Chip label="TypeScript" class="custom-class" />);

			// Assert
			expect(container.firstElementChild?.classList.contains('custom-class')).toBe(true);
		});
	});
});
