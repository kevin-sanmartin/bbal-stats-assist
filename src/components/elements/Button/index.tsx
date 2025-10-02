import { ButtonHTMLAttributes, ReactNode } from "react";
import classes from "./classes.module.scss";
import classNames from "classnames";

export type ButtonVariant = "contained" | "outlined" | "ghost";
export type ButtonColor = "primary" | "gray" | "info" | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariant;
	color?: ButtonColor;
	loading?: boolean;
	fullWidth?: boolean;
	leftIcon?: ReactNode;
	rightIcon?: ReactNode;
}

export default function Button({
	children,
	type = "button",
	variant = "contained",
	color = "primary",
	loading = false,
	fullWidth = false,
	leftIcon,
	rightIcon,
	className,
	disabled,
	...props
}: ButtonProps) {
	const buttonClasses = classNames(
		classes.button,
		classes[`variant-${variant}`],
		classes[`color-${color}`],
		{ [classes.fullWidth]: fullWidth, [classes.loading]: loading },
		className,
	);

	return (
		<button type={type} className={buttonClasses} disabled={disabled || loading} {...props}>
			{loading && <span className={classes.spinner} />}
			<span className={classes.content}>
				{leftIcon && <span className={classes.leftIcon}>{leftIcon}</span>}
				{children}
				{rightIcon && <span className={classes.rightIcon}>{rightIcon}</span>}
			</span>
		</button>
	);
}
