import classes from "./classes.module.scss";
import classNames from "classnames";
import Button from "@/components/elements/Button";
import { HiMinus, HiPlus } from "react-icons/hi";

export type StatCounterVariant = "default" | "success" | "warning" | "danger";

interface StatCounterProps {
	label: string;
	value: number;
	variant?: StatCounterVariant;
	min?: number;
	max?: number;
	step?: number;
	showButtons?: boolean;
	disabled?: boolean;
	onChange?: (value: number) => void;
	className?: string;
	suffix?: string;
	prefix?: string;
}

export default function StatCounter({
	label,
	value,
	variant = "default",
	min = 0,
	max = 99,
	step = 1,
	showButtons = false,
	disabled = false,
	onChange,
	className,
	suffix,
	prefix,
}: StatCounterProps) {
	const containerClasses = classNames(classes.statCounter, classes[`variant-${variant}`], { [classes.disabled]: disabled }, className);

	const handleIncrement = () => {
		if (disabled || value >= max) return;
		const newValue = Math.min(max, value + step);
		onChange?.(newValue);
	};

	const handleDecrement = () => {
		if (disabled || value <= min) return;
		const newValue = Math.max(min, value - step);
		onChange?.(newValue);
	};

	const canIncrement = !disabled && value < max;
	const canDecrement = !disabled && value > min;

	return (
		<div className={containerClasses}>
			<div className={classes.header}>
				<span className={classes.label}>{label}</span>
			</div>

			<div className={classes.counter}>
				{showButtons && (
					<Button variant="ghost" disabled={!canDecrement} onClick={handleDecrement} className={classes.decrementButton}>
						<HiMinus />
					</Button>
				)}

				<div className={classes.valueContainer}>
					<span className={classes.value}>
						{prefix}
						{value}
						{suffix}
					</span>
				</div>

				{showButtons && (
					<Button variant="ghost" disabled={!canIncrement} onClick={handleIncrement} className={classes.incrementButton}>
						<HiPlus />
					</Button>
				)}
			</div>
		</div>
	);
}
