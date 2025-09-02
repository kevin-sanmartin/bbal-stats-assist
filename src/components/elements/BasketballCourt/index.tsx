import { ReactNode, MouseEvent } from "react";
import classes from "./classes.module.scss";
import classNames from "classnames";
import VerticalCourt from "./VerticalCourt";
import HorizontalCourt from "./HorizontalCourt";

export type CourtSize = "sm" | "md" | "lg";
export type CourtTheme = "classic" | "modern" | "minimal";

export interface CourtPosition {
	x: number; // 0-1
	y: number; // 0-1
}

interface BasketballCourtProps {
	size?: CourtSize;
	theme?: CourtTheme;
	className?: string;
	onCourtClick?: (position: CourtPosition) => void;
}

export default function BasketballCourt({ size = "md", theme = "modern", className, onCourtClick }: BasketballCourtProps) {
	const courtClasses = classNames(classes.basketballCourt, classes[`size-${size}`], classes[`theme-${theme}`], className);

	const handleCourtClick = (event: MouseEvent<SVGSVGElement>) => {
		console.log("🏀 Court clicked!");

		if (!onCourtClick) {
			console.log("⚠️ No onCourtClick callback provided");
			return;
		}

		const svg = event.currentTarget;
		const rect = svg.getBoundingClientRect();
		const viewBox = svg.viewBox.baseVal;

		console.log("📊 Raw click data:", {
			clientX: event.clientX,
			clientY: event.clientY,
			rectLeft: rect.left,
			rectTop: rect.top,
			rectWidth: rect.width,
			rectHeight: rect.height,
			viewBoxWidth: viewBox.width,
			viewBoxHeight: viewBox.height,
		});

		const x = ((event.clientX - rect.left) / rect.width) * viewBox.width;
		const y = ((event.clientY - rect.top) / rect.height) * viewBox.height;

		console.log("📍 SVG coordinates:", { x, y });

		const normalizedPosition: CourtPosition = {
			x: x / viewBox.width,
			y: y / viewBox.height,
		};

		console.log("✅ Normalized position (0-1):", normalizedPosition);

		onCourtClick(normalizedPosition);
	};

	return (
		<div className={courtClasses}>
			<div className={classes.verticalCourt}>
				<VerticalCourt handleCourtClick={handleCourtClick} classes={classes} />
			</div>
			<div className={classes.horizontalCourt}>
				<HorizontalCourt handleCourtClick={handleCourtClick} classes={classes} />
			</div>
		</div>
	);
}
