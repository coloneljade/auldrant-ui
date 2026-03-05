import type { IBaseProps } from '@scripts/types';
import { cx } from '@scripts/utils';
import styles from '@styles/Table.module.css';
import type { ComponentChildren, FunctionComponent } from 'preact';

/** Props for {@link Table}. */
interface ITableProps extends IBaseProps {
	/** Accessible table name. Rendered as a `<caption>` element. */
	caption: string;
	/** Column header labels. */
	headers: string[];
	/** Row data as a 2D array of renderable content. */
	data: ComponentChildren[][];
	/** Render the first column as `<th scope="row">` for row identification. */
	rowHeader?: boolean;
	/** Apply alternating row backgrounds for improved scanability. */
	striped?: boolean;
	/** Reduce cell padding for data-dense displays. */
	dense?: boolean;
	/** Visually hide the caption while keeping it accessible to screen readers. */
	captionHidden?: boolean;
}

/**
 * Accessible data table with required headers.
 * Headers render as `<th scope="col">`, data auto-formats into `<tbody>`/`<td>`.
 */
const Table: FunctionComponent<ITableProps> = (props) => {
	const {
		caption,
		headers,
		data,
		rowHeader,
		striped,
		dense,
		captionHidden,
		class: className,
	} = props;
	return (
		<table class={cx(styles.table, striped && styles.striped, dense && styles.dense, className)}>
			<caption class={cx(styles.caption, captionHidden && styles.captionHidden)}>{caption}</caption>
			<thead class={styles.head}>
				<tr>
					{headers.map((header, i) => (
						<th key={`${header}-${i}`} class={styles.headerCell} scope="col">
							{header}
						</th>
					))}
				</tr>
			</thead>
			<tbody>
				{data.map((row, i) => (
					<tr key={i} class={styles.row}>
						{row.map((cell, j) =>
							rowHeader && j === 0 ? (
								<th key={`${headers[j]}-${i}-${j}`} class={styles.headerCell} scope="row">
									{cell}
								</th>
							) : (
								<td key={`${headers[j]}-${i}-${j}`} class={styles.cell}>
									{cell}
								</td>
							)
						)}
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default Table;
