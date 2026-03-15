import { afterEach } from 'bun:test';
import { GlobalRegistrator } from '@happy-dom/global-registrator';
import { cleanup } from '@testing-library/preact';

GlobalRegistrator.register();

afterEach(cleanup);

// Stub Popover API — Happy-DOM v20.x does not implement showPopover/hidePopover.
// These stubs fire the `toggle` event so the component's handleToggle runs,
// keeping light-dismiss behavior exercisable in integration tests.
type PopoverElement = HTMLElement & { showPopover?: unknown; hidePopover?: unknown };
if (typeof (HTMLElement.prototype as PopoverElement).showPopover !== 'function') {
	Object.defineProperty(HTMLElement.prototype, 'showPopover', {
		configurable: true,
		value(this: HTMLElement) {
			const event = new Event('toggle', { bubbles: false });
			Object.defineProperty(event, 'newState', { value: 'open', writable: false });
			this.dispatchEvent(event);
		},
	});
	Object.defineProperty(HTMLElement.prototype, 'hidePopover', {
		configurable: true,
		value(this: HTMLElement) {
			const event = new Event('toggle', { bubbles: false });
			Object.defineProperty(event, 'newState', { value: 'closed', writable: false });
			this.dispatchEvent(event);
		},
	});
}
