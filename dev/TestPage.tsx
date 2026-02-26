import Button from '@components/Button';
import Card from '@components/Card';
import Checkbox from '@components/Checkbox';
import DownloadLink from '@components/DownloadLink';
import Form from '@components/Form';
import Input from '@components/Input';
import Link from '@components/Link';
import Nav from '@components/Nav';
import NumberInput from '@components/NumberInput';
import PasswordInput from '@components/PasswordInput';
import RadioGroup from '@components/RadioGroup';
import Section from '@components/Section';
import Select from '@components/Select';
import SkipLink from '@components/SkipLink';
import Table from '@components/Table';
import Textarea from '@components/Textarea';
import Theme from '@components/Theme';
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

const TableSection: FunctionComponent = () => (
	<div class="dev-section">
		<h2>Table</h2>
		<Table
			caption="Sample data"
			headers={['Name', 'Role', 'Status']}
			data={[
				['Alice', 'Engineer', 'Active'],
				['Bob', 'Designer', 'On leave'],
				['Charlie', 'Manager', 'Active'],
				['Diana', 'QA Lead', 'Active'],
			]}
		/>
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
		<p>The inner section uses a green primary via a nested Theme:</p>
		<div class="dev-row" style="margin-top: 1em;">
			<Card>
				<p style="color: var(--aui-color-primary);">Default primary</p>
				<Button label="Default" />
			</Card>
			<Theme class="green-theme">
				<Card>
					<p style="color: var(--aui-color-primary);">Green primary</p>
					<Button label="Green" />
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
			<ButtonSection />
			<LinkSection />
			<InputSection />
			<NumberInputSection />
			<PasswordInputSection />
			<TextareaSection />
			<SelectSection />
			<CheckboxRadioSection />
			<TableSection />
			<CardSection />
			<SectionDemo />
			<NavDemo />
			<FormDemo />
			<NestedThemeDemo />
		</div>
	</Theme>
);
