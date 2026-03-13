import Theme from '@components/Theme';
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
import { NestedThemeDemo } from './sections/NestedThemeDemo';
import { NumberInputSection } from './sections/NumberInputSection';
import { PasswordInputSection } from './sections/PasswordInputSection';
import { SectionDemo } from './sections/SectionDemo';
import { SelectSection } from './sections/SelectSection';
import { SpinnerSection } from './sections/SpinnerSection';
import { TableSection } from './sections/TableSection';
import { TextareaSection } from './sections/TextareaSection';
import { ThemeSwatches } from './sections/ThemeSwatches';

export const TestPage: FunctionComponent = () => (
	<Theme>
		<div class="dev-page" id="main">
			<h1>Auldrant UI — Dev Test Page</h1>
			<ThemeSwatches />
			<AccordionSection />
			<AlertSection />
			<ButtonSection />
			<SpinnerSection />
			<BadgeSection />
			<ChipSection />
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
