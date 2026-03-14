import RadioGroup, { RadioItem } from '@components/RadioGroup';
import TabGroup, { Tab } from '@components/Tabs';
import Theme, { Palette } from '@components/Theme';
import { signal } from '@preact/signals';
import type { FunctionComponent } from 'preact';
import { AccordionSection } from './sections/AccordionSection';
import { AlertSection } from './sections/AlertSection';
import { BadgeSection } from './sections/BadgeSection';
import { ButtonSection } from './sections/ButtonSection';
import { CardSection } from './sections/CardSection';
import { CheckboxRadioSection } from './sections/CheckboxRadioSection';
import { ChipSection } from './sections/ChipSection';
import { DialogSection } from './sections/DialogSection';
import { FormDemo } from './sections/FormDemo';
import { InputSection } from './sections/InputSection';
import { LinkSection } from './sections/LinkSection';
import { ModalSection } from './sections/ModalSection';
import { NavDemo } from './sections/NavDemo';
import { NumberInputSection } from './sections/NumberInputSection';
import { PasswordInputSection } from './sections/PasswordInputSection';
import { SectionDemo } from './sections/SectionDemo';
import { SelectSection } from './sections/SelectSection';
import { SpinnerSection } from './sections/SpinnerSection';
import { TableSection } from './sections/TableSection';
import { TextareaSection } from './sections/TextareaSection';

export const activePalette = signal<string | null>(null);

export const TestPage: FunctionComponent = () => (
	<Theme class={activePalette.value ?? undefined}>
		<div class="dev-page" id="main">
			<h1>Auldrant UI — Dev Test Page</h1>

			<RadioGroup
				legend="Palette"
				name="dev-palette"
				value={activePalette.value ?? ''}
				class="dev-palette-row"
				onChange={(val) => {
					activePalette.value = val || null;
				}}
			>
				<RadioItem label="Default (green)" value="" />
				<RadioItem label="Blue" value={Palette.blue} />
				<RadioItem label="Purple" value={Palette.purple} />
				<RadioItem label="Teal" value={Palette.teal} />
				<RadioItem label="Red" value={Palette.red} />
				<RadioItem label="Orange" value={Palette.orange} />
				<RadioItem label="Yellow" value={Palette.yellow} />
			</RadioGroup>

			<TabGroup defaultActive="inputs" eager>
				<Tab id="inputs" label="Inputs">
					<InputSection />
					<NumberInputSection />
					<PasswordInputSection />
					<TextareaSection />
					<SelectSection />
					<CheckboxRadioSection />
				</Tab>
				<Tab id="actions" label="Actions">
					<ButtonSection />
					<LinkSection />
				</Tab>
				<Tab id="feedback" label="Feedback">
					<AlertSection />
					<SpinnerSection />
					<BadgeSection />
					<ChipSection />
				</Tab>
				<Tab id="layout" label="Layout">
					<CardSection />
					<SectionDemo />
					<TableSection />
				</Tab>
				<Tab id="navigation" label="Navigation">
					<NavDemo />
					<FormDemo />
				</Tab>
				<Tab id="disclosure" label="Disclosure">
					<AccordionSection />
				</Tab>
				<Tab id="overlay" label="Overlay">
					<DialogSection />
					<ModalSection />
				</Tab>
			</TabGroup>
		</div>
	</Theme>
);
