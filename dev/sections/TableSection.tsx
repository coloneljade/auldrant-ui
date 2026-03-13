import Table from '@components/Table';
import type { FunctionComponent } from 'preact';

const headers = ['Name', 'Role', 'Status'];
const data = [
	['Alice', 'Engineer', 'Active'],
	['Bob', 'Designer', 'On leave'],
	['Charlie', 'Manager', 'Active'],
	['Diana', 'QA Lead', 'Active'],
];

export const TableSection: FunctionComponent = () => (
	<div class="dev-section">
		<h2>Table</h2>
		<div class="dev-stack">
			<div>
				<h3>Default</h3>
				<Table caption="Team members" headers={headers} data={data} />
			</div>
			<div>
				<h3>Row headers</h3>
				<Table caption="Team members" headers={headers} data={data} rowHeader />
			</div>
			<div>
				<h3>Striped</h3>
				<Table caption="Team members" headers={headers} data={data} striped />
			</div>
			<div>
				<h3>Dense</h3>
				<Table caption="Team members" headers={headers} data={data} dense />
			</div>
			<div>
				<h3>Striped + dense + row headers</h3>
				<Table caption="Team members" headers={headers} data={data} striped dense rowHeader />
			</div>
			<div>
				<h3>Hidden caption</h3>
				<Table caption="Team members" headers={headers} data={data} captionHidden />
				<p style="font-size: 0.875em; color: var(--aui-color-text-muted); margin-top: 0.5em;">
					Caption is visually hidden but still accessible to screen readers.
				</p>
			</div>
		</div>
	</div>
);
