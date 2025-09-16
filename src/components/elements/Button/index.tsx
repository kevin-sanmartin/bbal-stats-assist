import { ButtonHTMLAttributes, ReactNode } from "react";
import classes from "./classes.module.scss";
import classNames from "classnames";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariant;
	size?: ButtonSize;
	loading?: boolean;
	fullWidth?: boolean;
	leftIcon?: ReactNode;
	rightIcon?: ReactNode;
}

export default function Button({ children, variant = "primary", size = "md", loading = false, fullWidth = false, leftIcon, rightIcon, className, disabled, ...props }: ButtonProps) {
	const buttonClasses = classNames(
		classes.button,
		classes[`variant-${variant}`],
		classes[`size-${size}`],
		{ [classes.fullWidth]: fullWidth, [classes.loading]: loading },
		className,
	);

	return (
		<button className={buttonClasses} disabled={disabled || loading} {...props}>
			{loading && <span className={classes.spinner} />}
			<span className={classes.content}>
				{leftIcon && <span className={classes.leftIcon}>{leftIcon}</span>}
				{children}
				{rightIcon && <span className={classes.rightIcon}>{rightIcon}</span>}
			</span>
		</button>
	);
}
