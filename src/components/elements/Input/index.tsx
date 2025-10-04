import { InputHTMLAttributes, ReactNode } from "react";
import classes from "./classes.module.scss";
import classNames from "classnames";

export type InputState = "default" | "error" | "success";

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
	state?: InputState;
	label?: string;
	helperText?: string;
	leftIcon?: ReactNode;
	rightIcon?: ReactNode;
	fullWidth?: boolean;
}

export default function Input({ state = "default", label, helperText, leftIcon, rightIcon, fullWidth = false, className, onChange, ...props }: InputProps) {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (props.type === "number") {
			const value = e.target.value;
			if (value === "") {
				const emptyEvent = { ...e, target: { ...e.target, value: "" } };
				onChange?.(emptyEvent as React.ChangeEvent<HTMLInputElement>);
				return;
			}
		}
		onChange?.(e);
	};
	const inputClasses = classNames(
		classes.input,
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
				<input className={inputClasses} {...props} onChange={handleChange} />
				{rightIcon && <span className={classes.rightIcon}>{rightIcon}</span>}
			</div>
			{helperText && <p className={classes.helperText}>{helperText}</p>}
		</div>
	);
}
