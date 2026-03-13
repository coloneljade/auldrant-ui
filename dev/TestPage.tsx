import Alert, { AlertVariant } from '@components/Alert';
import Badge from '@components/Badge';
import Button from '@components/Button';
import Card from '@components/Card';
import Checkbox from '@components/Checkbox';
import Dialog from '@components/Dialog';
import DownloadLink from '@components/DownloadLink';
import Form from '@components/Form';
import Input from '@components/Input';
import Link from '@components/Link';
import Modal from '@components/Modal';
import Nav from '@components/Nav';
import NumberInput from '@components/NumberInput';
import PasswordInput from '@components/PasswordInput';
import RadioGroup from '@components/RadioGroup';
import Section from '@components/Section';
import Select from '@components/Select';
import SkipLink from '@components/SkipLink';
import Spinner from '@components/Spinner';
import Table from '@components/Table';
import Textarea from '@components/Textarea';
import Theme from '@components/Theme';
import { useSignal } from '@preact/signals';
import { Search, Trash2, X } from 'lucide-preact';
import type { FunctionComponent } from 'preact';

const ThemeSwatches: FunctionComponent = () => (
	<div class="dev-section">
		<h2>Token Swatches</h2>
		<div class="dev-swatch-grid">
			<div
				class="dev-swatch"
				style="background: var(--aui-color-background); border: 1px solid var(--aui-color-border);"
			>
				<div style="color: var(--aui-color-text);">Text</div>
				<div class="dev-swatch-label">color-text on background</div>
			</div>
			<div
				class="dev-swatch"
				style="background: var(--aui-color-background); border: 1px solid var(--aui-color-border);"
			>
				<div style="color: var(--aui-color-text-muted);">Muted</div>
				<div class="dev-swatch-label">text-muted on background</div>
			</div>
			<div
				class="dev-swatch"
				style="background: var(--aui-color-surface); border: 1px solid var(--aui-color-border);"
			>
				<div style="color: var(--aui-color-text);">Surface</div>
				<div class="dev-swatch-label">text on surface</div>
			</div>
			<div
				class="dev-swatch"
				style="background: var(--aui-color-background); border: 1px solid var(--aui-color-border);"
			>
				<div style="color: var(--aui-color-primary);">Primary</div>
				<div class="dev-swatch-label">primary on background</div>
			</div>
			<div
				class="dev-swatch"
				style="background: var(--aui-color-background); border: 1px solid var(--aui-color-border);"
			>
				<div style="color: var(--aui-color-primary-hover);">Hover</div>
				<div class="dev-swatch-label">primary-hover on background</div>
			</div>
			<div
				class="dev-swatch"
				style="background: var(--aui-color-background); border: 1px solid var(--aui-color-border);"
			>
				<div style="color: var(--aui-color-error);">Error</div>
				<div class="dev-swatch-label">error on background</div>
			</div>
			<div
				class="dev-swatch"
				style="background: var(--aui-color-background); border: 1px solid var(--aui-color-border);"
			>
				<div style="color: var(--aui-color-success);">Success</div>
				<div class="dev-swatch-label">success on background</div>
			</div>
			<div
				class="dev-swatch"
				style="background: var(--aui-color-background-hover); border: 1px solid var(--aui-color-border);"
			>
				<div style="color: var(--aui-color-text);">Hover BG</div>
				<div class="dev-swatch-label">text on background-hover</div>
			</div>
			<div
				class="dev-swatch"
				style="background: var(--aui-color-primary); color: var(--aui-color-background);"
			>
				<div>Button Fill</div>
				<div class="dev-swatch-label">background on primary</div>
			</div>
			<div
				class="dev-swatch"
				style="background: var(--aui-color-background); border: 2px solid var(--aui-color-border);"
			>
				<div style="color: var(--aui-color-text);">Border</div>
				<div class="dev-swatch-label">border vs background</div>
			</div>
			<div
				class="dev-swatch"
				style="background: var(--aui-color-background); outline: 2px solid var(--aui-color-focus-ring); outline-offset: 2px;"
			>
				<div style="color: var(--aui-color-text);">Focus</div>
				<div class="dev-swatch-label">focus-ring outline</div>
			</div>
		</div>
	</div>
);

const ButtonSection: FunctionComponent = () => (
	<div class="dev-section">
		<h2>Button</h2>
		<div class="dev-row">
			<Button label="Default" />
			<Button label="Submit" type="submit" />
			<Button label="Reset" type="reset" />
			<Button label="Disabled" disabled />
		</div>
		<div class="dev-row" style="margin-top: 0.75em; align-items: center;">
			<span style="color: var(--aui-color-text-muted); font-size: 0.875em;">Icon-only:</span>
			<Button icon={<Search size="1.25em" aria-hidden="true" />} aria-label="Search" />
			<Button icon={<X size="1.25em" aria-hidden="true" />} aria-label="Close" />
			<Button icon={<Trash2 size="1.25em" aria-hidden="true" />} aria-label="Delete" disabled />
		</div>
	</div>
);

