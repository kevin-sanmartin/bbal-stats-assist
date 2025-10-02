import { HTMLAttributes, ReactNode } from "react";
import classes from "./classes.module.scss";
import classNames from "classnames";

export type CardVariant = "default" | "bordered" | "elevated" | "outlined";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
	variant?: CardVariant;
	hoverable?: boolean;
}

export default function Card({ children, variant = "default", hoverable = false, className, ...props }: CardProps) {
	const cardClasses = classNames(classes.card, classes[`variant-${variant}`], { [classes.hoverable]: hoverable }, className);

	return (
		<div className={cardClasses} {...props}>
			{children}
		</div>
	);
}
