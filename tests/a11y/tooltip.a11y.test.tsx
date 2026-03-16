import { describe, expect, it } from 'bun:test';
import Tooltip from '@components/Tooltip';
import { act, fireEvent, render } from '@testing-library/preact';
import { checkA11y, expectNoViolations, renderAndCheckA11y } from './setup';

describe('Tooltip a11y', () => {
	it('has no axe violations — hidden', async () => {
		await renderAndCheckA11y(
			<Tooltip content="Save your work">
				<button type="button">Save</button>
			</Tooltip>
		);
	});

	it('has no axe violations — visible', async () => {
		const { container } = render(
			<Tooltip content="Save your work" delay={0}>
				<button type="button">Save</button>
			</Tooltip>
		);
		await act(async () => {
			fireEvent.mouseEnter(container.firstElementChild as HTMLElement);
		});
		const axeResults = await checkA11y(container);
		expectNoViolations(axeResults);
	});

	it('WCAG SC 1.3.1: tooltip element has role="tooltip"', () => {
		const { getByRole } = render(
			<Tooltip content="Helpful hint">
				<button type="button">Action</button>
			</Tooltip>
		);
		getByRole('tooltip', { hidden: true });
	});

	it('WCAG SC 1.3.1: trigger aria-describedby references tooltip element', () => {
		const { getByRole } = render(
			<Tooltip content="Helpful hint">
				<button type="button">Action</button>
			</Tooltip>
		);
		const button = getByRole('button', { name: 'Action' });
		const tooltip = getByRole('tooltip', { hidden: true });
		const describedBy = button.getAttribute('aria-describedby');

		expect(describedBy).toBeTruthy();
		expect(tooltip.id).toBe(describedBy);
	});

	describe('WCAG SC 2.1.1: keyboard control', () => {
		it('Escape dismisses a visible tooltip', async () => {
			const { container, getByRole } = render(
				<Tooltip content="Info" delay={0}>
					<button type="button">Help</button>
				</Tooltip>
			);
			const wrapper = container.firstElementChild as HTMLElement;

			await act(async () => {
				fireEvent.focusIn(wrapper);
			});

			// visible — aria-hidden removed
			expect(getByRole('tooltip', { hidden: true }).getAttribute('aria-hidden')).toBeNull();

			await act(async () => {
				fireEvent.keyDown(document, { key: 'Escape' });
			});

			// tooltip still in DOM but hidden again
			expect(getByRole('tooltip', { hidden: true }).getAttribute('aria-hidden')).toBe('true');
		});
	});
});
