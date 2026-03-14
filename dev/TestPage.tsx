import Link from '@components/Link';
import Nav from '@components/Nav';
import NotFound from '@components/NotFound';
import RadioGroup, { RadioGroupVariant, RadioItem } from '@components/RadioGroup';
import Route from '@components/Route';
import SkipLink from '@components/SkipLink';
import TabGroup, { Tab } from '@components/Tabs';
import Theme, { Palette } from '@components/Theme';
import { location } from '@signals/routing';
import { palette } from '@signals/theme';
import type { FunctionComponent } from 'preact';
import { AboutPage } from './AboutPage';
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
import { RoutingSection } from './sections/RoutingSection';
import { SectionDemo } from './sections/SectionDemo';
import { SelectSection } from './sections/SelectSection';
import { SpinnerSection } from './sections/SpinnerSection';
import { TableSection } from './sections/TableSection';
import { TextareaSection } from './sections/TextareaSection';

const knownRoutes = ['/', '/about'];

export const TestPage: FunctionComponent = () => (
	<Theme class={palette.value ?? undefined}>
		<SkipLink />
		<Nav title="Auldrant UI" titleHref="/">
			<Link href="/about">About</Link>
		</Nav>

		{!knownRoutes.includes(location.value) && (
			<NotFound message="The page you were looking for doesn't exist." />
		)}

		<Route path="/">
			<div class="dev-page" id="main">
				<RadioGroup
					legend="Palette"
					name="dev-palette"
					variant={RadioGroupVariant.highlight}
					value={palette.value ?? ''}
					onChange={(val) => {
						palette.value = (val as Palette) || null;
					}}
				>
					<RadioItem label="Green" value="" />
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
						<RoutingSection />
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
		</Route>

		<Route path="/about">
			<AboutPage />
		</Route>
	</Theme>
);
