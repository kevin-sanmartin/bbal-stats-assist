import React from "react";
import classes from "./classes.module.scss";

interface SelectOption {
	value: string;
	label: string;
}

interface SelectProps {
	label?: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
	options: SelectOption[];
	className?: string;
	fullWidth?: boolean;
}

export default function Select({ label, value, onChange, options, className, fullWidth }: SelectProps) {
	return (
		<div className={`${classes.selectContainer} ${fullWidth ? classes.fullWidth : ""} ${className || ""}`}>
			{label && <label className={classes.selectLabel}>{label}</label>}
			<select value={value} onChange={onChange} className={classes.select}>
				{options.map((option) => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
		</div>
	);
}