import { InputHTMLAttributes, ReactNode } from "react";
import classes from "./classes.module.scss";
import classNames from "classnames";

export type CheckboxSize = "sm" | "md" | "lg";
export type CheckboxState = "default" | "error" | "success";

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
	size?: CheckboxSize;
	state?: CheckboxState;
	label?: ReactNode;
	helperText?: string;
}

export default function Checkbox({ size = "md", state = "default", label, helperText, className, ...props }: CheckboxProps) {
	const checkboxClasses = classNames(
		classes.checkbox,
		classes[`size-${size}`],
		classes[`state-${state}`],
		className,
	);

	const rootClasses = classNames(classes.container);

	return (
		<div className={rootClasses}>
			<label className={classes.label}>
				<input
					type="checkbox"
					className={checkboxClasses}
					{...props}
				/>
				<span className={classes.checkmark}></span>
				{label && <span className={classes.labelText}>{label}</span>}
			</label>
			{helperText && <p className={classes.helperText}>{helperText}</p>}
		</div>
	);
}