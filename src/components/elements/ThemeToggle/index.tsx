"use client";

import { useTheme } from "@/hooks/useTheme";
import classes from "./classes.module.scss";
import classNames from "classnames";
import { useEffect, useState } from "react";

interface ThemeToggleProps {
	showLabel?: boolean;
	className?: string;
}

export default function ThemeToggle({ showLabel = false, className }: ThemeToggleProps) {
	const { theme, toggleTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	// Éviter le flash pendant l'hydratation
	if (!mounted) {
		return (
			<button className={classNames(classes.themeToggle, className)} disabled>
				<div className={classes.iconContainer}>
					<span className={`${classes.icon} ${classes.sunIcon} ${classes.active}`}>☀️</span>
					<span className={`${classes.icon} ${classes.moonIcon}`}>🌙</span>
				</div>
				{showLabel && <span className={classes.label}>Light Mode</span>}
			</button>
		);
	}

	const toggleClasses = classNames(classes.themeToggle, className);
	const isDark = theme === "dark";

	const handleToggleTheme = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		toggleTheme();
	};

	return (
		<button
			className={toggleClasses}
			onClick={handleToggleTheme}
			aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
			title={`Switch to ${isDark ? "light" : "dark"} mode`}
			type="button">
			<div className={classes.iconContainer}>
				<span className={`${classes.icon} ${classes.sunIcon} ${!isDark ? classes.active : ""}`}>☀️</span>
				<span className={`${classes.icon} ${classes.moonIcon} ${isDark ? classes.active : ""}`}>🌙</span>
			</div>

			{showLabel && <span className={classes.label}>{isDark ? "Dark" : "Light"} Mode</span>}
		</button>
	);
}
