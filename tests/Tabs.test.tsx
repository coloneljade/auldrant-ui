import { describe, expect, it, mock } from 'bun:test';
import TabGroup, { Tab } from '@components/Tabs';
import { fireEvent, render } from '@testing-library/preact';

describe('TabGroup', () => {
	describe('rendering', () => {
		it('renders all tab labels', () => {
			const { getByRole } = render(
				<TabGroup>
					<Tab id="a" label="Alpha">
						Content A
					</Tab>
					<Tab id="b" label="Beta">
						Content B
					</Tab>
					<Tab id="c" label="Gamma">
						Content C
					</Tab>
				</TabGroup>
			);

			getByRole('tab', { name: 'Alpha' });
			getByRole('tab', { name: 'Beta' });
			getByRole('tab', { name: 'Gamma' });
		});

		it('renders tabs inside a Fragment', () => {
			const { getByRole } = render(
				<TabGroup>
					{/* biome-ignore lint/complexity/noUselessFragments: Fragment wrapping is the feature under test */}
					<>
						<Tab id="a" label="Alpha">
							Content A
						</Tab>
						<Tab id="b" label="Beta">
							Content B
						</Tab>
					</>
				</TabGroup>
			);

			getByRole('tab', { name: 'Alpha' });
			getByRole('tab', { name: 'Beta' });
		});

		it('forwards the class prop to the root element', () => {
			const { container } = render(
				<TabGroup class="custom-class">
					<Tab id="a" label="A">
						Content A
					</Tab>
				</TabGroup>
			);

			expect(container.firstElementChild?.classList.contains('custom-class')).toBe(true);
		});

		it('renders a tablist and tab panels', () => {
			const { getByRole, container } = render(
				<TabGroup>
					<Tab id="a" label="A">
						Content A
					</Tab>
					<Tab id="b" label="B">
						Content B
					</Tab>
				</TabGroup>
			);

			getByRole('tablist');
			const panels = container.querySelectorAll('[role=tabpanel]');
			expect(panels).toHaveLength(2);
		});
	});

	describe('initial state', () => {
		it('activates the first tab by default', () => {
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
			expect(tabs[0]?.getAttribute('aria-selected')).toBe('true');
			expect(tabs[1]?.getAttribute('aria-selected')).toBe('false');
		});

		it('activates the specified defaultActive tab', () => {
			const { container } = render(
				<TabGroup defaultActive="b">
					<Tab id="a" label="A">
						Content A
					</Tab>
					<Tab id="b" label="B">
						Content B
					</Tab>
				</TabGroup>
			);

			const tabs = container.querySelectorAll('[role=tab]');
			expect(tabs[0]?.getAttribute('aria-selected')).toBe('false');
			expect(tabs[1]?.getAttribute('aria-selected')).toBe('true');
		});

		it('falls back to first tab when defaultActive does not match any id', () => {
			const { container } = render(
				<TabGroup defaultActive="nonexistent">
					<Tab id="a" label="A">
						Content A
					</Tab>
					<Tab id="b" label="B">
						Content B
					</Tab>
				</TabGroup>
			);

			const tabs = container.querySelectorAll('[role=tab]');
			expect(tabs[0]?.getAttribute('aria-selected')).toBe('true');
		});
	});

	describe('click activation', () => {
		it('clicking a tab activates it', () => {
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

			fireEvent.click(getByRole('tab', { name: 'B' }));

			expect(getByRole('tab', { name: 'B' }).getAttribute('aria-selected')).toBe('true');
			expect(getByRole('tab', { name: 'A' }).getAttribute('aria-selected')).toBe('false');
		});

		it('clicking the active tab keeps it active', () => {
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

			fireEvent.click(getByRole('tab', { name: 'A' }));

			expect(getByRole('tab', { name: 'A' }).getAttribute('aria-selected')).toBe('true');
		});
	});

	describe('keyboard navigation (lazy mode — focus only)', () => {
		it('ArrowRight moves focus without activating the target tab', () => {
			// Arrange
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
			const tabA = getByRole('tab', { name: 'A' });
			const tabB = getByRole('tab', { name: 'B' });

			// Act
			fireEvent.keyDown(tabA, { key: 'ArrowRight' });

			// Assert — focus moves but activation stays on A (APG manual-activation for lazy panels)
			expect(document.activeElement).toBe(tabB);
			expect(tabB.getAttribute('aria-selected')).toBe('false');
			expect(tabA.getAttribute('aria-selected')).toBe('true');
		});

		it('ArrowLeft moves focus without activating the target tab', () => {
			// Arrange
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
			const tabA = getByRole('tab', { name: 'A' });
			const tabB = getByRole('tab', { name: 'B' });

			// Act
			fireEvent.keyDown(tabB, { key: 'ArrowLeft' });

			// Assert — focus moves but B stays selected
			expect(document.activeElement).toBe(tabA);
			expect(tabA.getAttribute('aria-selected')).toBe('false');
			expect(tabB.getAttribute('aria-selected')).toBe('true');
		});

		it('eager mode auto-activates on arrow navigation', () => {
			// Arrange
			const { getByRole } = render(
				<TabGroup eager>
					<Tab id="a" label="A">
						Content A
					</Tab>
					<Tab id="b" label="B">
						Content B
					</Tab>
				</TabGroup>
			);
			const tabA = getByRole('tab', { name: 'A' });
			const tabB = getByRole('tab', { name: 'B' });

			// Act
			fireEvent.keyDown(tabA, { key: 'ArrowRight' });

			// Assert — eager panels are already mounted, so auto-activation is safe
			expect(document.activeElement).toBe(tabB);
			expect(tabB.getAttribute('aria-selected')).toBe('true');
		});

		it('ArrowRight from last tab wraps to first', () => {
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
			const tabA = getByRole('tab', { name: 'A' });
			const tabC = getByRole('tab', { name: 'C' });

			fireEvent.keyDown(tabC, { key: 'ArrowRight' });

			expect(document.activeElement).toBe(tabA);
		});

		it('ArrowLeft from first tab wraps to last', () => {
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
			const tabA = getByRole('tab', { name: 'A' });
			const tabC = getByRole('tab', { name: 'C' });

			fireEvent.keyDown(tabA, { key: 'ArrowLeft' });

			expect(document.activeElement).toBe(tabC);
		});

		it('Home moves focus to the first tab', () => {
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
			const tabA = getByRole('tab', { name: 'A' });
			const tabC = getByRole('tab', { name: 'C' });

			fireEvent.keyDown(tabC, { key: 'Home' });

			expect(document.activeElement).toBe(tabA);
		});

		it('End moves focus to the last tab', () => {
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
			const tabA = getByRole('tab', { name: 'A' });
			const tabC = getByRole('tab', { name: 'C' });

			fireEvent.keyDown(tabA, { key: 'End' });

			expect(document.activeElement).toBe(tabC);
		});
	});

	describe('ARIA attributes', () => {
		it('active tab has aria-selected="true", others have aria-selected="false"', () => {
			const { container } = render(
				<TabGroup defaultActive="b">
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

			const tabs = container.querySelectorAll('[role=tab]');
			expect(tabs[0]?.getAttribute('aria-selected')).toBe('false');
			expect(tabs[1]?.getAttribute('aria-selected')).toBe('true');
			expect(tabs[2]?.getAttribute('aria-selected')).toBe('false');
		});

		it('active tab has tabIndex 0, others have tabIndex -1', () => {
			const { container } = render(
				<TabGroup defaultActive="b">
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

			const tabs = container.querySelectorAll('[role=tab]');
			expect(tabs[0]?.getAttribute('tabindex')).toBe('-1');
			expect(tabs[1]?.getAttribute('tabindex')).toBe('0');
			expect(tabs[2]?.getAttribute('tabindex')).toBe('-1');
		});

		it('each tab has aria-controls matching its panel id', () => {
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
				const panelId = tabs[i]?.getAttribute('aria-controls');
				expect(panelId).toBeTruthy();
				expect(panels[i]?.id).toBe(panelId);
			}
		});

		it('each panel has aria-labelledby matching its tab button id', () => {
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

			for (let i = 0; i < panels.length; i++) {
				const tabId = panels[i]?.getAttribute('aria-labelledby');
				expect(tabId).toBeTruthy();
				expect(tabs[i]?.id).toBe(tabId);
			}
		});

		it('tabIndex updates after tab activation', () => {
			const { getByRole, container } = render(
				<TabGroup>
					<Tab id="a" label="A">
						Content A
					</Tab>
					<Tab id="b" label="B">
						Content B
					</Tab>
				</TabGroup>
			);

			fireEvent.click(getByRole('tab', { name: 'B' }));

			const tabs = container.querySelectorAll('[role=tab]');
			expect(tabs[0]?.getAttribute('tabindex')).toBe('-1');
			expect(tabs[1]?.getAttribute('tabindex')).toBe('0');
		});
	});

	describe('panel visibility', () => {
		it('active panel does not have the hidden attribute', () => {
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

			const panels = container.querySelectorAll('[role=tabpanel]');
			expect(panels[0]?.hasAttribute('hidden')).toBe(false);
			expect(panels[1]?.hasAttribute('hidden')).toBe(true);
		});

		it('switching tabs updates the hidden attribute', () => {
			const { getByRole, container } = render(
				<TabGroup>
					<Tab id="a" label="A">
						Content A
					</Tab>
					<Tab id="b" label="B">
						Content B
					</Tab>
				</TabGroup>
			);

			fireEvent.click(getByRole('tab', { name: 'B' }));

			const panels = container.querySelectorAll('[role=tabpanel]');
			expect(panels[0]?.hasAttribute('hidden')).toBe(true);
			expect(panels[1]?.hasAttribute('hidden')).toBe(false);
		});
	});

	describe('lazy/eager mounting', () => {
		it('lazy (default): inactive tab content is not mounted initially', () => {
			const { queryByText } = render(
				<TabGroup>
					<Tab id="a" label="A">
						Content A
					</Tab>
					<Tab id="b" label="B">
						Content B
					</Tab>
				</TabGroup>
			);

			expect(queryByText('Content A')).toBeTruthy();
			expect(queryByText('Content B')).toBeNull();
		});

		it('lazy: switching to a tab mounts its content', () => {
			const { getByRole, getByText } = render(
				<TabGroup>
					<Tab id="a" label="A">
						Content A
					</Tab>
					<Tab id="b" label="B">
						Content B
					</Tab>
				</TabGroup>
			);

			fireEvent.click(getByRole('tab', { name: 'B' }));

			getByText('Content B');
		});

		it('lazy: once mounted, content stays in DOM after deactivation', () => {
			const { getByRole, queryByText } = render(
				<TabGroup>
					<Tab id="a" label="A">
						Content A
					</Tab>
					<Tab id="b" label="B">
						Content B
					</Tab>
				</TabGroup>
			);

			fireEvent.click(getByRole('tab', { name: 'B' }));
			fireEvent.click(getByRole('tab', { name: 'A' }));

			expect(queryByText('Content B')).toBeTruthy();
		});

		it('group-level eager: all panels are mounted immediately', () => {
			const { getByText } = render(
				<TabGroup eager>
					<Tab id="a" label="A">
						Content A
					</Tab>
					<Tab id="b" label="B">
						Content B
					</Tab>
				</TabGroup>
			);

			getByText('Content A');
			getByText('Content B');
		});

		it('per-tab eager: individual eager tab is mounted immediately', () => {
			const { getByText, queryByText } = render(
				<TabGroup>
					<Tab id="a" label="A">
						Content A
					</Tab>
					<Tab id="b" label="B" eager>
						Content B
					</Tab>
					<Tab id="c" label="C">
						Content C
					</Tab>
				</TabGroup>
			);

			getByText('Content A');
			getByText('Content B');
			expect(queryByText('Content C')).toBeNull();
		});

		it('per-tab eager={false} overrides group-level eager', () => {
			const { getByText, queryByText } = render(
				<TabGroup eager>
					<Tab id="a" label="A">
						Content A
					</Tab>
					<Tab id="b" label="B" eager={false}>
						Content B
					</Tab>
				</TabGroup>
			);

			getByText('Content A');
			expect(queryByText('Content B')).toBeNull();
		});
	});

	describe('callbacks', () => {
		it('calls onChange with the activated tab id', () => {
			const onChange = mock(() => {});
			const { getByRole } = render(
				<TabGroup onChange={onChange}>
					<Tab id="a" label="A">
						Content A
					</Tab>
					<Tab id="b" label="B">
						Content B
					</Tab>
				</TabGroup>
			);

			fireEvent.click(getByRole('tab', { name: 'B' }));

			expect(onChange).toHaveBeenCalledTimes(1);
			expect(onChange).toHaveBeenCalledWith('b');
		});

		it('calls Tab onActivate when its tab is activated', () => {
			const onActivate = mock(() => {});
			const { getByRole } = render(
				<TabGroup>
					<Tab id="a" label="A">
						Content A
					</Tab>
					<Tab id="b" label="B" onActivate={onActivate}>
						Content B
					</Tab>
				</TabGroup>
			);

			fireEvent.click(getByRole('tab', { name: 'B' }));

			expect(onActivate).toHaveBeenCalledTimes(1);
		});

		it('calls onChange on keyboard navigation in eager mode', () => {
			// Arrange
			const onChange = mock(() => {});
			const { getByRole } = render(
				<TabGroup eager onChange={onChange}>
					<Tab id="a" label="A">
						Content A
					</Tab>
					<Tab id="b" label="B">
						Content B
					</Tab>
				</TabGroup>
			);

			// Act
			fireEvent.keyDown(getByRole('tab', { name: 'A' }), { key: 'ArrowRight' });

			// Assert
			expect(onChange).toHaveBeenCalledWith('b');
		});

		it('does not call onChange on arrow navigation in lazy mode', () => {
			// Arrange
			const onChange = mock(() => {});
			const { getByRole } = render(
				<TabGroup onChange={onChange}>
					<Tab id="a" label="A">
						Content A
					</Tab>
					<Tab id="b" label="B">
						Content B
					</Tab>
				</TabGroup>
			);

			// Act — arrow moves focus only; no activation means no onChange
			fireEvent.keyDown(getByRole('tab', { name: 'A' }), { key: 'ArrowRight' });

			// Assert
			expect(onChange).not.toHaveBeenCalled();
		});
	});

	describe('validation', () => {
		it('throws when a non-Tab child is passed', () => {
			expect(() =>
				render(
					<TabGroup>
						<Tab id="a" label="A">
							Content A
						</Tab>
						<div>Not a tab</div>
					</TabGroup>
				)
			).toThrow('[TabGroup] All children must be <Tab>.');
		});

		it('throws when a tab id contains invalid characters', () => {
			expect(() =>
				render(
					<TabGroup>
						<Tab id="bad id!" label="Bad">
							Content
						</Tab>
					</TabGroup>
				)
			).toThrow('[TabGroup] Invalid tab id: "bad id!"');
		});

		it('throws when two tabs share the same id', () => {
			expect(() =>
				render(
					<TabGroup>
						<Tab id="dup" label="First">
							Content 1
						</Tab>
						<Tab id="dup" label="Second">
							Content 2
						</Tab>
					</TabGroup>
				)
			).toThrow('[TabGroup] Duplicate tab id: "dup". Tab ids must be unique.');
		});
	});
});