const LinkSection: FunctionComponent = () => (
	<div class="dev-section">
		<h2>Link / DownloadLink</h2>
		<div class="dev-stack">
			<div>
				<Link href="/about">Internal link</Link>
				{' — '}
				<Link href="https://example.com">External link</Link>
				{' — '}
				<DownloadLink href="/file.pdf" fileName="document.pdf" label="Download PDF" />
			</div>
		</div>
	</div>
);

const InputSection: FunctionComponent = () => (
	<div class="dev-section">
		<h2>Input</h2>
		<div class="dev-row">
			<Input label="Text" name="text" />
			<Input label="Email" name="email" type="email" />
			<Input label="URL" name="url" type="url" placeholder="https://..." />
		</div>
		<div class="dev-row">
			<Input label="Required" name="req" required />
			<Input label="Disabled" name="dis" disabled />
			<Input label="With error" name="err" error="This field is required" />
		</div>
	</div>
);

const NumberInputSection: FunctionComponent = () => (
	<div class="dev-section">
		<h2>NumberInput</h2>
		<div class="dev-row">
			<NumberInput label="Quantity" name="qty" min={0} max={100} />
			<NumberInput label="Disabled" name="qty-dis" disabled />
			<NumberInput label="With error" name="qty-err" error="Must be positive" />
		</div>
	</div>
);

const PasswordInputSection: FunctionComponent = () => (
	<div class="dev-section">
		<h2>PasswordInput</h2>
		<div class="dev-row">
			<PasswordInput label="Current password" name="pw-current" purpose="current" />
			<PasswordInput label="New password" name="pw-new" purpose="new" />
			<PasswordInput label="Disabled" name="pw-dis" purpose="current" disabled />
			<PasswordInput
				label="With error"
				name="pw-err"
				purpose="current"
				error="Password is required"
			/>
		</div>
	</div>
);

const TextareaSection: FunctionComponent = () => (
	<div class="dev-section">
		<h2>Textarea</h2>
		<div class="dev-stack">
			<Textarea label="Message" name="message" maxChars={200} placeholder="Type a message..." />
			<Textarea label="Disabled" name="msg-dis" maxChars={100} disabled />
			<Textarea label="With error" name="msg-err" maxChars={50} error="Too short" />
		</div>
	</div>
);

const SelectSection: FunctionComponent = () => (
	<div class="dev-section">
		<h2>Select</h2>
		<div class="dev-row">
			<Select
				label="Color"
				name="color"
				placeholder="Choose..."
				options={[
					{ label: 'Red', value: 'red' },
					{ label: 'Green', value: 'green' },
					{ label: 'Blue', value: 'blue' },
				]}
			/>
			<Select
				label="Grouped"
				name="grouped"
				options={[
					{
						label: 'Fruits',
						options: [
							{ label: 'Apple', value: 'apple' },
							{ label: 'Banana', value: 'banana' },
						],
					},
					{
						label: 'Vegetables',
						options: [
							{ label: 'Carrot', value: 'carrot' },
							{ label: 'Pea', value: 'pea' },
						],
					},
				]}
			/>
			<Select
				label="Disabled"
				name="sel-dis"
				disabled
				options={[{ label: 'Only', value: 'only' }]}
			/>
			<Select
				label="With error"
				name="sel-err"
				error="Selection is required"
				options={[
					{ label: 'Red', value: 'red' },
					{ label: 'Green', value: 'green' },
				]}
			/>
		</div>
	</div>
);

const CheckboxRadioSection: FunctionComponent = () => (
	<div class="dev-section">
		<h2>Checkbox / RadioGroup</h2>
		<div class="dev-row">
			<div class="dev-stack">
				<Checkbox label="Accept terms" name="terms" />
				<Checkbox label="Checked" name="checked" checked />
				<Checkbox label="Disabled" name="cb-dis" disabled />
			</div>
			<RadioGroup
				legend="Preference"
				name="pref"
				options={[
					{ label: 'Option A', value: 'a' },
					{ label: 'Option B', value: 'b' },
					{ label: 'Option C', value: 'c' },
				]}
			/>
			<RadioGroup
				legend="Disabled group"
				name="pref-dis"
				disabled
				options={[
					{ label: 'X', value: 'x' },
					{ label: 'Y', value: 'y' },
				]}
			/>
		</div>
	</div>
);

const tableHeaders = ['Name', 'Role', 'Status'];
const tableData = [
	['Alice', 'Engineer', 'Active'],
	['Bob', 'Designer', 'On leave'],
	['Charlie', 'Manager', 'Active'],
	['Diana', 'QA Lead', 'Active'],
];

