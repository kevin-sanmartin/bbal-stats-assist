import { InputHTMLAttributes, ReactNode } from "react";
import classes from "./classes.module.scss";
import classNames from "classnames";

export type InputSize = "sm" | "md" | "lg";
export type InputState = "default" | "error" | "success";

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
	size?: InputSize;
	state?: InputState;
	label?: string;
	helperText?: string;
	leftIcon?: ReactNode;
	rightIcon?: ReactNode;
	fullWidth?: boolean;
}

export default function Input({ size = "md", state = "default", label, helperText, leftIcon, rightIcon, fullWidth = false, className, ...props }: InputProps) {
	const inputClasses = classNames(
		classes.input,
		classes[`size-${size}`],
		classes[`state-${state}`],
		{ [classes.hasLeftIcon]: leftIcon, [classes.hasRightIcon]: rightIcon, [classes.fullWidth]: fullWidth },
		className,
	);

	const rootClasses = classNames(classes.container, { [classes.fullWidth]: fullWidth });

	return (
		<div className={rootClasses}>
			{label && (
				<label className={classes.label} htmlFor={props.id}>
					{label}
				</label>
			)}
			<div className={classes.inputWrapper}>
				{leftIcon && <span className={classes.leftIcon}>{leftIcon}</span>}
				<input className={inputClasses} {...props} />
				{rightIcon && <span className={classes.rightIcon}>{rightIcon}</span>}
			</div>
			{helperText && <p className={classes.helperText}>{helperText}</p>}
		</div>
	);
}
