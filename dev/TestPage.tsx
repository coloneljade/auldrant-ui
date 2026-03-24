import DialogHost from '@components/DialogHost';
import Link from '@components/Link';
import Nav from '@components/Nav';
import NotFound from '@components/NotFound';
import Page from '@components/Page';
import RadioGroup, { RadioItem } from '@components/RadioGroup';
import Router from '@components/Router';
import SearchInput from '@components/SearchInput';
import SkipLink from '@components/SkipLink';
import TabGroup, { Tab } from '@components/Tabs';
import Theme, { Palette } from '@components/Theme';
import Toaster from '@components/Toaster';
import { useSignal } from '@preact/signals';
import { pageTitle } from '@signals/head';
import { location, navigate } from '@signals/routing';
import { palette } from '@signals/theme';
import type { FunctionComponent } from 'preact';
import { useEffect, useId } from 'preact/hooks';
import { AboutPage } from './AboutPage';
import { AccordionSection } from './sections/AccordionSection';
import { AlertSection } from './sections/AlertSection';
import { BadgeSection } from './sections/BadgeSection';
import { ButtonSection } from './sections/ButtonSection';
import { CardSection } from './sections/CardSection';
import { CheckboxRadioSection } from './sections/CheckboxRadioSection';
import { ChipSection } from './sections/ChipSection';
import { CurrencyInputSection } from './sections/CurrencyInputSection';
import { DialogHostSection } from './sections/DialogHostSection';
import { DialogSection } from './sections/DialogSection';
import { DropdownSection } from './sections/DropdownSection';
import { FileInputSection } from './sections/FileInputSection';
import { FormDemo } from './sections/FormDemo';
import { InputSection } from './sections/InputSection';
import { LinkSection } from './sections/LinkSection';
import { ModalSection } from './sections/ModalSection';
import { NumberInputSection } from './sections/NumberInputSection';
import { PaginationSection } from './sections/PaginationSection';
import { PasswordInputSection } from './sections/PasswordInputSection';
import { ProgressSection } from './sections/ProgressSection';
import { RoutingSection } from './sections/RoutingSection';
import { SearchInputSection } from './sections/SearchInputSection';
import { SectionDemo } from './sections/SectionDemo';
import { SelectSection } from './sections/SelectSection';
import { SkeletonSection } from './sections/SkeletonSection';
import { SpinnerSection } from './sections/SpinnerSection';
import { TableSection } from './sections/TableSection';
import { TextareaSection } from './sections/TextareaSection';
import { ToastSection } from './sections/ToastSection';
import { ToggleSection } from './sections/ToggleSection';
import { TooltipSection } from './sections/TooltipSection';

/** All dev sections — used for both tab layout and global search filtering. */
const ALL_SECTIONS: { key: string; Section: FunctionComponent }[] = [
	{ key: 'input', Section: InputSection },
	{ key: 'numberinput', Section: NumberInputSection },
	{ key: 'currencyinput', Section: CurrencyInputSection },
	{ key: 'passwordinput', Section: PasswordInputSection },
	{ key: 'textarea', Section: TextareaSection },
	{ key: 'searchinput', Section: SearchInputSection },
	{ key: 'fileinput', Section: FileInputSection },
	{ key: 'select', Section: SelectSection },
	{ key: 'checkbox radio', Section: CheckboxRadioSection },
	{ key: 'toggle', Section: ToggleSection },
	{ key: 'button', Section: ButtonSection },
	{ key: 'link', Section: LinkSection },
	{ key: 'alert', Section: AlertSection },
	{ key: 'spinner', Section: SpinnerSection },
	{ key: 'skeleton', Section: SkeletonSection },
	{ key: 'progress', Section: ProgressSection },
	{ key: 'badge', Section: BadgeSection },
	{ key: 'chip', Section: ChipSection },
	{ key: 'card', Section: CardSection },
	{ key: 'section', Section: SectionDemo },
	{ key: 'table', Section: TableSection },
	{ key: 'pagination', Section: PaginationSection },
	{ key: 'routing', Section: RoutingSection },
	{ key: 'form', Section: FormDemo },
	{ key: 'accordion', Section: AccordionSection },
	{ key: 'dialog', Section: DialogSection },
	{ key: 'dialoghost', Section: DialogHostSection },
	{ key: 'dropdown', Section: DropdownSection },
	{ key: 'modal', Section: ModalSection },
	{ key: 'toast', Section: ToastSection },
	{ key: 'tooltip', Section: TooltipSection },
];

