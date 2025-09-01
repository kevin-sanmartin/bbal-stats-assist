import classes from "./classes.module.scss";
import classNames from "classnames";

export type LoaderSize = "sm" | "md" | "lg" | "xl";
export type LoaderVariant = "default" | "primary" | "dots";

interface LoaderProps {
	size?: LoaderSize;
	variant?: LoaderVariant;
	label?: string;
	className?: string;
}

export default function Loader({ size = "md", variant = "default", label, className }: LoaderProps) {
	const loaderClasses = classNames(classes.loader, classes[`size-${size}`], classes[`variant-${variant}`], className);

	if (variant === "dots") {
		return (
			<div className={loaderClasses} role="status" aria-label={label || "Loading"}>
				<div className={classes.dots}>
					<div className={classes.dot} />
					<div className={classes.dot} />
					<div className={classes.dot} />
				</div>
				{label && <span className={classes.label}>{label}</span>}
			</div>
		);
	}

	return (
		<div className={loaderClasses} role="status" aria-label={label || "Loading"}>
			<div className={classes.spinner} />
			{label && <span className={classes.label}>{label}</span>}
		</div>
	);
}
