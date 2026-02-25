import type { IBaseProps } from '@scripts/types';
import { cx } from '@scripts/utils';
import styles from '@styles/Table.module.css';
import type { ComponentChildren, FunctionComponent } from 'preact';

/** Props for {@link Table}. */
interface ITableProps extends IBaseProps {
	/** Column header labels. */
	headers: string[];
	/** Row data as a 2D array of renderable content. */
	data: ComponentChildren[][];
}

/**
 * Accessible data table with required headers.
 * Headers render as `<th scope="col">`, data auto-formats into `<tbody>`/`<td>`.
 */
const Table: FunctionComponent<ITableProps> = (props) => {
	const { headers, data, class: className } = props;
	return (
		<table class={cx(styles.table, className)}>
			<thead>
				<tr>
					{headers.map((header, i) => (
						<th key={`${header}-${i}`} scope="col">
							{header}
						</th>
					))}
				</tr>
			</thead>
			<tbody>
				{data.map((row, i) => (
					<tr key={i}>
						{row.map((cell, j) => (
							<td key={`${headers[j]}-${i}-${j}`}>{cell}</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default Table;