pageTitle.value = 'Auldrant UI';

/** Extract tab ID from /tests/tab/:id (ignoring any suffix), falling back to 'inputs'. */
function tabFromPath(path: string): string {
	const match = /^\/tests\/tab\/([a-zA-Z0-9_-]+)/.exec(path);
	return match?.[1] ?? 'inputs';
}

export const TestPage: FunctionComponent = () => {
	const mainId = useId();
	const filter = useSignal('');
	const colorScheme = useSignal('auto');
	const activeTab = tabFromPath(location.value);
	const q = filter.value.toLowerCase();
	const matches = q ? ALL_SECTIONS.filter(({ key }) => key.includes(q)) : null;

	useEffect(() => {
		const style = document.documentElement.style;
		if (colorScheme.value === 'auto') {
			style.removeProperty('color-scheme');
		} else {
			style.colorScheme = `only ${colorScheme.value}`;
		}
	}, [colorScheme.value]);

	return (
		<Theme class={palette.value ?? undefined}>
			<SkipLink target={`#${mainId}`} />
			<header class="dev-header">
				<h1 class="dev-header-brand">
					<Link href="/">{pageTitle.value}</Link>
				</h1>
				<Nav title="Site">
					<Link href="/tests/tab/inputs">Tests</Link>
					<Link href="/not-found">Test 404</Link>
				</Nav>
			</header>

			<main id={mainId}>
				<Router>
					<Page path="/" title="Auldrant UI">
						<AboutPage id={mainId} />
					</Page>

					<Page path="/tests/*" title="Tests">
						<div class="dev-page" id={mainId}>
							<RadioGroup
								legend="Palette"
								name="dev-palette"
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

							<RadioGroup
								legend="Color scheme"
								name="dev-color-scheme"
								value={colorScheme.value}
								onChange={(val) => {
									colorScheme.value = val;
								}}
							>
								<RadioItem label="Auto" value="auto" />
								<RadioItem label="Light" value="light" />
								<RadioItem label="Dark" value="dark" />
							</RadioGroup>

							<SearchInput
								label="Filter sections"
								name="dev-filter"
								value={filter.value}
								placeholder="e.g. button, input…"
								onInput={(v) => {
									filter.value = v;
								}}
								onClear={() => {
									filter.value = '';
								}}
							/>

							{matches ? (
								<div>
									{matches.length > 0 ? (
										matches.map(({ key, Section }) => <Section key={key} />)
									) : (
										<p>No sections match "{filter.value}".</p>
									)}
								</div>
							) : (
								<TabGroup active={activeTab} onChange={(id) => navigate(`/tests/tab/${id}`)} eager>
									<Tab id="inputs" label="Inputs">
										<InputSection />
										<NumberInputSection />
										<CurrencyInputSection />
										<PasswordInputSection />
										<TextareaSection />
										<SearchInputSection />
										<FileInputSection />
										<SelectSection />
										<CheckboxRadioSection />
										<ToggleSection />
									</Tab>
									<Tab id="actions" label="Actions">
										<ButtonSection />
										<LinkSection />
									</Tab>
									<Tab id="feedback" label="Feedback">
										<AlertSection />
										<ToastSection />
										<SpinnerSection />
										<SkeletonSection />
										<ProgressSection />
										<BadgeSection />
										<ChipSection />
									</Tab>
									<Tab id="layout" label="Layout">
										<CardSection />
										<SectionDemo />
										<TableSection />
									</Tab>
									<Tab id="navigation" label="Navigation">
										<PaginationSection />
										<RoutingSection />
										<FormDemo />
									</Tab>
									<Tab id="disclosure" label="Disclosure">
										<AccordionSection />
									</Tab>
									<Tab id="overlay" label="Overlay">
										<DialogSection />
										<ModalSection />
										<DialogHostSection />
										<DropdownSection />
										<TooltipSection />
									</Tab>
								</TabGroup>
							)}
						</div>
					</Page>

					<Page path="/*" title="Page not found">
						<NotFound message="The page you were looking for doesn't exist." />
					</Page>
				</Router>
			</main>

			<Toaster />
			<DialogHost />
		</Theme>
	);
};
