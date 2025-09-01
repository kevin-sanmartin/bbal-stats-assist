import { PropsWithChildren } from "react";
import classes from "./classes.module.scss";
import classNames from "classnames";

export type BadgeVariant = "default" | "primary" | "success" | "warning" | "danger" | "info";
export type BadgeSize = "sm" | "md" | "lg";

interface BadgeProps {
	variant?: BadgeVariant;
	size?: BadgeSize;
	dot?: boolean;
	className?: string;
}

export default function Badge({ children, variant = "default", size = "md", dot = false, className }: PropsWithChildren<BadgeProps>) {
	const badgeClasses = classNames(classes.badge, classes[`variant-${variant}`], classes[`size-${size}`], { [classes.dot]: dot }, className);

	return <span className={badgeClasses}>{children}</span>;
}
