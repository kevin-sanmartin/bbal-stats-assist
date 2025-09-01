import { PropsWithChildren, ReactNode } from "react";
import classes from "./classes.module.scss";
import classNames from "classnames";

export type ChartSize = "sm" | "md" | "lg" | "xl";

interface ChartContainerProps {
	title?: string;
	subtitle?: string;
	size?: ChartSize;
	loading?: boolean;
	error?: string;
	actions?: ReactNode;
	footer?: ReactNode;
	className?: string;
}

export default function ChartContainer({ title, subtitle, children, size = "md", loading = false, error, actions, footer, className }: PropsWithChildren<ChartContainerProps>) {
	const containerClasses = classNames(classes.chartContainer, classes[`size-${size}`], className);

	return (
		<div className={containerClasses}>
			{(title || subtitle || actions) && (
				<div className={classes.header}>
					<div className={classes.titleSection}>
						{title && <h3 className={classes.title}>{title}</h3>}
						{subtitle && <p className={classes.subtitle}>{subtitle}</p>}
					</div>
					{actions && <div className={classes.actions}>{actions}</div>}
				</div>
			)}

			<div className={classes.body}>
				{loading && !error && (
					<div className={classes.loadingState}>
						<div className={classes.loadingSpinner} />
						<span className={classes.loadingText}>Loading chart...</span>
					</div>
				)}
				{error && !loading && (
					<div className={classes.errorState}>
						<div className={classes.errorIcon}>⚠</div>
						<span className={classes.errorText}>{error}</span>
					</div>
				)}

				{!loading && !error && <div className={classes.chartContent}>{children}</div>}
			</div>

			{footer && <div className={classes.footer}>{footer}</div>}
		</div>
	);
}
