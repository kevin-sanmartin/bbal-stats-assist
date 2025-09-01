import { HTMLAttributes, ReactNode } from "react";
import classes from "./classes.module.scss";
import classNames from "classnames";

export type CardVariant = "default" | "bordered" | "elevated" | "outlined";
export type CardPadding = "sm" | "md" | "lg";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
	variant?: CardVariant;
	padding?: CardPadding;
	hoverable?: boolean;
}

export default function Card({ children, variant = "default", padding = "md", hoverable = false, className, ...props }: CardProps) {
	const cardClasses = classNames(classes.card, classes[`variant-${variant}`], classes[`padding-${padding}`], { [classes.hoverable]: hoverable }, className);

	return (
		<div className={cardClasses} {...props}>
			{children}
		</div>
	);
}
