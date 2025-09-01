import { Fragment, ReactNode } from "react";
import Link from "next/link";
import classes from "./classes.module.scss";
import classNames from "classnames";

export interface BreadcrumbItem {
	label: string;
	href?: string;
	onClick?: () => void;
	icon?: ReactNode;
}

interface BreadcrumbsProps {
	items: BreadcrumbItem[];
	separator?: ReactNode;
	maxItems?: number;
	className?: string;
}

export default function Breadcrumbs({ items, separator = "/", maxItems = 6, className }: BreadcrumbsProps) {
	const breadcrumbsClasses = classNames(classes.breadcrumbs, className);
	const displayItems = getTruncatedItems(items, maxItems);

	return (
		<nav className={breadcrumbsClasses} aria-label="Breadcrumb">
			<ol className={classes.list}>
				{displayItems.map((item, index) => {
					const isLast = index === displayItems.length - 1;
					const isEllipsis = item.label === "...";

					return (
						<li key={index} className={classes.item}>
							{isEllipsis && <span className={classes.ellipsis}>{item.label}</span>}

							{!isEllipsis && (
								<Fragment>
									{item.icon && <span className={classes.icon}>{item.icon}</span>}
									{renderBreadcrumbContent(item, isLast)}
								</Fragment>
							)}

							{!isLast && (
								<span className={classes.separator} aria-hidden="true">
									{separator}
								</span>
							)}
						</li>
					);
				})}
			</ol>
		</nav>
	);
}

function getTruncatedItems(items: BreadcrumbItem[], maxItems: number): BreadcrumbItem[] {
	if (items.length <= maxItems) return items;
	return [...items.slice(0, 1), { label: "..." }, ...items.slice(-(maxItems - 2))] as BreadcrumbItem[];
}

function renderInteractiveItem(item: BreadcrumbItem, isLast: boolean) {
	if (isLast) return null;

	if (item.href) {
		return (
			<Link href={item.href} className={classes.link}>
				{item.label}
			</Link>
		);
	}

	if (item.onClick) {
		return (
			<button onClick={item.onClick} className={classes.button}>
				{item.label}
			</button>
		);
	}

	return null;
}

function renderCurrentItem(item: BreadcrumbItem, isLast: boolean) {
	const currentClasses = classNames(classes.current, {
		[classes.last]: isLast,
	});

	return (
		<span className={currentClasses} aria-current={isLast ? "page" : undefined}>
			{item.label}
		</span>
	);
}

function renderBreadcrumbContent(item: BreadcrumbItem, isLast: boolean) {
	const interactiveItem = renderInteractiveItem(item, isLast);
	return interactiveItem || renderCurrentItem(item, isLast);
}
