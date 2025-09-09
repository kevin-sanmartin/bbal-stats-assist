import { ReactNode, MouseEvent, useState } from "react";
import classes from "./classes.module.scss";
import classNames from "classnames";
import VerticalCourt from "./VerticalCourt";
import HorizontalCourt from "./HorizontalCourt";

// Imports des modules séparés
import { CourtSize, CourtTheme, CourtOrientation } from "./enums";
import { CourtPosition, CourtClick } from "./types";
import { generateClickId, svgToFiba } from "./utils";

// Props pour le composant principal
interface BasketballCourtProps {
	size?: CourtSize;
	theme?: CourtTheme;
	className?: string;
	onCourtClick: (position: CourtPosition) => void;
}

export default function BasketballCourt({ size = CourtSize.MD, theme = CourtTheme.MODERN, className, onCourtClick }: BasketballCourtProps) {
	const [clicks, setClicks] = useState<CourtClick[]>([]);
	const courtClasses = classNames(classes.basketballCourt, classes[`size-${size}`], classes[`theme-${theme}`], className);

	const handleCourtClick = (event: MouseEvent<SVGSVGElement>) => {
		console.log("🏀 Court clicked!");

		const svg = event.currentTarget;
		if (!svg) {
			console.warn("⚠️ SVG element not found");
			return;
		}

		const rect = svg.getBoundingClientRect();
		const viewBox = svg.viewBox.baseVal;

		// Déterminer l'orientation du terrain actuel
		const isVertical = viewBox.width < viewBox.height;
		const orientation = isVertical ? CourtOrientation.VERTICAL : CourtOrientation.HORIZONTAL;

		console.log("📊 Court orientation:", orientation, "ViewBox:", viewBox.width, "x", viewBox.height);

		// Calculer position SVG relative
		const svgX = ((event.clientX - rect.left) / rect.width) * viewBox.width;
		const svgY = ((event.clientY - rect.top) / rect.height) * viewBox.height;

		// Convertir en coordonnées terrain FIBA (référence horizontale)
		const fibaPosition = svgToFiba(svgX, svgY, orientation);

		console.log("📍 FIBA position (meters):", fibaPosition);

		// Ajouter le clic à la liste des marqueurs
		const newClick: CourtClick = {
			id: generateClickId(),
			position: fibaPosition,
			timestamp: Date.now(),
		};
		setClicks((prev) => [...prev, newClick]);

		onCourtClick(fibaPosition);
	};

	return (
		<div className={courtClasses}>
			<div className={classes.verticalCourt}>
				<VerticalCourt handleCourtClick={handleCourtClick} classes={classes} clicks={clicks} />
			</div>
			<div className={classes.horizontalCourt}>
				<HorizontalCourt handleCourtClick={handleCourtClick} classes={classes} clicks={clicks} />
			</div>
		</div>
	);
}
