import { CourtClick } from "./types";
import { CourtOrientation } from "./enums";
import { fibaToSvg } from "./utils";
import CrossMarker from "./components/CrossMarker";

interface VerticalCourtProps {
	handleCourtClick: (event: React.MouseEvent<SVGSVGElement>) => void;
	classes: { [key: string]: string };
	clicks: CourtClick[];
}

export default function VerticalCourt({ handleCourtClick, classes, clicks }: VerticalCourtProps) {
	return (
		<svg viewBox="0 0 500 940" className={classes.courtSvg} preserveAspectRatio="xMidYMid meet" onClick={handleCourtClick}>
			{/* Contour principal du terrain */}
			<rect x="2" y="2" width="496" height="936" fill="none" stroke="currentColor" strokeWidth="3" className={classes.courtBorder} />

			{/* Ligne médiane */}
			<line x1="2" y1="470" x2="498" y2="470" stroke="currentColor" strokeWidth="2" className={classes.centerLine} />

			{/* Cercle central */}
			<circle cx="250" cy="470" r="60" fill="none" stroke="currentColor" strokeWidth="2" className={classes.centerCircle} />

			{/* Panier du haut */}
			<g className={classes.topBasket}>
				{/* Zone restrictive (raquette) */}
				<rect x="170" y="2" width="160" height="190" fill="none" stroke="currentColor" strokeWidth="2" />
				{/* Ligne des lancers francs */}
				<line x1="170" y1="192" x2="330" y2="192" stroke="currentColor" strokeWidth="2" />
				{/* Demi-cercle des lancers francs */}
				<path d="M 170 192 A 80 80 0 0 0 330 192" fill="none" stroke="currentColor" strokeWidth="2" />
				{/* Arc à 3 points haut */}
				<path d="M 40 2 L 40 90 A 210 210 0 0 0 460 90 L 460 2" fill="none" stroke="currentColor" strokeWidth="2" />
				{/* Panier */}
				<circle cx="250" cy="30" r="9" fill="none" stroke="currentColor" strokeWidth="2" />
				{/* Panneau */}
				<line x1="230" y1="30" x2="270" y2="30" stroke="currentColor" strokeWidth="3" />
			</g>

			{/* Panier du bas (miroir du haut) */}
			<g className={classes.bottomBasket}>
				{/* Zone restrictive (raquette) */}
				<rect x="170" y="748" width="160" height="190" fill="none" stroke="currentColor" strokeWidth="2" />
				{/* Ligne des lancers francs */}
				<line x1="170" y1="748" x2="330" y2="748" stroke="currentColor" strokeWidth="2" />
				{/* Demi-cercle des lancers francs */}
				<path d="M 170 748 A 80 80 0 0 1 330 748" fill="none" stroke="currentColor" strokeWidth="2" />
				{/* Arc à 3 points bas */}
				<path d="M 40 938 L 40 850 A 210 210 0 0 1 460 850 L 460 938" fill="none" stroke="currentColor" strokeWidth="2" />
				{/* Panier */}
				<circle cx="250" cy="910" r="9" fill="none" stroke="currentColor" strokeWidth="2" />
				{/* Panneau */}
				<line x1="230" y1="910" x2="270" y2="910" stroke="currentColor" strokeWidth="3" />
			</g>

			{/* Marqueurs de clics */}
			{clicks.map((click) => {
				const svgPos = fibaToSvg(click.position, CourtOrientation.VERTICAL);
				return <CrossMarker key={click.id} id={click.id} x={svgPos.x} y={svgPos.y} />;
			})}
		</svg>
	);
}
