import { ReactNode } from "react";
import { HiArrowUp, HiArrowDown, HiSelector } from "react-icons/hi";
import classes from "./classes.module.scss";
import classNames from "classnames";

export interface TableColumn<T = any> {
	key: string;
	title: string;
	width?: string;
	align?: "left" | "center" | "right";
	sortable?: boolean;
	render?: (value: any, row: T, index: number) => ReactNode;
}

export interface TableProps<T = any> {
	columns: TableColumn<T>[];
	data: T[];
	loading?: boolean;
	empty?: ReactNode;
	hoverable?: boolean;
	striped?: boolean;
	compact?: boolean;
	bordered?: boolean;
	onRowClick?: (row: T, index: number) => void;
	onSort?: (key: string, direction: "asc" | "desc") => void;
	sortKey?: string;
	sortDirection?: "asc" | "desc";
	className?: string;
}

export default function Table<T = any>({
	columns,
	data,
	loading = false,
	empty = "No data available",
	hoverable = false,
	striped = false,
	compact = false,
	bordered = false,
	onRowClick,
	onSort,
	sortKey,
	sortDirection,
	className,
}: TableProps<T>) {
	const tableClasses = classNames(
		classes.table,
		{ [classes.hoverable]: hoverable, [classes.striped]: striped, [classes.compact]: compact, [classes.bordered]: bordered },
		className,
	);

	const handleSort = (column: TableColumn<T>) => {
		if (!column.sortable || !onSort) return;

		const newDirection = sortKey === column.key && sortDirection === "asc" ? "desc" : "asc";

		onSort(column.key, newDirection);
	};

	const getSortIcon = (column: TableColumn<T>) => {
		if (!column.sortable) return null;

		if (sortKey === column.key) {
			return sortDirection === "asc" ? <HiArrowUp /> : <HiArrowDown />;
		}

		return <HiSelector />;
	};

	const renderCell = (column: TableColumn<T>, row: T, rowIndex: number) => {
		const value = (row as any)[column.key];

		if (column.render) {
			return column.render(value, row, rowIndex);
		}

		return value;
	};

	if (loading) {
		return (
			<div className={classes.container}>
				<div className={classes.loading}>
					<div className={classes.loadingSpinner} />
					<span>Loading...</span>
				</div>
			</div>
		);
	}

	if (data.length === 0) {
		return (
			<div className={classes.container}>
				<div className={classes.empty}>{empty}</div>
			</div>
		);
	}

	return (
		<div className={classes.container}>
			<table className={tableClasses}>
				<thead className={classes.thead}>
					<tr className={classes.headerRow}>
						{columns.map((column) => (
							<th
								key={column.key}
								className={classes.th}
								style={{
									width: column.width,
									textAlign: column.align,
								}}>
								{column.sortable ? (
									<button className={classes.sortButton} onClick={() => handleSort(column)}>
										<span>{column.title}</span>
										<span className={classes.sortIcon}>{getSortIcon(column)}</span>
									</button>
								) : (
									column.title
								)}
							</th>
						))}
					</tr>
				</thead>
				<tbody className={classes.tbody}>
					{data.map((row, rowIndex) => (
						<tr
							key={rowIndex}
							className={classes.row}
							onClick={() => onRowClick?.(row, rowIndex)}
							role={onRowClick ? "button" : undefined}
							tabIndex={onRowClick ? 0 : undefined}>
							{columns.map((column) => (
								<td key={column.key} className={classes.td} style={{ textAlign: column.align }}>
									{renderCell(column, row, rowIndex)}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
