import { HiChevronDoubleLeft, HiChevronDoubleRight, HiChevronLeft, HiChevronRight } from "react-icons/hi";
import classes from "./classes.module.scss";
import classNames from "classnames";

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
	showFirstLast?: boolean;
	showPrevNext?: boolean;
	maxVisiblePages?: number;
	className?: string;
}

export default function Pagination({ currentPage, totalPages, onPageChange, showFirstLast = true, showPrevNext = true, maxVisiblePages = 5, className }: PaginationProps) {
	const paginationClasses = classNames(classes.pagination, className);

	const getVisiblePages = () => {
		const delta = Math.floor(maxVisiblePages / 2);
		let start = Math.max(1, currentPage - delta);
		let end = Math.min(totalPages, start + maxVisiblePages - 1);

		if (end - start + 1 < maxVisiblePages) {
			start = Math.max(1, end - maxVisiblePages + 1);
		}

		const pages = [];
		for (let i = start; i <= end; i++) {
			pages.push(i);
		}

		return pages;
	};

	const visiblePages = getVisiblePages();
	const showStartEllipsis = visiblePages[0] > 1;
	const showEndEllipsis = visiblePages[visiblePages.length - 1] < totalPages;

	const handlePageClick = (page: number) => {
		if (page >= 1 && page <= totalPages && page !== currentPage) {
			onPageChange(page);
		}
	};

	if (totalPages <= 1) {
		return null;
	}

	return (
		<nav className={paginationClasses} aria-label="Pagination">
			{/* First Page */}
			{showFirstLast && currentPage > 1 && (
				<button className={classes.pageButton} onClick={() => handlePageClick(1)} aria-label="Go to first page">
					<HiChevronDoubleLeft />
				</button>
			)}

			{/* Previous Page */}
			{showPrevNext && (
				<button
					className={`${classes.pageButton} ${currentPage === 1 ? classes.disabled : ""}`}
					onClick={() => handlePageClick(currentPage - 1)}
					disabled={currentPage === 1}
					aria-label="Go to previous page">
					<HiChevronLeft />
				</button>
			)}

			{/* First page if not visible */}
			{showStartEllipsis && (
				<>
					<button className={classes.pageButton} onClick={() => handlePageClick(1)}>
						1
					</button>
					<span className={classes.ellipsis}>…</span>
				</>
			)}

			{/* Visible Pages */}
			{visiblePages.map((page) => (
				<button
					key={page}
					className={`${classes.pageButton} ${page === currentPage ? classes.active : ""}`}
					onClick={() => handlePageClick(page)}
					aria-current={page === currentPage ? "page" : undefined}>
					{page}
				</button>
			))}

			{/* Last page if not visible */}
			{showEndEllipsis && (
				<>
					<span className={classes.ellipsis}>…</span>
					<button className={classes.pageButton} onClick={() => handlePageClick(totalPages)}>
						{totalPages}
					</button>
				</>
			)}

			{/* Next Page */}
			{showPrevNext && (
				<button
					className={`${classes.pageButton} ${currentPage === totalPages ? classes.disabled : ""}`}
					onClick={() => handlePageClick(currentPage + 1)}
					disabled={currentPage === totalPages}
					aria-label="Go to next page">
					<HiChevronRight />
				</button>
			)}

			{/* Last Page */}
			{showFirstLast && currentPage < totalPages && (
				<button className={classes.pageButton} onClick={() => handlePageClick(totalPages)} aria-label="Go to last page">
					<HiChevronDoubleRight />
				</button>
			)}
		</nav>
	);
}