const TableSection: FunctionComponent = () => (
	<div class="dev-section">
		<h2>Table</h2>
		<div class="dev-stack">
			<div>
				<h3>Default</h3>
				<Table caption="Team members" headers={tableHeaders} data={tableData} />
			</div>
			<div>
				<h3>Row headers</h3>
				<Table caption="Team members" headers={tableHeaders} data={tableData} rowHeader />
			</div>
			<div>
				<h3>Striped</h3>
				<Table caption="Team members" headers={tableHeaders} data={tableData} striped />
			</div>
			<div>
				<h3>Dense</h3>
				<Table caption="Team members" headers={tableHeaders} data={tableData} dense />
			</div>
			<div>
				<h3>Striped + dense + row headers</h3>
				<Table
					caption="Team members"
					headers={tableHeaders}
					data={tableData}
					striped
					dense
					rowHeader
				/>
			</div>
			<div>
				<h3>Hidden caption</h3>
				<Table caption="Team members" headers={tableHeaders} data={tableData} captionHidden />
				<p style="font-size: 0.875em; color: var(--aui-color-text-muted); margin-top: 0.5em;">
					Caption is visually hidden but still accessible to screen readers.
				</p>
			</div>
		</div>
	</div>
);

const SpinnerSection: FunctionComponent = () => (
	<div class="dev-section">
		<h2>Spinner</h2>
		<div class="dev-row" style="align-items: center;">
			<Spinner size="sm" />
			<Spinner />
			<Spinner size="lg" />
			<Spinner label="Saving…" />
		</div>
	</div>
);

const AlertSection: FunctionComponent = () => {
	const withTitle = useSignal(false);
	const withAction = useSignal(false);
	const dismissible = useSignal(false);
	const autoDismiss = useSignal(false);

	return (
		<div class="dev-section">
			<h2>Alert</h2>
			<h3>Variants</h3>
			<div class="dev-stack">
				<Alert variant={AlertVariant.info} message="This is an informational message." />
				<Alert variant={AlertVariant.success} message="Your changes have been saved." />
				<Alert variant={AlertVariant.warning} message="Your session will expire in 5 minutes." />
				<Alert variant={AlertVariant.error} message="Something went wrong. Please try again." />
			</div>
			<h3>Interactive demos</h3>
			<div class="dev-row">
				<Button label="With title" onClick={() => (withTitle.value = true)} />
				<Button label="With action link" onClick={() => (withAction.value = true)} />
				<Button label="Dismissible" onClick={() => (dismissible.value = true)} />
				<Button label="Auto-dismiss (3s)" onClick={() => (autoDismiss.value = true)} />
			</div>
			<div class="dev-stack" style="margin-top: 0.75em;">
				{withTitle.value && (
					<Alert
						variant={AlertVariant.info}
						title="With title"
						message="This alert has an optional heading above the message."
						onDismiss={() => (withTitle.value = false)}
					/>
				)}
				{withAction.value && (
					<Alert
						variant={AlertVariant.warning}
						title="Action required"
						message="Your payment method is expiring soon."
						actionLabel="Update payment"
						actionHref="/billing"
						onDismiss={() => (withAction.value = false)}
					/>
				)}
				{dismissible.value && (
					<Alert
						variant={AlertVariant.success}
						message="This alert can be dismissed using the button."
						onDismiss={() => (dismissible.value = false)}
					/>
				)}
				{autoDismiss.value && (
					<Alert
						variant={AlertVariant.info}
						message="This alert auto-dismisses after 3 seconds."
						duration={3000}
						onDismiss={() => (autoDismiss.value = false)}
					/>
				)}
			</div>
		</div>
	);
};

const BadgeSection: FunctionComponent = () => (
	<div class="dev-section">
		<h2>Badge</h2>
		<div class="dev-row" style="align-items: center; flex-wrap: wrap; gap: 0.5em;">
			<Badge>Neutral</Badge>
			<Badge variant={AlertVariant.success}>Active</Badge>
			<Badge variant={AlertVariant.warning}>Pending</Badge>
			<Badge variant={AlertVariant.error}>Failed</Badge>
			<Badge>42</Badge>
			<Badge variant={AlertVariant.success}>✓ Verified</Badge>
		</div>
	</div>
);

const CardSection: FunctionComponent = () => (
	<div class="dev-section">
		<h2>Card</h2>
		<div class="dev-row">
			<Card>
				<p>A simple card with text content.</p>
			</Card>
			<Card>
				<h3>Card with heading</h3>
				<p>And some descriptive text below it.</p>
			</Card>
			<Card>
				<Input label="Name" name="card-name" />
				<Button label="Submit" type="submit" />
			</Card>
		</div>
	</div>
);

