import { PropsWithChildren } from "react";
import classes from "./classes.module.scss";
import classNames from "classnames";

export type BadgeVariant = "default" | "primary" | "success" | "warning" | "danger" | "info";

interface BadgeProps {
	variant?: BadgeVariant;
	className?: string;
}

export default function Badge({ children, variant = "default", className }: PropsWithChildren<BadgeProps>) {
	const badgeClasses = classNames(classes.badge, classes[`variant-${variant}`], className);

	return <span className={badgeClasses}>{children}</span>;
}
