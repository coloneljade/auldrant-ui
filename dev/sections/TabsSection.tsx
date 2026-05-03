import { IconName } from '@components/Icon';
import TabGroup, { Tab } from '@components/Tabs';
import type { FunctionComponent } from 'preact';

export const TabsSection: FunctionComponent = () => (
	<div class="dev-section">
		<h2>Tabs</h2>

		<h3>Default — text labels</h3>
		<TabGroup>
			<Tab id="overview" label="Overview">
				<p>Overview content.</p>
			</Tab>
			<Tab id="details" label="Details">
				<p>Details content.</p>
			</Tab>
			<Tab id="advanced" label="Advanced">
				<p>Advanced content.</p>
			</Tab>
		</TabGroup>

		<h3>With icons — every tab labelled</h3>
		<TabGroup>
			<Tab id="search" label="Search" icon={IconName.search}>
				<p>Search results would go here.</p>
			</Tab>
			<Tab id="settings" label="Settings" icon={IconName.settings}>
				<p>Settings panel.</p>
			</Tab>
			<Tab id="quick" label="Quick actions" icon={IconName.zap}>
				<p>Quick actions panel.</p>
			</Tab>
		</TabGroup>

		<h3>Mixed — some tabs have icons, some don't</h3>
		<TabGroup>
			<Tab id="docs" label="Documentation">
				<p>Docs content.</p>
			</Tab>
			<Tab id="warnings" label="Warnings" icon={IconName.warning}>
				<p>Warnings list.</p>
			</Tab>
			<Tab id="info" label="Info">
				<p>Info content.</p>
			</Tab>
		</TabGroup>
	</div>
);
