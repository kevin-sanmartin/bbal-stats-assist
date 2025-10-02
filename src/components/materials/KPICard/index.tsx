import { ReactNode } from "react";
import { HiTrendingUp, HiTrendingDown, HiArrowRight } from "react-icons/hi";
import classes from "./classes.module.scss";
import classNames from "classnames";

export type KPITrend = "up" | "down" | "neutral";

interface KPICardProps {
	title: string;
	value: string | number;
	subtitle?: string;
	icon?: ReactNode;
	trend?: KPITrend;
	trendValue?: string | number;
	trendLabel?: string;
	loading?: boolean;
	className?: string;
}

export default function KPICard({ title, value, subtitle, icon, trend, trendValue, trendLabel, loading = false, className }: KPICardProps) {
	const cardClasses = classNames(classes.kpiCard, { [classes.loading]: loading }, className);
	const trendClasses = classNames(classes.trend, { [classes[`trend-${trend}`]]: trend });

	const getTrendIcon = () => {
		switch (trend) {
			case "up":
				return <HiTrendingUp />;
			case "down":
				return <HiTrendingDown />;
			case "neutral":
				return <HiArrowRight />;
			default:
				return null;
		}
	};

	if (loading) {
		return (
			<div className={cardClasses}>
				<div className={classes.skeleton}>
					<div className={classes.skeletonHeader}>
						<div className={classes.skeletonIcon} />
						<div className={classes.skeletonTitle} />
					</div>
					<div className={classes.skeletonValue} />
					<div className={classes.skeletonTrend} />
				</div>
			</div>
		);
	}

	return (
		<div className={cardClasses}>
			<div className={classes.header}>
				{icon && <div className={classes.icon}>{icon}</div>}
				<h3 className={classes.title}>{title}</h3>
			</div>

			<div className={classes.content}>
				<div className={classes.value}>{value}</div>

				{subtitle && <div className={classes.subtitle}>{subtitle}</div>}

				{(trend || trendValue) && (
					<div className={trendClasses}>
						{trend && <span className={classes.trendIcon}>{getTrendIcon()}</span>}
						{trendValue && <span className={classes.trendValue}>{trendValue}</span>}
						{trendLabel && <span className={classes.trendLabel}>{trendLabel}</span>}
					</div>
				)}
			</div>
		</div>
	);
}