const DialogSection: FunctionComponent = () => {
	const open = useSignal(false);

	return (
		<div class="dev-section">
			<h2>Dialog</h2>
			<Button label="Open Dialog" onClick={() => (open.value = true)} />
			<Dialog
				open={open.value}
				title="Notification"
				message="This is a dismissible dialog. Close it with Escape, the backdrop, or the X button."
				onClose={() => (open.value = false)}
				defaultAction={{
					label: 'Got it',
					description: 'Acknowledge and close',
					onClick: () => (open.value = false),
					shortcut: 'Enter',
				}}
			/>
		</div>
	);
};

const ModalSection: FunctionComponent = () => {
	const confirmOpen = useSignal(false);
	const destructiveOpen = useSignal(false);

	return (
		<div class="dev-section">
			<h2>Modal</h2>
			<div class="dev-row">
				<Button label="Open Modal" onClick={() => (confirmOpen.value = true)} />
				<Button label="Destructive Modal" onClick={() => (destructiveOpen.value = true)} />
			</div>
			<Modal
				open={confirmOpen.value}
				title="Confirm Action"
				message="Are you sure you want to proceed? This action requires confirmation."
				onCancel={() => (confirmOpen.value = false)}
				defaultAction={{
					label: 'Confirm',
					description: 'Confirm this action',
					onClick: () => (confirmOpen.value = false),
					shortcut: 'Enter',
				}}
			/>
			<Modal
				open={destructiveOpen.value}
				title="Delete Item"
				message="This will permanently delete the item. This cannot be undone."
				onCancel={() => (destructiveOpen.value = false)}
				focusCancel
				defaultAction={{
					label: 'Delete',
					description: 'Permanently delete this item',
					onClick: () => (destructiveOpen.value = false),
					shortcut: 'd',
				}}
			/>
		</div>
	);
};

const SectionDemo: FunctionComponent = () => (
	<div class="dev-section">
		<h2>Section (nested)</h2>
		<Section title="Parent Section">
			<p>Top-level section content.</p>
			<Section title="Child Section" level={3}>
				<p>Nested section content.</p>
			</Section>
		</Section>
	</div>
);

const FormDemo: FunctionComponent = () => (
	<div class="dev-section">
		<h2>Full Form</h2>
		<Card>
			<Form
				onSubmit={(data) => {
					console.log('Form submitted:', Object.fromEntries(data));
				}}
				submitLabel="Create Account"
				resetLabel="Clear"
			>
				<Input label="Full name" name="fullname" required />
				<Input label="Email" name="email" type="email" required />
				<PasswordInput label="Password" name="password" purpose="new" required />
				<NumberInput label="Age" name="age" min={0} max={150} />
				<Select
					label="Country"
					name="country"
					placeholder="Select..."
					options={[
						{ label: 'United States', value: 'us' },
						{ label: 'Canada', value: 'ca' },
						{ label: 'United Kingdom', value: 'uk' },
					]}
				/>
				<Textarea label="Bio" name="bio" maxChars={300} />
				<Checkbox label="I agree to the terms" name="agree" required />
			</Form>
		</Card>
	</div>
);

const NavDemo: FunctionComponent = () => (
	<div class="dev-section">
		<h2>Nav + SkipLink</h2>
		<SkipLink />
		<Nav title="Main navigation">
			<Link href="/">Home</Link>
			<Link href="/about">About</Link>
			<Link href="/contact">Contact</Link>
		</Nav>
	</div>
);

const NestedThemeDemo: FunctionComponent = () => (
	<div class="dev-section">
		<h2>Nested Theme Override</h2>
		<p>The inner section uses a blue primary via a nested Theme:</p>
		<div class="dev-row" style="margin-top: 1em;">
			<Card>
				<p style="color: var(--aui-color-primary);">Default primary</p>
				<Button label="Default" />
			</Card>
			<Theme class="blue-theme">
				<Card>
					<p style="color: var(--aui-color-primary);">Blue primary</p>
					<Button label="Blue" />
				</Card>
			</Theme>
		</div>
	</div>
);

export const TestPage: FunctionComponent = () => (
	<Theme>
		<div class="dev-page" id="main">
			<h1>Auldrant UI — Dev Test Page</h1>
			<ThemeSwatches />
			<AlertSection />
			<ButtonSection />
			<SpinnerSection />
			<BadgeSection />
			<LinkSection />
			<InputSection />
			<NumberInputSection />
			<PasswordInputSection />
			<TextareaSection />
			<SelectSection />
			<CheckboxRadioSection />
			<TableSection />
			<CardSection />
			<DialogSection />
			<ModalSection />
			<SectionDemo />
			<NavDemo />
			<FormDemo />
			<NestedThemeDemo />
		</div>
	</Theme>
);
