import { describe, expect, it } from 'bun:test';
import TabGroup, { Tab } from '@components/Tabs';
import { fireEvent, render } from '@testing-library/preact';
import { renderAndCheckA11y } from './setup';

describe('TabGroup a11y', () => {
	it('has no axe violations — first tab active (baseline)', async () => {
		await renderAndCheckA11y(
			<TabGroup>
				<Tab id="overview" label="Overview">
					<p>Overview content.</p>
				</Tab>
				<Tab id="details" label="Details">
					<p>Details content.</p>
				</Tab>
				<Tab id="settings" label="Settings">
					<p>Settings content.</p>
				</Tab>
			</TabGroup>
		);
	});

	it('has no axe violations — non-first tab active', async () => {
		await renderAndCheckA11y(
			<TabGroup defaultActive="details">
				<Tab id="overview" label="Overview">
					<p>Overview content.</p>
				</Tab>
				<Tab id="details" label="Details">
					<p>Details content.</p>
				</Tab>
				<Tab id="settings" label="Settings">
					<p>Settings content.</p>
				</Tab>
			</TabGroup>
		);
	});

	it('has no axe violations — fragment-wrapped tabs', async () => {
		await renderAndCheckA11y(
			<TabGroup>
				{/* biome-ignore lint/complexity/noUselessFragments: Fragment wrapping is the feature under test */}
				<>
					<Tab id="overview" label="Overview">
						<p>Overview content.</p>
					</Tab>
					<Tab id="details" label="Details">
						<p>Details content.</p>
					</Tab>
				</>
			</TabGroup>
		);
	});

	describe('WCAG SC 4.1.2: name, role, value', () => {
		it('each tab button has role="tab"', () => {
			const { getAllByRole } = render(
				<TabGroup>
					<Tab id="a" label="Alpha">
						Content A
					</Tab>
					<Tab id="b" label="Beta">
						Content B
					</Tab>
				</TabGroup>
			);

			const tabs = getAllByRole('tab');
			expect(tabs).toHaveLength(2);
		});

		it('each tab has an accessible name from its label', () => {
			const { getByRole } = render(
				<TabGroup>
					<Tab id="a" label="Alpha">
						Content A
					</Tab>
					<Tab id="b" label="Beta">
						Content B
					</Tab>
				</TabGroup>
			);

			getByRole('tab', { name: 'Alpha' });
			getByRole('tab', { name: 'Beta' });
		});

		it('aria-selected is present on all tabs', () => {
			const { getAllByRole } = render(
				<TabGroup>
					<Tab id="a" label="A">
						Content A
					</Tab>
					<Tab id="b" label="B">
						Content B
					</Tab>
				</TabGroup>
			);

			for (const tab of getAllByRole('tab')) {
				expect(tab.hasAttribute('aria-selected')).toBe(true);
			}
		});

		it('aria-controls on each tab resolves to a matching tabpanel id', () => {
			const { container } = render(
				<TabGroup>
					<Tab id="a" label="A">
						Content A
					</Tab>
					<Tab id="b" label="B">
						Content B
					</Tab>
				</TabGroup>
			);

			const tabs = container.querySelectorAll('[role=tab]');
			const panels = container.querySelectorAll('[role=tabpanel]');

			for (let i = 0; i < tabs.length; i++) {
				const controlsId = tabs[i]?.getAttribute('aria-controls');
				expect(controlsId).toBeTruthy();
				expect(panels[i]?.id).toBe(controlsId);
			}
		});
	});

	describe('WCAG SC 2.1.1: keyboard navigation', () => {
		it('ArrowRight navigates to the next tab', () => {
			const { getByRole } = render(
				<TabGroup>
					<Tab id="a" label="A">
						Content A
					</Tab>
					<Tab id="b" label="B">
						Content B
					</Tab>
				</TabGroup>
			);

			fireEvent.keyDown(getByRole('tab', { name: 'A' }), { key: 'ArrowRight' });

			expect(document.activeElement).toBe(getByRole('tab', { name: 'B' }));
		});

		it('ArrowLeft navigates to the previous tab', () => {
			const { getByRole } = render(
				<TabGroup defaultActive="b">
					<Tab id="a" label="A">
						Content A
					</Tab>
					<Tab id="b" label="B">
						Content B
					</Tab>
				</TabGroup>
			);

			fireEvent.keyDown(getByRole('tab', { name: 'B' }), { key: 'ArrowLeft' });

			expect(document.activeElement).toBe(getByRole('tab', { name: 'A' }));
		});

		it('Home navigates to the first tab', () => {
			const { getByRole } = render(
				<TabGroup defaultActive="c">
					<Tab id="a" label="A">
						Content A
					</Tab>
					<Tab id="b" label="B">
						Content B
					</Tab>
					<Tab id="c" label="C">
						Content C
					</Tab>
				</TabGroup>
			);

			fireEvent.keyDown(getByRole('tab', { name: 'C' }), { key: 'Home' });

			expect(document.activeElement).toBe(getByRole('tab', { name: 'A' }));
		});

		it('End navigates to the last tab', () => {
			const { getByRole } = render(
				<TabGroup>
					<Tab id="a" label="A">
						Content A
					</Tab>
					<Tab id="b" label="B">
						Content B
					</Tab>
					<Tab id="c" label="C">
						Content C
					</Tab>
				</TabGroup>
			);

			fireEvent.keyDown(getByRole('tab', { name: 'A' }), { key: 'End' });

			expect(document.activeElement).toBe(getByRole('tab', { name: 'C' }));
		});
	});
});
